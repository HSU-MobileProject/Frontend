import React from 'react';
import { View, Text } from 'react-native';
import styles from './ProjectList.styles';

const ProjectListScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>프로젝트 목록 화면</Text>
    </View>
  );
};

export default ProjectListScreen;