import React from "react";
import { View, Text } from "react-native";
import { Heart, Eye, Calendar } from "lucide-react-native";
import styles from "../../ProjectDetail.styles";

export default function MainStats({ likes, views, createdAt, isLiked }) {
  let created = "";
  if (createdAt) {
    const dateObj = createdAt.toDate ? createdAt.toDate() : new Date(createdAt);
    created = dateObj.toLocaleDateString("ko-KR");
  }

  return (
    <View style={styles.mainStatsRow}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Heart   
          size={16} 
          color={isLiked ? "#E91E63" : "#1A1A1A"} 
          fill={isLiked ? "#E91E63" : "transparent"}
        />
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
