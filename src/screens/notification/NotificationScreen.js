import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CheckCheck, ChevronLeft } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./NotificationScreen.styles";
import NotificationFilter from "./components/NotificationFilter";
import NotificationItem from "./components/NotificationItem";
import { authService } from "../../services/authService";
import { getFirestore, collection, query, where, orderBy, onSnapshot, doc, updateDoc, deleteDoc, writeBatch } from '@react-native-firebase/firestore';

export default function NotificationScreen() {
  const navigation = useNavigation();
  // ---------------------------------------------------------
  // [수정] Firestore 실시간 연동
  // ---------------------------------------------------------

  // State

  // State
  const [activeTab, setActiveTab] = useState("전체");
  const [notifications, setNotifications] = useState([]);

  // Fetch Notifications
  React.useEffect(() => {
    const user = authService.getCurrentUser();
    if (!user) return;

    const db = getFirestore();
    const q = query(
      collection(db, 'notifications'),
      where('receiverId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          time: data.createdAt ? data.createdAt.toDate().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }) : '',
          // NotificationItem에서 필요한 필드 매핑
          // target: data.projectTitle || data.target, (이미 저장될 때 포함된다고 가정)
        };
      });
      setNotifications(list);
    }, (error) => {
      console.error("Notification Fetch Error:", error);
    });

    return () => unsubscribe();
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const filteredNotifications = notifications.filter(n => {
    if (activeTab === "전체") return true;
    if (activeTab === "읽지않음") return !n.isRead;
    if (activeTab === "메시지") return n.type === 'message';
    if (activeTab === "좋아요") return n.type === 'like' || n.type === 'interest';
    if (activeTab === "시스템") return !['message', 'like', 'interest'].includes(n.type);
    return true;
  });

  const handleReadAll = async () => {
    const user = authService.getCurrentUser();
    if (!user) return;
    
    // Batch update for performance (limit 500)
    const db = getFirestore();
    const batch = writeBatch(db);
    
    notifications.filter(n => !n.isRead).forEach(n => {
      const ref = doc(db, 'notifications', n.id);
      batch.update(ref, { isRead: true });
    });

    try {
        await batch.commit();
    } catch (e) {
        console.error("Batch Read Error:", e);
    }
  };

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
        <TouchableOpacity style={styles.readAllButton} onPress={handleReadAll}>
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
