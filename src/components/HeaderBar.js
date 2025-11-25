import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Bell } from 'lucide-react-native';
import styles from './styles/HeaderBar.styles';
import colors from '../assets/colors';

const { width } = Dimensions.get('window');
const scale = width / 409;

export default function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.toy}>Toy</Text>
        <Text style={styles.link}>Link</Text>
      </View>

      <TouchableOpacity style={styles.notificationBtn}>
        <Bell
          size={24 * scale}
          color={colors.black}
          strokeWidth={2.2}
        />
      </TouchableOpacity>
    </View>
  );
}