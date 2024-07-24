import React, { useState, useEffect, useCallback } from "react";
import { Text, Button, StyleSheet, ScrollView } from "react-native";
import { getCompletedTasks, getAllUsers } from "@/apis";
import { User } from "@/models/UserType";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";

type UsersTasks = User & { completedTasksCount: number };

const LeaderBoard: React.FC = () => {
  const [users, setUsers] = useState<UsersTasks[]>([]);
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<
    "daily" | "weekly" | "monthly"
  >("daily");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUsers = useCallback(
    async (timeFrame: "daily" | "weekly" | "monthly") => {
      setLoading(true);
      try {
        const allUsers: User[] = await getAllUsers();
        const userTasksCounts = await Promise.all(
          allUsers.map(async (user) => {
            const completedTasksCount = await getCompletedTasks(
              user.id,
              timeFrame
            );
            return { ...user, completedTasksCount };
          })
        );

        userTasksCounts.sort(
          (a, b) => b.completedTasksCount - a.completedTasksCount
        );
        setUsers(userTasksCounts);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchUsers(selectedTimeFrame);
  }, [selectedTimeFrame, fetchUsers]);

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.buttonContainer}>
        <Button
          title="Daily"
          onPress={() => setSelectedTimeFrame("daily")}
          color={selectedTimeFrame === "daily" ? "blue" : "gray"}
        />
        <Button
          title="Weekly"
          onPress={() => setSelectedTimeFrame("weekly")}
          color={selectedTimeFrame === "weekly" ? "blue" : "gray"}
        />
        <Button
          title="Monthly"
          onPress={() => setSelectedTimeFrame("monthly")}
          color={selectedTimeFrame === "monthly" ? "blue" : "gray"}
        />
      </ThemedView>
      {loading ? (
        <ThemedText>Loading...</ThemedText>
      ) : (
        <ScrollView style={styles.scrollThemedView}>
          {users.map((user, index) => (
            <ThemedView key={user.id} style={styles.userContainer}>
              <ThemedText style={styles.userText}>
                {index + 1}. {user.email}
              </ThemedText>
              <ThemedText style={styles.userText}>
                Completed Tasks: {user.completedTasksCount}
              </ThemedText>
            </ThemedView>
          ))}
        </ScrollView>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  scrollThemedView: {
    flex: 1,
  },
  userContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  userText: {
    fontSize: 16,
  },
});

export default LeaderBoard;
