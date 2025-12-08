import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './ChatScreen.styles';
import ChatHeader from './components/ChatHeader';
import ChatMessage from './components/ChatMessage';
import MessageInput from './components/MessageInput';
import { authService } from '../../services/authService';
import firestore from '@react-native-firebase/firestore';

export default function ChatScreen({ route, navigation }) {
  const { chatId, userName } = route.params;
  const [messages, setMessages] = useState([]);
  const currentUser = authService.getCurrentUser();

  // 메시지 로드
  React.useEffect(() => {
    if (!chatId) return;

    const unsubscribe = firestore()
      .collection('chatRooms')
      .doc(chatId)
      .collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot(snapshot => {
        if (!snapshot) return;
        const msgs = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            sender: data.senderId === currentUser.uid ? 'me' : 'other',
            text: data.text,
            timestamp: data.timestamp ? data.timestamp.toDate().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }) : '',
            isLink: false // TODO: 링크 처리 필요시 로직 추가
          };
        });
        setMessages(msgs);
      });

    return () => unsubscribe();
  }, [chatId]);

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    try {
      await firestore()
        .collection('chatRooms')
        .doc(chatId)
        .collection('messages')
        .add({
          text: text,
          senderId: currentUser.uid,
          timestamp: firestore.FieldValue.serverTimestamp(),
        });

      // 채팅방 최신 메시지 업데이트 (Trigger가 없다면 클라이언트에서 직접 업데이트 필요)
      // 현재 Cloud Functions에 updateChatRoomLastMessage 가 있으므로 생략 가능하나, 
      // 반응속도를 위해 클라이언트에서 같이 업데이트해주는 것이 좋음
      await firestore().collection('chatRooms').doc(chatId).update({
        lastMessage: text,
        updatedAt: firestore.FieldValue.serverTimestamp()
      });

    } catch (error) {
      console.error("Link Send Error:", error);
    }
  };

  // 아바타 컬러는 더미로 유지하거나 유저정보에서 가져와야 함
  const avatarColor = '#34C3F1';

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <ChatHeader
        userName={userName}
        status="online"
        avatarColor={avatarColor}
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
