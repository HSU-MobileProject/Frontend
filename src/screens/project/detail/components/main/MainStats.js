import React from "react";
import { View, Text } from "react-native";
import { Star, Eye, Calendar } from "lucide-react-native";
import styles from "../ProjectDetail.styles";

export default function MainStats({ likes, views, createdAt }) {
  const created = createdAt
    ? new Date(createdAt).toLocaleDateString("ko-KR")
    : "";

  return (
    <View style={styles.mainStatsRow}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Star size={16} color="#6B7280" />
        <Text style={styles.mainStatText}> {likes}</Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Eye size={16} color="#6B7280" />
        <Text style={styles.mainStatText}> {views}</Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Calendar size={16} color="#6B7280" />
        <Text style={styles.mainStatText}> {created} 등록</Text>
      </View>
    </View>
  );
}
