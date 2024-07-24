import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
} from "react-native";
import PrimaryActionableButton from "@/components/PrimaryActionableButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenProps } from "@/models/StackNavigation";
import { handleSignIn } from "@/apis/User";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import { TextInput } from "react-native-gesture-handler";
import { ThemedView } from "@/components/ThemedView";

type LoginScreenProps = ScreenProps<"AuthStack", "Login">;

const LoginScreen: React.FC<LoginScreenProps> = ({ route, navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const colorScheme = useColorScheme();

  const backgroundColor =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;
  const textColor =
    colorScheme === "dark" ? Colors.dark.text : Colors.light.text;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <ThemedText style={[styles.title]}>Login with your email</ThemedText>

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
        <ThemedText>Don't have an account? </ThemedText>
        <TouchableHighlight
          underlayColor={Colors.primary}
          style={{ justifyContent: "center" }}
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text style={{ color: "#FF7F00" }}>Sign Up</Text>
        </TouchableHighlight>
      </ThemedView>
      <PrimaryActionableButton
        title={"Continue"}
        onPress={async () => {
          try {
            await handleSignIn(email, password);
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

export default LoginScreen;

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
