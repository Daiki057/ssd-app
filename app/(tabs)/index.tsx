// ホーム画面のコンポーネントです。ユーザーの基本プロフィールと
// お気に入りの友達一覧をスクロールで表示します。
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";

// この配列は画面に表示する友達のサンプルデータです。
// 実際のアプリでは、API や Firestore から取得したデータに差し替える想定です。
const friends = [
  {
    name:"友達A",
    date:"4/2",
    image:
    "https://i.pravatar.cc/100?img=12"
  },
  {
    name:"友達B",
    date:"11/22",
    image:
    "https://i.pravatar.cc/100?img=20"
  },
  {
    name:"友達C",
    date:"7/12",
    image:
    "https://i.pravatar.cc/100?img=32"
  },
  {
    name:"友達D",
    date:"1/1",
    image:
    "https://i.pravatar.cc/100?img=45"
  }
];


export default function Home(){

  // `Home` コンポーネントは 1 つの画面を表します。
  // ここではユーザーのプロフィールと友達リストを表示しています。
  return(

    <ScrollView
      style={styles.container}
    >

      <View
        style={styles.profile}
      >


        <Text style={styles.mbti}>
          INFP
        </Text>


        <Text style={styles.info}>
          誕生日 2/23
        </Text>


        <Text style={styles.info}>
          企業情報学部
        </Text>


        <Text style={styles.info}>
          サークル
        </Text>

        <Text style={styles.sub}>
          ・コトポート etc...
        </Text>



        <Text style={styles.info}>
          登録講義
        </Text>

        <Text style={styles.sub}>
          ・心理学 etc...
        </Text>


      </View>



      <View
        style={styles.follow}
      >

        <Text>
          フォロー{"\n"}5人
        </Text>


        <Text>
          フォロワー{"\n"}5人
        </Text>


      </View>




      <Text
        style={styles.name}
      >
        黒萩大樹
      </Text>




      <Text
        style={styles.favoriteTitle}
      >
        お気に入り▼
      </Text>




      {
        friends.map((friend,index)=>(


          <View
            key={index}
            style={styles.friend}
          >


            <Image
              source={{
                uri:friend.image
              }}
              style={styles.avatar}
            />


            <Text
              style={styles.friendName}
            >
              {friend.name}
            </Text>


            <Text>
              {friend.date}
            </Text>


          </View>


        ))
      }


    </ScrollView>

  );

}




const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:"#ffd6dc",
  },


  profile:{
    alignItems:"flex-end",
    paddingTop:50,
    paddingRight:40
  },


  mbti:{
    fontSize:26,
    marginBottom:15
  },


  info:{
    fontSize:22,
    marginTop:10
  },


  sub:{
    fontSize:18
  },


  follow:{
    flexDirection:"row",
    justifyContent:"space-around",
    marginTop:30
  },


  name:{
    fontSize:26,
    marginLeft:70,
    marginTop:10,
    fontWeight:"bold"
  },


  favoriteTitle:{
    fontSize:22,
    marginLeft:30,
    marginTop:20
  },


  friend:{
    flexDirection:"row",
    alignItems:"center",
    marginLeft:50,
    marginTop:25
  },


  avatar:{
    width:60,
    height:60,
    borderRadius:30
  },


  friendName:{
    marginLeft:40,
    fontSize:18,
    width:100
  }


});