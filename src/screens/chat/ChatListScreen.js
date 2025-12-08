import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './ChatListScreen.styles';
import ChatListItem from './components/ChatListItem';
import { useChat } from '../../contexts/ChatContext';

export default function ChatListScreen({ navigation }) {
  const { chatRooms } = useChat();

  // No need for local fetching effect


  const handleChatItemPress = chat => {
    navigation?.navigate('ChatDetail', {
      chatId: chat.id,
      userName: chat.name,
      otherUserId: chat.otherUserId
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

        {chatRooms.length === 0 ? (
          <View style={{ padding: 20, alignItems: 'center' }}>
            <Text style={{ color: '#888' }}>진행 중인 채팅이 없습니다.</Text>
          </View>
        ) : (
          chatRooms.map(chat => (
            <ChatListItem
              key={chat.id}
              chatId={chat.id}
              name={chat.name}
              lastMessage={chat.lastMessage}
              lastMessageTime={chat.lastMessageTime}
              unreadCount={chat.unreadCount}
              avatarColor={chat.avatarColor}
              onPress={() => handleChatItemPress(chat)}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
