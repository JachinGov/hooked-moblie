import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function AddCatch() {
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <TopNav />
      <ConfigureSpot />
    </ScrollView>
  );
}

function TopNav() {
  return (
    <View style={styles.topNavContainer}>
      <Pressable onPress={() => router.back()} hitSlop={12}>
        <Ionicons name="chevron-back" size={28} color="#1e3a5f" />
      </Pressable>
      <Text style={styles.navTitle}>Add Spot</Text>
      <Pressable style={styles.button} onPress={() => console.log("Saved!")}>
        <Text style={styles.buttonText}>Save</Text>
      </Pressable>
    </View>
  );
}

function CatchImage() {
  return <View></View>;
}

function ConfigureSpot() {
  const [spotName, setSpotName] = useState("");
  const [waterType, setWaterType] = useState("Saltwater");
  const [spotNotes, setSpotNotes] = useState("");

  return (
    <View style={styles.spotNameContainer}>
      <Text style={styles.label}>Spot Name</Text>
      <TextInput
        placeholder="e.g Rocky Bay"
        value={spotName}
        onChangeText={setSpotName}
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

      <Pressable style={styles.saveButton} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Save</Text>
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
});
