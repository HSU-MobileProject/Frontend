import React, { useState, useEffect } from 'react';
import { View, Text, Switch, ScrollView } from 'react-native';
import styles from './NotificationSettingsTab.styles';
import { authService } from '../../../services/authService';
import { getFirestore, doc, updateDoc, getDoc } from '@react-native-firebase/firestore';

export default function NotificationSettingsTab() {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState({
    receive: true,
    projectUpdate: true,
    projectFavorite: true,
    newMessage: true,
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const user = authService.getCurrentUser();
        if (user) {
          const db = getFirestore();
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.notificationSettings) {
              setNotifications(prev => ({ ...prev, ...data.notificationSettings }));
            }
          }
        }
      } catch (e) {
        console.error("Failed to load settings:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleToggle = async (field) => {
    const newVal = !notifications[field];
    const newSettings = { ...notifications, [field]: newVal };
    
    // Optimistic Update
    setNotifications(newSettings);

    try {
      const user = authService.getCurrentUser();
      if (user) {
        const db = getFirestore();
        await updateDoc(doc(db, 'users', user.uid), {
           notificationSettings: newSettings
        });
      }
    } catch (e) {
      console.error("Failed to save settings:", e);
      // Revert on error
      setNotifications(prev => ({ ...prev, [field]: !newVal }));
    }
  };

  const renderToggle = (field, label, description) => (
    <View style={styles.notificationItem}>
      <View style={styles.notificationTextContainer}>
        <Text style={styles.notificationLabel}>{label}</Text>
        {description && (
          <Text style={styles.notificationDescription}>{description}</Text>
        )}
      </View>
      <Switch
        value={notifications[field]}
        onValueChange={() => handleToggle(field)}
        trackColor={{ false: '#cbced4', true: '#00b26b' }}
        thumbColor="white"
      />
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.card}>
        {/* Main Notification Toggle */}
        {renderToggle('receive', '알림 받기', '모든 알림 활성화/비활성화')}

        <View style={styles.divider} />

        {/* Notification Preferences */}
        {notifications.receive && (
          <View style={styles.preferencesSection}>
            {renderToggle(
              'projectUpdate',
              '프로젝트 업데이트',
              '참여 중인 프로젝트의 새 소식',
            )}
            {renderToggle(
              'projectFavorite',
              '프로젝트 즐겨찾기',
              '내 프로젝트가 즐겨찾기 받았을 때',
            )}
            {renderToggle(
              'newMessage',
              '새 메시지',
              '다른 사용자로부터 받은 메시지',
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
}
