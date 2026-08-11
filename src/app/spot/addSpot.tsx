import { createSpot } from "@/services/spots";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function AddSpot() {
  const [location, setLocation] = useState({
    latitude: -30.2854,
    longitude: 30.7534,
  });
  const [loading, setLoading] = useState(false);
  const [saveHandler, setSaveHandler] = useState<(() => void) | null>(null);

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <TopNav onSave={() => saveHandler && saveHandler()} loading={loading} />
      <Map location={location} setLocation={setLocation} />
      <ConfigureSpot
        location={location}
        setLoading={setLoading}
        loading={loading}
        onRegisterSave={setSaveHandler}
      />
    </ScrollView>
  );
}

function TopNav({ onSave, loading }: { onSave: () => void; loading: boolean }) {
  return (
    <View style={styles.topNavContainer}>
      <Pressable onPress={() => router.back()} hitSlop={12} disabled={loading}>
        <Ionicons name="chevron-back" size={28} color="#1e3a5f" />
      </Pressable>
      <Text style={styles.navTitle}>Add Spot</Text>
      <Pressable
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={onSave}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" size="small" />
        ) : (
          <Text style={styles.buttonText}>Save</Text>
        )}
      </Pressable>
    </View>
  );
}

function Map({
  location,
  setLocation,
}: {
  location: { latitude: number; longitude: number };
  setLocation: (loc: { latitude: number; longitude: number }) => void;
}) {
  return (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        initialRegion={{
          ...location,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        onPress={(e) => setLocation(e.nativeEvent.coordinate)}
      >
        <Marker coordinate={location} title="New spot" />
      </MapView>
    </View>
  );
}

function ConfigureSpot({
  location,
  loading,
  setLoading,
  onRegisterSave,
}: {
  location: { latitude: number; longitude: number };
  loading: boolean;
  setLoading: (loading: boolean) => void;
  onRegisterSave: (fn: () => void) => void;
}) {
  const [spotName, setSpotName] = useState("");
  const [waterType, setWaterType] = useState("Saltwater");
  const [spotNotes, setSpotNotes] = useState("");
  const [error, setError] = useState("");

  async function handleSave() {
    if (!spotName.trim()) {
      setError("Please name your spot");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await createSpot({
        name: spotName.trim(),
        latitude: location.latitude,
        longitude: location.longitude,
        water_type: waterType.toLowerCase(),
        notes: spotNotes.trim() || undefined,
      });
      router.back();
    } catch (err: any) {
      setError(err.message || "Failed to save spot");
    } finally {
      setLoading(false);
    }
  }

  // Register handleSave so TopNav's Save button can call it
  useEffect(() => {
    onRegisterSave(handleSave);
  }, [onRegisterSave]);

  return (
    <View style={styles.spotNameContainer}>
      <Text style={styles.label}>Spot Name</Text>
      <TextInput
        placeholder="e.g Rocky Bay"
        value={spotName}
        onChangeText={(text) => {
          setSpotName(text);
          if (error) setError("");
        }}
        style={styles.input}
      />

      <Text style={styles.label}>Water Type</Text>
      <View style={styles.waterType}>
        <Pressable
          style={[
            styles.typeButton,
            waterType === "Freshwater"
              ? styles.typeButtonActive
              : styles.typeButtonInactive,
          ]}
          onPress={() => setWaterType("Freshwater")}
        >
          <Text
            style={[
              waterType === "Freshwater"
                ? styles.buttonText
                : styles.typeTextInactive,
            ]}
          >
            Freshwater
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.typeButton,
            waterType === "Saltwater"
              ? styles.typeButtonActive
              : styles.typeButtonInactive,
          ]}
          onPress={() => setWaterType("Saltwater")}
        >
          <Text
            style={[
              waterType === "Saltwater"
                ? styles.buttonText
                : styles.typeTextInactive,
            ]}
          >
            Saltwater
          </Text>
        </Pressable>
      </View>

      <Text style={styles.label}>Notes (optional)</Text>
      <TextInput
        placeholder="Landmarks, parking..."
        value={spotNotes}
        onChangeText={setSpotNotes}
        multiline={true}
        numberOfLines={4}
        textAlignVertical="top"
        style={styles.inputNotes}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Pressable
        style={[styles.saveButton, loading && styles.buttonDisabled]}
        onPress={handleSave}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Save</Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#d2d0d0",
  },
  container: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  topNavContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  navTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#151535",
  },
  button: {
    backgroundColor: "#F59E0B",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 80,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  typeTextInactive: {
    color: "#151535",
    fontSize: 16,
    fontWeight: "600",
  },
  map: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  mapContainer: {
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#151535",
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 8,
    borderRadius: 8,
    padding: 12,
    backgroundColor: "white",
  },
  inputNotes: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 8,
    borderRadius: 8,
    padding: 12,
    backgroundColor: "white",
    height: 120,
  },
  spotNameContainer: {
    marginTop: 20,
  },
  waterType: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  typeButton: {
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "48%",
    height: 50,
  },
  typeButtonActive: {
    backgroundColor: "#F59E0B",
  },
  typeButtonInactive: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  saveButton: {
    backgroundColor: "#F59E0B",
    paddingVertical: 12,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: "60%",
    height: 54,
    marginTop: 20,
  },
  errorText: {
    color: "#DC2626",
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
    fontWeight: "500",
  },
});
