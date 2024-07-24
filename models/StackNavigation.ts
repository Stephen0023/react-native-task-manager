import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  VerificationSuccess: undefined;
};

type AllStackParamLists = {
  AuthStack: AuthStackParamList;
};

export type StackParamList<StackName extends keyof AllStackParamLists> =
  AllStackParamLists[StackName];

export type ScreenProps<
  StackName extends keyof AllStackParamLists,
  RouteName extends keyof StackParamList<StackName>
> = {
  navigation: StackNavigationProp<StackParamList<StackName>, RouteName>;
  route: RouteProp<StackParamList<StackName>, RouteName>;
};
