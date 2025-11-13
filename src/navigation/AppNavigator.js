import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProjectListScreen from '../screens/Project/ProjectListScreen';
import ProjectDetailScreen from '../screens/Project/ProjectDetailScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='ProjectList' component={ProjectListScreen} />
        <Stack.Screen name='ProjectDetail' component={ProjectDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}