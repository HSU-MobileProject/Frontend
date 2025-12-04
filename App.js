import React, { useState } from 'react';
import { View } from 'react-native';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProjectListScreen from './src/screens/project/ProjectListScreen';
import ProjectDetailScreen from './src/screens/project/ProjectDetailScreen';
import LoginScreen from './src/screens/auth/LoginScreen';
import SignupScreen from './src/screens/auth/SignupScreen';
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

  const showAddButtonTabs = ['메인', '검색', '즐겨찾기'];
  const showAddButton = showAddButtonTabs.includes(activeTab);

  return (
    <NavigationContainer ref={navigationRef}>
      <View style={{ flex: 1 }}>
        {/* 인증 화면 (로그인/회원가입) */}
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

            {/* 메인 앱 스택 */}
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

                <Stack.Screen name="ProjectDetail">
                  {props => (
                    <ProjectDetailScreen
                      {...props}
                      setHideHeader={setHideHeader}
                    />
                  )}
                </Stack.Screen>
              </Stack.Navigator>
            </View>

            {/* 플로팅 버튼 */}
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

            {/* 하단 네비게이션 바 */}
            <NavigationBar
              activeTab={activeTab}
              onPress={setActiveTab}
              onLayoutNavBar={setNavBarHeight}
              navigationRef={navigationRef}
            />
          </>
        )}
      </View>
    </NavigationContainer>
  );
}
