// qr.tsx のコード説明: このファイルは React コンポーネントを定義し、アプリの表示と操作を担当します。
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import { router } from "expo-router";

import QRCode from "react-native-qrcode-svg";

import {
    auth
} from "../firebaseConfig";


export default function QR(){

  const uid =
    auth.currentUser?.uid
    ??
    "guest";


  return(

    <ScrollView contentContainerStyle={styles.container}>

      <Text
        style={styles.title}
      >
        友達追加
      </Text>


      <View style={styles.qrContainer}>
        <QRCode
          value={uid}
          size={220}
        />
      </View>

      <Text
        style={styles.text}
      >
        このQRを友達に読み取ってもらってください
      </Text>

      <TouchableOpacity
        onPress={() => {
          router.push("/qrScanner");
        }}
        style={styles.addFriendButton}
      >
        <Text style={styles.addFriendText}>
          + 友達追加
        </Text>
      </TouchableOpacity>

    </ScrollView>

  );

}



const styles = StyleSheet.create({

  container:{
    flex:1,
    justifyContent:"flex-start",
    alignItems:"center",
    paddingTop: 60,
    paddingHorizontal: 24,
    backgroundColor: "#fff",
  },


  title:{
    fontSize:30,
    fontWeight:"bold",
    marginBottom:24,
  },


  qrContainer: {
    marginBottom: 24,
    width: "100%",
    alignItems: "center",
  },

  text:{
    marginTop:20,
    fontSize:16,
    textAlign: "center",
  },

  addFriendButton: {
    marginTop: 40,
    width: 200,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#ff8fa3",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#cc6f7d",
  },

  addFriendText: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "600",
  }

});