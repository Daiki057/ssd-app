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
import { use } from "react";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore"; 
import { auth, db } from "../../firebaseConfig";

export default function Home() {

  const [user,setUser]=useState<any>(null);
  
  useEffect(()=>{
    const uid=auth.currentUser?useId;
    
    if(!uid)return;

    const snapshot=
    await setDoc(
      doc(
        db,
        "users",
        uid
      )
    );

    if(snapshot.exusts()){

      setUser(
        snapshot.data()
      );
    }
  };
  loadUser();
},[]);

const [user,setUser]=useState<any>(null);

if(!user){
  return(
    <View>
    
    <Text>
    読み込み中
    </Text>
    
    </View>
  )
}

}
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
      {/* 上部: プロフィール (1/3) */}
      <View style={styles.profileContainer}>
        {/* 縦比 9:1 => 上段(row) が 9, 下段(name) が 1 */}
        <View style={styles.profileContent}>
          {/* 左: 大きなアイコン */}
          <View style={styles.leftColumn}>
            <TouchableOpacity
              onPress={() => {
                router.push("/qr");
              }}
            >
              <Image
                source={{ uri: "https://i.pravatar.cc/300?img=5" }}
                style={styles.largeIcon}
              />
            </TouchableOpacity>
          </View>

          {/* 右: MBTI, 誕生日, 学部, サークル, 登録講義 */}
          <View style={styles.rightColumn}>
            <Text style={styles.mbti}>{user.mbti}</Text>
            <Text style={styles.info}>{user.birthData}</Text>
            <Text style={styles.info}>{user.faculty}</Text>
            <Text style={styles.info}>サークル: コトポート</Text>
            <Text style={styles.info}>登録講義: 心理学</Text>
          </View>
        </View>

        {/* 下部: 名前と学籍番号 (1 部分) */}
        <View style={styles.nameBlockLarge}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.studentId}>学籍番号: J25032</Text>
        </View>
      </View>

      {/* 下部: 友達一覧 (2/3) */}
      <View style={styles.friendsContainer}>
        <View style={styles.friendsHeaderRow}>
          <Text style={styles.favorite}>友達一覧▼</Text>
          <Text style={styles.friendCountInline}>{user.friends.length}人</Text>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffd6dc",
  },

  profile: {
    alignItems: "flex-end",
    paddingTop: 40,
    paddingRight: 40,
  },

  // 中央揃えのヘッダ（アイコン＋名前）
  profileHeader: {
    alignSelf: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  // 左アイコン + 右情報 の行レイアウト
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
  },

  // 右側の情報は右寄せ
  profileInfo: {
    alignItems: "flex-end",
  },

  // 名前と学籍番号のブロック（中央揃え）
  nameBlock: {
    alignItems: "center",
    marginTop: 10,
  },

  studentId: {
    fontSize: 16,
    color: "#444",
    marginTop: 4,
  },

  /* New layout styles for top1/3 profile, bottom2/3 friends */
  profileContainer: {
    flex: 1, // top 1 of total 3 (paired with friendsContainer flex:2)
  },

  profileContent: {
    flex: 9, // 9 parts
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },

  leftColumn: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: 8,
  },

  rightColumn: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 12,
  },

  largeIcon: {
    width: 160,
    height: 160,
    borderRadius: 80,
  },

  nameBlockLarge: {
    flex: 1, // the bottom 1 part of the 9:1 split
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },

  friendsContainer: {
    flex: 2,
    backgroundColor: "#ffd6dc",
    paddingHorizontal: 8,
  },

  friendsHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
    marginTop: 6,
    marginBottom: 6,
  },

  friendCountInline: {
    fontSize: 18,
    color: "#333",
  },

  /*
    レイアウト調整ガイド (編集しやすいように例を残しています)

    変更手順:
    1. このファイル `app/(tabs)/index.tsx` を開く
    2. 下の `styles` オブジェクト内の該当プロパティを上書き
    3. 保存すると Expo のホットリロードで反映されます

    よくある調整例（`profileHeader` / `profile` / `myIcon` / `name` / `mbti` を置き換えてください）:

    // アイコンをもっと上に持っていく
    profile: {
      alignItems: 'flex-end',
      paddingTop: 20, // 小さくする
      paddingRight: 40,
    }

    // アイコンを左寄せにして名前も左揃え
    profile: {
      alignItems: 'flex-start',
      paddingTop: 40,
      paddingLeft: 20,
      paddingRight: 20,
    },
    profileHeader: {
      alignSelf: 'flex-start',
      alignItems: 'flex-start',
    }

    // アイコンを大きく中央に（デフォルトより大きく）
    profileHeader: {
      alignSelf: 'center',
      alignItems: 'center',
      marginBottom: 8,
    },
    myIcon: {
      width: 110,
      height: 110,
      borderRadius: 55,
      marginBottom: 6,
    }

    // 名前サイズを下げる
    name: { fontSize: 20 },
    mbti: { fontSize: 16, marginTop: 4 },

    注意: 上に示したのは例です。目的の見た目に合わせて数値を増減してください。
  */

  myIcon: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 8,
  },

  name: {
    fontSize: 26,
    fontWeight: "bold",
  },

  mbti: {
    fontSize: 25,
    marginTop: 6,
  },

  info: {
    fontSize: 20,
    marginTop: 10,
  },

  sub: {
    fontSize: 17,
  },

  friendCount: {
    marginTop: 20,
    marginLeft: 60,
  },

  favorite: {
    fontSize: 22,
    marginLeft: 30,
    marginTop: 25,
  },

  friend: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 50,
    marginTop: 20,
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },

  friendName: {
    marginLeft: 30,
    width: 100,
    fontSize: 18,
  },
});