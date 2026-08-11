import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Button from "../components/Button";
import { signup } from "../services/auth";

export default function Signup() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSignup() {
    setError("");
    try {
      await signup(userName, email, password);
      router.replace("/spots");
    } catch (err: any) {
      console.log("FULL ERROR:", err);
      setError(err.message);
    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/Hooked.png")}
        style={styles.headerImage}
        resizeMode="cover"
      ></Image>
      <Pressable
        style={styles.backButton}
        onPress={() => router.back()}
        hitSlop={12}
      >
        <Ionicons name="chevron-back" size={28} color="#1e3a5f" />
      </Pressable>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        placeholder="Full Name"
        value={userName}
        onChangeText={setUserName}
        autoCapitalize="words"
        keyboardType="default"
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button
        style={styles.buttonCreate}
        title="Create Account"
        onPress={handleSignup}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "flex-start" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginHorizontal: 12,
  },
  headerImage: {
    width: "100%",
    height: 300,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    margin: 12,
    borderRadius: 8,
    padding: 12,
  },
  error: { color: "red", marginTop: 8 },
  buttonCreate: {
    margin: 12,
    borderRadius: 12,
    backgroundColor: "#F59E0B",
    alignItems: "center",
    justifyContent: "center",
    elevation: 7,
    paddingVertical: 12,
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 10,
  },
});
