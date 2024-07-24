import React, { useRef } from "react";
import { Button, SafeAreaView, StyleSheet } from "react-native";
import { useUser } from "@/contexts/UserContextProvider";
import { handleSignOut } from "@/apis/User";
import PrimaryActionableButton from "@/components/PrimaryActionableButton";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import LeaderBoard from "@/components/Leaderboard";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

const UserPage: React.FC = () => {
  const { user, openBottomSheet } = useUser();

  const colorScheme = useColorScheme();

  const backgroundColor =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;

  return (
    <SafeAreaView style={[{ flex: 1 }, { backgroundColor }]}>
      <ThemedView style={[styles.container]}>
        {user === null ? (
          <>
            <ThemedText style={[styles.header, { top: "50%" }]}>
              Not sign in yet!
            </ThemedText>
            <PrimaryActionableButton
              title="Sign in"
              onPress={openBottomSheet}
            />
          </>
        ) : (
          <>
            <ThemedText style={styles.header}>Hello, {user.email}</ThemedText>

            <PrimaryActionableButton
              buttonStyle={{ position: "relative", bottom: 0 }}
              title="Sign out"
              onPress={handleSignOut}
            />

            <LeaderBoard />
          </>
        )}
      </ThemedView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default UserPage;
