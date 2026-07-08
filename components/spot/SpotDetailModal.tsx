import React from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type MarkerData = {
  id: string;
  type: "shop" | "job";
  name?: string;
  shopName?: string;
  category?: string;
  salary?: string;
  description?: string;
};

type Props = {
  visible: boolean;
  marker: MarkerData | null;
  isOwner: boolean;
  onClose: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function SpotDetailModal({
  visible,
  marker,
  isOwner,
  onClose,
  onEdit,
  onDelete,
}: Props) {

  if (!marker) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable
        style={styles.overlay}
        onPress={onClose}
      >
        <Pressable style={styles.container}>

          <Text style={styles.title}>
            {marker.type === "shop"
              ? marker.name
              : marker.shopName}
          </Text>

          {marker.type === "shop" && (
            <>
              <Text style={styles.label}>
                カテゴリ
              </Text>

              <Text style={styles.value}>
                {marker.category || "未設定"}
              </Text>
            </>
          )}

          {marker.type === "job" && (
            <>
              <Text style={styles.label}>
                時給
              </Text>

              <Text style={styles.value}>
                {marker.salary || "未設定"}
              </Text>
            </>
          )}

          <Text style={styles.label}>
            説明
          </Text>

          <Text style={styles.description}>
            {marker.description || "説明はありません"}
          </Text>

          {isOwner && (
            <View style={styles.buttonRow}>

                <TouchableOpacity
                style={styles.editButton}
                onPress={onEdit}
                >
                    <Text style={styles.buttonText}>
                        編集
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                style={styles.deleteButton}
                onPress={onDelete}
                >
                    <Text style={styles.buttonText}>
                        削除
                    </Text>
                </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
          >
            <Text style={styles.closeText}>
              閉じる
            </Text>
          </TouchableOpacity>

        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  container: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    color: "#666",
    marginTop: 10,
  },
  value: {
    fontSize: 17,
    marginTop: 4,
  },
  description: {
    fontSize: 16,
    marginTop: 8,
    lineHeight: 24,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  editButton: {
    flex: 1,
    backgroundColor: "#2196F3",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginRight: 8,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: "#F44336",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginLeft: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  closeButton: {
    marginTop: 15,
    alignItems: "center",
  },
  closeText: {
    color: "#666",
    fontSize: 16,
  },
});