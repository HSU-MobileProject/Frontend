import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './GitHubConnectModal.styles';
import colors from '../../../assets/colors';

const GITHUB_REPOSITORIES = [
  {
    id: 1,
    name: 'ar-block-app',
    description: 'AR 기술을 활용한 레고 조립 가이드 앱',
    language: 'TypeScript',
    languageColor: '#3178c6',
    stars: 45,
    forks: 12,
  },
  {
    id: 2,
    name: 'toy-marketplace',
    description: '중고 장난감 거래 플랫폼',
    language: 'JavaScript',
    languageColor: '#f1e05a',
    stars: 67,
    forks: 23,
  },
  {
    id: 3,
    name: 'coding-robot',
    description: '어린이를 위한 블록 코딩 로봇 제어 시스템',
    language: 'Python',
    languageColor: '#3572a5',
    stars: 89,
    forks: 34,
  },
  {
    id: 4,
    name: '3d-toy-designer',
    description: '3D 프린터용 장난감 디자인 도구',
    language: 'JavaScript',
    languageColor: '#f1e05a',
    stars: 23,
    forks: 8,
  },
  {
    id: 5,
    name: 'toy-review-platform',
    description: '장난감 리뷰 및 추천 커뮤니티',
    language: 'TypeScript',
    languageColor: '#3178c6',
    stars: 156,
    forks: 45,
  },
  {
    id: 6,
    name: 'private-project',
    description: '비공개 프로젝트',
    language: 'TypeScript',
    languageColor: '#3178c6',
    stars: 0,
    forks: 0,
    isPrivate: true,
  },
];

import { authService } from '../../../../services/authService';

// ... (GitHub Repositories data preserved if needed, or moved)

