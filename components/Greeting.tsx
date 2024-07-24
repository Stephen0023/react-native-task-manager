import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

function getGreeting(): string {
  const now = new Date();
  const hours = now.getHours();

  if (hours < 12) {
    return "Good morning";
  } else if (hours < 18) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
}

const Greeting: React.FC = () => {
  const greeting = getGreeting();

  return (
    <ThemedView>
      <ThemedText style={{ fontSize: 20, fontWeight: "600" }}>
        Hi, {greeting}!
      </ThemedText>
    </ThemedView>
  );
};

export default Greeting;
