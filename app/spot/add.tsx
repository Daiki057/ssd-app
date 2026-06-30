// add.tsx のコード説明: このファイルは React コンポーネントを定義し、アプリの表示と操作を担当します。
import React from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { useRouter } from "expo-router";

export default function AddSpotScreen(){

  const router = useRouter();

  return (

    <View style={styles.container}>

      <Text style={styles.title}>

        情報追加

      </Text>

      <TouchableOpacity

        style={styles.button}

        onPress={()=>{

          router.push("/spot/shopAdd");

        }}

      >

        <Text style={styles.buttonText}>

          店舗情報を投稿

        </Text>

      </TouchableOpacity>

      <TouchableOpacity

        style={styles.button}

        onPress={()=>{

          router.push("/spot/jobAdd");

        }}

      >

        <Text style={styles.buttonText}>

          アルバイト情報を投稿

        </Text>

      </TouchableOpacity>

    </View>

  );

}

const styles = StyleSheet.create({

  container:{

    flex:1,

    justifyContent:"center",

    alignItems:"center",

    padding:20

  },

  title:{

    fontSize:24,

    marginBottom:40

  },

  button:{

    width:"80%",

    padding:18,

    backgroundColor:"#fff",

    borderRadius:15,

    marginBottom:20,

    elevation:3,

    alignItems:"center"

  },

  buttonText:{

    fontSize:18

  }

});