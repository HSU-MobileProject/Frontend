import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Bell } from 'lucide-react-native';
import styles from './styles/HeaderBar.styles';

const { width } = Dimensions.get('window');
const scale = width / 409;

import { useNavigation } from '@react-navigation/native';
import { useNotifications } from '../contexts/NotificationContext';

export default function Header() {
  const navigation = useNavigation();
  const { unreadCount } = useNotifications();

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
        {unreadCount > 0 && (
          <View style={{
            position: 'absolute',
            right: -2,
            top: -2,
            backgroundColor: '#FF4D4D',
            borderRadius: 10,
            width: 16,
            height: 16,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
              {unreadCount > 99 ? '99+' : unreadCount}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}