import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './SignupScreen.styles';
import colors from '../../assets/colors';
import Icon from 'react-native-vector-icons/Feather';
import { authService } from '../../services/authService';

const { width } = Dimensions.get('window');
const scale = width / 409;

export default function SignupScreen({ setShowSignup, setIsLoggedIn }) {
  const [userType, setUserType] = useState('personal');
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('알림', '모든 필드를 입력해주세요.');
      return;
    }

    if (userType === 'business' && !companyName) {
      Alert.alert('알림', '회사명을 입력해주세요.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('알림', '비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      await authService.signup({
        email,
        password,
        name,
        userType,
        companyName: userType === 'business' ? companyName : '',
        role: userType === 'personal' ? '개인 개발자' : '기업 담당자',
      });

      Alert.alert('가입 성공', '회원가입이 완료되었습니다.', [
        { text: '확인', onPress: () => setIsLoggedIn(true) },
      ]);
    } catch (error) {
      console.error(error);
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('오류', '이미 사용 중인 이메일입니다.');
      } else if (error.code === 'auth/weak-password') {
        Alert.alert('오류', '비밀번호는 6자리 이상이어야 합니다.');
      } else {
        Alert.alert(
          '오류',
          '회원가입 중 문제가 발생했습니다: ' + error.message,
        );
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.centerWrap}>
          <View style={styles.card}>
            <View style={styles.header}>
              <Text style={styles.title}>
                <Text style={styles.titleToy}>Toy</Text>
                <Text style={styles.titleLink}>Link</Text>
              </Text>
              <Text style={styles.subtitle}>장난감 프로젝트 협업 플랫폼</Text>
            </View>

            {/* 개인/기업 탭 */}
            <View style={styles.userTypeWrap}>
              <TouchableOpacity
                style={[
                  styles.userTypeTab,
                  userType === 'personal' && styles.userTypeTabActive,
                ]}
                onPress={() => setUserType('personal')}
              >
                <Text
                  style={[
                    styles.userTypeText,
                    userType === 'personal' && styles.userTypeTextActive,
                  ]}
                >
                  개인
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.userTypeTab,
                  userType === 'business' && styles.userTypeTabActive,
                ]}
                onPress={() => setUserType('business')}
              >
                <Text
                  style={[
                    styles.userTypeText,
                    userType === 'business' && styles.userTypeTextActive,
                  ]}
                >
                  기업
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.form}>
              {/* 개인 회원가입 필드 */}
              {userType === 'personal' && (
                <>
                  <Text style={styles.label}>이름</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="이름을 입력하세요"
                    placeholderTextColor={colors.grayDark}
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                  />
                </>
              )}

              {/* 기업 회원가입 필드 */}
              {userType === 'business' && (
                <>
                  <Text style={styles.label}>이름</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="이름을 입력하세요"
                    placeholderTextColor={colors.grayDark}
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                  />

                  <Text style={styles.label}>회사명</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="회사명을 입력하세요"
                    placeholderTextColor={colors.grayDark}
                    value={companyName}
                    onChangeText={setCompanyName}
                  />
                </>
              )}

              <Text style={styles.label}>이메일</Text>
              <TextInput
                style={styles.input}
                placeholder="your@email.com"
                placeholderTextColor={colors.grayDark}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <Text style={styles.label}>비밀번호</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor={colors.grayDark}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />

              <Text style={styles.label}>비밀번호 확인</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor={colors.grayDark}
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />

              <View style={styles.checkboxWrap}>
                <TouchableOpacity
                  style={styles.checkbox}
                  onPress={() => setAgreedTerms(!agreedTerms)}
                >
                  {agreedTerms && (
                    <Icon name="check" size={12 * scale} color={colors.white} />
                  )}
                </TouchableOpacity>
                <Text style={styles.checkboxLabel}>
                  이용약관 및 개인정보 처리방침에 동의합니다
                </Text>
              </View>

              <TouchableOpacity
                style={[
                  styles.signupButton,
                  !agreedTerms && styles.signupButtonDisabled,
                ]}
                onPress={handleSignup}
                disabled={!agreedTerms}
              >
                <Text style={styles.signupButtonText}>회원가입</Text>
              </TouchableOpacity>

              <View style={styles.dividerWrap}>
                <View style={styles.dividerLine} />
                <Text style={styles.orText}>또는</Text>
                <View style={styles.dividerLine} />
              </View>

              <TouchableOpacity
                style={styles.oauthButton}
                onPress={async () => {
                  try {
                    await authService.loginWithGithub();
                    setIsLoggedIn(true);
                  } catch (e) {
                    Alert.alert('GitHub 로그인 실패', e.message);
                  }
                }}
              >
                <Icon
                  name="github"
                  size={15 * scale}
                  color={colors.black}
                  style={styles.oauthIcon}
                />
                <Text style={styles.oauthText}>GitHub로 회원가입</Text>
              </TouchableOpacity>

              <View style={styles.loginLinkWrap}>
                <Text style={styles.loginLinkText}>
                  이미 계정이 있으신가요?{' '}
                </Text>
                <TouchableOpacity onPress={() => setShowSignup(false)}>
                  <Text style={styles.loginLink}>로그인</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
