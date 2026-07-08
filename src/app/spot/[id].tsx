import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function SpotDetail() {
  const { id } = useLocalSearchParams();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Spot ID: {id}</Text>
    </View>
  );
}
