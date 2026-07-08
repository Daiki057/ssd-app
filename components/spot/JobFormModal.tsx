import React from "react";
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
    visible:boolean;
    shopName:string;
    salary:string;
    description:string;
    onChangeShopName:(text:string) => void;
    onChangeSalary:(text:string) => void;
    onChangeDescription:(text:string) => void;
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
            <Pressable style={styles.overlay} onPress={onClose}>
                <Pressable style={styles.container}>

                    <Text style={styles.title}>アルバイト情報を追加</Text>

                    <TextInput
                    style={styles.input}
                    placeholder="店舗名"
                    value={shopName}
                    onChangeText={onChangeShopName}
                    />

                    <TextInput
                    style={styles.input}
                    placeholder="時給"
                    keyboardType="numeric"
                    value={salary}
                    onChangeText={onChangeSalary}
                    />

                    <TextInput
                    style={[styles.input,styles.description]}
                    placeholder="仕事内容・雰囲気など"
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
        borderRadius: 10,
        paddingVertical: 14,
        alignItems: "center",
    },
    submitText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});