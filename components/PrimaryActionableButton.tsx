import React, { useState } from "react";
//import {loadFonts} from '../../FontLoader';
import {
  TouchableOpacity,
  Text,
  TouchableHighlight,
  StyleSheet,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
  Dimensions,
} from "react-native";

interface PrimaryActionableButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  disable?: boolean;
  titleStyle?: TextStyle | TextStyle[];
  buttonStyle?: ViewStyle | ViewStyle[];
}

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const defaultTitleStyle: TextStyle = {
  fontSize: 18,
  fontWeight: "600",
  color: "#000",
  fontFamily: "Inter",
};

const defaultButtonStyle: ViewStyle = {
  backgroundColor: "#47aeed",
  padding: 10,
  alignItems: "center",
  alignSelf: "center",
  justifyContent: "center",
  width: screenWidth * 0.85,
  height: screenHeight * 0.065,
  borderRadius: 32,
  position: "absolute",
  bottom: "25%",
};

const PrimaryActionableButton: React.FC<PrimaryActionableButtonProps> = ({
  title,
  onPress,
  titleStyle,
  buttonStyle,
  ...props
}) => {
  return (
    <TouchableHighlight
      {...props}
      style={[defaultButtonStyle, buttonStyle]}
      onPress={onPress}
      underlayColor="#7ae0f5"
    >
      <Text style={[defaultTitleStyle, titleStyle]}>{title}</Text>
    </TouchableHighlight>
  );
};

export default PrimaryActionableButton;
