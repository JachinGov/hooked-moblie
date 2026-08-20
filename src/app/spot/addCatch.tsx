import { createCatch } from "@/services/catches";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { getSpots } from "@/services/spots";

type Spot = {
  id: string;
  name: string;
  water_type?: string;
};

export default function AddCatch() {
  const { spotId, spotName } = useLocalSearchParams<{
    spotId?: string;
    spotName?: string;
  }>();

  const [speciesName, setSpeciesName] = useState("");
  const [speciesWeight, setSpeciesWeight] = useState("");
  const [speciesLength, setSpeciesLength] = useState("");
  const [catchNotes, setCatchNotes] = useState("");

  const [spots, setSpots] = useState<Spot[]>([]);
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);

  const [spotsLoading, setSpotsLoading] = useState(true);
  const [spotModalVisible, setSpotModalVisible] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadSpots();
  }, []);

  async function loadSpots() {
    try {
      setSpotsLoading(true);

      const spotsData = await getSpots();

      setSpots(spotsData);

      // If Add Catch was opened from a specific spot
      if (spotId) {
        const foundSpot = spotsData.find(
          (spot: Spot) => String(spot.id) === String(spotId),
        );

        if (foundSpot) {
          setSelectedSpot(foundSpot);
        }
      }

      // Fallback if only spotName was passed
      else if (spotName) {
        setSelectedSpot({
          id: "",
          name: spotName,
        });
      }
    } catch (err) {
      console.error("Could not load spots:", err);
      setError("Could not load your fishing spots.");
    } finally {
      setSpotsLoading(false);
    }
  }

  function selectSpot(spot: Spot) {
    setSelectedSpot(spot);
    setSpotModalVisible(false);
  }

  async function handleSave() {
    setError("");

    if (!selectedSpot) {
      setError("Please select a fishing spot.");
      return;
    }

    if (!speciesName.trim()) {
      setError("Please enter the species.");
      return;
    }

    setSaving(true);

    try {
      await createCatch({
        spotId: selectedSpot.id,
        species: speciesName.trim(),
        weight: speciesWeight ? Number(speciesWeight) : null,
        length: speciesLength ? Number(speciesLength) : null,
        notes: catchNotes.trim() || null,
      });

      router.back();
    } catch (err: any) {
      console.error("Could not save catch:", err);

      setError(err.message || "Could not save catch.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Top Navigation */}
      <View style={styles.topNavContainer}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="chevron-back" size={28} color="#1e3a5f" />
        </Pressable>

        <Text style={styles.navTitle}>Add Catch</Text>

        <View style={{ width: 60 }} />
      </View>

      {/* Spot Selection */}
      <View style={styles.section}>
        <Text style={styles.label}>Fishing Spot</Text>

        {spotsLoading ? (
          <View style={styles.loadingSpot}>
            <ActivityIndicator color="#186088" />
            <Text style={styles.loadingSpotText}>Loading spots...</Text>
          </View>
        ) : (
          <Pressable
            style={styles.spotSelector}
            onPress={() => setSpotModalVisible(true)}
          >
            <View style={styles.spotSelectorLeft}>
              <View style={styles.locationIcon}>
                <Ionicons name="location" size={20} color="#FFFFFF" />
              </View>

              <View>
                <Text style={styles.selectedSpotLabel}>
                  {selectedSpot ? "Selected spot" : "Choose a spot"}
                </Text>

                <Text style={styles.selectedSpotName}>
                  {selectedSpot
                    ? selectedSpot.name
                    : "Tap to select your fishing spot"}
                </Text>
              </View>
            </View>

            <Ionicons name="chevron-down" size={22} color="#186088" />
          </Pressable>
        )}
      </View>

      {/* Catch Details */}
      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Catch Details</Text>

        <Text style={styles.label}>Species *</Text>
        <TextInput
          placeholder="e.g. Black Tail"
          value={speciesName}
          onChangeText={setSpeciesName}
          style={styles.input}
        />

        <Text style={styles.label}>Weight (KG)</Text>
        <TextInput
          placeholder="e.g. 1.2"
          value={speciesWeight}
          onChangeText={setSpeciesWeight}
          keyboardType="decimal-pad"
          style={styles.input}
        />

        <Text style={styles.label}>Length (CM)</Text>
        <TextInput
          placeholder="e.g. 28"
          value={speciesLength}
          onChangeText={setSpeciesLength}
          keyboardType="decimal-pad"
          style={styles.input}
        />

        <Text style={styles.label}>Notes (Optional)</Text>
        <TextInput
          placeholder="Tell us about the catch..."
          value={catchNotes}
          onChangeText={setCatchNotes}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          style={styles.inputNotes}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Pressable
          style={[styles.saveButton, saving && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Save Catch</Text>
          )}
        </Pressable>
      </View>

      {/* Spot Selection Modal */}
      <Modal
        visible={spotModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setSpotModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Fishing Spot</Text>

              <Pressable
                onPress={() => setSpotModalVisible(false)}
                hitSlop={12}
              >
                <Ionicons name="close" size={26} color="#151535" />
              </Pressable>
            </View>

            <ScrollView>
              {spots.length === 0 ? (
                <Text style={styles.emptyText}>
                  You haven't added any fishing spots yet.
                </Text>
              ) : (
                spots.map((spot) => (
                  <Pressable
                    key={spot.id}
                    style={[
                      styles.spotOption,
                      selectedSpot?.id === spot.id && styles.spotOptionSelected,
                    ]}
                    onPress={() => selectSpot(spot)}
                  >
                    <View style={styles.spotOptionLeft}>
                      <Ionicons
                        name="location-outline"
                        size={22}
                        color="#186088"
                      />

                      <View>
                        <Text style={styles.spotOptionName}>{spot.name}</Text>

                        {spot.water_type ? (
                          <Text style={styles.spotOptionType}>
                            {spot.water_type}
                          </Text>
                        ) : null}
                      </View>
                    </View>

                    {selectedSpot?.id === spot.id ? (
                      <Ionicons
                        name="checkmark-circle"
                        size={24}
                        color="#22C55E"
                      />
                    ) : null}
                  </Pressable>
                ))
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </ScrollView>
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
    marginBottom: 25,
  },

  navTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#151535",
  },

  section: {
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#151535",
    marginBottom: 10,
  },

  formContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#151535",
    marginTop: 10,
    marginBottom: 6,
  },

  spotSelector: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  spotSelectorLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  locationIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#186088",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  selectedSpotLabel: {
    fontSize: 12,
    color: "#636366",
    marginBottom: 2,
  },

  selectedSpotName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#151535",
  },

  loadingSpot: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  loadingSpotText: {
    color: "#636366",
  },

  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#FFFFFF",
    fontSize: 15,
  },

  inputNotes: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#FFFFFF",
    height: 120,
    fontSize: 15,
  },

  errorText: {
    color: "#DC2626",
    marginTop: 15,
    textAlign: "center",
  },

  saveButton: {
    backgroundColor: "#F59E0B",
    paddingVertical: 14,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    minHeight: 52,
  },

  saveButtonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },

  modalContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: "70%",
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#151535",
  },

  spotOption: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  spotOptionSelected: {
    backgroundColor: "#F0F9FF",
  },

  spotOptionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  spotOptionName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#151535",
  },

  spotOptionType: {
    fontSize: 13,
    color: "#636366",
    marginTop: 3,
  },

  emptyText: {
    textAlign: "center",
    color: "#636366",
    paddingVertical: 30,
  },
});
