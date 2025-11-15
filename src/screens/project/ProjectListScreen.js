import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './ProjectList.styles';

const ProjectListScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>메인 화면</Text>
      </View>
    </SafeAreaView>
  );
};

export default ProjectListScreen;