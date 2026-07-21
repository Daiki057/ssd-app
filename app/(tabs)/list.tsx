import React, { useRef, useState } from "react";
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
import {
  useEffect,
} from "react";
import {
  db
} from "../../firebaseConfig";
import { getReduceMotionFromConfig } from "react-native-reanimated/lib/typescript/animation/util";

const { width } = Dimensions.get("window");

const [jobs, setJobs] = useState<any[]>([]);
const [spots, setSpots] = useState<any[]>([]);

console.log(jobs);
console.log(spots);

export default function ListScreen() {
  useEffect(() => {
    const jobSubscribe =
    onSnapshot(
      collection(db, "jobs"),
      (snapshot) => {
        const data =
          snapshot.docs.map((doc) => ({

            id: doc.id,
            ...doc.data(),
          }));
        setJobs(data);
      }
    );

    const spotSubscribe =
      onSnapshot(
        collection(db, "spots"),
        (snapshot) => {
          const data =
            snapshot.docs.map((doc) => ({

              id: doc.id,
              ...doc.data(),
            }));
          setSpots(data);
        }
      );
    
    return () => {
      jobSubscribe();
      spotSubscribe();
    };
  }, []);

  const [page, setPage] = useState(0);

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

          <FlatList
            data={jobs.slice(0,3)}
            scrollEnabled={false}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.name}>
                  {item.name}
                </Text>

                <Text style={styles.text}>
                  時給：{item.salary}
                </Text>
              </View>
            )}
          />

          <TouchableOpacity
            style={styles.moreButton}
            onPress={() => router.push("/jobList")}>
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

          <FlatList
            data={spots.slice(0,3)}
            scrollEnabled={false}
            keyExtractor={(item) => item.name}
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

          <TouchableOpacity
            style={styles.moreButton}
            onPress={() => router.push("/spotList")}>
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
    marginBottom: 20,
    textAlign: "center",
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