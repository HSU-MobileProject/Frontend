import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../../assets/colors';
import styles from './GitHubCard.styles';

const { width } = Dimensions.get('window');
const scale = width / 409;

export default function GitHubCard() {
  const [isConnected, setIsConnected] = useState(false);

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
              {isConnected ? '@kimdev' : 'GitHub'}
            </Text>
            <Text style={styles.status}>
              {isConnected ? '연동됨' : '연동안됨'}
            </Text>
          </View>
        </View>

        {/* 버튼 */}
        <TouchableOpacity
          style={[styles.button, isConnected && styles.buttonConnected]}
          onPress={() => setIsConnected(!isConnected)}
        >
          <Text
            style={[
              styles.buttonText,
              isConnected && styles.buttonTextConnected,
            ]}
          >
            {isConnected ? 'GitHub 설정' : 'GitHub 연동하기'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
