import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  Image
} from 'react-native';
import { X, Check, XCircle } from 'lucide-react-native';
import Colors from '../../../../assets/colors';
import { getFirestore, collection, query, where, getDocs, doc, updateDoc, getDoc } from '@react-native-firebase/firestore';

const ProjectManageModal = ({ visible, onClose, project }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible && project?.id) {
      fetchApplications();
    }
  }, [visible, project]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const db = getFirestore();
      const q = query(
        collection(db, 'applications'),
        where('projectId', '==', project.id),
        where('status', '==', 'pending') // 대기 중인 지원자만 표시
      );
      const snapshot = await getDocs(q);

      const apps = await Promise.all(snapshot.docs.map(async docSnapshot => {
        const data = docSnapshot.data();
        let appName = 'Unknown';
        let appPhoto = null;

        try {
          const userRef = doc(db, 'users', data.applicantId);
          const userSnap = await getDoc(userRef);
          // Check if exists using method or properties safely
          if (userSnap && typeof userSnap.data === 'function') {
            const userData = userSnap.data();
            if (userData) {
              appName = userData.displayName || 'Unknown User';
              appPhoto = userData.photoURL || null;
            }
          }
        } catch (err) {
          console.log("Fetch User Error:", err);
        }

        return {
          id: docSnapshot.id,
          ...data,
          applicantName: appName,
          applicantPhoto: appPhoto,
        };
      }));

      setApplications(apps);
      setLoading(false);
    } catch (e) {
      console.error("Fetch Apps Error:", e);
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (appId, newStatus) => {
    try {
      const db = getFirestore();
      await updateDoc(doc(db, 'applications', appId), {
        status: newStatus
      });

      Alert.alert("알림", newStatus === 'accepted' ? "승인되었습니다." : "거절되었습니다.");
      fetchApplications(); // 목록 갱신
    } catch (e) {
      console.error("Update Status Error:", e);
      Alert.alert("오류", "상태 변경 중 문제가 발생했습니다.");
    }
  };

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>지원자 관리</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color={Colors.black} />
          </TouchableOpacity>
        </View>

        <Text style={styles.description}>
          현재 대기 중인 지원자 목록입니다.
        </Text>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        ) : (
          <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
            {applications.length > 0 ? (
              applications.map((app) => (
                <View key={app.id} style={styles.appItem}>
                  <View style={styles.userInfo}>
                    {app.applicantPhoto ? (
                      <Image source={{ uri: app.applicantPhoto }} style={styles.avatar} />
                    ) : (
                      <View style={styles.avatarPlaceholder}>
                        <Text style={styles.avatarText}>{app.applicantName ? app.applicantName[0] : 'U'}</Text>
                      </View>
                    )}
                    <View style={{ marginLeft: 12 }}>
                      <Text style={styles.userName}>{app.applicantName}</Text>
                      <Text style={styles.userRole}>{app.role} 지원</Text>
                    </View>
                  </View>

                  <View style={styles.actionButtons}>
                    <TouchableOpacity
                      style={[styles.actionBtn, styles.rejectBtn]}
                      onPress={() => handleUpdateStatus(app.id, 'rejected')}
                    >
                      <XCircle size={20} color={Colors.secondary} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionBtn, styles.acceptBtn]}
                      onPress={() => handleUpdateStatus(app.id, 'accepted')}
                    >
                      <Check size={20} color={Colors.green} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>대기 중인 지원자가 없습니다.</Text>
              </View>
            )
            }
          </ScrollView >
        )}
      </View >
    </Modal >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    marginTop: 60, // Leave some space at top
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.black,
  },
  closeButton: {
    padding: 4,
  },
  description: {
    fontSize: 14, // Fixed property name
    color: Colors.grayDark,
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    flex: 1,
  },
  appItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.grayLight,
    marginBottom: 12,
    backgroundColor: '#F8F9FA',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.grayLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.grayDark,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
  },
  userRole: {
    fontSize: 13,
    color: Colors.grayDark,
    marginTop: 2,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.grayLight,
  },
  rejectBtn: {
    borderColor: Colors.secondary + '40',
  },
  acceptBtn: {
    borderColor: Colors.green + '40',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: Colors.grayDark,
    fontSize: 14,
  },
});

export default React.memo(ProjectManageModal);
