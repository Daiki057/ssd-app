import { View, Text, TouchableOpacity } from 'react-native';

export default function App() {
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
        style={{
          backgroundColor: '#4A90E2',
          padding: 15,
          borderRadius: 10,
          marginBottom: 20,
          width: 220,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontSize: 18 }}>
          スポット共有
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: '#50C878',
          padding: 15,
          borderRadius: 10,
          width: 220,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontSize: 18 }}>
          バイト共有
        </Text>
      </TouchableOpacity>
    </View>
  );
}