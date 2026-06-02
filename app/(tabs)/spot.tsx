import { useState, useEffect } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {
  collection,
  addDoc,
  getDocs,
} from 'firebase/firestore';

import { db } from '../../firebaseConfig';

export default function SpotScreen() {
  const [shopName, setShopName] = useState('');
  const [comment, setComment] = useState('');
  const [spots, setSpots] = useState<any[]>([]);

  // 投稿取得
  const fetchSpots = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(db, 'spots')
      );

      const tempSpots: any[] = [];

      querySnapshot.forEach((doc) => {
        tempSpots.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setSpots(tempSpots);
    } catch (error) {
      console.log(error);
    }
  };

  // 投稿保存
  const saveSpot = async () => {
    if (!shopName || !comment) {
      alert('入力してください');
      return;
    }

    try {
      await addDoc(collection(db, 'spots'), {
        shopName: shopName,
        comment: comment,
        createdAt: new Date(),
      });

      alert('投稿成功！');

      setShopName('');
      setComment('');

      fetchSpots();
    } catch (error) {
      console.log(error);
    }
  };

  // 初回読み込み
  useEffect(() => {
    fetchSpots();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
      }}
    >
      <Text
        style={{
          fontSize: 30,
          fontWeight: 'bold',
          marginTop: 60,
          marginBottom: 30,
        }}
      >
        スポット共有
      </Text>

      {/* 店名入力 */}
      <TextInput
        placeholder="店名"
        value={shopName}
        onChangeText={setShopName}
        style={{
          backgroundColor: 'white',
          borderRadius: 10,
          padding: 15,
          marginBottom: 15,
        }}
      />

      {/* コメント入力 */}
      <TextInput
        placeholder="コメント"
        value={comment}
        onChangeText={setComment}
        multiline
        style={{
          backgroundColor: 'white',
          borderRadius: 10,
          padding: 15,
          height: 120,
          marginBottom: 20,
        }}
      />

      {/* 投稿ボタン */}
      <TouchableOpacity
        onPress={saveSpot}
        style={{
          backgroundColor: '#4A90E2',
          padding: 15,
          borderRadius: 10,
          alignItems: 'center',
          marginBottom: 30,
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

      {/* 投稿一覧 */}
      <ScrollView>
        {spots.map((spot) => (
          <View
            key={spot.id}
            style={{
              backgroundColor: 'white',
              padding: 15,
              borderRadius: 10,
              marginBottom: 15,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
              }}
            >
              {spot.shopName}
            </Text>

            <Text
              style={{
                marginTop: 8,
                fontSize: 16,
              }}
            >
              {spot.comment}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}