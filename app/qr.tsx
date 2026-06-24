// qr.tsx のコード説明: このファイルは React コンポーネントを定義し、アプリの表示と操作を担当します。
import {
  View,
  Text,
  StyleSheet
} from "react-native";

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

    <View
      style={styles.container}
    >

      <Text
        style={styles.title}
      >
        友達追加
      </Text>


      <QRCode
        value={uid}
        size={220}
      />


      <Text
        style={styles.text}
      >
        このQRを友達に読み取ってもらってください
      </Text>


    </View>

  );

}



const styles = StyleSheet.create({

  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },


  title:{
    fontSize:30,
    fontWeight:"bold",
    marginBottom:40
  },


  text:{
    marginTop:30,
    fontSize:16
  }

});