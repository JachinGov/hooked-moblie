import { getCurrentUser } from "@/services/auth";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { FAB } from "react-native-paper";

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
      <Text style={styles.backButton}>GOOD MORNING, {userName}</Text>
      <Text style={styles.back}>My Spots</Text>
      <Weather />
      <SpotCard />
      <FAB
        icon="plus"
        color="#FFFFFF"
        style={styles.fab}
        onPress={() => router.push("/spot/addSpot")}
      />
    </ScrollView>
  );
}

function Weather() {
  return (
    <View style={styles.weatherContainer}>
      <MaterialCommunityIcons name="weather-cloudy" size={24} color="#FFFFFF" />
      <Text style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 18 }}>
        Partly cloudy · 21°C
      </Text>
    </View>
  );
}

function SpotCard() {
  return (
    <View style={styles.spotContainer}>
      <FontAwesome name="map-o" size={24} color="#186088" />
      <SpotData />
    </View>
  );
}

function SpotData() {
  return (
    <View style={styles.dataContainer}>
      <Text style={{ color: "#186088", fontWeight: "bold", fontSize: 18 }}>
        Rocky Bay Beach
      </Text>
      <Text style={{ color: "#186088", fontSize: 18 }}>Park Rynie, KZN</Text>
      <Text style={{ color: "#186088", fontSize: 18 }}>Saltwater</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    right: 20,
    bottom: 58,
    backgroundColor: "#186088",
    borderRadius: 50,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 100,
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: "#d2d0d0",
  },
  backButton: {
    fontSize: 15,
    color: "#636366",
    fontWeight: "bold",
    marginBottom: 10,
  },
  back: {
    fontSize: 25,
    color: "#151535",
    fontWeight: "bold",
    marginBottom: 20,
  },
  weatherContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#186088",
    width: "100%",
    minHeight: 70,
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  spotContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "white",
    width: "100%",
    minHeight: 120,
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  dataContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 8,
    marginLeft: 8,
  },
});
