import React from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";

type Props = {
  visible: boolean;
  shopName: string;
  salary: string;
  description: string;
  onChangeShopName: (text: string) => void;
  onChangeSalary: (text: string) => void;
  onChangeDescription: (text: string) => void;
  onClose: () => void;
  onSubmit: () => void;
};

export default function JobFormModal({
  visible,
  shopName,
  salary,
  description,
  onChangeShopName,
  onChangeSalary,
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.overlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboard}
          >
            <ScrollView
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.scroll}
            >
              <Pressable style={styles.overlayTouch} onPress={onClose} />

              <Pressable style={styles.container}>
                <Text style={styles.title}>
                  アルバイト情報を追加
                </Text>

                <TextInput
                  style={styles.input}
                  placeholder="店舗名"
                  value={shopName}
                  onChangeText={onChangeShopName}
                />

                <TextInput
                  style={styles.input}
                  placeholder="時給（例：1200円）"
                  keyboardType="numeric"
                  value={salary}
                  onChangeText={onChangeSalary}
                />

                <TextInput
                  style={[styles.input, styles.description]}
                  placeholder="仕事内容・雰囲気など"
                  multiline
                  textAlignVertical="top"
                  value={description}
                  onChangeText={onChangeDescription}
                />

                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={onSubmit}
                >
                  <Text style={styles.submitText}>
                    投稿する
                  </Text>
                </TouchableOpacity>
              </Pressable>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "flex-end",
  },
  keyboard: {
    flex: 1,
    justifyContent: "flex-end",
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  overlayTouch: {
    flex: 1,
  },
  container: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
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
    height: 120,
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