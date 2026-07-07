// shopAdd.tsx のコード説明: このファイルは React コンポーネントを定義し、アプリの表示と操作を担当します。
import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import {
  useLocalSearchParams,
  useRouter,
} from "expo-router";

import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import {
  getAuth,
} from "firebase/auth";

import { db } from "../../firebaseConfig";

export default function ShopAdd() {

  const router = useRouter();

  const auth = getAuth();

  const { latitude, longitude } =
    useLocalSearchParams<{
      latitude: string;
      longitude: string;
    }>();

  const [name, setName] = useState("");

  const [category, setCategory] = useState("");

  const [description, setDescription] =
    useState("");

  const saveSpot = async () => {

    if (!name.trim()) {

      Alert.alert(
        "店舗名を入力してください"
      );

      return;

    }

    try {

      await addDoc(

        collection(db, "spots"),

        {

          name,

          category,

          description,

          latitude: Number(latitude),

          longitude: Number(longitude),

          createdBy: auth.currentUser?.uid,

          createdAt: serverTimestamp(),

        }

      );

      Alert.alert(
        "投稿しました"
      );

      router.back();

    }

    catch (e) {

      console.log(e);

      Alert.alert(
        "保存に失敗しました"
      );

    }

  };

  return (

    <View style={styles.container}>

      <Text style={styles.title}>

        店舗情報投稿

      </Text>

      <TextInput

        placeholder="店舗名"

        style={styles.input}

        value={name}

        onChangeText={setName}

      />

      <TextInput

        placeholder="カテゴリ"

        style={styles.input}

        value={category}

        onChangeText={setCategory}

      />

      <TextInput

        placeholder="説明"

        style={[
          styles.input,
          { height: 120 }
        ]}

        multiline

        value={description}

        onChangeText={setDescription}

      />

      <Text>

        緯度：{latitude}

      </Text>

      <Text>

        経度：{longitude}

      </Text>

      <TouchableOpacity

        style={styles.button}

        onPress={saveSpot}

      >

        <Text style={styles.buttonText}>

          投稿する

        </Text>

      </TouchableOpacity>

    </View>

  );

}

const styles = StyleSheet.create({

  container:{

    flex:1,

    padding:20,

    backgroundColor:"#fff",

  },

  title:{

    fontSize:24,

    fontWeight:"bold",

    marginBottom:30,

  },

  input:{

    borderWidth:1,

    borderColor:"#ccc",

    borderRadius:10,

    padding:12,

    marginBottom:15,

  },

  button:{

    marginTop:30,

    backgroundColor:"#4CAF50",

    padding:15,

    borderRadius:10,

    alignItems:"center",

  },

  buttonText:{

    color:"#fff",

    fontSize:18,

    fontWeight:"bold",

  },

});