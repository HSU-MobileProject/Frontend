import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './PrivacySettingsTab.styles';
import { authService } from '../../../services/authService';
import { getFirestore, doc, updateDoc, getDoc, deleteDoc } from '@react-native-firebase/firestore';

export default function PrivacySettingsTab() {
  const [loading, setLoading] = useState(true);
  const [privacy, setPrivacy] = useState({
    emailPublic: false,
    projectListPublic: true,
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const user = authService.getCurrentUser();
        if (user) {
          const db = getFirestore();
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.privacySettings) {
              setPrivacy(prev => ({ ...prev, ...data.privacySettings }));
            }
          }
        }
      } catch (e) {
        console.error("Failed to load privacy settings:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleToggle = async (field) => {
    const newVal = !privacy[field];
    const newSettings = { ...privacy, [field]: newVal };
    
    // Optimistic Update
    setPrivacy(newSettings);

    try {
      const user = authService.getCurrentUser();
      if (user) {
        const db = getFirestore();
        await updateDoc(doc(db, 'users', user.uid), {
           privacySettings: newSettings
        });
      }
    } catch (e) {
      console.error("Failed to save privacy settings:", e);
      // Revert on error
      setPrivacy(prev => ({ ...prev, [field]: !newVal }));
    }
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      '계정 삭제',
      '계정을 삭제하면 모든 프로젝트와 데이터가 영구적으로 삭제되며 복구할 수 없습니다. 계속 진행하시겠습니까?',
      [
        { text: '취소', onPress: () => {} },
        {
          text: '삭제',
          onPress: async () => {
             try {
                const user = authService.getCurrentUser();
                if (user) {
                    const db = getFirestore();
                    // 1. 유저 문서 삭제
                    await deleteDoc(doc(db, 'users', user.uid));
                    // 2. Auth 계정 삭제
                    await user.delete();
                    Alert.alert('알림', '계정이 성공적으로 삭제되었습니다.');
                }
             } catch(e) {
                 console.error("Delete Account Error:", e);
                 Alert.alert('오류', '계정 삭제 중 문제가 발생했습니다. (재로그인 후 다시 시도해주세요)');
             }
          },
          style: 'destructive',
        },
      ],
    );
  };

  const renderToggle = (field, label, description) => (
    <View style={styles.privacyItem}>
      <View style={styles.privacyTextContainer}>
        <Text style={styles.privacyLabel}>{label}</Text>
        <Text style={styles.privacyDescription}>{description}</Text>
      </View>
      <Switch
        value={privacy[field]}
        onValueChange={() => handleToggle(field)}
        trackColor={{ false: '#cbced4', true: '#00b26b' }}
        thumbColor="white"
      />
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Privacy Settings Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>프로필 공개 설정</Text>
          <Text style={styles.cardDescription}>
            다른 사용자에게 공개할 정보를 선택하세요
          </Text>
        </View>

        <View style={styles.cardContent}>
          {renderToggle(
            'emailPublic',
            '이메일 주소 공개',
            '프로필에 이메일 주소 표시',
          )}
          {renderToggle(
            'projectListPublic',
            '프로젝트 목록 공개',
            '다른 사용자가 내 프로젝트 확인 가능',
          )}
        </View>
      </View>

      {/* Danger Zone */}
      <View style={styles.dangerCard}>
        <View style={styles.dangerContent}>
          <Text style={styles.dangerTitle}>계정 삭제</Text>
          <Text style={styles.dangerDescription}>
            계정을 삭제하면 모든 프로젝트와 데이터가 영구적으로 삭제되며 복구할
            수 없습니다.
          </Text>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDeleteAccount}
          >
            <Icon
              name="trash"
              size={14}
              color="white"
              style={styles.deleteIcon}
            />
            <Text style={styles.deleteButtonText}>계정 삭제</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
