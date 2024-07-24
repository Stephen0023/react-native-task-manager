import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { ScreenProps } from "@/models/StackNavigation";
import { useUser } from "@/contexts/UserContextProvider";
import SuccessAnimation from "@/components/SuccessAnimation";

type VerificationSuccessScreenProps = ScreenProps<
  "AuthStack",
  "VerificationSuccess"
>;

const VerificationSuccessScreen: React.FC<VerificationSuccessScreenProps> = ({
  route,
  navigation,
}) => {
  const { closeBottomSheet } = useUser();
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login Success</Text>

      <SuccessAnimation onAnimationEnd={closeBottomSheet} />
    </View>
  );
};

export default VerificationSuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "600",
    marginTop: "30%",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
});
