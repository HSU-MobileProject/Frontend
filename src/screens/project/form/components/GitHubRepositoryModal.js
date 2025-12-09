import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Alert,
  TextInput,
  Image
} from 'react-native';
import { X, Github, RefreshCw, Search, CheckSquare, Square, Star, GitFork, Lock, Check } from 'lucide-react-native';
import { getFirestore, doc, getDoc } from '@react-native-firebase/firestore';
import { authService } from '../../../../services/authService';

export default function GitHubRepositoryModal({ visible, onClose, onSelect }) {
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState([]);
  const [filteredRepos, setFilteredRepos] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [userData, setUserData] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [selectedRepo, setSelectedRepo] = useState(null); // Single selection

  useEffect(() => {
    if (visible) {
      checkConnectionAndFetch();
      setSearchText('');
      setSelectedRepo(null);
    }
  }, [visible]);

  useEffect(() => {
    if (searchText) {
      const lower = searchText.toLowerCase();
      setFilteredRepos(
        repos.filter(r => 
          r.name.toLowerCase().includes(lower) || 
          (r.description && r.description.toLowerCase().includes(lower))
        )
      );
    } else {
      setFilteredRepos(repos);
    }
  }, [searchText, repos]);

  const checkConnectionAndFetch = async () => {
    setLoading(true);
    const user = authService.getCurrentUser();
    if (!user) {
        setLoading(false);
        return;
    }

    try {
        const db = getFirestore();
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const data = userDoc.data();

        if (data?.githubToken) {
            setIsConnected(true);
            setUserData(data); // Store user data for the card
            await fetchRepos(data.githubToken);
        } else {
            setIsConnected(false);
            setLoading(false);
        }
    } catch (e) {
        console.error("GitHub Check Error:", e);
        setLoading(false);
    }
  };

  const fetchRepos = async (token) => {
    try {
        const response = await fetch('https://api.github.com/user/repos?sort=updated&per_page=100', {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/vnd.github.v3+json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            setRepos(data);
            setFilteredRepos(data);
        } else {
            if (response.status === 401) {
                setIsConnected(false);
                Alert.alert("알림", "GitHub 연결이 만료되었습니다. 다시 로그인해주세요.");
            }
        }
    } catch (e) {
        console.error("Fetch Repos Error:", e);
    } finally {
        setLoading(false);
    }
  };

  const handleLinkGitHub = async () => {
      try {
          setLoading(true);
          await authService.linkGitHub();
          await checkConnectionAndFetch();
      } catch (e) {
          console.error("Link Error:", e);
          const errorMessage = e.message || "알 수 없는 오류";
          Alert.alert("오류", `GitHub 연동 중 문제가 발생했습니다.\n${errorMessage}`);
          setLoading(false);
      }
  };

  const handleComplete = () => {
    if (selectedRepo) {
      onSelect(selectedRepo);
      onClose();
    }
  };

  const getLanguageColor = (lang) => {
    const colors = {
      JavaScript: '#f1e05a',
      TypeScript: '#3178c6',
      Python: '#3572a5',
      HTML: '#e34c26',
      CSS: '#563d7c',
      Java: '#b07219',
    };
    return colors[lang] || '#888';
  };

  const renderItem = ({ item }) => {
    const isSelected = selectedRepo?.id === item.id;
    return (
        <TouchableOpacity 
            style={[styles.repoCard, isSelected && styles.repoCardSelected]}
            onPress={() => setSelectedRepo(item)}
            activeOpacity={0.7}
        >
            <View style={styles.repoHeader}>
                <View style={styles.repoTitleRow}>
                    <Text style={styles.repoName}>{item.name}</Text>
                    {item.private && (
                        <View style={styles.privateBadge}>
                            <Text style={styles.privateText}>Private</Text>
                        </View>
                    )}
                </View>
                {isSelected ? (
                    <CheckSquare size={20} color="#00B26B" />
                ) : (
                    <Square size={20} color="#E0E0E0" />
                )}
            </View>

            {item.description && (
                <Text style={styles.repoDesc} numberOfLines={2}>{item.description}</Text>
            )}

            <View style={styles.repoMeta}>
                {item.language && (
                    <View style={styles.metaItem}>
                        <View style={[styles.langDot, { backgroundColor: getLanguageColor(item.language) }]} />
                        <Text style={styles.metaText}>{item.language}</Text>
                    </View>
                )}
                <View style={styles.metaItem}>
                    <Star size={14} color="#6B7280" />
                    <Text style={styles.metaText}>{item.stargazers_count}</Text>
                </View>
                <View style={styles.metaItem}>
                    <GitFork size={14} color="#6B7280" />
                    <Text style={styles.metaText}>{item.forks_count}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
            {/* 1. Header */}
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.headerIconContainer}>
                             <Github size={18} color="#1A1A1A" />
                        </View>
                        <Text style={styles.headerTitle}>GitHub 연동</Text>
                    </View>
                    <TouchableOpacity onPress={onClose} style={{ padding: 4 }}>
                        <X size={20} color="#1A1A1A" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.headerSubtitle}>GitHub 계정을 연동하여 저장소를 쉽게 관리하세요</Text>
            </View>

            {/* 2. Content */}
            <View style={styles.content}>
                {loading ? (
                     <ActivityIndicator size="large" color="#00B26B" style={{ marginTop: 50 }} />
                ) : !isConnected ? (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyText}>계정이 연동되지 않았습니다.</Text>
                        <TouchableOpacity style={styles.connectButton} onPress={handleLinkGitHub}>
                            <Github size={20} color="#FFF" style={{ marginRight: 8 }} />
                            <Text style={styles.connectButtonText}>GitHub 연동하기</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <>
                        {/* Connected Account Card */}
                        <View style={styles.accountCard}>
                            <View style={styles.accountInfo}>
                                <View style={styles.avatarContainer}>
                                    <Github size={20} color="#FFF" />
                                </View>
                                <View style={styles.accountTexts}>
                                    <View style={styles.accountNameRow}>
                                        <Text style={styles.accountName}>
                                            {userData?.displayName || userData?.nickname || 'GitHub User'}
                                        </Text>
                                        <View style={styles.badge}>
                                            <Text style={styles.badgeText}>연동됨</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.repoCountText}>{repos.length}개 저장소</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.refreshButton} onPress={checkConnectionAndFetch}>
                                <RefreshCw size={14} color="#1A1A1A" />
                            </TouchableOpacity>
                        </View>

                        {/* Search Bar */}
                        <View style={styles.searchSection}>
                            <Text style={styles.sectionLabel}>저장소 검색</Text>
                            <View style={styles.searchInputContainer}>
                                <Search size={16} color="#6B7280" />
                                <TextInput 
                                    style={styles.searchInput}
                                    placeholder="저장소 이름이나 설명으로 검색..."
                                    value={searchText}
                                    onChangeText={setSearchText}
                                    placeholderTextColor="#9CA3AF"
                                />
                            </View>
                        </View>

                        {/* Repo List Header */}
                        <View style={styles.listHeader}>
                            <Text style={styles.sectionLabel}>저장소 선택</Text>
                            <Text style={styles.listCount}>{filteredRepos.length}개의 저장소</Text>
                        </View>

                        {/* Repo List */}
                        <FlatList
                            data={filteredRepos}
                            renderItem={renderItem}
                            keyExtractor={item => String(item.id)}
                            contentContainerStyle={styles.listContent}
                            showsVerticalScrollIndicator={false}
                        />

                        {/* Footer Buttons */}
                        <View style={styles.footer}>
                            <TouchableOpacity 
                                style={[styles.completeButton, !selectedRepo && styles.disabledButton]} 
                                onPress={handleComplete}
                                disabled={!selectedRepo}
                            >
                                <Text style={styles.completeButtonText}>선택 완료</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // Dimmed background
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: 385, // Fixed width from design
    height: 760, // Fixed height from design
    backgroundColor: '#FAF8F3', // Beige background
    borderRadius: 9,
    overflow: 'hidden',
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    paddingTop: 22,
    paddingHorizontal: 22,
    paddingBottom: 10,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  headerIconContainer: {
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 26, // Indent to align with text
  },
  content: {
    flex: 1,
    paddingHorizontal: 22,
  },
  // Account Card
  accountCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    marginBottom: 20,
    marginTop: 10,
  },
  accountInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#24292E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  accountTexts: {
    justifyContent: 'center',
  },
  accountNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  accountName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1A1A1A',
    marginRight: 6,
  },
  badge: {
    backgroundColor: '#00B26B',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 10,
  },
  repoCountText: {
    fontSize: 12,
    color: '#6B7280',
  },
  refreshButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#FAF8F3',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },

  // Search
  searchSection: {
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 12,
    color: '#1A1A1A',
    marginBottom: 8,
    fontWeight: '600'
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 36,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: '#1A1A1A',
    paddingVertical: 0,
  },

  // List Header
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  listCount: {
    fontSize: 12,
    color: '#6B7280',
  },

  // List Content
  listContent: {
    paddingBottom: 20,
  },
  repoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  repoCardSelected: {
    borderColor: '#00B26B',
    borderWidth: 1.5,
  },
  repoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  repoTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
    flexWrap: 'wrap',
  },
  repoName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginRight: 6,
  },
  privateBadge: {
    backgroundColor: '#34C3F1',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  privateText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '600',
  },
  repoDesc: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 12,
    lineHeight: 16,
  },
  repoMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  langDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  metaText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },

  // Footer
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
    gap: 10,
  },
  cancelButton: {
    backgroundColor: '#FAF8F3',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  cancelButtonText: {
    fontSize: 12,
    color: '#1A1A1A',
  },
  completeButton: {
    backgroundColor: '#00B26B',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  disabledButton: {
    opacity: 0.5,
  },
  completeButtonText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },

  // Empty State
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingBottom: 100,
  },
  emptyText: {
    color: '#666',
    marginBottom: 20,
    fontSize: 14
  },
  connectButton: {
    backgroundColor: '#24292E',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8
  },
  connectButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
