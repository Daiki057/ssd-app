import React, { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  visible: boolean;
  name:string;
  category:string;
  description:string;
  onChangeName:(text:string) => void;
  onChangeCategory:(text:string) => void;
  onChangeDescription:(text:string) => void;
  onClose: () => void;
  onSubmit:() => void;
};

export default function ShopFormModal({
  visible,
  name,
  category,
  description,
  onChangeName,
  onChangeCategory,
  onChangeDescription,
  onClose,
  onSubmit,
}: Props) {

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.container}>
          <Text style={styles.title}>店舗情報を追加</Text>

          <TextInput
            style={styles.input}
            placeholder="店舗名"
            value={name}
            onChangeText={onChangeName}
          />

          <TextInput
            style={styles.input}
            placeholder="カテゴリ"
            value={category}
            onChangeText={onChangeCategory}
          />

          <TextInput
            style={[styles.input, styles.description]}
            placeholder="説明"
            multiline
            value={description}
            onChangeText={onChangeDescription}
          />

          <TouchableOpacity
            style={styles.submitButton}
            onPress={onSubmit}
          >
            <Text style={styles.submitText}>投稿する</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  description: {
    height: 100,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#3B82F6",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});