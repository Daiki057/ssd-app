import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Text
        style={{
          fontSize: 30,
          fontWeight: 'bold',
          marginBottom: 40,
        }}
      >
        SSD Campus
      </Text>

      <TouchableOpacity
        onPress={() => router.push('./spot')}
        style={{
          backgroundColor: '#4A90E2',
          padding: 15,
          borderRadius: 10,
          width: 220,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontSize: 18 }}>
          スポット共有
        </Text>
      </TouchableOpacity>
    </View>
  );
}