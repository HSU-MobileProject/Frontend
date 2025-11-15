import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles/HeaderBar.styles';

export default function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.toy}>Toy</Text>
        <Text style={styles.link}>Link</Text>
      </View>

      <TouchableOpacity style={styles.notificationBtn}>
        <Image 
          source={require('../assets/icons/notificationBtn.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
}