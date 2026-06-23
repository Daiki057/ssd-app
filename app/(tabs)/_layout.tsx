import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "ホーム",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="baito"
        options={{
          title: "バイト",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="spot"
        options={{
          title: "スポット",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "プロフィール",
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
