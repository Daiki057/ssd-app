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
  onSnapshot
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





const avatarImages:any = {
icon1:
require("../../assets/icons/icon1.png"),
icon2:
require("../../assets/icons/icon2.png"),
icon3:
require("../../assets/icons/icon3.png"),
icon4:
require("../../assets/icons/icon4.png"),
icon5:
require("../../assets/icons/icon5.png"),
icon6:
require("../../assets/icons/icon6.png")
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





const unsubscribeUser =

onSnapshot(

userRef,

(snapshot)=>{


if(!snapshot.exists())
return;



const data =
snapshot.data();



setProfile(data);





const friendIds =
data.friends ?? [];





const unsubscribeFriends:any[]=[];





friendIds.forEach(

(friendId:string)=>{



const friendRef =
doc(
db,
"users",
friendId
);





const unsubscribeFriend =

onSnapshot(

friendRef,

(friendSnap)=>{


if(!friendSnap.exists())
return;




const friendData = {

uid:friendId,

...friendSnap.data()

};





setFriends(prev=>{


return [

...prev.filter(

(f)=>

f.uid !== friendId

),

friendData

];


});



}

);



unsubscribeFriends.push(

unsubscribeFriend

);



}



);





return()=>{


unsubscribeFriends.forEach(

(unsub)=>unsub()

);


};



}

);





return()=>{


unsubscribeUser();


};



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





{/* 自分プロフィール */}



<View style={styles.profileContainer}>


<View style={styles.profileContent}>


<View style={styles.iconArea}>


<TouchableOpacity

onPress={()=>{

router.push("/qr");

}}

>


<Image

source={

avatarImages[profile.avatar]

??

avatarImages.icon1

}

style={styles.myIcon}

/>



</TouchableOpacity>



</View>







<View style={styles.infoArea}>


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

?

friend.courses.split(",")[0]

:

"講義未登録";





return(


<View

key={friend.uid}

style={styles.friendRow}

>





<Image

source={

avatarImages[friend.avatar]

??

avatarImages.icon6

}

style={styles.friendIcon}

/>






<Text style={styles.friendName}>

{friend.name}

</Text>






<Text style={styles.facultyBadge}>

{facultyMap[friend.faculty]}

</Text>






<Text style={styles.course}>

:{course}

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




profileContainer:{

flex:1

},



profileContent:{

flex:9,

flexDirection:"row",

alignItems:"center",

justifyContent:"space-between",

paddingHorizontal:10

},



iconArea:{

flex:1,

alignItems:"flex-start"

},



infoArea:{

flex:1,

alignItems:"flex-end",

paddingRight:15

},



myIcon:{

width:160,

height:160,

borderRadius:80

},



mbti:{

fontSize:25

},



info:{

fontSize:18,

marginTop:10

},



nameArea:{

flexDirection:"row",

justifyContent:"center",

alignItems:"center",

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

width:30,

textAlign:"center"

},



course:{

fontSize:16,

marginLeft:5

}


});