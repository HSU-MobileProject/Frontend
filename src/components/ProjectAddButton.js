import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import styles from './styles/ProjectAddButton.styles';

export default function ProjectAddButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Image
        source={require('../assets/icons/addBtn.png')}
        style={styles.icon}
      />
      <Text style={styles.text}>프로젝트 등록</Text>
    </TouchableOpacity>
  );
}
