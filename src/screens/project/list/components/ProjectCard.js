import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import styles from "./ProjectCard.styles";
import categoryColors from "../../../../assets/categoryColors";
import Colors from "../../../../assets/colors";
import { Star, Eye } from "lucide-react-native";

const { width } = Dimensions.get("window");
const scale = width / 409;

export default function ProjectCard({
  project,
  onPress, // 상세 페이지 이동용 콜백
  onPurchasePress, // 구매 버튼 콜백
  isOwner, // 본인 프로젝트 여부
}) {
  const {
    category,
    title,
    description,
    tags,
    likes,
    views,
    priceType,
    price,
    thumbnailUrl,
  } = project;

  const badgeColor = categoryColors[category] || categoryColors.default;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={styles.shadowWrapper}
    >
      <View style={styles.cardOuter}>
        {/* 썸네일 있는 경우만 표시 */}
        {thumbnailUrl && (
          <Image
            source={{ uri: thumbnailUrl }}
            style={styles.topImage}
            resizeMode="cover"
          />
        )}

        <View style={styles.bottomCard}>
          {/* 배지 & 통계 */}
          <View style={styles.headerRow}>
            <View style={[styles.badge, { backgroundColor: badgeColor }]}>
              <Text style={styles.badgeText}>{category}</Text>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Star size={16 * scale} color={Colors.grayDark} />
                <Text style={styles.statTextOutline}>{likes}</Text>
              </View>

              <View style={styles.statItem}>
                <Eye size={16 * scale} color={Colors.grayDark} />
                <Text style={styles.statTextOutline}>{views}</Text>
              </View>
            </View>
          </View>

          {/* 제목 */}
          <Text style={styles.title}>{title}</Text>

          {/* 설명 */}
          <Text style={styles.description}>{description}</Text>

          {/* 태그 */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.tagScroll}
          >
            <View style={styles.tagContainer}>
              {tags?.map((tag, i) => (
                <View key={i} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </ScrollView>

          <View style={styles.divider} />

          {/* 가격 + 구매 버튼 */}
          <View style={styles.footerRow}>
            <Text style={styles.priceLabel}>가격</Text>

            {/* 무료/유료 구분 */}
            {priceType === "free" ? (
              <Text style={styles.priceValue}>무료</Text>
            ) : (
              <Text style={styles.priceValue}>{price?.toLocaleString()}원</Text>
            )}

            {!isOwner && (
              <TouchableOpacity 
                style={styles.buyButton}
                onPress={onPurchasePress}
              >
                <Text style={styles.buyButtonText}>구매</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}