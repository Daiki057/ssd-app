// プロフィール画面です。
// ユーザー情報を表示・編集するための場所として用意しています。
import { View, Text } from 'react-native';

// ユーザー情報を表示・編集するためのプロフィール画面です。
// 現時点では画面の置き場所を作るため、仮のテキストを表示しています。
export default function ProfileScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>プロフィール画面</Text>
    </View>
  );
}
