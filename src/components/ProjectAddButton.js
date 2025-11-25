import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Plus } from 'lucide-react-native';
import styles from './styles/ProjectAddButton.styles';
import colors from '../assets/colors'; 
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const scale = width / 409;

export default function ProjectAddButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Plus
        size={20 * scale}       
        color={colors.white}     
        strokeWidth={2.2}
        style={{ marginRight: 6 * scale }}
      />

      <Text style={styles.text}>프로젝트 등록</Text>
    </TouchableOpacity>
  );
}