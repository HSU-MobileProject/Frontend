import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { theme } from "../../../styles/theme";
import styles from "./NotificationFilter.styles";

export default function NotificationFilter({ activeTab, onSelectTab, counts }) {
  const tabs = [
    { key: "전체", label: "전체", count: counts.all, color: "#34C3F1" },
    { key: "읽지않음", label: "읽지않음", count: counts.unread, color: "#00B26B" },
    { key: "메시지", label: "메시지", count: 0, color: null },
    { key: "시스템", label: "시스템", count: 0, color: null },
    { key: "즐겨찾기", label: "즐겨찾기", count: 0, color: null },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={[
            styles.tabButton,
            activeTab === tab.key && styles.activeTabButton,
          ]}
          onPress={() => onSelectTab(tab.key)}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === tab.key && styles.activeTabText,
            ]}
          >
            {tab.label}
          </Text>
          {tab.count > 0 && (
            <View style={[styles.badge, { backgroundColor: tab.color || theme.colors.gray }]}>
              <Text style={styles.badgeText}>{tab.count}</Text>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}
