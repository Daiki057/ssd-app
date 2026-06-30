// スポット投稿画面です。
// Firestore から投稿を読み込み、投稿を保存できます。
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

import {
  collection,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../../firebaseConfig";

import { useRouter } from "expo-router";

export default function SpotScreen(){

  const router = useRouter();

  const [category,setCategory]
  = useState("all");

  const [spots,setSpots]
  = useState<any[]>([]);

  const [jobs,setJobs]
  = useState<any[]>([]);

  const [selectedLocation,setSelectedLocation]
  = useState<{

    latitude:number;

    longitude:number;

  } | null>(null);

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

      type:"baito"

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

    router.push({

      pathname:"/spot/add",

      params:{

        latitude:
        selectedLocation.latitude,

        longitude:
        selectedLocation.longitude

      }

    });

  };

  return(

    <View style={styles.container}>

      <View style={styles.categoryContainer}>

      {

      [

        {
          key:"all",
          label:"すべて"
        },

        {
          key:"shop",
          label:"店舗"
        },

        {
          key:"baito",
          label:"バイト"
        }

      ]

      .map(item=>(

        <TouchableOpacity

        key={item.key}

        style={[

          styles.categoryButton,

          category===item.key &&

          styles.activeCategory

        ]}

        onPress={()=>setCategory(item.key)}

        >

          <Text>

            {item.label}

          </Text>

        </TouchableOpacity>

      ))

      }

      </View>

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

      {

      filteredMarkers.map(item=>(

        <Marker

        key={item.id}

        coordinate={{

          latitude:item.latitude,

          longitude:item.longitude

        }}

        title={

          item.name ||

          item.shopName ||

          "情報"

        }

        />

      ))

      }

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