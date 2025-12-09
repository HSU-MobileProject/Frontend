import React, { useState } from 'react';
import { View } from 'react-native';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox } from 'react-native';

// Ignore specific warnings
LogBox.ignoreLogs(['HEADERS_TIMEOUT_ERROR', 'Headers Timeout Error']);

import ProjectListScreen from './src/screens/project/list/ProjectListScreen';
import ProjectListAllScreen from './src/screens/project/list/ProjectListAllScreen';
import ProjectDetailScreen from './src/screens/project/detail/ProjectDetailScreen';
import ProjectEditScreen from './src/screens/project/form/ProjectEditScreen';
import ProjectCreateScreen from './src/screens/project/form/ProjectCreateScreen';
import ProjectLikeScreen from './src/screens/project/list/ProjectLikeScreen';
import ProjectSearchScreen from './src/screens/project/list/ProjectSearchScreen';

import NotificationScreen from './src/screens/notification/NotificationScreen';

import LoginScreen from './src/screens/auth/LoginScreen';
import SignupScreen from './src/screens/auth/SignupScreen';

import MyPageScreen from './src/screens/mypage/MyPageScreen';
import SettingsScreen from './src/screens/settings/SettingsScreen';

import ChatListScreen from './src/screens/chat/ChatListScreen';
import ChatScreen from './src/screens/chat/ChatScreen';

import PaymentHistoryScreen from './src/screens/payment/PaymentHistoryScreen';
import PaymentScreen from './src/screens/payment/PaymentScreen';

import NavigationBar from './src/components/NavigationBar';
import ProjectAddButton from './src/components/ProjectAddButton';
import Header from './src/components/HeaderBar';

import { NotificationProvider } from './src/contexts/NotificationContext';
import { ChatProvider } from './src/contexts/ChatContext';

export const navigationRef = createNavigationContainerRef();
const Stack = createNativeStackNavigator();

