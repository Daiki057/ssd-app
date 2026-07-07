import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Category = "all" | "shop" | "job";

type Props = {
  value: Category;
  onChange: (category: Category) => void;
};

const categories = [
  { key: "all", label: "すべて" },
  { key: "shop", label: "店舗" },
  { key: "job", label: "バイト" },
] as const;

export default function CategoryBar({ value, onChange }: Props) {
  return (
    <View style={styles.container}>
      {categories.map(item => (
        <TouchableOpacity
          key={item.key}
          style={[
            styles.button,
            value === item.key && styles.activeButton,
          ]}
          onPress={() => onChange(item.key)}
        >
          <Text
            style={[
              styles.text,
              value === item.key && styles.activeText,
            ]}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  button: {
    backgroundColor: "#fff",
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 20,
    marginHorizontal: 4,
    elevation: 3,
  },
  activeButton: {
    backgroundColor: "#3B82F6",
  },
  text: {
    fontSize: 14,
    color: "#333",
  },
  activeText: {
    color: "#fff",
    fontWeight: "600",
  },
});