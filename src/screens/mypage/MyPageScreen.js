import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './MyPageScreen.styles';
import colors from '../../assets/colors';
import UserInfoCard from './components/UserInfoCard';
import GitHubCard from './components/GitHubCard';
import ProjectTabPanel from './components/ProjectTabPanel';
import GitHubConnectModal from './modals/GitHubConnectModal';

export default function MyPageScreen({
  setIsLoggedIn,
  setHideHeader,
  navigation,
}) {
  const [userInfo] = useState({
    name: '김개발',
    email: 'kim@email.com',
    userType: 'personal',
    registeredCount: 2,
    supportedCount: 4,
    totalLikes: 68,
  });

  const [gitHubModalVisible, setGitHubModalVisible] = useState(false);
  const [isGitHubConnected, setIsGitHubConnected] = useState(true);

  React.useEffect(() => {
    setHideHeader?.(false);
  }, [setHideHeader]);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const openGitHubModal = () => {
    setGitHubModalVisible(true);
  };

  const closeGitHubModal = () => {
    setGitHubModalVisible(false);
  };

  const openSettings = () => {
    navigation?.navigate('Settings');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 헤더 */}
        <View style={styles.header}>
          <View style={styles.headerContent} />
        </View>

        {/* 사용자 정보 카드 */}
        <UserInfoCard
          userInfo={userInfo}
          onLogout={handleLogout}
          onSettings={openSettings}
        />

        {/* GitHub 연동 카드 */}
        <GitHubCard
          onOpenGitHubModal={openGitHubModal}
          isGitHubConnected={isGitHubConnected}
        />

        {/* 프로젝트 탭 패널 */}
        <ProjectTabPanel />
      </ScrollView>

      {/* GitHub 연동 모달 */}
      <GitHubConnectModal
        visible={gitHubModalVisible}
        onClose={closeGitHubModal}
      />
    </SafeAreaView>
  );
}
