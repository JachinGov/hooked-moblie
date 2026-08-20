import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FAB } from "react-native-paper";

import { Catch, getCatches } from "@/services/catches";

// type Catch = {
//   id: string;
//   species: string;
//   weight: number | null;
//   length: number | null;
//   caught_at: string;
//   notes: string | null;
//   spot_id: string;
//   spot_name: string | null;
// };

export default function Catches() {
  const [catches, setCatches] = useState<Catch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCatches = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getCatches();

      setCatches(data);
    } catch (err: any) {
      console.error("Could not load catches:", err);

      setError(err.message || "Could not load catches.");
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadCatches();
    }, [loadCatches]),
  );

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.backButton}>Season 2026</Text>

        <Text style={styles.back}>Catch Log</Text>

        <CatchesData catches={catches} />

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#186088"
            style={{ marginTop: 30 }}
          />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : catches.length === 0 ? (
          <Text style={styles.emptyText}>
            No catches yet. Add your first catch!
          </Text>
        ) : (
          catches.map((catchItem) => (
            <CatchCard key={catchItem.id} catchItem={catchItem} />
          ))
        )}
      </ScrollView>

      <FAB
        icon="plus"
        color="#FFFFFF"
        style={styles.fab}
        onPress={() => router.push("/spot/addCatch")}
      />
    </View>
  );
}

function CatchesData({ catches }: { catches: Catch[] }) {
  const totalCatches = catches.length;

  const uniqueSpecies = new Set(catches.map((catchItem) => catchItem.species))
    .size;

  const biggestCatch =
    catches.length > 0
      ? Math.max(...catches.map((catchItem) => catchItem.weight || 0))
      : 0;

  return (
    <View style={styles.catchesContainer}>
      <CatchesBox value={String(totalCatches)} label="Catches" />

      <CatchesBox value={String(uniqueSpecies)} label="Species" />

      <CatchesBox
        value={biggestCatch > 0 ? `${biggestCatch}kg` : "--"}
        label="Biggest"
      />
    </View>
  );
}

function CatchesBox({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.catchesDataContainer}>
      <Text style={styles.statValue}>{value}</Text>

      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function CatchCard({ catchItem }: { catchItem: Catch }) {
  const formattedDate = new Date(catchItem.caught_at).toLocaleDateString(
    "en-ZA",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  );

  return (
    <View style={styles.spotContainer}>
      <FontAwesome name="map-o" size={24} color="#186088" />

      <View style={styles.dataContainer}>
        <Text style={styles.speciesText}>{catchItem.species}</Text>

        <Text style={styles.spotText}>
          {catchItem.spot_name || "Unknown spot"}
        </Text>

        <View style={styles.catchInfoRow}>
          {catchItem.weight !== null && (
            <Text style={styles.catchInfoText}>{catchItem.weight}kg</Text>
          )}

          {catchItem.length !== null && (
            <Text style={styles.catchInfoText}>{catchItem.length}cm</Text>
          )}

          <Text style={styles.catchInfoText}>{formattedDate}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#d2d0d0",
  },

  statValue: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#FFFFFF",
  },

  statLabel: {
    color: "#FFFFFF",
    fontSize: 12,
    marginTop: 4,
  },

  speciesText: {
    color: "#186088",
    fontWeight: "bold",
    fontSize: 18,
  },

  spotText: {
    color: "#186088",
    fontSize: 15,
  },

  catchInfoRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  catchInfoText: {
    color: "#636366",
    fontSize: 14,
  },

  errorText: {
    color: "#DC2626",
    textAlign: "center",
    marginTop: 30,
  },

  emptyText: {
    color: "#636366",
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d2d0d0",
  },

  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#186088",
    fontWeight: "600",
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

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  back: {
    fontSize: 25,
    color: "#151535",
    fontWeight: "bold",
  },

  catchesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    minHeight: 85,
    marginBottom: 20,
  },

  catchesDataContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#186088",
    width: "31%",
    minHeight: 80,
    borderRadius: 12,
  },

  spotContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
    minHeight: 120,
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },

  catchIcon: {
    width: 45,
    height: 45,
    borderRadius: 22,
    backgroundColor: "#E2F1F8",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  dataContainer: {
    flex: 1,
  },

  catchDetails: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },

  detailText: {
    color: "#186088",
    fontSize: 14,
    fontWeight: "600",
  },

  dateText: {
    color: "#8A94A6",
    fontSize: 12,
    marginTop: 6,
  },

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
  },

  emptyTitle: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: "bold",
    color: "#151535",
  },

  addFirstCatchButton: {
    marginTop: 20,
    backgroundColor: "#F59E0B",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },

  addFirstCatchText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  fab: {
    position: "absolute",
    right: 20,
    bottom: 58,
    backgroundColor: "#186088",
    borderRadius: 50,
  },
});
