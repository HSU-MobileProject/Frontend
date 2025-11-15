import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './ProjectDetail.styles';

const ProjectDetailScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>임시 화면</Text>
      </View>
    </SafeAreaView>
  );
};

export default ProjectDetailScreen;