import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Bell } from 'lucide-react-native';
import styles from './styles/HeaderBar.styles';

const { width } = Dimensions.get('window');
const scale = width / 409;

import { useNavigation } from '@react-navigation/native';

export default function Header() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.toy}>Toy</Text>
        <Text style={styles.link}>Link</Text>
      </View>

      <TouchableOpacity 
        style={styles.notificationBtn}
        onPress={() => navigation.navigate("Notification")}
      >
        <Bell
          size={24 * scale}
          color="#515151"
          strokeWidth={2}
        />
      </TouchableOpacity>
    </View>
  );
}