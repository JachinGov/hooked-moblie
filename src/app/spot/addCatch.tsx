import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
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
      <CatchImage />
      <CatchSpot />
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
      <Text style={styles.navTitle}>Add Catch</Text>
      <Pressable style={styles.button} onPress={() => console.log("Saved!")}>
        <Text style={styles.buttonText}>Save</Text>
      </Pressable>
    </View>
  );
}

function CatchImage() {
  return (
    <View>
      <Image
        source={require("@/assets/images/Hooked.png")}
        style={styles.headerImage}
        resizeMode="cover"
      />
    </View>
  );
}

function CatchSpot() {
  return (
    <View style={styles.spotLocationContainer}>
      <Ionicons name="location" size={24} color="#FFFFFF" />
      <View style={{ marginStart: 10 }}>
        <Text style={{ color: "#FFFFFF", fontSize: 14 }}>
          Auto-filled from Rocky Bay
        </Text>
        <Text style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 18 }}>
          Good Conditions
        </Text>
      </View>
    </View>
  );
}

function ConfigureSpot() {
  const [speciesName, setSpeciesName] = useState("");
  const [speciesWeight, setSpeciesWeight] = useState("");
  const [speciesLength, setSpeciesLength] = useState("");
  const [spotNotes, setSpotNotes] = useState("");

  return (
    <View style={styles.speciesNameContainer}>
      <Text style={styles.label}>Species</Text>
      <TextInput
        placeholder="e.g Black Tail"
        value={speciesName}
        onChangeText={setSpeciesName}
        style={styles.input}
      />

      <Text style={styles.label}>Weight (KG)</Text>
      <TextInput
        placeholder="e.g 4.2"
        value={speciesWeight}
        onChangeText={setSpeciesWeight}
        style={styles.input}
      />

      <Text style={styles.label}>length (CM)</Text>
      <TextInput
        placeholder="e.g 20"
        value={speciesLength}
        onChangeText={setSpeciesLength}
        style={styles.input}
      />

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
  spotLocationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#186088",
    width: "100%",
    minHeight: 70,
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
  },
  headerImage: {
    width: "100%",
    height: 200,
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
  speciesNameContainer: {
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
