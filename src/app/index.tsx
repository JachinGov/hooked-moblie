import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import Button from "../components/Button";
import { login } from "../services/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin() {
    setError("");
    try {
      await login(email, password);
      router.replace("/spots");
    } catch (err: any) {
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
      <Text style={styles.text}>Welcome Back</Text>
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
      <Button title="Login" onPress={handleLogin} style={styles.buttonLogin} />
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
    justifyContent: "flex-start",
  },

  headerImage: {
    width: "100%",
    height: 300,
  },

  text: {
    fontSize: 25,
    fontWeight: "bold",
    marginHorizontal: 12,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    margin: 12,
    borderRadius: 8,
    padding: 12,
  },

  buttonLogin: {
    margin: 12,
    borderRadius: 12,
    backgroundColor: "#F59E0B",
    alignItems: "center",
    justifyContent: "center",
    elevation: 7,
    paddingVertical: 12,
  },

  buttonSignUp: {
    margin: 12,
    borderRadius: 12,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
    elevation: 7,
    paddingVertical: 12,
  },

  error: {
    color: "red",
    marginTop: 8,
  },
});
