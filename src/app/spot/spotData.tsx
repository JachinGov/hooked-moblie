import { getConditions } from "@/services/conditions";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

// --- ConditionsCard Helpers & Types ---
type ConditionsCardProps = {
  score: number;
  reasons: string[];
};

function ConditionsCard({ score, reasons }: ConditionsCardProps) {
  const color = score >= 70 ? "#22C55E" : score >= 40 ? "#F59E0B" : "#EF4444";

  const label = score >= 70 ? "Good" : score >= 40 ? "Fair" : "Poor";

  const title =
    score >= 70
      ? "Excellent fishing conditions"
      : score >= 40
        ? "Fair fishing conditions"
        : "Difficult fishing conditions";

  return (
    <View style={styles.conditionsCard}>
      <Text style={styles.sectionHeader}>Fishing Conditions</Text>

      {/* SCORE */}
      <View style={styles.scoreRow}>
        <View
          style={[
            styles.scoreCircle,
            {
              borderColor: color,
            },
          ]}
        >
          <Text
            style={[
              styles.scoreNumber,
              {
                color,
              },
            ]}
          >
            {score}
          </Text>

          <Text
            style={[
              styles.scoreMax,
              {
                color,
              },
            ]}
          >
            {label}
          </Text>
        </View>

        <View style={styles.scoreInfo}>
          <Text style={styles.scoreTitle}>{title}</Text>

          <Text style={styles.scoreSubtitle}>
            Based on the current weather, pressure, moon and water conditions.
          </Text>
        </View>
      </View>

      {/* REASONS */}
      <View style={styles.reasonsContainer}>
        <Text style={styles.reasonsTitle}>Why this score?</Text>

        {reasons && reasons.length > 0 ? (
          reasons.map((reason, index) => (
            <View key={`${reason}-${index}`} style={styles.reasonRow}>
              <View style={styles.reasonIcon}>
                <Ionicons name="checkmark" size={14} color="#FFFFFF" />
              </View>

              <Text style={styles.reasonText}>{reason}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noReasons}>No scoring reasons available.</Text>
        )}
      </View>
    </View>
  );
}

type WeatherCardProps = {
  weather: {
    airTemperature: number;
    pressure: number;
    windSpeed: number;
    windDirection: number;
    cloudCover: number;
  };
};

function WeatherCard({ weather }: WeatherCardProps) {
  return (
    <View style={styles.weatherCard}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.cardHeading}>Current Weather</Text>
          <Text style={styles.cardSubheading}>
            Current conditions at this spot
          </Text>
        </View>

        <Ionicons name="partly-sunny-outline" size={30} color="#186088" />
      </View>

      {/* Main temperature */}
      <View style={styles.temperatureRow}>
        <Text style={styles.temperature}>
          {Math.round(weather.airTemperature)}°
        </Text>

        <View>
          <Text style={styles.temperatureLabel}>Air temperature</Text>

          <Text style={styles.weatherDescription}>
            {weather.cloudCover >= 80
              ? "Overcast"
              : weather.cloudCover >= 40
                ? "Partly cloudy"
                : "Clear skies"}
          </Text>
        </View>
      </View>

      {/* Weather stats */}
      <View style={styles.weatherGrid}>
        <WeatherStat
          icon="speedometer-outline"
          label="Pressure"
          value={`${weather.pressure} hPa`}
        />

        <WeatherStat
          icon="navigate-outline"
          label="Wind"
          value={`${weather.windSpeed} km/h`}
        />

        <WeatherStat
          icon="compass-outline"
          label="Direction"
          value={`${Math.round(weather.windDirection)}°`}
        />

        <WeatherStat
          icon="cloud-outline"
          label="Cloud cover"
          value={`${Math.round(weather.cloudCover)}%`}
        />
      </View>
    </View>
  );
}

function WeatherStat({
  icon,
  label,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.weatherStat}>
      <Ionicons name={icon} size={22} color="#186088" />

      <View style={{ marginLeft: 10 }}>
        <Text style={styles.statLabel}>{label}</Text>

        <Text style={styles.statValue}>{value}</Text>
      </View>
    </View>
  );
}

