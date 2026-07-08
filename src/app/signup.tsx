import Button from "@/components/Button";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Signup() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Pressable
        onPress={() => router.back()}
        hitSlop={12}
        style={styles.backButton}
      >
        <Ionicons name="chevron-back" size={28} color="#1e3a5f" />
      </Pressable>
      <Text>Sign up</Text>
      <Button
        style={styles.buttonLogin}
        title="Login"
        onPress={() => router.push("/")}
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
  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
  },
});
