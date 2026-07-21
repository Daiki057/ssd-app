import React, { useEffect, useState } from "react";
import { router } from "expo-router";

import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  collection,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../../firebaseConfig";

const { width } = Dimensions.get("window");

export default function ListScreen() {

  const [jobs, setJobs] = useState<any[]>([]);
  const [spots, setSpots] = useState<any[]>([]);
  const [page, setPage] = useState(0);

  useEffect(() => {

    const unsubscribeJobs = onSnapshot(
      collection(db, "jobs"),
      (snapshot) => {

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setJobs(data);

      }
    );


    const unsubscribeSpots = onSnapshot(
      collection(db, "spots"),
      (snapshot) => {

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setSpots(data);

      }
    );


    return () => {
      unsubscribeJobs();
      unsubscribeSpots();
    };

  }, []);


  const handleScroll = (event: any) => {

    const pageNumber = Math.round(
      event.nativeEvent.contentOffset.x / width
    );

    setPage(pageNumber);

  };


  return (

    <View style={styles.container}>


      {/* Page Indicator */}
      <View style={styles.indicatorContainer}>

        <View
          style={[
            styles.indicator,
            page === 0 && styles.activeIndicator,
          ]}
        />

        <View
          style={[
            styles.indicator,
            page === 1 && styles.activeIndicator,
          ]}
        />

      </View>


      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
      >

        {/* バイト一覧 */}
        <View style={styles.page}>

          <Text style={styles.title}>
            バイト一覧
          </Text>


          {jobs.length === 0 ? (

            <Text style={styles.emptyText}>
              まだ投稿がありません
            </Text>

          ) : (

            <FlatList
              data={jobs.slice(0, 3)}
              scrollEnabled={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (

                <View style={styles.card}>

                  <Text style={styles.name}>
                    {item.shopName}
                  </Text>

                  <Text style={styles.text}>
                    時給：{item.salary}
                  </Text>

                </View>

              )}
            />

          )}


          <TouchableOpacity
            style={styles.moreButton}
            onPress={() => router.push("/jobList")}
          >

            <Text style={styles.moreText}>
              もっと見る
            </Text>

          </TouchableOpacity>

        </View>


        {/* スポット一覧 */}
        <View style={styles.page}>

          <Text style={styles.title}>
            スポット一覧
          </Text>


          {spots.length === 0 ? (

            <Text style={styles.emptyText}>
              まだ投稿がありません
            </Text>

          ) : (

            <FlatList
              data={spots.slice(0, 3)}
              scrollEnabled={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (

                <View style={styles.card}>

                  <Text style={styles.name}>
                    {item.name}
                  </Text>

                  <Text style={styles.text}>
                    カテゴリ：{item.category}
                  </Text>

                </View>

              )}
            />

          )}


          <TouchableOpacity
            style={styles.moreButton}
            onPress={() => router.push("/spotList")}
          >

            <Text style={styles.moreText}>
              もっと見る
            </Text>

          </TouchableOpacity>

        </View>

      </ScrollView>

    </View>

  );

}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },

  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
  },

  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#CCCCCC",
    marginHorizontal: 5,
  },

  activeIndicator: {
    backgroundColor: "#4A90E2",
  },

  page: {
    width,
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#777777",
    marginVertical: 30,
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },

  text: {
    fontSize: 16,
    color: "#666666",
  },

  moreButton: {
    backgroundColor: "#4A90E2",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 10,
  },

  moreText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

});