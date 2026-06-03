import { View, Text } from 'react-native';

// バイト情報を表示するためのタブ画面です。
// 現時点では仮のテキストだけを表示し、将来ここに求人一覧などを追加できます。
export default function BaitoScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>バイト画面</Text>
    </View>
  );
}
