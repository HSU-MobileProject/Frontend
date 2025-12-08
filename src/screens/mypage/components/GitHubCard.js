import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../../assets/colors';
import styles from './GitHubCard.styles';

const { width } = Dimensions.get('window');
const scale = width / 409;

export default function GitHubCard({
  onOpenGitHubModal,
  isGitHubConnected = true,
  gitHubUsername,
}) {
  const handleConnect = () => {
    onOpenGitHubModal?.();
  };

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <Text style={styles.title}>GitHub 연동</Text>

      {/* 연동 정보 섹션 */}
      <View style={styles.contentSection}>
        <View style={styles.githubInfo}>
          <Icon
            name="github"
            size={24}
            color={colors.black}
            style={styles.githubIcon}
          />

          <View style={styles.infoText}>
            <Text style={styles.username}>
              {isGitHubConnected ? (gitHubUsername || 'GitHub User') : 'GitHub'}
            </Text>
            <Text style={styles.status}>
              {isGitHubConnected ? '연동됨' : '연동하지 않음'}
            </Text>
          </View>
        </View>

        {/* 버튼 */}
        <TouchableOpacity
          style={[styles.button, isGitHubConnected && styles.buttonConnected]}
          onPress={handleConnect}
        >
          <Text
            style={[
              styles.buttonText,
              isGitHubConnected && styles.buttonTextConnected,
            ]}
          >
            {isGitHubConnected ? 'GitHub 설정' : 'GitHub 연동하기'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
