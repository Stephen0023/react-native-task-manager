import React, { useMemo, useRef } from "react";
import { View, Text, Button, StyleSheet, Easing } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { useUser } from "@/contexts/UserContextProvider";
import { NavigationContainer } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { StackParamList } from "@/models/StackNavigation";
import {
  AuthScreen,
  LoginScreen,
  SignUpScreen,
  VerificationScreen,
  VerificationSuccessScreen,
} from "@/screens";
import CustomHeaderLeftButton from "./HeaderLeft";

const Stack = createStackNavigator<StackParamList<"AuthStack">>();

export default function AuthBottomSheet() {
  const { authBottomSheetRef, closeBottomSheet } = useUser();
  const snapPoints = useMemo(() => ["100%"], []);

  return (
    <BottomSheet
      ref={authBottomSheetRef}
      index={-1}
      enableOverDrag={false}
      snapPoints={snapPoints}
      handleComponent={null}
      enablePanDownToClose={true}
    >
      <NavigationContainer independent={true}>
        <Stack.Navigator
          screenOptions={{
            headerTransparent: true,
            headerTintColor: "black",

            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerTitleAlign: "center",

            headerLeft: (props) => <CustomHeaderLeftButton {...props} />,
          }}
        >
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{
              title: "",
            }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: "",
            }}
          />
          <Stack.Screen
            name="VerificationSuccess"
            component={VerificationSuccessScreen}
            options={{
              title: "",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </BottomSheet>
  );
}
