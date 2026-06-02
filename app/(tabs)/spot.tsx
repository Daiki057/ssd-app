import { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {
  collection,
  addDoc,
} from 'firebase/firestore';

import { db } from '../../firebaseConfig';

export default function SpotScreen() {
  const [shopName, setShopName] = useState('');
  const [comment, setComment] = useState('');

  const saveSpot = async () => {
    try {
      await addDoc(collection(db, 'spots'), {
        shopName: shopName,
        comment: comment,
        createdAt: new Date(),
      });

      alert('投稿成功！');

      setShopName('');
      setComment('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: 'bold',
          marginBottom: 30,
        }}
      >
        スポット投稿
      </Text>

      <TextInput
        placeholder="店名"
        value={shopName}
        onChangeText={setShopName}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 12,
          borderRadius: 10,
          marginBottom: 20,
        }}
      />

      <TextInput
        placeholder="コメント"
        value={comment}
        onChangeText={setComment}
        multiline
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 12,
          borderRadius: 10,
          height: 120,
          marginBottom: 20,
        }}
      />

      <TouchableOpacity
        onPress={saveSpot}
        style={{
          backgroundColor: '#4A90E2',
          padding: 15,
          borderRadius: 10,
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            fontWeight: 'bold',
          }}
        >
          投稿
        </Text>
      </TouchableOpacity>
    </View>
  );
}