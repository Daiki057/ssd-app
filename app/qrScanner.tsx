// qrScanner.tsx のコード説明: このファイルは React コンポーネントを定義し、アプリの表示と操作を担当します。
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  View
} from "react-native";


import {
  CameraView,
  useCameraPermissions
} from "expo-camera";


export default function QRScanner(){

  const [
    permission,
    requestPermission
  ] = useCameraPermissions();

  const addFriend = (data:string) => {
    Alert.alert(
      "友達追加",
      `QR を読み取りました: ${data}`
    );
  };



  if(!permission){

    return <View />;

  }



  if(!permission.granted){

    return(

      <View
        style={styles.container}
      >

        <Text>
          カメラ権限が必要です
        </Text>


        <Button
          title="許可する"
          onPress={requestPermission}
        />

      </View>

    );

  }



  return(

    <View
      style={styles.container}
    >

      <CameraView
        style={styles.camera}
        facing="back"
        onBarcodeScanned={({data})=>{

          addFriend(data)

        }}
        barcodeScannerSettings={{
          barcodeTypes:[
            "qr"
          ]
        }}
      />


      <Text
        style={styles.text}
      >
        QRを読み取ってください
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


camera:{
 width:"100%",
 height:"80%"
},


text:{
 fontSize:20,
 marginTop:20
}

});