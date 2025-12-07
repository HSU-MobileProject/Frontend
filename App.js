import React, { useState } from 'react';
import { View } from 'react-native';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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

import NavigationBar from './src/components/NavigationBar';
import ProjectAddButton from './src/components/ProjectAddButton';
import Header from './src/components/HeaderBar';

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

  const showAddButtonTabs = ['메인', '검색', '즐겨찾기'];
  const showAddButton = showAddButtonTabs.includes(activeTab) && !hideAddButton;

  const handleStateChange = () => {
    const route = navigationRef.getCurrentRoute();
    const routeName = route?.name ?? '';

    // Add Button 숨김 처리
    if (['ProjectDetail', 'ProjectEdit', 'ProjectCreate', 'Notification'].includes(routeName)) {
      setHideAddButton(true);
    } else {
      setHideAddButton(false);
    }

    // NavBar 숨김 처리
    if (routeName === 'Notification') {
      setHideNavBar(true);
    } else {
      setHideNavBar(false);
    }
  };

  return (
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

                <Stack.Screen name="Notification">
                  {(props) => <NotificationScreen {...props} />}
                </Stack.Screen>

              </Stack.Navigator>
            </View>

            {/* 플로팅 등록 버튼 */}
            {showAddButton && !hideAddButton && (
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
                navigationRef={navigationRef}
              />
            )}
          </>
        )}
      </View>
    </NavigationContainer>
  );
}