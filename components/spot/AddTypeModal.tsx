import React from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSelectShop: () => void;
  onSelectJob: () => void;
};

export default function AddTypeModal({
  visible,
  onClose,
  onSelectShop,
  onSelectJob,
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
          <Text style={styles.title}>何を追加しますか？</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={onSelectShop}
          >
            <Text style={styles.buttonText}>🏪 店舗情報</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={onSelectJob}
          >
            <Text style={styles.buttonText}>💼 アルバイト情報</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onClose}
          >
            <Text style={styles.cancelText}>キャンセル</Text>
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
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 12,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "500",
  },
  cancelButton: {
    marginTop: 8,
    paddingVertical: 16,
    alignItems: "center",
  },
  cancelText: {
    color: "#e53935",
    fontSize: 16,
    fontWeight: "600",
  },
});