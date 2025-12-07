import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './ProfileSettingsTab.styles';
import colors from '../../../assets/colors';

export default function ProfileSettingsTab() {
  const [formData, setFormData] = useState({
    name: '김개발',
    email: 'kimdev@example.com',
    bio: '',
    website: 'https://kimdev.com',
    location: '서울, 대한민국',
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
            <Text style={styles.avatarText}>김</Text>
          </View>
          <View style={styles.uploadSection}>
            <TouchableOpacity style={styles.uploadButton}>
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
                editable
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
                onChangeText={value => handleChange('email', value)}
                editable
                placeholderTextColor={colors.grayDark}
                style={styles.textInput}
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
                editable
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
                editable
                placeholderTextColor={colors.grayDark}
                style={styles.textInput}
              />
            </View>
          </View>
        </View>
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>변경사항 저장</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
