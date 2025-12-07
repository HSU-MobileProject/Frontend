import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import styles from './ChatListItem.styles';

const { width } = Dimensions.get('window');
const scale = width / 409;

export default function ChatListItem({
  name,
  lastMessage,
  lastMessageTime,
  unreadCount,
  avatarColor,
  onPress,
}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {/* Avatar */}
      <View style={[styles.avatar, { backgroundColor: avatarColor }]}>
        <Text style={styles.avatarText}>{name.charAt(0)}</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.time}>{lastMessageTime}</Text>
        </View>

        {/* Message */}
        <Text style={styles.message} numberOfLines={1}>
          {lastMessage}
        </Text>
      </View>

      {/* Unread Badge */}
      {unreadCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{unreadCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
