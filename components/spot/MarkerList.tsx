import React from "react";
import { Marker } from "react-native-maps";

export type MarkerItem = {
  id: string;
  latitude: number;
  longitude: number;
  name?: string;
  shopName?: string;
};

type Props = {
  markers: MarkerItem[];
  onPress?: (marker: MarkerItem) => void;
}

export default function MarkerList({ markers, onPress }: Props) {
  return (
    <>
      {markers.map(marker => (
        <Marker
          key={marker.id}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
          title={marker.name || marker.shopName || "情報"}
          onPress={() => onPress?.(marker)}
        />
      ))}
    </>
  );
}