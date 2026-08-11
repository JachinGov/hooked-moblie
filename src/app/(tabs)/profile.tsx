import { getCurrentUser } from "@/services/auth";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Spots() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    const user = await getCurrentUser();
    if (user) setUserName(user.name);
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>GOOD MORNING, {userName}</Text>
      <Text style={styles.headingText}>Profile</Text>
      <UserCard />
      <Stats />
      <LogOut />
    </ScrollView>
  );
}

function UserCard() {
  return (
    <View style={styles.profileContainer}>
      <Text style={{ fontSize: 25, color: "#151535", fontWeight: "bold" }}>
        Name
      </Text>
      <Text style={{ color: "#5b5a5a" }}>Email</Text>
      <Text style={{ color: "#F59E0B" }}>Member since</Text>
    </View>
  );
}

interface StatBlockProps {
  value: string | number;
  label: string;
}

function Stats() {
  return (
    <>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <StatBlock value={24} label="Total Catches" />
        <StatBlock value="Rocky Bay" label="Favorite Spot" />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <StatBlock value={91} label="Best Score" />
        <StatBlock value={8} label="Species Caught" />
      </View>
    </>
  );
}

function StatBlock({ value, label }: StatBlockProps) {
  return (
    <View style={styles.statContainer}>
      <Text>{value}</Text>
      <Text>{label}</Text>
    </View>
  );
}

function LogOut() {
  return (
    <Pressable style={styles.logOutButton} onPress={() => router.back()}>
      <MaterialIcons name="logout" size={24} color="red" />
      <Text style={styles.buttonText}>Log Out</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ff0000cc",
    marginLeft: 10,
  },
  logOutButton: {
    marginTop: 20,
    width: "100%",
    backgroundColor: "#dec3c3cc",
    height: 70,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  statContainer: {
    marginTop: 20,
    alignItems: "center",
    padding: 15,
    backgroundColor: "#186088",
    width: "45%",
    minHeight: 80,
    borderRadius: 12,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 100,
    paddingTop: 50,
    left: 0,
    right: 0,
    backgroundColor: "#d2d0d0",
  },
  headingText: {
    fontSize: 25,
    color: "#151535",
    fontWeight: "bold",
    marginBottom: 20,
  },
  profileContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 5,
    marginLeft: 8,
    backgroundColor: "white",
    height: 100,
    borderRadius: 20,
    paddingLeft: 20,
    paddingTop: 10,
  },
});
