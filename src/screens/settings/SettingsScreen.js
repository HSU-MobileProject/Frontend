import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './SettingsScreen.styles';
import colors from '../../assets/colors';
import ProfileSettingsTab from './components/ProfileSettingsTab';
import SecuritySettingsTab from './components/SecuritySettingsTab';
import NotificationSettingsTab from './components/NotificationSettingsTab';
import PrivacySettingsTab from './components/PrivacySettingsTab';

export default function SettingsScreen({ navigation, setHideHeader }) {
  const [activeTab, setActiveTab] = useState('profile');

  React.useEffect(() => {
    setHideHeader?.(true);
  }, [setHideHeader]);

  const tabs = [
    { id: 'profile', label: '프로필', icon: 'user' },
    { id: 'security', label: '보안', icon: 'lock' },
    { id: 'notification', label: '알림', icon: 'bell' },
    { id: 'privacy', label: '개인정보', icon: 'info-circle' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSettingsTab />;
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
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.logo}>
            <Text style={styles.logoToy}>Toy</Text>
            <Text style={styles.logoLink}>Link</Text>
          </Text>
        </View>
        <TouchableOpacity>
          <Icon name="bell" size={18} color={colors.black} />
        </TouchableOpacity>
      </View>

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
          <Icon
            name="arrow-left"
            size={14}
            color={colors.black}
            style={styles.backIcon}
          />
          <Text style={styles.backButtonText}>마이페이지로 돌아가기</Text>
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>설정</Text>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          {tabs.map(tab => (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tab, activeTab === tab.id && styles.tabActive]}
              onPress={() => setActiveTab(tab.id)}
            >
              <Icon
                name={tab.icon}
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
          ))}
        </View>

        {/* Tab Content */}
        {renderTabContent()}
      </ScrollView>
    </SafeAreaView>
  );
}
