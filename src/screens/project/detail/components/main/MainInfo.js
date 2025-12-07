import React from "react";
import { View, Text } from "react-native";
import styles from "../../ProjectDetail.styles";
import categoryColors from "../../../../../assets/categoryColors";

export default function MainInfo({ category, isRecruiting, title, description }) {
  const categoryColor = categoryColors[category] || categoryColors.default;

  return (
    <>
      {/* 카테고리 / 진행중 */}
      <View style={styles.mainBadgeRow}>
        <View
          style={[styles.mainCategoryBadge, { backgroundColor: categoryColor }]}
        >
          <Text style={styles.mainCategoryBadgeText}>{category}</Text>
        </View>

        {isRecruiting !== false && (
          <View style={styles.mainStatusBadge}>
            <Text style={styles.mainStatusBadgeText}>진행중</Text>
          </View>
        )}
      </View>

      {/* 제목 */}
      <Text style={styles.mainTitle}>{title}</Text>

      {/* 설명 */}
      <Text style={styles.mainDescription}>{description}</Text>
    </>
  );
}
