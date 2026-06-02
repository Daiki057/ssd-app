import { useState, useEffect } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import {
  collection,
  addDoc,
  getDocs,
} from 'firebase/firestore';

import {
  ref,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';

import { db, storage } from '../../firebaseConfig';

export default function SpotScreen() {
  const [shopName, setShopName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [tags, setTags] = useState('');

  const [image, setImage] = useState('');

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

      setSpots(tempSpots.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  // 画像選択
  const pickImage = async () => {
    const result =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes:
          ImagePicker.MediaTypeOptions.Images,
        quality: 0.7,
      });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // 画像アップロード
  const uploadImage = async () => {
    if (!image) return '';

    const response = await fetch(image);

    const blob = await response.blob();

    const filename = `spots/${Date.now()}`;

    const storageRef = ref(storage, filename);

    await uploadBytes(storageRef, blob);

    const downloadURL =
      await getDownloadURL(storageRef);

    return downloadURL;
  };

  // 投稿保存
  const saveSpot = async () => {
    if (!shopName || !comment) {
      alert('入力してください');
      return;
    }

    try {
      let imageUrl = '';

      if (image) {
        imageUrl = await uploadImage();
      }

      await addDoc(collection(db, 'spots'), {
        shopName,
        comment,
        rating,
        tags: tags.split(' '),
        imageUrl,
        createdAt: new Date(),
      });

      alert('投稿成功！');

      setShopName('');
      setComment('');
      setRating(5);
      setTags('');
      setImage('');

      fetchSpots();
    } catch (error) {
      console.log(error);
    }
  };

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

      <ScrollView>
        {/* 店名 */}
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

        {/* コメント */}
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
            marginBottom: 15,
          }}
        />

        {/* タグ */}
        <TextInput
          placeholder="#安い #WiFi #深夜営業"
          value={tags}
          onChangeText={setTags}
          style={{
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 15,
            marginBottom: 20,
          }}
        />

        {/* 星評価 */}
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 20,
          }}
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => setRating(star)}
            >
              <Text
                style={{
                  fontSize: 35,
                  marginRight: 5,
                }}
              >
                {star <= rating ? '★' : '☆'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 画像選択 */}
        <TouchableOpacity
          onPress={pickImage}
          style={{
            backgroundColor: '#999',
            padding: 15,
            borderRadius: 10,
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            画像を選択
          </Text>
        </TouchableOpacity>

        {/* プレビュー */}
        {image ? (
          <Image
            source={{ uri: image }}
            style={{
              width: '100%',
              height: 200,
              borderRadius: 15,
              marginBottom: 20,
            }}
          />
        ) : null}

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
        {spots.map((spot) => (
          <View
            key={spot.id}
            style={{
              backgroundColor: 'white',
              padding: 15,
              borderRadius: 15,
              marginBottom: 20,
            }}
          >
            {spot.imageUrl ? (
              <Image
                source={{ uri: spot.imageUrl }}
                style={{
                  width: '100%',
                  height: 200,
                  borderRadius: 10,
                  marginBottom: 10,
                }}
              />
            ) : null}

            <Text
              style={{
                fontSize: 22,
                fontWeight: 'bold',
              }}
            >
              {spot.shopName}
            </Text>

            <Text
              style={{
                fontSize: 22,
                marginTop: 5,
              }}
            >
              {'★'.repeat(spot.rating || 0)}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginTop: 10,
              }}
            >
              {spot.tags?.map(
                (tag: string, index: number) => (
                  <Text
                    key={index}
                    style={{
                      backgroundColor: '#eee',
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      borderRadius: 20,
                      marginRight: 8,
                      marginBottom: 8,
                    }}
                  >
                    {tag}
                  </Text>
                )
              )}
            </View>

            <Text
              style={{
                marginTop: 10,
                fontSize: 16,
                lineHeight: 24,
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