/**
 * Sample React Native App (JavaScript version)
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProjectListScreen from './src/screens/Project/ProjectListScreen';
import ProjectDetailScreen from './src/screens/Project/ProjectDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator>
        <Stack.Screen
          name="ProjectList"
          component={ProjectListScreen}
          options={{ title: '프로젝트 목록' }}
        />
        <Stack.Screen
          name="ProjectDetail"
          component={ProjectDetailScreen}
          options={{ title: '프로젝트 상세' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}