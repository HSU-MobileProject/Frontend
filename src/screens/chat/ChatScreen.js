import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './ChatScreen.styles';
import ChatHeader from './components/ChatHeader';
import ChatMessage from './components/ChatMessage';
import MessageInput from './components/MessageInput';
import { authService } from '../../services/authService';
import {
  getFirestore,
  collection,
  doc,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  serverTimestamp,
  writeBatch,
} from '@react-native-firebase/firestore';
import storage, { getDownloadURL } from '@react-native-firebase/storage';
import { launchImageLibrary } from 'react-native-image-picker';

export default function ChatScreen({ route, navigation }) {
  const { chatId, userName } = route.params;
  const [messages, setMessages] = useState([]);
  const scrollViewRef = useRef(null);
  const currentUser = authService.getCurrentUser();

  // 메시지 로드 및 읽음 처리
  useEffect(() => {
    if (!chatId) return;

    const db = getFirestore();
    const messagesRef = collection(db, 'chatRooms', chatId, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, async snapshot => {
      if (!snapshot) return;

      const msgs = [];
      const unreadDocs = [];

      snapshot.docs.forEach(docSnapshot => {
        const data = docSnapshot.data();
        msgs.push({
          id: docSnapshot.id,
          sender: data.senderId === currentUser.uid ? 'me' : 'other',
          text: data.text,
          imageUrl: data.imageUrl,
          type: data.type || 'text',
          timestamp: data.timestamp
            ? data.timestamp
                .toDate()
                .toLocaleTimeString('ko-KR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })
            : '',
          isLink: false,
          readBy: data.readBy || [],
        });

        // 내가 읽지 않은 상대방 메시지 수집
        if (
          data.senderId !== currentUser.uid &&
          (!data.readBy || !data.readBy.includes(currentUser.uid))
        ) {
          unreadDocs.push({ ref: docSnapshot.ref, data: data });
        }
      });
      setMessages(msgs);

      // 스크롤을 하단으로 이동
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);

      // 읽음 처리 (Batch) - Snapshot 수신 시 처리
      if (unreadDocs.length > 0) {
        const batch = writeBatch(db);
        unreadDocs.forEach(({ ref, data }) => {
          const currentReadBy = data.readBy || [];
          if (!currentReadBy.includes(currentUser.uid)) {
            batch.update(ref, { readBy: [...currentReadBy, currentUser.uid] });
          }
        });

        batch.commit().catch(e => console.error('Read Receipt Error:', e));
      }
    });

    return () => unsubscribe();
  }, [chatId]);

  const handleSendMessage = async text => {
    if (!text.trim()) return;

    try {
      const db = getFirestore();

      await addDoc(collection(db, 'chatRooms', chatId, 'messages'), {
        text: text,
        senderId: currentUser.uid,
        timestamp: serverTimestamp(),
        readBy: [currentUser.uid],
        type: 'text',
      });

      await updateDoc(doc(db, 'chatRooms', chatId), {
        lastMessage: text,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Message Send Error:', error);
    }
  };

  const handleSendImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
      });

      if (result.didCancel) return;
      if (result.errorCode) {
        console.error('Image Picker Error:', result.errorMessage);
        return;
      }

      const asset = result.assets[0];
      const uploadUri = asset.uri;
      const filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

      // Upload to Storage
      const storageRef = storage().ref(
        `chat/${chatId}/${filename}_${Date.now()}`,
      );
      await storageRef.putFile(uploadUri);

      // Fix: Use modular getDownloadURL to avoid deprecation warning
      const downloadUrl = await getDownloadURL(storageRef);

      // Send Message
      const db = getFirestore();
      await addDoc(collection(db, 'chatRooms', chatId, 'messages'), {
        text: '사진', // Fallback text
        imageUrl: downloadUrl,
        type: 'image',
        senderId: currentUser.uid,
        timestamp: serverTimestamp(),
        readBy: [currentUser.uid],
      });

      await updateDoc(doc(db, 'chatRooms', chatId), {
        lastMessage: '사진',
        updatedAt: serverTimestamp(),
      });
    } catch (e) {
      console.error('Image Upload Error:', e);
    }
  };

  const avatarColor = '#34C3F1';

  return (
    <SafeAreaView style={styles.container}>
      <ChatHeader
        userName={userName}
        status="online"
        avatarColor={avatarColor}
        onBackPress={() => navigation?.goBack()}
        onMenuPress={() => console.log('Menu pressed')}
      />

      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map(msg => (
          <ChatMessage
            key={msg.id}
            sender={msg.sender}
            text={msg.text}
            imageUrl={msg.imageUrl}
            type={msg.type}
            timestamp={msg.timestamp}
          />
        ))}
      </ScrollView>

      <MessageInput
        onSendMessage={handleSendMessage}
        onSendImage={handleSendImage}
      />
    </SafeAreaView>
  );
}
