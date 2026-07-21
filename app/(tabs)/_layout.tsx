// ログイン後のタブナビゲーションを定義する画面です。
// `name` に対応するタブ画面を `app/(tabs)` から読み込みます。
import { Tabs } from "expo-router";

// ログイン後に表示されるタブ画面のレイアウトです。
// ここでタブの数やタイトルを定義します。
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
          title: "評価一覧",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="spot"
        options={{
          title: "マップ",
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
