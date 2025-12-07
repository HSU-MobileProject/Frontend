import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './SecuritySettingsTab.styles';
import colors from '../../../assets/colors';

export default function SecuritySettingsTab() {
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const handleChange = (field, value) => {
    setPasswords(prev => ({ ...prev, [field]: value }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>비밀번호 변경</Text>
          <Text style={styles.cardDescription}>
            정기적으로 비밀번호를 변경하여 계정을 안전하게 보호하세요
          </Text>
        </View>

        <View style={styles.cardContent}>
          {/* Current Password */}
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>현재 비밀번호</Text>
            <View style={styles.formInput}>
              <TextInput
                value={passwords.current}
                onChangeText={value => handleChange('current', value)}
                secureTextEntry
                placeholder="••••••••"
                placeholderTextColor={colors.grayDark}
                style={styles.textInput}
              />
            </View>
          </View>

          {/* New Password */}
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>새 비밀번호</Text>
            <View style={styles.formInput}>
              <TextInput
                value={passwords.new}
                onChangeText={value => handleChange('new', value)}
                secureTextEntry
                placeholder="••••••••"
                placeholderTextColor={colors.grayDark}
                style={styles.textInput}
              />
            </View>
            <Text style={styles.formHint}>
              최소 8자 이상, 영문/숫자/특수문자 조합
            </Text>
          </View>

          {/* Confirm Password */}
          <View style={[styles.formGroup, styles.lastFormGroup]}>
            <Text style={styles.formLabel}>새 비밀번호 확인</Text>
            <View style={styles.formInput}>
              <TextInput
                value={passwords.confirm}
                onChangeText={value => handleChange('confirm', value)}
                secureTextEntry
                placeholder="••••••••"
                placeholderTextColor={colors.grayDark}
                style={styles.textInput}
              />
            </View>
          </View>

          {/* Change Button */}
          <TouchableOpacity style={styles.changeButton}>
            <Text style={styles.changeButtonText}>비밀번호 변경</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
