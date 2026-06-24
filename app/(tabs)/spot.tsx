// スポット投稿画面です。ユーザーが店名・コメント・評価を入力して
// Firestore に投稿を保存し、既存投稿を一覧表示できます。
import { useEffect, useState } from 'react';

import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import {
    addDoc,
    collection,
    getDocs,
} from 'firebase/firestore';

import { db } from '../../firebaseConfig';

// Firestore の `spots` コレクションを使って投稿を取得・保存します。

// 投稿時に選べるスポットの特徴タグです。
// Firestore には選択されたタグだけを配列として保存します。
const TAG_OPTIONS = [
  '安い',
  'WiFi',
  '静か',
  '大盛り',
  '深夜営業',
  '勉強向け',
  'デート向け',
  '一人向け',
];

// 学内外のおすすめスポットを投稿・一覧表示する画面です。
export default function SpotScreen() {
  // 入力フォームの値を管理します。
  const [shopName, setShopName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);

  // 選択中のタグと、Firestore から取得した投稿一覧を管理します。
  const [selectedTags, setSelectedTags] =
    useState<string[]>([]);
  const [spots, setSpots] = useState<any[]>([]);

  // タグを押すたびに、選択済みなら外し、未選択なら追加します。
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(
        selectedTags.filter((t) => t !== tag)
      );
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Firestore の spots コレクションから投稿を取得して画面に反映します。
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

  // 入力内容を Firestore に保存し、保存後にフォームと一覧を更新します。
  const saveSpot = async () => {
    if (!shopName || !comment) {
      alert('店名とコメントを入力してください');
      return;
    }

    try {
      await addDoc(collection(db, 'spots'), {
        shopName,
        comment,
        rating,
        tags: selectedTags,
        createdAt: new Date(),
      });

      alert('投稿しました');

      setShopName('');
      setComment('');
      setRating(5);
      setSelectedTags([]);

      fetchSpots();
    } catch (error) {
      console.log(error);
    }
  };

  // 画面を開いた直後に、既存の投稿を一度読み込みます。
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
      <ScrollView>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            marginTop: 60,
            marginBottom: 30,
          }}
        >
          スポット投稿
        </Text>

        {/* 店名入力欄 */}
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

        {/* コメント入力欄 */}
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

        {/* 評価を 1 から 5 の星で選ぶエリア */}
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

        {/* タグ選択エリア */}
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 10,
          }}
        >
          タグ
        </Text>

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginBottom: 20,
          }}
        >
          {TAG_OPTIONS.map((tag) => {
            const isSelected =
              selectedTags.includes(tag);

            return (
              <TouchableOpacity
                key={tag}
                onPress={() => toggleTag(tag)}
                style={{
                  backgroundColor: isSelected
                    ? '#4A90E2'
                    : '#ddd',

                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  borderRadius: 20,
                  marginRight: 10,
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{
                    color: isSelected
                      ? 'white'
                      : 'black',
                    fontWeight: 'bold',
                  }}
                >
                  {tag}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

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

        {/* Firestore から取得した投稿一覧 */}
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
