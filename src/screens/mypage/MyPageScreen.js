import React, { useState } from 'react'; // Force rebuild
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './MyPageScreen.styles';
import colors from '../../assets/colors';
import UserInfoCard from './components/UserInfoCard';
import GitHubCard from './components/GitHubCard';

import ProjectTabPanel from './components/ProjectTabPanel';
import GitHubConnectModal from './modals/GitHubConnectModal';
import { authService } from '../../services/authService';
import { getFirestore, doc, onSnapshot, collection, query, where, getDocs } from '@react-native-firebase/firestore';

export default function MyPageScreen({
  setIsLoggedIn,
  setHideHeader,
  navigation,
}) {
  const [userInfo, setUserInfo] = useState(null);
  const [gitHubModalVisible, setGitHubModalVisible] = useState(false);
  const [isGitHubConnected, setIsGitHubConnected] = useState(false);
  const [gitHubUsername, setGitHubUsername] = useState(null);

  React.useEffect(() => {
    setHideHeader?.(false);

    // Fetch User Data
    const fetchUserData = async () => {
      try {
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
          const db = getFirestore();
          // 실시간 업데이트를 위해 onSnapshot 사용
          const unsubscribe = onSnapshot(doc(db, 'users', currentUser.uid), async (docSnap) => {
            if (docSnap.exists()) {
              const data = docSnap.data();
              if (!data) return;

              // 1. 등록된 프로젝트 수 및 받은 좋아요 수 계산
              let regCount = 0;
              let likesCount = 0;
              try {
                const q = query(collection(db, 'projects'), where('ownerId', '==', currentUser.uid));
                const projectsSnapshot = await getDocs(q);

                regCount = projectsSnapshot.size;
                projectsSnapshot.forEach(p => {
                  likesCount += (p.data().likes || 0);
                });
              } catch (e) {
                console.log("Stats fetch error:", e);
              }

              // 2. 지원한 프로젝트 수 계산
              let supCount = 0;
              try {
                const q2 = query(collection(db, 'applications'), where('applicantId', '==', currentUser.uid));
                const supSnapshot = await getDocs(q2);
                supCount = supSnapshot.size;
              } catch (e) {
                console.log("Support count fetch error:", e);
              }

              setUserInfo({
                name: data.displayName || '이름 없음',
                email: data.email || '',
                userType: data.userType || 'personal',
                registeredCount: regCount,
                supportedCount: supCount,
                totalLikes: likesCount,
                photoURL: data.photoURL || data.profileImage || null,
                role: data.role || '신규 회원',
                skills: data.skills || [],
                bio: data.bio || '',
              });

              const githubProvider = currentUser.providerData.find(p => p.providerId === 'github.com');
              const isGithub = !!githubProvider;
              setIsGitHubConnected(isGithub);
              if (isGithub) {
                setGitHubUsername(githubProvider.displayName || data.displayName || 'GitHub User');
              }
            }
          });
          return unsubscribe;
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [setHideHeader]);

  const handleLogout = async () => {
    try {
      await authService.logout();
      setIsLoggedIn(false);
    } catch (e) {
      console.error("Logout Error:", e);
    }
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
          gitHubUsername={gitHubUsername}
        />

        {/* 프로젝트 탭 패널 - navigation 전달 */}
        <ProjectTabPanel navigation={navigation} />
      </ScrollView>

      {/* GitHub 연동 모달 */}
      <GitHubConnectModal
        visible={gitHubModalVisible}
        onClose={closeGitHubModal}
      />
    </SafeAreaView>
  );
}
