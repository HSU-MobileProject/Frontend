import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MessageCircle, Heart, } from "lucide-react-native";
import styles from "../../ProjectDetail.styles";

export default function MainActions({ isFree, onPurchasePress, isOwner, onApplyPress, myApplication, isLiked, onLikePress, onChatPress }) {
  if (isOwner) return null;

  return (
    <View style={styles.mainActions}>
      {/* 구매 / 다운로드 버튼 */}
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <TouchableOpacity
          style={[isFree ? styles.freeMainBtn : styles.mainBuyBtn, { flex: 1 }]}
          activeOpacity={0.9}
          onPress={() => {
            if (onPurchasePress) onPurchasePress();
          }}
        >
          <Text style={isFree ? styles.freeMainBtnText : styles.mainBuyBtnText}>
            {isFree ? "다운로드" : "구매하기"}
          </Text>
        </TouchableOpacity>

        {myApplication ? (
          <View style={[styles.mainBuyBtn, { flex: 1, backgroundColor: '#E0E0E0' }]}>
            <Text style={[styles.mainBuyBtnText, { color: '#666', fontSize: 13 }]}>
              {myApplication.role} ({myApplication.status === 'pending' ? '심사중' : myApplication.status})
            </Text>
          </View>
        ) : (
          <TouchableOpacity
            style={[styles.mainBuyBtn, { flex: 1, backgroundColor: '#00C853' }]} // Green for Apply
            activeOpacity={0.9}
            onPress={onApplyPress}
          >
            <Text style={styles.mainBuyBtnText}>
              지원하기
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* 채팅 아이콘 */}
      <TouchableOpacity 
          style={styles.mainChatBtn} 
          activeOpacity={0.9}
          onPress={onChatPress}
      >
        <MessageCircle size={18} color="#1A1A1A" />
        <Text style={styles.mainChatBtnText}>채팅</Text>
      </TouchableOpacity>

      {/* 좋아요 아이콘 */}
      <TouchableOpacity 
        style={styles.mainIconBtn} 
        activeOpacity={0.8}
        onPress={onLikePress}
      >
        <Heart   
          size={18} 
          color={isLiked ? "#E91E63" : "#1A1A1A"} 
          fill={isLiked ? "#E91E63" : "transparent"}
        />
      </TouchableOpacity>
    </View>
  );
}
