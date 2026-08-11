import { getCurrentUser } from "@/services/auth";
import { getSpots } from "@/services/spots";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FAB } from "react-native-paper";

export default function Spots() {
  const [userName, setUserName] = useState("");
  const [spots, setSpots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  // useFocusEffect runs whenever the screen comes into active view
  useFocusEffect(
    useCallback(() => {
      loadSpots();
    }, []),
  );

  async function loadUser() {
    const user = await getCurrentUser();
    if (user) setUserName(user.name);
  }

  async function loadSpots() {
    try {
      const data = await getSpots();
      setSpots(data);
    } catch (err) {
      console.error("Failed to load spots", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.backButton}>
        {userName ? `GOOD MORNING, ${userName.toUpperCase()}` : "GOOD MORNING"}
      </Text>
      <Text style={styles.back}>My Spots</Text>

      <Weather />

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#186088"
          style={{ marginTop: 20 }}
        />
      ) : spots.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No spots saved yet.</Text>
          <Text style={styles.emptySubText}>
            Tap the + button to add your first spot!
          </Text>
        </View>
      ) : (
        spots.map((spot) => <SpotCard key={spot.id} spot={spot} />)
      )}

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

function SpotCard({ spot }: { spot: any }) {
  // Capitalize first letter of water_type for clean display
  const formattedWaterType = spot.water_type
    ? spot.water_type.charAt(0).toUpperCase() + spot.water_type.slice(1)
    : "";

  return (
    <View style={styles.spotContainer}>
      <FontAwesome name="map-o" size={24} color="#186088" />
      <Pressable
        style={{ flex: 1 }}
        onPress={() => router.push(`/spot/${spot.id}`)}
      >
        <View style={styles.dataContainer}>
          <Text style={styles.spotTitle}>{spot.name}</Text>
          <Text style={styles.spotSubText}>{formattedWaterType}</Text>
        </View>
      </Pressable>
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
    paddingTop: 50,
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
    gap: 12,
    backgroundColor: "white",
    width: "100%",
    minHeight: 90,
    padding: 15,
    borderRadius: 12,
    marginBottom: 16,
  },
  dataContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 4,
    marginLeft: 8,
  },
  spotTitle: {
    color: "#186088",
    fontWeight: "bold",
    fontSize: 18,
  },
  spotSubText: {
    color: "#186088",
    fontSize: 16,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#151535",
  },
  emptySubText: {
    fontSize: 14,
    color: "#636366",
    marginTop: 4,
  },
});