type MoonCardProps = {
  moon: {
    illumination: number;
    phase: string;
    rise: string;
    set: string;
  };
};

function MoonCard({ moon }: MoonCardProps) {
  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <View style={styles.moonCard}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.cardHeading}>Moon</Text>

          <Text style={styles.cardSubheading}>Lunar conditions</Text>
        </View>

        <Text style={styles.moonEmoji}>🌙</Text>
      </View>

      <View style={styles.moonMain}>
        <View style={styles.moonCircle}>
          <Text style={styles.moonPercent}>{moon.illumination}%</Text>
        </View>

        <View style={{ marginLeft: 18 }}>
          <Text style={styles.moonPhase}>{moon.phase}</Text>

          <Text style={styles.moonDescription}>Moon illumination</Text>
        </View>
      </View>

      <View style={styles.moonTimes}>
        <View>
          <Text style={styles.statLabel}>Moonrise</Text>

          <Text style={styles.statValue}>{formatTime(moon.rise)}</Text>
        </View>

        <View>
          <Text style={styles.statLabel}>Moonset</Text>

          <Text style={styles.statValue}>{formatTime(moon.set)}</Text>
        </View>
      </View>
    </View>
  );
}

type TideCardProps = {
  tideState?: string;
};

function TideCard({ tideState }: TideCardProps) {
  const isUnknown = !tideState || tideState === "unknown";

  return (
    <View style={styles.tideCard}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.cardHeading}>Tides</Text>

          <Text style={styles.cardSubheading}>Tidal conditions</Text>
        </View>

        <Ionicons name="water-outline" size={30} color="#186088" />
      </View>

      {isUnknown ? (
        <View style={styles.tideUnavailable}>
          <Ionicons
            name="information-circle-outline"
            size={24}
            color="#6B7280"
          />

          <Text style={styles.tideUnavailableText}>
            Tide information is currently unavailable.
          </Text>
        </View>
      ) : (
        <View style={styles.tideMain}>
          <Text style={styles.tideState}>{tideState}</Text>

          <Text style={styles.tideDescription}>Current tidal movement</Text>
        </View>
      )}
    </View>
  );
}

// --- Main Component ---
export default function Spots() {
  const [conditions, setConditions] = useState<any>(null);

  useEffect(() => {
    loadConditions();
  }, []);

  async function loadConditions() {
    try {
      const data = await getConditions("7");

      console.log("Conditions:", data);

      setConditions(data);
    } catch (error) {
      console.error("Could not fetch conditions:", error);
    }
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground
        source={require("@/assets/images/Hooked.png")}
        resizeMode="cover"
        style={styles.imageBackground}
      >
        <Pressable
          onPress={() => router.back()}
          hitSlop={12}
          style={{ paddingTop: 50, paddingLeft: 20 }}
        >
          <Ionicons name="chevron-back" size={28} color="#1e3a5f" />
        </Pressable>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 20,
            paddingBottom: 50, // Extra padding at bottom so text stays clear of the floating card
            alignItems: "flex-end",
          }}
        >
          <View>
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Park Rynie, KZN
            </Text>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
              Rocky Bay Beach
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "grey",
              height: 30,
              alignItems: "center",
              justifyContent: "center",
              width: 80,
              borderRadius: 20,
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Saltwater
            </Text>
          </View>
        </View>
      </ImageBackground>

      {/* ConditionsCard overlapping the image */}
      {conditions && (
        <>
          <ConditionsCard
            score={conditions.score}
            reasons={conditions.reasons}
          />

          <WeatherCard weather={conditions.weather} />

          <MoonCard moon={conditions.moon} />

          <TideCard tideState={conditions.tideState} />
        </>
      )}

      <Stats />
    </ScrollView>
  );
}

// --- Stats Helpers & Components ---
interface StatBlockProps {
  value: string | number;
  label: string;
}

