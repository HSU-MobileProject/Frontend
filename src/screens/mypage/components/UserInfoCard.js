import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../../assets/colors';
import styles from './UserInfoCard.styles';

const { width } = Dimensions.get('window');
const scale = width / 409;

export default function UserInfoCard({ userInfo, onLogout, onSettings }) {
  // 데이터가 없거나 로딩 중일 때도 로그아웃 버튼은 보여줘야 함
  if (!userInfo) {
    return (
      <View style={styles.container}>
        <View style={[styles.profileSection, { alignItems: 'center', padding: 20 }]}>
          <Text style={{ color: colors.grayDark, marginBottom: 10 }}>사용자 정보를 불러올 수 없습니다.</Text>
          <TouchableOpacity style={styles.button} onPress={onLogout}>
            <Icon name="sign-out" size={16 * scale} color={colors.accent} />
            <Text style={[styles.buttonText, styles.logoutText]}>로그아웃</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* 프로필 섹션 */}
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          {userInfo.photoURL ? (
            <Image
              source={{ uri: userInfo.photoURL }}
              style={{ width: 80 * scale, height: 80 * scale, borderRadius: 40 * scale }}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{userInfo.name.charAt(0)}</Text>
            </View>
          )}
        </View>

        <Text style={styles.userName}>{userInfo.name}</Text>
        <Text style={styles.userSubtitle}>
          {userInfo.userType === 'personal' ? '개인 개발자' : '기업'}
        </Text>

        <View style={styles.badgeContainer}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {userInfo.userType === 'personal' ? '개인 회원' : '기업 회원'}
            </Text>
          </View>
        </View>
      </View>

      {/* 구분선 */}
      <View style={styles.divider} />

      {/* 통계 섹션 */}
      <View style={styles.statsSection}>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>등록 프로젝트</Text>
          <Text style={styles.statValue}>{userInfo.registeredCount}개</Text>
        </View>

        <View style={styles.statRow}>
          <Text style={styles.statLabel}>지원한 프로젝트</Text>
          <Text style={styles.statValue}>{userInfo.supportedCount}개</Text>
        </View>

        <View style={styles.statRow}>
          <Text style={styles.statLabel}>받은 별</Text>
          <Text style={styles.statValue}>{userInfo.totalLikes}개</Text>
        </View>
      </View>

      {/* 구분선 */}
      <View style={styles.divider} />

      {/* 버튼 섹션 */}
      <View style={styles.buttonSection}>
        <TouchableOpacity style={styles.button}>
          <Icon name="history" size={16 * scale} color={colors.black} />
          <Text style={styles.buttonText}>거래내역</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={onSettings}>
          <Icon name="cog" size={16 * scale} color={colors.black} />
          <Text style={styles.buttonText}>설정</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={onLogout}>
          <Icon name="sign-out" size={16 * scale} color={colors.accent} />
          <Text style={[styles.buttonText, styles.logoutText]}>로그아웃</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
