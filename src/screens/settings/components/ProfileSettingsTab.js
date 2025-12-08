import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './ProfileSettingsTab.styles';
import colors from '../../../assets/colors';

import { launchImageLibrary } from 'react-native-image-picker';
import { authService } from '../../../services/authService';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export default function ProfileSettingsTab({ user, navigation }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    bio: user?.bio || '',
    website: user?.website || '',
    location: user?.location || '',
    photoURL: user?.photoURL || null,
  });

  // user prop이 변경되면(데이터 로드 완료 시) state 업데이트
  React.useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.displayName || '',
        email: user.email || '',
        bio: user.bio || '',
        website: user.website || '',
        location: user.location || '',
        photoURL: user.photoURL || null,
      }));
    }
  }, [user]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImagePick = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo' });
    if (result.didCancel) return;
    if (result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      const uri = asset.uri;

      // 바로 업로드 시작
      uploadImage(uri);
    }
  };

  const uploadImage = async (uri) => {
    try {
      setLoading(true);
      const currentUser = authService.getCurrentUser();
      if (!currentUser) return;

      const reference = storage().ref(`profile/${currentUser.uid}.jpg`);

      // 파일 업로드
      await reference.putFile(uri);

      // 다운로드 URL 가져오기
      const url = await reference.getDownloadURL();

      setFormData(prev => ({ ...prev, photoURL: url }));
      setLoading(false);
      Alert.alert("알림", "이미지가 업로드되었습니다. '변경사항 저장'을 눌러 완료하세요.");
    } catch (e) {
      console.error("Upload Error:", e);
      setLoading(false);
      Alert.alert("업로드 실패", "이미지 업로드 중 문제가 발생했습니다.\n" + e.message);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const currentUser = authService.getCurrentUser();
      if (!currentUser) return;

      const updateData = {
        displayName: formData.name,
        bio: formData.bio,
        website: formData.website,
        location: formData.location,
        photoURL: formData.photoURL
      };

      // 1. Firestore 업데이트
      await firestore().collection('users').doc(currentUser.uid).update(updateData);

      // 2. Auth Profile 업데이트 (이름, 사진)
      await currentUser.updateProfile({
        displayName: formData.name,
        photoURL: formData.photoURL,
      });

      setLoading(false);
      Alert.alert("성공", "프로필이 수정되었습니다.", [
        { text: "확인", onPress: () => navigation?.goBack() }
      ]);
    } catch (e) {
      console.error("Profile Update Error:", e);
      setLoading(false);
      Alert.alert("오류", "프로필 수정 중 문제가 발생했습니다.");
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Picture Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>프로필 사진</Text>
          <Text style={styles.cardDescription}>
            프로필에 표시될 사진을 업로드하세요
          </Text>
        </View>
        <View style={styles.profilePictureSection}>
          <View style={styles.avatarContainer}>
            {formData.photoURL ? (
              <Image source={{ uri: formData.photoURL }} style={{ width: 60, height: 60, borderRadius: 30 }} />
            ) : (
              <Text style={styles.avatarText}>{formData.name ? formData.name[0] : 'U'}</Text>
            )}
            {loading && (
              <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 30 }}>
                <ActivityIndicator color="#fff" />
              </View>
            )}
          </View>
          <View style={styles.uploadSection}>
            <TouchableOpacity style={styles.uploadButton} onPress={handleImagePick} disabled={loading}>
              <Icon
                name="image"
                size={14}
                color={colors.black}
                style={styles.uploadIcon}
              />
              <Text style={styles.uploadButtonText}>사진 변경</Text>
            </TouchableOpacity>
            <Text style={styles.uploadHint}>JPG, PNG 형식 (최대 5MB)</Text>
          </View>
        </View>
      </View>

      {/* Basic Info Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>기본 정보</Text>
          <Text style={styles.cardDescription}>
            다른 사용자에게 공개되는 정보입니다
          </Text>
        </View>
        <View style={styles.cardContent}>
          {/* Name */}
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>이름</Text>
            <View style={styles.formInput}>
              <TextInput
                value={formData.name}
                onChangeText={value => handleChange('name', value)}
                editable={!loading}
                placeholderTextColor={colors.grayDark}
                style={styles.textInput}
              />
            </View>
          </View>

          {/* Email */}
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>이메일</Text>
            <View style={styles.formInput}>
              <TextInput
                value={formData.email}
                editable={false} // 이메일 수정 방지
                placeholderTextColor={colors.grayDark}
                style={[styles.textInput, { color: colors.grayDark }]}
              />
            </View>
          </View>

          {/* Bio */}
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>소개</Text>
            <View style={[styles.formInput, styles.textareaInput]}>
              <TextInput
                value={formData.bio}
                onChangeText={value => handleChange('bio', value)}
                placeholder="자신을 소개해주세요"
                placeholderTextColor={colors.grayDark}
                multiline
                numberOfLines={4}
                style={styles.textarea}
                editable={!loading}
              />
            </View>
          </View>

          {/* Website */}
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>웹사이트</Text>
            <View style={styles.formInput}>
              <TextInput
                value={formData.website}
                onChangeText={value => handleChange('website', value)}
                editable={!loading}
                placeholderTextColor={colors.grayDark}
                style={styles.textInput}
              />
            </View>
          </View>

          {/* Location */}
          <View style={[styles.formGroup, styles.lastFormGroup]}>
            <Text style={styles.formLabel}>위치</Text>
            <View style={styles.formInput}>
              <TextInput
                value={formData.location}
                onChangeText={value => handleChange('location', value)}
                editable={!loading}
                placeholderTextColor={colors.grayDark}
                style={styles.textInput}
              />
            </View>
          </View>
        </View>
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={loading}>
        <Text style={styles.saveButtonText}>{loading ? "저장 중..." : "변경사항 저장"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
