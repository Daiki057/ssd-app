// jobAdd.tsx のコード説明: このファイルは React コンポーネントを定義し、アプリの表示と操作を担当します。
import React from "react";

import {
    View,
    Text,
} from "react-native";

import {
    useLocalSearchParams,
} from "expo-router";

export default function jobAdd(){
    const {
        latitude,
        longitude,
    } = useLocalSearchParams();

    return(
        <View>
            <Text>バイト投稿</Text>
            <Text>
                経度：
                {latitude}
            </Text>
            <Text>
                緯度：
                {longitude}
            </Text>
        </View>
    );
}