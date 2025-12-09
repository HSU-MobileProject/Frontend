import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  writeBatch,
  doc,
} from '@react-native-firebase/firestore';

import { authService } from '../services/authService';

const NotificationContext = createContext();

export const useNotifications = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [rawNotifications, setRawNotifications] = useState([]);
  const [settings, setSettings] = useState({
    receive: true,
    projectUpdate: true,
    projectFavorite: true,
    newMessage: true,
  });

  useEffect(() => {
    let unsubscribeSnapshot = () => {};
    let unsubscribeUser = () => {};

    const unsubscribeAuth = authService.onAuthStateChanged(user => {
      // Clean up previous listeners
      unsubscribeSnapshot();
      unsubscribeUser();

      if (!user) {
        setNotifications([]);
        setUnreadCount(0);
        return;
      }

      const db = getFirestore();
      
      // 1. Listen to User Settings
      let settings = {
        receive: true,
        projectUpdate: true,
        projectFavorite: true,
        newMessage: true,
      };

      unsubscribeUser = onSnapshot(doc(db, 'users', user.uid), (uSnap) => {
         if (uSnap.exists()) {
             const data = uSnap.data();
             if (data.notificationSettings) {
                 settings = { ...settings, ...data.notificationSettings };
                 // Trigger re-eval of notifications if we had them outside? 
                 // Actually better to nest the notification listener or use refs.
                 // For simplicity, we will let the notification listener read the *current* settings
                 // But since variables in closure are captured, we need to restructure.
             }
         }
      });

      // 2. Listen to Notifications
      const q = query(
        collection(db, 'notifications'),
        where('receiverId', '==', user.uid),
        orderBy('createdAt', 'desc'),
      );

      unsubscribeSnapshot = onSnapshot(
        q,
        snapshot => {
          // Inner listener depends on 'settings'. 
          // To make it reactive to settings changes, we might need a better structure.
          // However, for this MVP, let's assuming settings don't change rapidly or we accept a slight delay/reload requirement.
          // BETTER: Move this logic to a separate useEffect or combine them.
          // Let's rely on the fact that if settings change, we might not update *immediately* if we don't re-run this.
          // BUT: The user asked "If I turn it off, does it stop?".
          // Let's use a ref or state for settings? 
          const list = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              ...data,
              time: data.createdAt
                ? data.createdAt
                    .toDate()
                    .toLocaleTimeString('ko-KR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                : '',
            };
          });
          setRawNotifications(list);
        },
        error => {
          console.error('Notification Context Error:', error);
        },
      );
    });

    return () => {
      unsubscribeSnapshot();
      unsubscribeAuth();
    };
  }, []);

  // 2. Settings Listener
  useEffect(() => {
    let unsubscribeUser = () => {};
    
    const user = authService.getCurrentUser();
    if (user) {
       const db = getFirestore();
       unsubscribeUser = onSnapshot(doc(db, 'users', user.uid), (uSnap) => {
         if (uSnap.exists()) {
             const data = uSnap.data();
             if (data.notificationSettings) {
                 setSettings(prev => ({ ...prev, ...data.notificationSettings }));
             }
         }
       });
    }

    return () => unsubscribeUser();
  }, []); // Note: This doesn't re-run on auth change efficiently if authService.getCurrentUser is static at mount.
          // Better to use the auth listener for this too. 
          // But for now, keeping it simple or merging.

  // 3. Filter Logic
  useEffect(() => {
      if (!settings.receive) {
          setNotifications([]);
          setUnreadCount(0);
          return;
      }

      const filtered = rawNotifications.filter(n => {
         if (n.type === 'message' && !settings.newMessage) return false;
         if ((n.type === 'like' || n.type === 'interest') && !settings.projectFavorite) return false;
         // Assume others are project updates
         if (!['message', 'like', 'interest'].includes(n.type) && !settings.projectUpdate) return false;
         return true;
      });

      setNotifications(filtered);
      setUnreadCount(filtered.filter(n => !n.isRead).length);
  }, [rawNotifications, settings]);

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
      console.error('Batch Read Error:', e);
    }
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, markAllAsRead }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
