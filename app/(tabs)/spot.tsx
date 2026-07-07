// スポット投稿画面です。
// Firestore から投稿を読み込み、投稿を保存できます。
import {
  collection,
  onSnapshot,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, {
  MapPressEvent,
  Marker,
} from "react-native-maps";
import CategoryBar from "../../components/spot/CategoryBar";
import MarkerList from "../../components/spot/MarkerList";
import AddTypeModal from "../../components/spot/AddTypeModal";
import ShopFormModal from "../../components/spot/ShopFormModal";
import { db } from "../../firebaseConfig";
import { createSpot } from "../../services/spotService";
import { getAuth } from "firebase/auth";

export default function SpotScreen(){

  const auth = getAuth();

  const [category, setCategory] = useState<"all" | "shop" | "job">("all");

  const [spots, setSpots] = useState<any[]>([]);

  const [jobs,setJobs]
  = useState<any[]>([]);

  const [selectedLocation,setSelectedLocation]
  = useState<{

    latitude:number;

    longitude:number;

  } | null>(null);

  type ModalMode =
  | "none"
  | "select"
  | "shop"
  | "job"
  | "detail";

  const [modalMode,setModalMode] = useState<ModalMode>("none");
  const [shopName,setShopName] = useState("");
  const [shopCategory,setShopCategory] = useState("");
  const [shopDescription,setShopDescription] = useState("");

  useEffect(()=>{

    const spotSubscribe =

      onSnapshot(

        collection(db,"spots"),

        snapshot=>{

          const data =
          snapshot.docs.map(doc=>({

            id:doc.id,

            ...doc.data()

          }));

          setSpots(data);

        }

      );

    const jobSubscribe =

      onSnapshot(

        collection(db,"jobs"),

        snapshot=>{

          const data =
          snapshot.docs.map(doc=>({

            id:doc.id,

            ...doc.data()

          }));

          setJobs(data);

        }

      );

    return ()=>{

      spotSubscribe();

      jobSubscribe();

    };

  },[]);

  const markers = [

    ...spots.map(item=>({

      ...item,

      type:"shop"

    })),

    ...jobs.map(item=>({

      ...item,

      type:"job"

    }))

  ];

  const filteredMarkers =

    category==="all"

    ?

    markers

    :

    markers.filter(

      item=>item.type===category

    );

  const handleMapPress =

  (event:MapPressEvent)=>{

    setSelectedLocation(

      event.nativeEvent.coordinate

    );

  };

  const openAdd = ()=>{

    if(!selectedLocation){

      Alert.alert(

        "場所を選択してください"

      );

      return;

    }

    setModalMode("select");
  };

  const handleCreateShop = async () => {
    if (!selectedLocation) {
          Alert.alert("場所を選択してください");
          return;
    }
    
    if (!shopName.trim()) {
      Alert.alert("店舗名を入力してください");
      return;
    }
    
    const user = auth.currentUser;
    
    if (!user) {
      Alert.alert("ログインしてください");
      return;
    }
    
    try {
      await createSpot({
        name: shopName,
        category: shopCategory,
        description: shopDescription,
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
        createdBy: user.uid,
      });
      setShopName("");
      setShopCategory("");
      setShopDescription("");
      setSelectedLocation(null);
      setModalMode("none");

      Alert.alert("投稿しました");
    } catch (error) {
      console.error(error);
      Alert.alert("投稿に失敗しました");
    }
  };

  return(

    <View style={styles.container}>

      <CategoryBar
      value={category}
      onChange={setCategory}
      />

      <MapView

      style={styles.map}

      initialRegion={{

        latitude:35.0116,

        longitude:135.7681,

        latitudeDelta:0.01,

        longitudeDelta:0.01

      }}

      onPress={handleMapPress}

      >

      <MarkerList
      markers={filteredMarkers}
      />

      {

      selectedLocation &&

      <Marker

      coordinate={selectedLocation}

      title="投稿予定場所"

      pinColor="blue"

      />

      }

      </MapView>

      <TouchableOpacity

      style={styles.addButton}

      onPress={openAdd}

      >

        <Text style={styles.addText}>

          ＋

        </Text>

      </TouchableOpacity>

      <AddTypeModal
      visible={modalMode === "select"}
      onClose={() => setModalMode("none")}
      onSelectShop={() => setModalMode("shop")}
      onSelectJob={() => setModalMode("job")}
      />

      <ShopFormModal
      visible={modalMode === "shop"}
      name={shopName}
      category={shopCategory}
      description={shopDescription}
      onChangeName={setShopName}
      onChangeCategory={setShopCategory}
      onChangeDescription={setShopDescription}
      onClose={() => setModalMode("none")}
      onSubmit={handleCreateShop}
      />

    </View>

  );

}

const styles = StyleSheet.create({

container:{

flex:1

},

map:{

flex:1

},

categoryContainer:{

position:"absolute",

top:50,

zIndex:10,

flexDirection:"row",

paddingHorizontal:15

},

categoryButton:{

backgroundColor:"#fff",

paddingVertical:8,

paddingHorizontal:15,

borderRadius:20,

marginRight:8,

elevation:3

},

activeCategory:{

backgroundColor:"#ddd"

},

addButton:{

position:"absolute",

right:20,

bottom:40,

width:60,

height:60,

borderRadius:30,

backgroundColor:"#fff",

justifyContent:"center",

alignItems:"center",

elevation:5

},

addText:{

fontSize:32

}

});