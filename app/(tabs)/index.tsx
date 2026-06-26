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

import { router } from "expo-router";

import {
  useEffect,
  useState
} from "react";

import {
  doc,
  getDoc
} from "firebase/firestore";

import {
  auth,
  db
} from "../../firebaseConfig";


export default function Home() {


  const [user,setUser] = useState<any>(null);



  useEffect(()=>{


    const loadUser = async()=>{


      const uid = auth.currentUser?.uid;


      if(!uid)
        return;



      const snapshot =
      await getDoc(

        doc(
          db,
          "users",
          uid
        )

      );



      if(snapshot.exists()){

        setUser(
          snapshot.data()
        );

      }


    };


    loadUser();


  },[]);




  if(!user){


    return(

      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>

        <Text>
          読み込み中...
        </Text>

      </View>

    );

  }





  return (


    <ScrollView
      style={styles.container}
      contentContainerStyle={{flexGrow:1}}
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

                style={styles.largeIcon}

              />


            </TouchableOpacity>


          </View>





          <View style={styles.rightColumn}>


            <Text style={styles.mbti}>

              {user.mbti}

            </Text>



            <Text style={styles.info}>

              誕生日 {user.birthDate}

            </Text>



            <Text style={styles.info}>

              {user.faculty}

            </Text>



            <Text style={styles.info}>

              サークル: {user.circle}

            </Text>



            <Text style={styles.info}>

              登録講義: {user.courses}

            </Text>


          </View>


        </View>





        <View style={styles.nameBlockLarge}>


          <Text style={styles.name}>

            {user.name}

          </Text>



          <Text style={styles.studentId}>

            {user.studentId}

          </Text>


        </View>


      </View>







      {/* 友達 */}

      <View style={styles.friendsContainer}>


        <View style={styles.friendsHeaderRow}>


          <Text style={styles.favorite}>

            友達一覧▼

          </Text>



          <Text style={styles.friendCountInline}>

            {user.friends?.length ?? 0}人

          </Text>



        </View>






        {

          user.friends?.map(

            (friendId:string,index:number)=>(


              <View

                key={index}

                style={styles.friend}

              >


                <Image

                  source={{
                    uri:
                    "https://i.pravatar.cc/100?img=12"
                  }}

                  style={styles.avatar}

                />



                <Text style={styles.friendName}>

                  友達ID

                </Text>



              </View>


            )


          )

        }


      </View>




    </ScrollView>


  );

}





const styles = StyleSheet.create({


container:{
  flex:1,
  backgroundColor:"#ffd6dc",
},



profileContainer:{
  flex:1,
},



profileContent:{
  flex:9,
  flexDirection:"row",
  alignItems:"center",
  justifyContent:"space-between",
  paddingHorizontal:8,
},



leftColumn:{
  flex:1,
  alignItems:"flex-start",
  justifyContent:"center",
  paddingLeft:8,
},



rightColumn:{
  flex:1,
  alignItems:"flex-end",
  justifyContent:"center",
  paddingRight:12,
},



largeIcon:{
  width:160,
  height:160,
  borderRadius:80,
},



nameBlockLarge:{
  flex:1,
  alignItems:"center",
  justifyContent:"center",
  flexDirection:"row",
  gap:8,
},



name:{
  fontSize:26,
  fontWeight:"bold",
},



studentId:{
  fontSize:16,
  color:"#444",
},



mbti:{
  fontSize:25,
},



info:{
  fontSize:20,
  marginTop:10,
},



friendsContainer:{
  flex:2,
},



friendsHeaderRow:{
  flexDirection:"row",
  justifyContent:"space-between",
  alignItems:"center",
},



favorite:{
  fontSize:22,
  marginLeft:30,
},



friendCountInline:{
  fontSize:18,
  marginRight:30,
},



friend:{
  flexDirection:"row",
  alignItems:"center",
  marginLeft:50,
  marginTop:20,
},



avatar:{
  width:60,
  height:60,
  borderRadius:30,
},



friendName:{
  marginLeft:30,
  fontSize:18,
},


});