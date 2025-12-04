import React from "react";
import { View, Text } from "react-native";
import styles from "../ProjectDetail.styles";

export default function AboutTechStack({ tags }) {
  return (
    <View style={styles.cardContent}>
      <Text style={styles.sectionTitle}>기술 스택</Text>

      <View style={styles.techWrap}>
        {tags?.length > 0 ? (
          tags.map((tag, index) => (
            <View key={index} style={styles.techBadge}>
              <Text style={styles.techText}>{tag}</Text>
            </View>
          ))
        ) : (
          <></>
        )}
      </View>
    </View>
  );
}
