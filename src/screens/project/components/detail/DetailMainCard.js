import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import {
  Star,
  Eye,
  Calendar,
  MessageCircle,
  Share2,
} from "lucide-react-native";

import styles from "./ProjectDetail.styles";
import categoryColors from "../../../../assets/categoryColors";

export default function DetailMainCard({ project }) {
  const categoryColor =
    categoryColors[project.category] || categoryColors.default;

  const isFree =
    project.priceType === "free" ||
    project.price === 0 ||
    project.price === "무료";

  const thumbnailUrl = project.thumbnailUrl || project.thumbnail;

  const created = project.createdAt
    ? new Date(project.createdAt).toLocaleDateString("ko-KR")
    : "";

  return (
    <View style={styles.mainCard}>
      
      {/* 썸네일 */}
      {thumbnailUrl && (
        <Image
          source={{ uri: thumbnailUrl }}
          style={styles.mainThumbnail}
          resizeMode="cover"
        />
      )}

      {/* 카테고리 / 진행중 */}
      <View style={styles.mainBadgeRow}>
        <View
          style={[styles.mainCategoryBadge, { backgroundColor: categoryColor }]}
        >
          <Text style={styles.mainCategoryBadgeText}>{project.category}</Text>
        </View>

        {project.isRecruiting !== false && (
          <View style={styles.mainStatusBadge}>
            <Text style={styles.mainStatusBadgeText}>진행중</Text>
          </View>
        )}
      </View>

      {/* 제목 */}
      <Text style={styles.mainTitle}>{project.title}</Text>

      {/* 설명 */}
      <Text style={styles.mainDescription}>{project.description}</Text>

      {/* 좋아요 · 조회수 · 등록일 */}
      <View style={styles.mainStatsRow}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Star size={16} color="#6B7280" />
          <Text style={styles.mainStatText}> {project.likes}</Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Eye size={16} color="#6B7280" />
          <Text style={styles.mainStatText}> {project.views}</Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Calendar size={16} color="#6B7280" />
          <Text style={styles.mainStatText}> {created} 등록</Text>
        </View>
      </View>

      <View style={styles.mainActions}>
        
        {/* 구매 / 다운로드 버튼 */}
        <TouchableOpacity
          style={isFree ? styles.freeMainBtn : styles.mainBuyBtn}
          activeOpacity={0.9}
        >
          <Text
            style={isFree ? styles.freeMainBtnText : styles.mainBuyBtnText}
          >
            {isFree ? "다운로드" : "구매하기"}
          </Text>
        </TouchableOpacity>

        {/* 채팅 아이콘 */}
        <TouchableOpacity style={styles.mainChatBtn} activeOpacity={0.9}>
          <MessageCircle size={18} color="#1A1A1A" />
          <Text style={styles.mainChatBtnText}>채팅</Text>
        </TouchableOpacity>

        {/* 좋아요 아이콘 */}
        <TouchableOpacity style={styles.mainIconBtn} activeOpacity={0.8}>
          <Star size={18} color="#1A1A1A" />
        </TouchableOpacity>

        {/* 공유 아이콘 */}
        <TouchableOpacity style={styles.mainIconBtn} activeOpacity={0.8}>
          <Share2 size={18} color="#1A1A1A" />
        </TouchableOpacity>
      </View>
    </View>
  );
}