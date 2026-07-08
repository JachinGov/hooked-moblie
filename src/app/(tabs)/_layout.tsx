import { Tabs } from "expo-router";
export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="spots" options={{ title: "Spots" }} />
      <Tabs.Screen name="catches" options={{ title: "Catches" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
