// タブ画面のホームです。
// プロフィールとお気に入りの友達一覧を表示します。
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  router
} from "expo-router";

import {
  useEffect,
  useState
} from "react";

import {
  doc,
  onSnapshot,
  getDoc
} from "firebase/firestore";

import {
  auth,
  db
} from "../../firebaseConfig";





const facultyMap:any = {

  "企業情報学部":"J",

  "環境ツーリズム学部":"T",

  "社会福祉学部":"F",

  "地域経営学部":"C",

  "共創情報学部":"K"

};





export default function Home(){



const [profile,setProfile]
=
useState<any>(null);



const [friends,setFriends]
=
useState<any[]>([]);





useEffect(()=>{


const uid =
auth.currentUser?.uid;



if(!uid)
return;





const userRef =
doc(
db,
"users",
uid
);




// 自分プロフィール監視

const unsubscribe =

onSnapshot(

userRef,

async(snapshot)=>{


if(!snapshot.exists())
return;



const data =
snapshot.data();



setProfile(data);





const friendIds =
data.friends ?? [];



const friendData:any[] = [];




for(
const id of friendIds
){



const friendSnap =

await getDoc(

doc(
db,
"users",
id
)

);



if(friendSnap.exists()){


friendData.push({

uid:id,

...friendSnap.data()


});


}



}



setFriends(friendData);



}


);





return ()=>unsubscribe();



},[]);









if(!profile){


return(

<View style={styles.loading}>

<Text>

読み込み中...

</Text>

</View>

);


}







return(


<ScrollView

style={styles.container}

contentContainerStyle={{
flexGrow:1
}}

>



{/* プロフィール */}

<View style={styles.profileContainer}>


<View style={styles.profileContent}>



<View style={styles.leftColumn}>


<TouchableOpacity

onPress={()=>{

router.push("/qr");

}}

>


<Image

source={{

uri:
"https://i.pravatar.cc/300?img=5"

}}

style={styles.myIcon}

/>


</TouchableOpacity>



</View>







<View style={styles.rightColumn}>


<Text style={styles.mbti}>

{profile.mbti}

</Text>



<Text style={styles.info}>

誕生日 {profile.birthDate}

</Text>



<Text style={styles.info}>

{profile.faculty}

</Text>



<Text style={styles.info}>

サークル:{profile.circle}

</Text>



<Text style={styles.info}>

講義:{profile.courses}

</Text>



</View>



</View>






<View style={styles.nameArea}>


<Text style={styles.name}>

{profile.name}

</Text>



<Text style={styles.studentId}>

{profile.studentId}

</Text>



</View>



</View>








{/* 友達一覧 */}

<View style={styles.friendContainer}>


<View style={styles.friendHeader}>


<Text style={styles.friendTitle}>

友達一覧▼

</Text>



<Text style={styles.friendCount}>

{friends.length}人

</Text>

</View>





{

friends.map(

(friend)=>{


const course =

friend.courses

?.split(",")[0]

??

"講義未登録";



return(


<View

key={friend.uid}

style={styles.friendRow}

>



<Image

source={{

uri:

"https://i.pravatar.cc/100?img=12"

}}

style={styles.friendIcon}

/>





<Text style={styles.friendName}>

{friend.name}

</Text>




<Text style={styles.facultyBadge}>

{facultyMap[friend.faculty]}

</Text>





<Text style={styles.course}>

：{course}

</Text>





</View>


);



}


)

}





</View>





</ScrollView>


);


}









const styles = StyleSheet.create({



container:{

flex:1,

backgroundColor:"#ffd6dc"

},



loading:{

flex:1,

justifyContent:"center",

alignItems:"center"

},






// ===== プロフィール =====



profileContainer:{

flex:1,

},



profileContent:{

flex:9,

flexDirection:"row",

alignItems:"center",

justifyContent:"space-between",

paddingHorizontal:10,

},



leftColumn:{

flex:1,

alignItems:"flex-start",

},



rightColumn:{

flex:1,

alignItems:"flex-end",

paddingRight:15,

},



myIcon:{

width:160,

height:160,

borderRadius:80

},



mbti:{

fontSize:25,

},



info:{

fontSize:18,

marginTop:10,

},



nameArea:{

alignItems:"center",

flexDirection:"row",

justifyContent:"center",

gap:10

},



name:{

fontSize:26,

fontWeight:"bold"

},



studentId:{

fontSize:16,

color:"#555"

},







// ===== 友達一覧 =====



friendContainer:{

flex:2,

paddingHorizontal:10

},



friendHeader:{

flexDirection:"row",

justifyContent:"space-between",

alignItems:"center",

marginBottom:15

},



friendTitle:{

fontSize:22,

marginLeft:20

},



friendCount:{

fontSize:18,

marginRight:20

},





friendRow:{

flexDirection:"row",

alignItems:"center",

marginBottom:18,

paddingHorizontal:20

},



friendIcon:{

width:55,

height:55,

borderRadius:30

},



friendName:{

fontSize:18,

marginLeft:20,

width:100

},



facultyBadge:{

fontSize:18,

marginLeft:5

},



course:{

fontSize:16,

marginLeft:5

},



});
