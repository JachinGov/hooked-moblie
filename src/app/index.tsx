import Button from "@/components/Button";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text>Edit src/app/index.tsx to edit this screen.</Text>
      <Button
        title="Login"
        onPress={() => router.push("/(tabs)/spots")}
        style={styles.buttonLogin}
      />
      <Button
        title="Sign Up"
        onPress={() => router.push("/signup")}
        style={styles.buttonSignUp}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonLogin: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: "gold",
  },
  buttonSignUp: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: "blue",
  },
});
