import React from "react";
import { View, Text } from "react-native";
import styles from "../ProjectDetail.styles";

export default function AboutIntro({ description, descriptionLong }) {
  return (
    <View style={styles.cardContent}>
      <Text style={styles.sectionTitle}>프로젝트 소개</Text>

      <Text style={styles.sectionBody}>
        {descriptionLong || description}
      </Text>
    </View>
  );
}
