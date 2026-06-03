import { View, Text } from 'react-native';
import '../../firebaseConfig';

// アプリ起動時に最初に表示されるホーム画面です。
// firebaseConfig を読み込むことで、アプリ開始時に Firebase 接続も初期化されます。
export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: 30 }}>ホーム画面(友達情報の表示)</Text>
    </View>
  );
}