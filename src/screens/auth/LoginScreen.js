import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './LoginScreen.styles';
import colors from '../../assets/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');
const scale = width / 409;

export default function LoginScreen({ setShowSignup, setIsLoggedIn }) {
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centerWrap}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>
              <Text style={styles.titleToy}>Toy</Text>
              <Text style={styles.titleLink}>Link</Text>
            </Text>
            <Text style={styles.subtitle}>장난감 프로젝트 협업 플랫폼</Text>
          </View>

          <View style={styles.segmentWrap}>
            <TouchableOpacity
              style={[
                styles.segment,
                activeTab === 'login' && styles.segmentActive,
              ]}
              onPress={() => setActiveTab('login')}
            >
              <Text
                style={[
                  styles.segmentText,
                  activeTab === 'login' && styles.segmentTextActive,
                ]}
              >
                로그인
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.segment,
                activeTab === 'signup' && styles.segmentActive,
              ]}
              onPress={() => setShowSignup(true)}
            >
              <Text
                style={[
                  styles.segmentText,
                  activeTab === 'signup' && styles.segmentTextActive,
                ]}
              >
                회원가입
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
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

            <View style={styles.rowBetween}>
              <Text style={[styles.label, { marginBottom: 6 }]}>비밀번호</Text>
              <TouchableOpacity>
                <Text style={styles.forgot}>비밀번호 찾기</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor={colors.grayDark}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => setIsLoggedIn(true)}
            >
              <Text style={styles.loginButtonText}>로그인</Text>
            </TouchableOpacity>

            <View style={styles.dividerWrap}>
              <View style={styles.dividerLine} />
              <Text style={styles.orText}>또는</Text>
              <View style={styles.dividerLine} />
            </View>

            <TouchableOpacity style={styles.oauthButton}>
              <Icon
                name="github"
                size={14 * scale}
                color={colors.black}
                style={styles.oauthIcon}
              />
              <Text style={styles.oauthText}>GitHub로 로그인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
