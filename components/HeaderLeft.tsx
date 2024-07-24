import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

import { HeaderBackButtonProps } from "@react-navigation/elements";

import AntDesign from "@expo/vector-icons/AntDesign";

import { useUser } from "@/contexts/UserContextProvider";
import { useColorScheme } from "@/hooks/useColorScheme";

const CustomHeaderLeftButton = ({
  canGoBack,
  onPress,
}: HeaderBackButtonProps) => {
  const { closeBottomSheet } = useUser();
  const colorScheme = useColorScheme();

  return (
    <TouchableOpacity
      style={[styles.buttonContainer]}
      onPress={canGoBack ? onPress : closeBottomSheet}
    >
      <AntDesign
        name={canGoBack ? "left" : "close"}
        size={24}
        color={colorScheme === "dark" ? "#fff" : "#000"}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    left: 10,
  },
});

export default CustomHeaderLeftButton;