function Stats() {
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 20,
        }}
      >
        <StatBlock value={24} label="Total Catches" />
        <StatBlock value="Rocky Bay" label="Favorite Spot" />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 20,
        }}
      >
        <StatBlock value={91} label="Best Score" />
        <StatBlock value={8} label="Species Caught" />
      </View>
    </>
  );
}

function StatBlock({ value, label }: StatBlockProps) {
  return (
    <View style={styles.statContainer}>
      <Text style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 18 }}>
        {value}
      </Text>
      <Text style={{ color: "#FFFFFF", fontSize: 12 }}>{label}</Text>
    </View>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 100,
    backgroundColor: "#d2d0d0",
  },
  imageBackground: {
    height: 250, // Added explicit height so the background displays correctly in ScrollView
  },
  scoreCircle: {
    width: 95,
    height: 95,
    borderRadius: 48,
    borderWidth: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  scoreNumber: {
    fontSize: 28,
    fontWeight: "800",
  },
  // ConditionsCard styles (with -40 negative margin to pull card over hero image)
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginTop: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  scoreLabel: {
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  textBlock: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0D2B45",
    marginBottom: 4,
  },
  explanation: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },
  statContainer: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    backgroundColor: "#186088",
    width: "45%",
    minHeight: 80,
    borderRadius: 12,
  },
  // new styles
  conditionsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 20,
    marginHorizontal: 16,
    marginTop: 20,
  },

  scoreRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
  },

  scoreInfo: {
    flex: 1,
    marginLeft: 16,
  },

  scoreTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0D2B45",
  },

  scoreSubtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 5,
    lineHeight: 18,
  },

  reasonsContainer: {
    marginTop: 22,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingTop: 16,
  },

  reasonsTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0D2B45",
    marginBottom: 10,
  },

  reasonRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 9,
  },

  reasonIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#22C55E",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  reasonText: {
    fontSize: 14,
    color: "#374151",
  },

  noReasons: {
    fontSize: 14,
    color: "#9CA3AF",
  },

  weatherCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 20,
    marginHorizontal: 16,
    marginTop: 16,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cardHeading: {
    fontSize: 19,
    fontWeight: "700",
    color: "#0D2B45",
  },

  cardSubheading: {
    fontSize: 13,
    color: "#8A94A6",
    marginTop: 3,
  },

  temperatureRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },

  temperature: {
    fontSize: 54,
    fontWeight: "300",
    color: "#0D2B45",
    marginRight: 15,
  },

  temperatureLabel: {
    fontSize: 13,
    color: "#6B7280",
  },

  weatherDescription: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0D2B45",
    marginTop: 3,
  },

  weatherGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingTop: 15,
  },

  weatherStat: {
    width: "50%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  statLabel: {
    fontSize: 11,
    color: "#8A94A6",
  },

  statValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0D2B45",
    marginTop: 2,
  },

  moonCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 20,
    marginHorizontal: 16,
    marginTop: 16,
  },

  moonEmoji: {
    fontSize: 30,
  },

  moonMain: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },

  moonCircle: {
    width: 75,
    height: 75,
    borderRadius: 38,
    backgroundColor: "#E8EDF2",
    alignItems: "center",
    justifyContent: "center",
  },

  moonPercent: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0D2B45",
  },

  moonPhase: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0D2B45",
  },

  moonDescription: {
    fontSize: 13,
    color: "#8A94A6",
    marginTop: 4,
  },

  moonTimes: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },

  tideCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 20,
    marginHorizontal: 16,
    marginTop: 16,
  },

  tideUnavailable: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    padding: 15,
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
  },

  tideUnavailableText: {
    flex: 1,
    marginLeft: 10,
    color: "#6B7280",
    fontSize: 13,
  },

  tideMain: {
    marginTop: 20,
  },

  tideState: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0D2B45",
  },

  tideDescription: {
    color: "#8A94A6",
    marginTop: 4,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "700",
    color: "#151535",
    marginBottom: 16,
  },
  scoreMax: {
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
  },
});
