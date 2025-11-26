import React, { useState } from 'react';
import { View } from 'react-native';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProjectListScreen from './src/screens/project/ProjectListScreen';
import ProjectListAllScreen from './src/screens/project/ProjectListAllScreen';
import ProjectDetailScreen from './src/screens/project/ProjectDetailScreen';
import ProjectEditScreen from './src/screens/project/ProjectEditScreen';
import ProjectCreateScreen from './src/screens/project/ProjectCreateScreen';

import NavigationBar from './src/components/NavigationBar';
import ProjectAddButton from './src/components/ProjectAddButton';
import Header from './src/components/HeaderBar';

export const navigationRef = createNavigationContainerRef();
const Stack = createNativeStackNavigator();

export default function App() {
  const [activeTab, setActiveTab] = useState('메인');
  const [navBarHeight, setNavBarHeight] = useState(0);
  const [hideHeader, setHideHeader] = useState(false);

  const [hideAddButton, setHideAddButton] = useState(false);

  const showAddButtonTabs = ['메인', '검색', '즐겨찾기'];

  const showAddButton = showAddButtonTabs.includes(activeTab) && !hideAddButton;

  const handleStateChange = () => {

    const route = navigationRef.getCurrentRoute();
    const routeName = route?.name;

    if (['ProjectDetail', 'ProjectEdit', 'ProjectCreate'].includes(routeName)) {
      setHideAddButton(true);
    } else {
      setHideAddButton(false);
    }
  };

  return (
    <NavigationContainer 
      ref={navigationRef}
      onStateChange={handleStateChange}
    >
      <View style={{ flex: 1 }}>

        {!hideHeader && <Header />}

        <View style={{ flex: 1 }}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            
            <Stack.Screen name="ProjectList">
              {(props) => <ProjectListScreen />}
            </Stack.Screen>

            <Stack.Screen name="ProjectListAll">
              {(props) => <ProjectListAllScreen {...props}/>}
            </Stack.Screen>

            <Stack.Screen name="ProjectDetail">
              {(props) => <ProjectDetailScreen {...props} />}
            </Stack.Screen>
            
            <Stack.Screen name="ProjectEdit">
              {(props) => <ProjectEditScreen {...props} />}
            </Stack.Screen>

            <Stack.Screen name="ProjectCreate">
              {(props) => <ProjectCreateScreen {...props} />}
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
        <NavigationBar
          activeTab={activeTab}
          onPress={setActiveTab}
          onLayoutNavBar={setNavBarHeight}
          navigationRef={navigationRef}
        />

      </View>
    </NavigationContainer>
  );
}