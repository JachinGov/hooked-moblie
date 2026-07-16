import * as SecureStore from "expo-secure-store";
import { apiFetch } from "./api.ts";

export async function signup(email: string, password: string) {
  const data = await apiFetch("/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  await SecureStore.setItemAsync("authToken", data.token);
  return data;
}

export async function login(email: string, password: string) {
  const data = await apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  await SecureStore.setItemAsync("authToken", data.token);
  return data;
}

export async function logout() {
  await SecureStore.deleteItemAsync("authToken");
}
