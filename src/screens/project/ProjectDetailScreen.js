import React from 'react';
import { View, Text } from 'react-native';
import styles from './ProjectDetail.styles'; // ✅ 분리된 스타일 import

export default function ProjectDetailScreen({ route }) {
  const id = route?.params?.id ?? '없음';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>프로젝트 상세 화면</Text>
      <Text style={styles.text}>ID: {id}</Text>
    </View>
  );
}