export default function GitHubConnectModal({ visible, onClose, scale = 1, isConnected, username }) {
  const [searchText, setSearchText] = useState('');
  const [selectedRepos, setSelectedRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [isConnected, setIsConnected] = useState(false); // Used prop instead

  const filteredRepos = GITHUB_REPOSITORIES.filter(
    repo =>
      repo.name.toLowerCase().includes(searchText.toLowerCase()) ||
      repo.description.toLowerCase().includes(searchText.toLowerCase()),
  );

  const toggleRepoSelection = repoId => {
    setSelectedRepos(prev =>
      prev.includes(repoId)
        ? prev.filter(id => id !== repoId)
        : [...prev, repoId],
    );
  };

  const handleConnect = async () => {
    try {
      setLoading(true);
      await authService.linkGitHub();
      // 연동 성공 시 MyPageScreen의 onSnapshot이 감지하여 isConnected 업데이트됨
      setLoading(false);
    } catch (error) {
      console.error('GitHub Link Error:', error);
      setLoading(false);
      const { Alert } = require('react-native');
      Alert.alert("오류", "GitHub 연동 페이지를 여는 중 문제가 발생했습니다.\n" + error.message);
    }
  };

  const handleDisconnect = async () => {
    // TODO: Implement disconnect if needed
    // setIsConnected(false);
    setSelectedRepos([]);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.container, { transform: [{ scale }] }]}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Icon
                name="github"
                size={20 * scale}
                color={colors.black}
                style={styles.headerIcon}
              />
              <Text style={[styles.headerTitle, { fontSize: 18 * scale }]}>
                GitHub 연동
              </Text>
            </View>
            <TouchableOpacity onPress={onClose}>
              <Icon name="times" size={18 * scale} color={colors.black} />
            </TouchableOpacity>
          </View>

          <Text style={[styles.headerDescription, { fontSize: 14 * scale }]}>
            GitHub 계정을 연동하여 저장소를 쉽게 관리하세요
          </Text>

          <ScrollView
            style={styles.content}
            contentContainerStyle={{ paddingBottom: 20 * scale }}
            showsVerticalScrollIndicator={false}
          >
            {/* GitHub Account Info or Connect Button */}
            {isConnected ? (
              <View style={[styles.connectedCard, { padding: 16 * scale }]}>
                <View style={styles.accountInfo}>
                  <View
                    style={[
                      styles.accountAvatar,
                      {
                        width: 40 * scale,
                        height: 40 * scale,
                        borderRadius: 20 * scale,
                      },
                    ]}
                  >
                    <Icon name="github" size={20 * scale} color="white" />
                  </View>

                  <View
                    style={[styles.accountText, { marginLeft: 12 * scale }]}
                  >
                    <Text
                      style={[styles.accountName, { fontSize: 16 * scale }]}
                    >
                      {username || 'GitHub User'}
                    </Text>
                    <Text
                      style={[styles.accountStatus, { fontSize: 14 * scale }]}
                    >
                      연동됨
                    </Text>
                  </View>
                </View>

                <View style={[styles.accountActions, { gap: 8 * scale }]}>
                  {/*
                  <TouchableOpacity
                    style={[
                      styles.disconnectButton,
                      { height: 36 * scale, paddingHorizontal: 12 * scale },
                    ]}
                    onPress={handleDisconnect}
                  >
                    <Icon
                      name="unlink"
                      size={12 * scale}
                      color={colors.black}
                    />
                    <Text
                      style={[styles.disconnectText, { marginLeft: 8 * scale }]}
                    >
                      연동 해제
                    </Text>
                  </TouchableOpacity>
                  */}
                </View>
              </View>
            ) : (
                 <View style={{ alignItems: 'center', marginVertical: 20 }}>
                     <Text style={{ marginBottom: 15, color: colors.grayDark }}>
                         아직 GitHub 계정이 연동되지 않았습니다.
                     </Text>
                     <TouchableOpacity
                         style={[styles.button, { backgroundColor: '#333', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 }]}
                         onPress={handleConnect}
                         disabled={loading}
                     >
                         <Text style={{ color: 'white', fontWeight: 'bold' }}>
                            {loading ? '연동 중...' : 'GitHub 계정 연동하기'}
                         </Text>
                     </TouchableOpacity>
                 </View>
            )}

            {/* Repository List - Only show if connected */}
            {isConnected && (
                <>
                {/* Search */}
                <View style={styles.searchSection}>
                <Text style={[styles.searchLabel, { fontSize: 14 * scale }]}>
                    저장소 검색
                </Text>

                <View style={styles.searchInput}>
                    <Icon name="search" size={14 * scale} color={colors.grayDark} />
                    <TextInput
                    placeholder="저장소 이름이나 설명으로 검색..."
                    placeholderTextColor={colors.grayDark}
                    value={searchText}
                    onChangeText={setSearchText}
                    style={[styles.searchInputText, { marginLeft: 8 * scale }]}
                    />
                </View>
                </View>

                {/* Repository List */}
                <View style={styles.repoListSection}>
                <View style={styles.repoListHeader}>
                    <Text style={[styles.repoListTitle, { fontSize: 14 * scale }]}>
                    저장소 선택
                    </Text>
                    <Text style={[styles.repoListCount, { fontSize: 14 * scale }]}>
                    {filteredRepos.length}개의 저장소
                    </Text>
                </View>

                {filteredRepos.map(repo => (
                    <TouchableOpacity
                    key={repo.id}
                    style={[styles.repoCard, { padding: 16 * scale }]}
                    onPress={() => toggleRepoSelection(repo.id)}
                    >
                    <View style={styles.repoHeader}>
                        <View style={styles.repoInfo}>
                        <Text style={[styles.repoName, { fontSize: 16 * scale }]}>
                            {repo.name}
                        </Text>

                        {repo.isPrivate && (
                            <View style={styles.privateBadge}>
                            <Text style={styles.privateBadgeText}>Private</Text>
                            </View>
                        )}

                        <Text
                            style={[
                            styles.repoDescription,
                            { fontSize: 14 * scale },
                            ]}
                        >
                            {repo.description}
                        </Text>
                        </View>

                        <Icon
                        name={
                            selectedRepos.includes(repo.id)
                            ? 'check-square'
                            : 'square-o'
                        }
                        size={20 * scale}
                        color={colors.primary}
                        />
                    </View>

                    <View style={styles.repoMeta}>
                        <View style={styles.languageTag}>
                        <View
                            style={[
                            styles.languageDot,
                            { backgroundColor: repo.languageColor },
                            ]}
                        />
                        <Text
                            style={[styles.languageText, { fontSize: 14 * scale }]}
                        >
                            {repo.language}
                        </Text>
                        </View>

                        {repo.stars > 0 && (
                        <View style={styles.metaItem}>
                            <Icon
                            name="star-o"
                            size={14 * scale}
                            color={colors.grayDark}
                            />
                            <Text style={[styles.metaText]}>{repo.stars}</Text>
                        </View>
                        )}

                        {repo.forks > 0 && (
                        <View style={styles.metaItem}>
                            <Icon
                            name="code-fork"
                            size={14 * scale}
                            color={colors.grayDark}
                            />
                            <Text style={[styles.metaText]}>{repo.forks}</Text>
                        </View>
                        )}
                    </View>
                    </TouchableOpacity>
                ))}
                </View>
                </>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
