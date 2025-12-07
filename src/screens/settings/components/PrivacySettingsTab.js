import React, { useState } from 'react';
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
import colors from '../../../assets/colors';

export default function PrivacySettingsTab() {
  const [privacy, setPrivacy] = useState({
    emailPublic: false,
    projectListPublic: true,
  });

  const handleToggle = field => {
    setPrivacy(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      '계정 삭제',
      '계정을 삭제하면 모든 프로젝트와 데이터가 영구적으로 삭제되며 복구할 수 없습니다. 계속 진행하시겠습니까?',
      [
        { text: '취소', onPress: () => {} },
        {
          text: '삭제',
          onPress: () => Alert.alert('계정이 삭제되었습니다'),
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
