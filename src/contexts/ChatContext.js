import React, { createContext, useContext, useState, useEffect } from 'react';
import { getFirestore, collection, query, where, orderBy, onSnapshot, getDoc, doc } from '@react-native-firebase/firestore';
import { authService } from '../services/authService';

const ChatContext = createContext();

export const useChat = () => {
    return useContext(ChatContext);
};

export const ChatProvider = ({ children }) => {
    const [chatRooms, setChatRooms] = useState([]);
    const [totalUnreadCount, setTotalUnreadCount] = useState(0);

    useEffect(() => {
        const user = authService.getCurrentUser();
        if (!user) {
            setChatRooms([]);
            setTotalUnreadCount(0);
            return;
        }

        const db = getFirestore();
        // 1. Listen to Chat Rooms
        const q = query(
            collection(db, 'chatRooms'),
            where('participants', 'array-contains', user.uid)
            // orderBy('updatedAt', 'desc') // Removed to avoid missing index error
        );

        const unsubscribeRooms = onSnapshot(q, async (snapshot) => {
            if (!snapshot) {
                setChatRooms([]);
                setTotalUnreadCount(0);
                return;
            }

            // Map documents to initial room objects
            let rooms = await Promise.all(snapshot.docs.map(async docSnap => {
                const data = docSnap.data();
                const otherUserId = data.participants.find(uid => uid !== user.uid);
                let otherUser = { displayName: '알 수 없음' };

                if (otherUserId) {
                    const userDoc = await getDoc(doc(db, 'users', otherUserId));
                    if (userDoc.exists()) otherUser = userDoc.data();
                }

                return {
                    id: docSnap.id,
                    name: otherUser.displayName || '알 수 없음',
                    lastMessage: data.lastMessage || '',
                    lastMessageTime: data.updatedAt ? data.updatedAt.toDate().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }) : '',
                    updatedAtTime: data.updatedAt ? data.updatedAt.toDate().getTime() : 0, // For sorting
                    avatarColor: '#34C3F1',
                    otherUserId,
                    participants: data.participants,
                    unreadCount: 0,
                };
            }));

            // Client-side Sort
            rooms.sort((a, b) => b.updatedAtTime - a.updatedAtTime);

            setChatRooms(rooms);
            // After setting rooms, we need to listen to unread counts.
            // But doing it inside this callback is tricky because listeners need cleanup.
            // We'll manage per-room listeners in a separate effect or here if we are careful.

        }, error => {
            console.error("ChatContext Room Error:", error);
        });

        return () => unsubscribeRooms();
    }, []);

    // 2. Separate Effect for Message Listeners (Unread Count)
    useEffect(() => {
        const user = authService.getCurrentUser();
        if (!user || chatRooms.length === 0) {
            // If no rooms, unread is 0
            if (chatRooms.length === 0) setTotalUnreadCount(0);
            return;
        }

        const db = getFirestore();
        const unsubscribes = [];
        let newCounts = {}; // map of roomId -> count

        // Set up listener for EACH room
        chatRooms.forEach(room => {
            const messagesRef = collection(db, 'chatRooms', room.id, 'messages');
            // Optimization: We only care about unread messages.
            // Since we can't filter 'readBy not-contains', we query all.
            // But we can limit if needed, but risky if many unreads.
            const mq = query(messagesRef);

            const unsub = onSnapshot(mq, (snapshot) => {
                let count = 0;
                snapshot.docs.forEach(d => {
                    const data = d.data();
                    if (data.senderId !== user.uid && (!data.readBy || !data.readBy.includes(user.uid))) {
                        count++;
                    }
                });

                newCounts[room.id] = count;

                // Update total count
                const total = Object.values(newCounts).reduce((a, b) => a + b, 0);
                setTotalUnreadCount(total);

                // Update individual room unread count in state
                setChatRooms(prev => prev.map(r => r.id === room.id ? { ...r, unreadCount: count } : r));
            }, (error) => {
                console.log(`Msg Listener Error ${room.id}:`, error);
            });
            unsubscribes.push(unsub);
        });

        return () => {
            unsubscribes.forEach(u => u());
        };
    }, [chatRooms.map(r => r.id).join(',')]); // re-run if room IDs change

    return (
        <ChatContext.Provider value={{ chatRooms, totalUnreadCount }}>
            {children}
        </ChatContext.Provider>
    );
};
