import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { FAB } from "react-native-paper";

export default function Catches() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.backButton}>Season 2026</Text>
      <Text style={styles.back}>Catch Log</Text>
      <CatchesData />
      <CatchCard />
      <FAB
        icon="plus"
        color="#FFFFFF"
        style={styles.fab}
        onPress={() => router.push("/spot/addCatch")}
      />
    </ScrollView>
  );
}

function CatchesData() {
  return (
    <View style={styles.catchesContainer}>
      <CatchesBox />
      <CatchesBox />
      <CatchesBox />
    </View>
  );
}

function CatchesBox() {
  return (
    <View style={styles.catchesDataContainer}>
      <Text style={{ fontWeight: "bold", fontSize: 20 }}>28</Text>
      <Text>Catches</Text>
    </View>
  );
}

function CatchCard() {
  return (
    <View style={styles.spotContainer}>
      <FontAwesome name="map-o" size={24} color="#186088" />
      <CatchData />
    </View>
  );
}

function CatchData() {
  return (
    <View style={styles.dataContainer}>
      <Text style={{ color: "#186088", fontWeight: "bold", fontSize: 18 }}>
        Black tail
      </Text>
      <Text style={{ color: "#186088", fontSize: 18 }}>
        Rocky Bay, Park Rynie, KZN
      </Text>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <Text style={{ color: "#186088", fontSize: 18 }}>1.2kg</Text>
        <Text style={{ color: "#186088", fontSize: 18 }}>28cm</Text>
        <Text style={{ color: "#186088", fontSize: 18 }}>28 July 2026</Text>
      </View>
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
  catchesContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    width: "100%",
    minHeight: 70,
    marginBottom: 20,
  },
  catchesDataContainer: {
    alignItems: "center",
    padding: 15,
    backgroundColor: "#186088",
    width: "30%",
    minHeight: 70,
    borderRadius: 12,
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
