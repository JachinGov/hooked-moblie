import * as SecureStore from "expo-secure-store";
import { apiFetch } from "./api.ts";

export async function signup(name: string, email: string, password: string) {
  const data = await apiFetch("/auth/signup", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
  await SecureStore.setItemAsync("authToken", data.token);
  await SecureStore.setItemAsync("user", JSON.stringify(data.user));
  return data;
}

export async function login(email: string, password: string) {
  const data = await apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  await SecureStore.setItemAsync("authToken", data.token);
  await SecureStore.setItemAsync("user", JSON.stringify(data.user));
  return data;
}

export async function getCurrentUser() {
  const stored = await SecureStore.getItemAsync("user");
  return stored ? JSON.parse(stored) : null;
}
export async function logout() {
  await SecureStore.deleteItemAsync("authToken");
  await SecureStore.deleteItemAsync("user");
}
