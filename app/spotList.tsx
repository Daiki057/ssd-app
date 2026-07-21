import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  collection,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../firebaseConfig";

export default function SpotListScreen() {

  const [spots, setSpots] = useState<any[]>([]);

  useEffect(() => {

    const unsubscribe = onSnapshot(

      collection(db, "spots"),

      (snapshot) => {

        const data = snapshot.docs.map((doc) => ({

          id: doc.id,
          ...doc.data(),

        }));

        setSpots(data);

      }

    );

    return () => unsubscribe();

  }, []);

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        スポット一覧
      </Text>

      <FlatList
        data={spots}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (

          <View style={styles.card}>

            <Text style={styles.name}>
              {item.name}
            </Text>

            <Text style={styles.text}>
              カテゴリ：{item.category}
            </Text>

            <Text style={styles.description}>
              {item.description}
            </Text>

          </View>

        )}
      />

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3,
  },

  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },

  text: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },

  description: {
    fontSize: 15,
    color: "#777",
  },

});