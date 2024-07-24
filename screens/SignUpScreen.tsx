import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  SafeAreaView,
  TouchableHighlight,
} from "react-native";
import { ScreenProps } from "@/models/StackNavigation";
import { handleSignUp } from "@/apis/User";
import PrimaryActionableButton from "@/components/PrimaryActionableButton";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedView } from "@/components/ThemedView";

type SignUpScreenProps = ScreenProps<"AuthStack", "SignUp">;

const SignUpScreen: React.FC<SignUpScreenProps> = ({ route, navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const colorScheme = useColorScheme();

  const backgroundColor =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;
  const textColor =
    colorScheme === "dark" ? Colors.dark.text : Colors.light.text;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <ThemedText style={[styles.title]}>Create your password</ThemedText>

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        style={[styles.textInput, { borderColor: textColor }]}
      />

      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        style={[styles.textInput, { borderColor: textColor }]}
      />

      <ThemedView style={styles.bottomText}>
        <ThemedText>Already have an account? </ThemedText>
        <TouchableHighlight
          underlayColor={Colors.primary}
          style={{ justifyContent: "center" }}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={{ color: "#FF7F00" }}>Log in</Text>
        </TouchableHighlight>
      </ThemedView>
      <PrimaryActionableButton
        title={"Continue"}
        onPress={async () => {
          try {
            await handleSignUp(email, password);
            navigation.navigate("VerificationSuccess");
          } catch (error) {
            Alert.alert(String(error));
          }
        }}
        buttonStyle={[
          {
            backgroundColor:
              password.length !== 0 && email.length !== 0
                ? "#47aeed"
                : "#7ae0f5",
          },
        ]}
        disabled={password.length === 0 || email.length === 0}
      />
    </SafeAreaView>
  );
};

export default SignUpScreen;

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

  buttonStyle: {
    width: "100%",
    height: "8%",
    position: "absolute",
    bottom: "15%",
  },

  container: {
    flex: 1,
    alignItems: "center",
  },
  bottomText: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
