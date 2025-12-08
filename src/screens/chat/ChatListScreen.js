import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './ChatListScreen.styles';
import ChatListItem from './components/ChatListItem';
import { authService } from '../../services/authService';
import { getFirestore, collection, query, where, orderBy, onSnapshot, getDoc, doc } from '@react-native-firebase/firestore';

export default function ChatListScreen({ navigation }) {
  const [chatRooms, setChatRooms] = React.useState([]);

  React.useEffect(() => {
    const user = authService.getCurrentUser();
    if (!user) return;

    // 현재 유저가 참여 중인 채팅방 쿼리
    const db = getFirestore();
    const q = query(
      collection(db, 'chatRooms'),
      where('participants', 'array-contains', user.uid),
      orderBy('updatedAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      if (!snapshot) return;

      const rooms = await Promise.all(snapshot.docs.map(async docSnap => {
        const data = docSnap.data();
        // 상대방 정보 찾기 (1:1 채팅 가정)
        const otherUserId = data.participants.find(uid => uid !== user.uid);
        let otherUser = { displayName: '알 수 없음' };

        if (otherUserId) {
          const userDoc = await getDoc(doc(db, 'users', otherUserId));
          if (userDoc.exists()) otherUser = userDoc.data();
        }

        return {
          id: docSnap.id,
          name: otherUser.displayName,
          lastMessage: data.lastMessage || '',
          lastMessageTime: data.updatedAt ? data.updatedAt.toDate().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }) : '',
          unreadCount: 0, // TODO: 실제 안 읽은 메시지 수 계산 필요
          avatarColor: '#34C3F1', // 임시 색상
          otherUserId,
        };
      }));
      setChatRooms(rooms);
    }, error => {
      console.error("ChatList Error:", error);
    });

    return () => unsubscribe();
  }, []);

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
