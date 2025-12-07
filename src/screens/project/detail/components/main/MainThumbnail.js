import React from "react";
import { Image } from "react-native";
import styles from "../../ProjectDetail.styles";

export default function MainThumbnail({ thumbnailUrl }) {
  if (!thumbnailUrl) return null;

  return (
    <Image
      source={{ uri: thumbnailUrl }}
      style={styles.mainThumbnail}
      resizeMode="cover"
    />
  );
}
