import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { ArrowLeft, MoreVertical } from 'lucide-react-native';
import styles from './ChatHeader.styles';

const { width } = Dimensions.get('window');
const scale = width / 409;

export default function ChatHeader({
  userName,
  status = 'online',
  avatarColor,
  onBackPress,
  onMenuPress,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
          <ArrowLeft size={17 * scale} color="#000" />
        </TouchableOpacity>

        <View style={[styles.avatar, { backgroundColor: avatarColor }]}>
          <Text style={styles.avatarText}>{userName.charAt(0)}</Text>
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.status}>
            {status === 'online' ? '온라인' : '오프라인'}
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.menuButton} onPress={onMenuPress}>
        <MoreVertical size={17 * scale} color="#000" />
      </TouchableOpacity>
    </View>
  );
}
