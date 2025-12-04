import React from 'react';
import { TouchableOpacity, Text, Dimensions } from 'react-native';
import { Plus } from 'lucide-react-native';
import { useNavigation } from "@react-navigation/native";
import styles from './styles/ProjectAddButton.styles';
import colors from '../assets/colors'; 

const { width } = Dimensions.get('window');
const scale = width / 409;

export default function ProjectAddButton() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate("ProjectCreate")}
    >
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