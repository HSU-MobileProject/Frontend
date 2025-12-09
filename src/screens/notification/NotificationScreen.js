import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CheckCheck, ChevronLeft } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./NotificationScreen.styles";
import NotificationFilter from "./components/NotificationFilter";
import NotificationItem from "./components/NotificationItem";
import { authService } from "../../services/authService";
import { getFirestore, doc, updateDoc, deleteDoc, writeBatch } from '@react-native-firebase/firestore';
import { useNotifications } from "../../contexts/NotificationContext";

export default function NotificationScreen() {
  const navigation = useNavigation();
  const { notifications, unreadCount, markAllAsRead } = useNotifications();
  const [activeTab, setActiveTab] = useState("전체");

  const filteredNotifications = notifications.filter(n => {
    if (activeTab === "전체") return true;
    if (activeTab === "읽지않음") return !n.isRead;
    if (activeTab === "메시지") return n.type === 'message';
    if (activeTab === "즐겨찾기") return n.type === 'like' || n.type === 'interest';
    if (activeTab === "시스템") return !['message', 'like', 'interest'].includes(n.type);
    return true;
  });

  const handleDeleteAll = async () => {
    const user = authService.getCurrentUser();
    if (!user) return;

    const db = getFirestore();
    const batch = writeBatch(db);

    notifications.forEach(n => {
      const ref = doc(db, 'notifications', n.id);
      batch.delete(ref);
    });

    try {
      await batch.commit();
    } catch (e) {
      console.error("Batch Delete Error:", e);
    }
  };

  const handleConfirm = async (id) => {
    try {
      const db = getFirestore();
      const notif = notifications.find(n => n.id === id);
      if (notif) {
        await updateDoc(doc(db, 'notifications', id), {
          isRead: !notif.isRead
        });
      }
    } catch (e) {
      console.error("Toggle Read Error:", e);
    }
  };

  const handleDelete = async (id) => {
    try {
      const db = getFirestore();
      await deleteDoc(doc(db, 'notifications', id));
    } catch (e) {
      console.error("Delete Notification Error:", e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTitleRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 8 }}>
            <ChevronLeft size={24} color="#1A1A1A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>알림</Text>
          <Text style={styles.headerCount}>{unreadCount}개의 읽지 않은 알림</Text>
        </View>
        <TouchableOpacity style={styles.readAllButton} onPress={markAllAsRead}>
          <CheckCheck size={12} color="#1A1A1A" />
          <Text style={styles.readAllText}>모두 읽음</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
        <ScrollView
          style={styles.safeArea}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Filter */}
          <NotificationFilter
            activeTab={activeTab}
            onSelectTab={setActiveTab}
            counts={{ all: notifications.length, unread: unreadCount }}
          />

          {/* List */}
          <View style={styles.listContent}>
            {filteredNotifications.map((item) => (
              <NotificationItem
                key={item.id}
                item={{ ...item, onConfirm: handleConfirm, onDelete: handleDelete }}
              />
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <Text style={styles.totalCount}>총 {notifications.length}개의 알림</Text>
        <TouchableOpacity style={styles.deleteAllButton} onPress={handleDeleteAll}>
          <Text style={styles.deleteAllText}>모두 삭제</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