export default function App() {
  const [activeTab, setActiveTab] = useState('메인');
  const [navBarHeight, setNavBarHeight] = useState(0);
  const [hideHeader, setHideHeader] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [hideAddButton, setHideAddButton] = useState(false);
  const [hideNavBar, setHideNavBar] = useState(false);

  // Authentication Persistence
  React.useEffect(() => {
    // Dynamically import auth to avoid initialization issues if not used
    const checkAuth = async () => {
      const { authService } = require('./src/services/authService');
      const unsubscribe = authService.onAuthStateChanged(user => {
        setIsLoggedIn(!!user);
      });
      return unsubscribe;
    };

    let unsubscribe;
    checkAuth().then(unsub => { unsubscribe = unsub; });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const showAddButtonTabs = ['메인', '검색', '즐겨찾기'];
  const showAddButton = showAddButtonTabs.includes(activeTab) && !hideAddButton;

  const handleStateChange = () => {
    const state = navigationRef.getRootState();
    if (!state || !state.routes) return;

    // 현재 라우트 (맨 위)
    const currentRoute = navigationRef.getCurrentRoute();
    const currentRouteName = currentRoute?.name ?? '';

    // 1. 탭 상태 동기화 (스택 역추적)
    // 스택을 뒤에서부터 탐색하여 탭과 매핑되는 첫 번째 라우트를 찾음
    const tabMapping = {
      'ProjectList': '메인',
      'ProjectListAll': '메인',
      'ProjectSearch': '검색',
      'ProjectLike': '즐겨찾기',
      'ChatList': '채팅',
      'ChatDetail': '채팅',
      'MyPage': '내정보',
      'Settings': '내정보',
    };

    let newTab = activeTab; // 기본값: 현재 탭 유지
    const routes = state.routes; // Root Stack routes

    // 0. 명시적 탭 지정 확인 (UI Override)
    if (currentRoute?.params?.targetTab) {
      newTab = currentRoute.params.targetTab;
      setActiveTab(newTab);
      // 플로팅 버튼/NavBar 숨김 처리는 아래 로직 계속 수행
    } else {
        for (let i = routes.length - 1; i >= 0; i--) {
          const route = routes[i];
          if (tabMapping[route.name]) {
            newTab = tabMapping[route.name];
            break;
          }
        }
        setActiveTab(newTab);
    }

    // 2. 플로팅 버튼 숨김 처리
    if (['ProjectDetail', 'ProjectEdit', 'ProjectCreate', 'Notification', 'Payment', 'PaymentHistory'].includes(currentRouteName)) {
      setHideAddButton(true);
    } else {
      setHideAddButton(false);
    }

    // 3. ChatScreen일 때 헤더 숨기기
    if (currentRouteName === 'ChatDetail') {
      setHideHeader(true);
    } else {
      setHideHeader(false);
    }

    // 4. Notification 화면에서 NavBar 숨기기
    if (currentRouteName === 'Notification') {
      setHideNavBar(true);
    } else {
      setHideNavBar(false);
    }
  };

  return (
    <NotificationProvider>
      <ChatProvider>
        <NavigationContainer ref={navigationRef} onStateChange={handleStateChange}>
          <View style={{ flex: 1 }}>
            {/* 로그인 / 회원가입 */}
            {!isLoggedIn ? (
              showSignup ? (
                <SignupScreen
                  setShowSignup={setShowSignup}
                  setIsLoggedIn={setIsLoggedIn}
                />
              ) : (
                <LoginScreen
                  setShowSignup={setShowSignup}
                  setIsLoggedIn={setIsLoggedIn}
                />
              )
            ) : (
              <>
                {!hideHeader && <Header />}

                {/* 메인 네비게이션 */}
                <View style={{ flex: 1 }}>
                  <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="ProjectList">
                      {props => (
                        <ProjectListScreen
                          {...props}
                          setHideHeader={setHideHeader}
                        />
                      )}
                    </Stack.Screen>

                    <Stack.Screen name="ProjectListAll">
                      {props => <ProjectListAllScreen {...props} />}
                    </Stack.Screen>

                    <Stack.Screen name="ProjectLike">
                      {props => <ProjectLikeScreen {...props} />}
                    </Stack.Screen>

                    <Stack.Screen name="ProjectSearch">
                      {props => <ProjectSearchScreen {...props} />}
                    </Stack.Screen>

                    <Stack.Screen name="ProjectDetail">
                      {props => (
                        <ProjectDetailScreen
                          {...props}
                          setHideHeader={setHideHeader}
                        />
                      )}
                    </Stack.Screen>

                    <Stack.Screen name="ProjectEdit">
                      {props => <ProjectEditScreen {...props} />}
                    </Stack.Screen>

                    <Stack.Screen name="ProjectCreate">
                      {props => <ProjectCreateScreen {...props} />}
                    </Stack.Screen>

                    <Stack.Screen name="MyPage">
                      {props => (
                        <MyPageScreen
                          {...props}
                          setIsLoggedIn={setIsLoggedIn}
                          setHideHeader={setHideHeader}
                        />
                      )}
                    </Stack.Screen>

                    <Stack.Screen name="Settings">
                      {props => (
                        <SettingsScreen {...props} setHideHeader={setHideHeader} />
                      )}
                    </Stack.Screen>

                    <Stack.Screen
                      name="ChatList"
                      component={ChatListScreen}
                    />

                    <Stack.Screen
                      name="ChatDetail"
                      component={ChatScreen}
                    />

                    <Stack.Screen name="Notification">
                      {props => <NotificationScreen {...props} />}
                    </Stack.Screen>

                    <Stack.Screen name="PaymentHistory" component={PaymentHistoryScreen} />
                    <Stack.Screen name="Payment" component={PaymentScreen} />
                  </Stack.Navigator>
                </View>

                {/* 플로팅 프로젝트 등록 버튼 */}
                {showAddButton && (
                  <View
                    style={{
                      position: 'absolute',
                      right: 12,
                      bottom: navBarHeight + 16,
                      zIndex: 99,
                    }}
                  >
                    <ProjectAddButton />
                  </View>
                )}

                {/* 하단 네비게이션 */}
                {!hideNavBar && (
                  <NavigationBar
                    activeTab={activeTab}
                    onPress={setActiveTab}
                    onLayoutNavBar={setNavBarHeight}
                  />
                )}
              </>
            )}
          </View>
        </NavigationContainer>
      </ChatProvider>
    </NotificationProvider>
  );
}
