import React from "react";
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native";
import { MessageCircle, Heart, GitCommit, UserPlus, CheckCircle, Bell, X } from "lucide-react-native";
import { theme } from "../../../styles/theme";
import styles from "./NotificationItem.styles";

import { usersDummy } from "../../../utils/notificationsDummy";

const { scale } = theme;

export default function NotificationItem({ item }) {
  // 알림 타입별 색상 반환
  const getColorByType = (type) => {
    switch (type) {
      case "message": return "#2196F3"; // Blue
      case "like": 
      case "interest": return "#E91E63"; // Pink
      case "apply": 
      case "approve": return "#4CAF50"; // Green
      case "system": return "#757575"; // Gray
      default: return "#757575";
    }
  };

  const itemColor = getColorByType(item.type);
  const userInfo = usersDummy[item.userId] || { name: "알 수 없음", profileImage: null };

  const getIcon = () => {
    switch (item.type) {
      case "message": return <MessageCircle size={12 * scale} color={itemColor} />;
      case "like": return <Heart size={12 * scale} color={itemColor} />;
      case "system": return <GitCommit size={12 * scale} color={itemColor} />;
      case "apply": return <UserPlus size={12 * scale} color={itemColor} />;
      case "approve": return <CheckCircle size={12 * scale} color={itemColor} />;
      default: return <Bell size={12 * scale} color={itemColor} />;
    }
  };

  const getTitle = () => {
    switch (item.type) {
      case "message": return "새로운 메시지";
      case "like": return "좋아요";
      case "system": return "GitHub 업데이트";
      case "apply": return "새로운 지원자";
      case "approve": return "지원 승인";
      case "interest": return "새로운 관심";
      default: return "알림";
    }
  };

  // 배경색에 투명도 적용
  const getBackgroundColor = (color) => {
    if (color === "#2196F3") return "rgba(33, 150, 243, 0.125)";
    if (color === "#4CAF50") return "rgba(76, 175, 80, 0.125)";
    if (color === "#E91E63") return "rgba(233, 30, 99, 0.125)";
    if (color === "#757575") return "rgba(117, 117, 117, 0.125)";
    return "rgba(0,0,0,0.05)";
  };

  const isReadStyle = item.isRead ? {
    backgroundColor: "#F5F5F5",
    borderColor: "#E0E0E0",
    opacity: 0.7,
  } : {
    borderColor: itemColor,
  };

  return (
    <View style={[styles.card, isReadStyle]}>
      {/* Icon Container */}
      <View style={[styles.iconContainer, { backgroundColor: item.isRead ? "#E0E0E0" : getBackgroundColor(itemColor) }]}>
        {userInfo.profileImage ? (
          <View style={[styles.profileWrapper, { backgroundColor: item.isRead ? "#BDBDBD" : itemColor }]}>
             <Text style={styles.profileText}>{userInfo.name.charAt(0)}</Text>
          </View>
        ) : (
          React.cloneElement(getIcon(), { color: item.isRead ? "#757575" : itemColor })
        )}
      </View>

      {/* Content */}
      <View style={styles.contentContainer}>
        {/* Header: Title & Time */}
        <View style={styles.headerRow}>
          <View style={styles.titleRow}>
             <Text style={[styles.title, item.isRead && { color: "#757575" }]}>{getTitle()}</Text>
             {!item.isRead && <View style={[styles.dot, { backgroundColor: itemColor }]} />}
          </View>
          <Text style={styles.time}>{item.time}</Text>
        </View>

        {/* Message */}
        <Text style={styles.message} numberOfLines={2}>
          {userInfo.name !== "System" && <Text style={{ fontWeight: "bold" }}>{userInfo.name}님이 </Text>}
          {item.target && <Text style={{ fontWeight: "bold" }}>'{item.target}' </Text>}
          {item.role && <Text>의 {item.role} </Text>}
          {item.action}
        </Text> 
        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.confirmButton]} 
            onPress={() => item.onConfirm && item.onConfirm(item.id)}
          >
            <CheckCircle size={16} color={item.isRead ? "#BDBDBD" : "#4CAF50"} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, styles.deleteButton]} 
            onPress={() => item.onDelete && item.onDelete(item.id)}
          >
            <X size={16} color="#F44336" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}