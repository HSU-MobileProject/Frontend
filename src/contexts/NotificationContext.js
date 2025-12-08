import React, { createContext, useContext, useState, useEffect } from 'react';
import { getFirestore, collection, query, where, orderBy, onSnapshot, writeBatch, doc } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { authService } from '../services/authService';

const NotificationContext = createContext();

export const useNotifications = () => {
    return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        let unsubscribeSnapshot = () => { };

        const unsubscribeAuth = auth().onAuthStateChanged(user => {
            // Clean up previous snapshot listener when auth state changes
            unsubscribeSnapshot();

            if (!user) {
                setNotifications([]);
                setUnreadCount(0);
                return;
            }

            const db = getFirestore();
            const q = query(
                collection(db, 'notifications'),
                where('receiverId', '==', user.uid),
                orderBy('createdAt', 'desc')
            );

            unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
                const list = snapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        ...data,
                        time: data.createdAt ? data.createdAt.toDate().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }) : '',
                    };
                });
                setNotifications(list);
                setUnreadCount(list.filter(n => !n.isRead).length);
            }, (error) => {
                console.error("Notification Context Error:", error);
            });
        });

        return () => {
            unsubscribeSnapshot();
            unsubscribeAuth();
        };
    }, []);

    const markAllAsRead = async () => {
        const user = authService.getCurrentUser();
        if (!user) return;

        const db = getFirestore();
        const batch = writeBatch(db);

        const unread = notifications.filter(n => !n.isRead);
        if (unread.length === 0) return;

        unread.forEach(n => {
            const ref = doc(db, 'notifications', n.id);
            batch.update(ref, { isRead: true });
        });

        try {
            await batch.commit();
        } catch (e) {
            console.error("Batch Read Error:", e);
        }
    };

    return (
        <NotificationContext.Provider value={{ notifications, unreadCount, markAllAsRead }}>
            {children}
        </NotificationContext.Provider>
    );
};
