// スポット投稿画面です。
// Firestore から投稿を読み込み、投稿を保存できます。
import { getAuth } from "firebase/auth";
import {
  collection,
  onSnapshot,
} from "firebase/firestore";
import * as Location from "expo-location";
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
  Region,
} from "react-native-maps";
import AddTypeModal from "../../components/spot/AddTypeModal";
import CategoryBar from "../../components/spot/CategoryBar";
import JobFormModal from "../../components/spot/JobFormModal";
import MarkerList from "../../components/spot/MarkerList";
import ShopFormModal from "../../components/spot/ShopFormModal";
import SpotDetailModal from "../../components/spot/SpotDetailModal";import { db } from "../../firebaseConfig";
import {
  createJob,
  deleteJob,
  updateJob,
} from "../../services/jobService";
import {
  createSpot,
  deleteSpot,
  updateSpot,
} from "../../services/spotService";

export default function SpotScreen(){

  const auth = getAuth();

  const [location,setLocation] = useState<Region>({
    latitude:36.383,
    longitude:138.248,
    latitudeDelta:0.01,
    longitudeDelta:0.01,
  });

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
  const [selectedMarker, setSelectedMarker] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [shopName,setShopName] = useState("");
  const [shopCategory,setShopCategory] = useState("");
  const [shopDescription,setShopDescription] = useState("");

  const [jobShopName,setJobShopName] = useState("");
  const [jobSalary,setJobSalary] = useState("");
  const [jobDescription,setJobDescription] = useState("");

  useEffect(()=>{
    getCurrentLocation();
  },[]);

  const getCurrentLocation = async() => {
    try{
      const { status } =
      await Location.requestForegroundPermissionsAsync();
      if(status !== "granted"){
        Alert.alert(
          "位置情報が所得出来ません。",
          "位置情報の利用を許可してください。"
        );

        return;
      }

      const currentLocation =
      await Location.getCurrentPositionAsync({});

      const newRegion = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };

      setLocation(newRegion);
      setSelectedLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

    }catch(error){
      console.error(error);
      Alert.alert(
        "位置情報の所得に失敗しました。"
      );
    }
  };
  
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
      if (isEditing && selectedMarker) {

        await updateSpot(selectedMarker.id, {
          name: shopName,
          category: shopName,
          description: shopDescription,
        });
      } else {

        await createSpot({
          name: shopName,
          category: shopCategory,
          description: shopDescription,
          latitude: selectedLocation.latitude,
          longitude: selectedLocation.longitude,
          createdBy: user.uid,
        });
      }

      setShopName("");
      setShopCategory("");
      setShopDescription("");
      setSelectedLocation(null);
      setModalMode("none");
      setIsEditing(false);
      setSelectedMarker(null);

      Alert.alert("投稿しました");
    } catch (error) {
      console.error(error);
      Alert.alert("投稿に失敗しました");
    }
  };

  const handleCreateJob =async () => {
    if (!selectedLocation) {
      Alert.alert("場所を選択してください");
      return;
    }

    if (!jobShopName.trim()) {
      Alert.alert("店舗名を選択してください");
      return;
    }

    const user = auth.currentUser;

    if (!user) {
      Alert.alert("ログインしてください");
      return;
    }

    try {
      if (isEditing && selectedMarker) {

        await updateJob(selectedMarker.id, {
          shopName: jobShopName,
          salary: jobSalary,
          description: jobDescription,
        });
      } else {

        await createJob({
          shopName: jobShopName,
          salary: jobSalary,
          description: jobDescription,
          latitude: selectedLocation.latitude,
          longitude: selectedLocation.longitude,
          createdBy: user.uid,
        });
      }
      setJobShopName("");
      setJobSalary("");
      setJobDescription("");
      setSelectedLocation(null);
      setModalMode("none");
      setIsEditing(false);
      setSelectedMarker(null);

      Alert.alert("投稿しました");
    }catch (error) {
      console.error(error);
      Alert.alert("投稿に失敗しました")
    }
  };

  const isOwner =
  selectedMarker?.createdBy === auth.currentUser?.uid;

  const handleEdit = () => {
    if (!selectedMarker) return;

    if (selectedMarker.type === "shop") {
      setShopName(selectedMarker.name ?? "");
      setShopCategory(selectedMarker.category ?? "");
      setShopDescription(selectedMarker.description ?? "");
      setModalMode("shop");
    } else {
      setJobShopName(selectedMarker.shopName ?? "");
      setJobSalary(selectedMarker.salary ?? "");
      setJobDescription(selectedMarker.description ?? "");
      setModalMode("job");
    }

    setIsEditing(true);
  }
  
  const handleDelete = async () => {
    if (!selectedMarker) return;

    try {
      if (selectedMarker.type === "shop") {
        await deleteSpot(selectedMarker.id);
      } else {
        await deleteJob(selectedMarker.id);
      }

      setSelectedMarker(null);
      setModalMode("none");
      setIsEditing(false);
      setSelectedMarker(null);

      Alert.alert("削除しました");

    } catch (error) {
      console.error(error);
      Alert.alert("削除に失敗しました");
    }
  };

  return(

    <>

    <View style={styles.container}>

      <CategoryBar
      value={category}
      onChange={setCategory}
      />

      <MapView
      style={styles.map}
      region={location}
      showsUserLocation={true}
      onPress={handleMapPress}
      >

      <MarkerList
      markers={filteredMarkers}
      onPress={(marker) => {
        setSelectedMarker(marker);
        setModalMode("detail");
      }}
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

    <JobFormModal
      visible={modalMode === "job"}
      shopName={jobShopName}
      salary={jobSalary}
      description={jobDescription}
      onChangeShopName={setJobShopName}
      onChangeSalary={setJobSalary}
      onChangeDescription={setJobDescription}
      onClose={() => setModalMode("none")}
      onSubmit={handleCreateJob}
    />
    
    <SpotDetailModal
    isOwner={isOwner}
    visible={modalMode === "detail"}
    marker={selectedMarker}
    onClose={() => {
      setSelectedMarker(null);
      setModalMode("none");
      setIsEditing(false);
      setSelectedMarker(null);
    }}
    onEdit={handleEdit}
    onDelete={handleDelete}
    />

    </>
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