import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

export const API_BASE_URL =
  Platform.OS === "android"
    ? "http://10.0.2.2:3000"
    : "http://192.168.1.101:3000";


export async function apiFetch(path: string, options: RequestInit = {}) {
  const token = await SecureStore.getItemAsync("authToken");

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  console.log("STATUS:", res.status);
  const text = await res.text();
  console.log("RAW BODY:", text);

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error("Server did not return valid JSON");
  }

  if (!res.ok) {
    throw new Error(data.error || "Something went wrong");
  }
  return data;
}
