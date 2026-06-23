import { Tabs } from 'expo-router';

// app/(tabs) 配下の画面を下部タブとしてまとめるレイアウトです。
// name はファイル名と対応し、title はタブやヘッダーに表示される名前です。
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
