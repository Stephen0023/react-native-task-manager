import { ScreenProps } from "@/models/StackNavigation";
import { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Alert,
} from "react-native";

import PrimaryActionableButton from "@/components/PrimaryActionableButton";
import {
  // checkUserStatusByEmail,
  // UserStatus,
  // UserStatusResult,
  handleSignUp,
} from "@/apis/User";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";

type HomeProps = ScreenProps<"AuthStack", "Home">;

const AuthScreen: React.FC<HomeProps> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const colorScheme = useColorScheme();

  const backgroundColor =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;
  const textColor =
    colorScheme === "dark" ? Colors.dark.text : Colors.light.text;

  const LoginOrSignUp = async () => {
    // await handleSignUp();
    // const userStatusResult: UserStatusResult = await checkUserStatusByEmail(
    //   email
    // );
    // switch (userStatusResult.status) {
    //   case UserStatus.NOT_FOUND:
    //     navigation.navigate("SignUp", { email: email });
    //     break;
    //   case UserStatus.VERIFIED:
    //     navigation.navigate("Login", { email: email });
    //     break;
    //   case UserStatus.NEED_TO_VERIFY:
    //     navigation.navigate("Verification", {
    //       email: email,
    //     });
    //     break;
    //   case UserStatus.ERROR:
    //     Alert.alert("Error", String(userStatusResult.errorMessage), [
    //       { text: "OK", onPress: () => console.log("OK Pressed") },
    //     ]);
    // }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <ThemedText style={[styles.title]}>
        Enter your email to continue!
      </ThemedText>
      <TextInput
        style={[styles.textInput, { borderColor: textColor }]}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <PrimaryActionableButton
        disabled={email.length === 0}
        buttonStyle={{
          backgroundColor: email.length === 0 ? "#7ae0f5" : "#47aeed",
        }}
        onPress={async () => {
          await LoginOrSignUp();
        }}
        title="Continue"
      />
    </SafeAreaView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  textInput: {
    paddingHorizontal: 15,
    borderWidth: 1,
    fontSize: 18,
    marginBottom: "3%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "85%",
    height: "8%",
    backgroundColor: "#fff",
    borderStyle: "solid",
    borderRadius: 16,
    marginVertical: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginTop: "30%",
    padding: 40,
  },

  container: {
    flex: 1,
    alignItems: "center",
  },
});
