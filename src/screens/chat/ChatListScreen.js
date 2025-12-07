import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './ChatListScreen.styles';
import ChatListItem from './components/ChatListItem';
import { chatListData } from './mockData';

export default function ChatListScreen({ navigation }) {
  const handleChatItemPress = chat => {
    navigation?.navigate('ChatDetail', {
      chatId: chat.id,
      userName: chat.name,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>채팅</Text>

        {/* Chat List */}
        {chatListData.map(chat => (
          <ChatListItem
            key={chat.id}
            name={chat.name}
            lastMessage={chat.lastMessage}
            lastMessageTime={chat.lastMessageTime}
            unreadCount={chat.unreadCount}
            avatarColor={chat.avatarColor}
            onPress={() => handleChatItemPress(chat)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
