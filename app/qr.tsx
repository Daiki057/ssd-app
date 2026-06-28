// qr.tsx のコード説明: このファイルは React コンポーネントを定義し、アプリの表示と操作を担当します。
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";


import {
  router
} from "expo-router";


import QRCode from "react-native-qrcode-svg";


import {
  auth
} from "../firebaseConfig";








export default function QR(){



const uid =
auth.currentUser?.uid;





const qrData = JSON.stringify({

type:"friend",

uid:uid

});







return(



<ScrollView

contentContainerStyle={styles.container}

>




<Text style={styles.title}>

友達追加

</Text>






<View style={styles.qrContainer}>


<QRCode

value={qrData}

size={220}

/>



</View>







<Text style={styles.text}>

このQRを友達に読み取ってもらってください

</Text>







<TouchableOpacity

style={styles.button}

onPress={()=>{


router.push("/qrScanner");


}}

>



<Text style={styles.buttonText}>

+ 友達追加

</Text>



</TouchableOpacity>






</ScrollView>



);


}








const styles=StyleSheet.create({



container:{

flex:1,

alignItems:"center",

paddingTop:60,

backgroundColor:"#fff"

},



title:{

fontSize:30,

fontWeight:"bold",

marginBottom:30

},



qrContainer:{

marginBottom:30

},



text:{

fontSize:16,

textAlign:"center"

},



button:{

marginTop:40,

backgroundColor:"#ff8fa3",

paddingVertical:12,

paddingHorizontal:40,

borderRadius:10

},



buttonText:{

color:"#fff",

fontSize:16,

fontWeight:"bold"

}



});