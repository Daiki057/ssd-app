import { View, Text } from 'react-native';
import '../firebaseConfig';

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: 30 }}>
        SSD Campus
      </Text>
    </View>
  );
}