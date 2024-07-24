import {
  Image,
  StyleSheet,
  Platform,
  SafeAreaView,
  TouchableHighlight,
} from "react-native";

import TaskList from "@/components/TasksList";
import { useUser } from "@/contexts/UserContextProvider";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Greeting from "@/components/Greeting";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import PrimaryActionableButton from "@/components/PrimaryActionableButton";
import { useCallback, useState } from "react";
import { Task } from "@/models";
import { AntDesign } from "@expo/vector-icons";
import { generateId } from "@/utils/common";
import { createTask, updateTask, deleteTask } from "@/apis";
import { Timestamp } from "firebase/firestore";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const { user, setUser, openBottomSheet } = useUser();

  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  const backgroundColor =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;

  const handleToggleTaskItem = useCallback(
    async (item: Task) => {
      setUser((prevUser) => {
        if (!prevUser) return prevUser;
        const updatedTasks = prevUser.tasks?.map((task) =>
          task.id === item.id ? { ...task, completed: !task.completed } : task
        );
        return { ...prevUser, tasks: updatedTasks };
      });
      try {
        await updateTask(item.id, {
          completed: !item.completed,
          completedAt: Timestamp.now(),
        });
      } catch (error) {
        console.error("Error updating task:", error);
      }
    },
    [setUser]
  );

  const handleChangeTaskItemDescription = useCallback(
    async (item: Task, newDescription: string) => {
      setUser((prevUser) => {
        if (!prevUser) return prevUser;
        const updatedTasks = prevUser.tasks?.map((task) =>
          task.id === item.id ? { ...task, description: newDescription } : task
        );
        return { ...prevUser, tasks: updatedTasks };
      });

      try {
        await updateTask(item.id, { description: newDescription });
      } catch (error) {
        console.error("Error updating task:", error);
      }
    },
    [setUser]
  );

  const handleFinishEditingTaskItem = useCallback(() => {
    setEditingItemId(null);
  }, []);

  const handlePressTaskItemLabel = useCallback((item: Task) => {
    setEditingItemId(item.id);
  }, []);

  const handleRemoveItem = useCallback(
    async (item: Task) => {
      setUser((prevUser) => {
        if (!prevUser) return prevUser;
        const updatedTasks = prevUser.tasks?.filter(
          (task) => task.id !== item.id
        );
        return { ...prevUser, tasks: updatedTasks };
      });
      try {
        await deleteTask(item.id);
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    },
    [setUser]
  );

  const handleCreateTask = useCallback(async () => {
    const id = generateId();

    setUser((prevUser) => {
      if (!prevUser) return prevUser;
      const newTask: Task = {
        id,
        description: "",
        completed: false,
        userId: prevUser.userId,
        createdAt: new Date(),
      };
      return { ...prevUser, tasks: [...(prevUser.tasks || []), newTask] };
    });

    setEditingItemId(id);

    try {
      await createTask({
        id,
        description: "",
        completed: false,
        userId: user?.userId || "",
      });
    } catch (error) {
      console.error("Error creating task:", error);
    }
  }, [setUser, user?.userId]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      {user === null ? (
        <>
          <ThemedText style={[styles.header]}>Not sign in yet!</ThemedText>
          <PrimaryActionableButton title="Sign in" onPress={openBottomSheet} />
        </>
      ) : (
        <>
          <ThemedView style={styles.titleContainer}>
            <Greeting />
          </ThemedView>
          {!user.tasks || user.tasks.length === 0 ? (
            <ThemedText
              style={{
                fontSize: 20,
                fontWeight: "600",
                position: "absolute",
                top: "50%",
              }}
            >
              No task is created
            </ThemedText>
          ) : (
            <TaskList
              data={user.tasks}
              onToggleItem={handleToggleTaskItem}
              onChangeSubject={handleChangeTaskItemDescription}
              onFinishEditing={handleFinishEditingTaskItem}
              onPressLabel={handlePressTaskItemLabel}
              onRemoveItem={handleRemoveItem}
              editingItemId={editingItemId}
            />
          )}

          <TouchableHighlight
            style={styles.addButton}
            onPress={handleCreateTask}
          >
            <AntDesign
              name="pluscircle"
              size={40}
              color={colorScheme === "dark" ? "white" : Colors.primary}
            />
          </TouchableHighlight>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },

  container: {
    flex: 1,
    padding: 20,
    gap: 16,
    alignItems: "center",
  },
  header: {
    position: "absolute",
    top: "50%",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  addButton: {
    position: "absolute",
    bottom: "5%",
    right: "10%",
  },
});
