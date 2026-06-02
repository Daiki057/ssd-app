import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'ホーム',
        }}
      />

      <Tabs.Screen
        name="spot"
        options={{
          title: 'スポット',
        }}
      />

      <Tabs.Screen
        name="baito"
        options={{
          title: 'バイト',
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'プロフィール',
        }}
      />
    </Tabs>
  );
}