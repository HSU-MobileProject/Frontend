import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Lock, Bell, Info, ArrowLeft } from 'lucide-react-native';
import styles from './SettingsScreen.styles';
import colors from '../../assets/colors';
import ProfileSettingsTab from './components/ProfileSettingsTab';
import SecuritySettingsTab from './components/SecuritySettingsTab';
import NotificationSettingsTab from './components/NotificationSettingsTab';
import PrivacySettingsTab from './components/PrivacySettingsTab';

import { authService } from '../../services/authService';
import {
  getFirestore,
  doc,
  onSnapshot,
} from '@react-native-firebase/firestore';

export default function SettingsScreen({ navigation, setHideHeader }) {
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState(null);

  React.useEffect(() => {
    setHideHeader?.(false);

    // 유저 정보 실시간 동기화
    const user = authService.getCurrentUser();
    if (!user) return;

    const db = getFirestore();
    const userDocRef = doc(db, 'users', user.uid);

    const unsubscribe = onSnapshot(
      userDocRef,
      docSnapshot => {
        if (docSnapshot.exists) {
          setUserData(docSnapshot.data());
        }
      },
      error => {
        console.error('User Fetch Error:', error);
      },
    );

    return () => unsubscribe();
  }, [setHideHeader]);

  const tabs = [
    { id: 'profile', label: '프로필', icon: User },
    { id: 'security', label: '보안', icon: Lock },
    { id: 'notification', label: '알림', icon: Bell },
    { id: 'privacy', label: '개인정보', icon: Info },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSettingsTab user={userData} navigation={navigation} />;
      case 'security':
        return <SecuritySettingsTab />;
      case 'notification':
        return <NotificationSettingsTab />;
      case 'privacy':
        return <PrivacySettingsTab />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation?.goBack()}
        >
          <ArrowLeft size={14} color={colors.black} style={styles.backIcon} />
          <Text style={styles.backButtonText}>마이페이지로 돌아가기</Text>
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>설정</Text>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          {tabs.map(tab => {
            const IconComponent = tab.icon;
            return (
              <TouchableOpacity
                key={tab.id}
                style={[styles.tab, activeTab === tab.id && styles.tabActive]}
                onPress={() => setActiveTab(tab.id)}
              >
                <IconComponent
                  size={14}
                  color={colors.black}
                  style={styles.tabIcon}
                />
                <Text
                  style={[
                    styles.tabText,
                    activeTab === tab.id && styles.tabTextActive,
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Tab Content */}
        {renderTabContent()}
      </ScrollView>
    </SafeAreaView>
  );
}
