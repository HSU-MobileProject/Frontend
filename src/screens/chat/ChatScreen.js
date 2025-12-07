import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './ChatScreen.styles';
import ChatHeader from './components/ChatHeader';
import ChatMessage from './components/ChatMessage';
import MessageInput from './components/MessageInput';
import { chatMessagesData } from './mockData';

export default function ChatScreen({ route, navigation }) {
  const { chatId, userName } = route.params || {
    chatId: 1,
    userName: '이디자이너',
  };

  // 더미 데이터
  const avatarColors = {
    1: '#34C3F1',
    2: '#00B26B',
    3: '#FFE57F',
  };

  const [messages, setMessages] = useState(chatMessagesData[chatId] || []);

  const handleSendMessage = text => {
    const newMessage = {
      id: messages.length + 1,
      sender: 'me',
      text: text,
      timestamp: new Date().toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <ChatHeader
        userName={userName}
        status="online"
        avatarColor={avatarColors[chatId]}
        onBackPress={() => navigation?.goBack()}
        onMenuPress={() => console.log('Menu pressed')}
      />

      {/* Messages */}
      <ScrollView
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map(msg => (
          <ChatMessage
            key={msg.id}
            sender={msg.sender}
            text={msg.text}
            timestamp={msg.timestamp}
            isLink={msg.isLink}
          />
        ))}
      </ScrollView>

      {/* Input */}
      <MessageInput onSendMessage={handleSendMessage} />
    </SafeAreaView>
  );
}
