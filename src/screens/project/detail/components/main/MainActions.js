import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MessageCircle, Star, Share2 } from "lucide-react-native";
import styles from "../../ProjectDetail.styles";

export default function MainActions({ isFree, onPurchasePress, isOwner }) {
  if (isOwner) return null;

  return (
    <View style={styles.mainActions}>
      {/* 구매 / 다운로드 버튼 */}
      {!isOwner && (
        <TouchableOpacity
          style={isFree ? styles.freeMainBtn : styles.mainBuyBtn}
          activeOpacity={0.9}
          onPress={() => {
            if (onPurchasePress) onPurchasePress();
          }}
        >
          <Text style={isFree ? styles.freeMainBtnText : styles.mainBuyBtnText}>
            {isFree ? "다운로드" : "구매하기"}
          </Text>
        </TouchableOpacity>
      )}

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
  );
}
