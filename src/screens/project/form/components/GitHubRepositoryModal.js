import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Alert
} from 'react-native';
import { X, Github, RefreshCw } from 'lucide-react-native';
import { getFirestore, doc, getDoc } from '@react-native-firebase/firestore';
import { authService } from '../../../../services/authService';

export default function GitHubRepositoryModal({ visible, onClose, onSelect }) {
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (visible) {
      checkConnectionAndFetch();
    }
  }, [visible]);

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
        const userData = userDoc.data();

        if (userData?.githubToken) {
            setIsConnected(true);
            await fetchRepos(userData.githubToken);
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
        } else {
            console.error("GitHub Repos Fetch Failed:", response.status);
            if (response.status === 401) {
                // 토큰 만료시
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
          console.log("Starting GitHub Link Process...");
          setLoading(true);
          await authService.linkGitHub();
          console.log("GitHub Linked. Refreshing...");
          // 연동 성공 후 리스트 갱신
          await checkConnectionAndFetch();
      } catch (e) {
          console.error("Link Error:", e);
          const errorMessage = e.message || "알 수 없는 오류";
          Alert.alert("오류", `GitHub 연동 중 문제가 발생했습니다.\n${errorMessage}`);
          setLoading(false);
      }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
        style={styles.repoItem}
        onPress={() => {
            onSelect(item);
            onClose();
        }}
    >
        <View style={styles.repoInfo}>
            <Text style={styles.repoName}>{item.name}</Text>
            {item.description && (
                <Text style={styles.repoDesc} numberOfLines={1}>{item.description}</Text>
            )}
            <View style={styles.repoMeta}>
                <Text style={styles.repoLang}>{item.language || 'Plain Text'}</Text>
                <Text style={styles.repoStar}>★ {item.stargazers_count}</Text>
            </View>
        </View>
        <Github size={20} color="#333" />
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerTitleRow}>
                    <Github size={24} color="#000" />
                    <Text style={styles.headerTitle}>GitHub 연동</Text>
                </View>
                <TouchableOpacity onPress={onClose}>
                    <X size={24} color="#000" />
                </TouchableOpacity>
            </View>

            {/* Content */}
            {loading ? (
                <View style={styles.center}>
                    <ActivityIndicator size="large" color="#000" />
                </View>
            ) : !isConnected ? (
                <View style={styles.center}>
                    <Text style={styles.infoText}>GitHub 계정이 연동되지 않았습니다.</Text>
                    <TouchableOpacity style={styles.linkButton} onPress={handleLinkGitHub}>
                        <Text style={styles.linkButtonText}>GitHub 연동하기</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <>
                 <View style={styles.statusRow}>
                    <View style={styles.connectedBadge}>
                        <Github size={12} color="#FFF" />
                        <Text style={styles.connectedText}>연동됨</Text>
                    </View>
                    <TouchableOpacity onPress={checkConnectionAndFetch} style={styles.refreshBtn}>
                        <RefreshCw size={14} color="#666" />
                    </TouchableOpacity>
                 </View>

                 <Text style={styles.listTitle}>저장소 선택 ({repos.length}개)</Text>

                 <FlatList
                    data={repos}
                    renderItem={renderItem}
                    keyExtractor={item => String(item.id)}
                    contentContainerStyle={styles.listContent}
                 />
                </>
            )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20
  },
  container: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    height: '70%',
    padding: 20
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoText: {
    color: '#666',
    marginBottom: 16
  },
  linkButton: {
    backgroundColor: '#24292E',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8
  },
  linkButtonText: {
    color: '#FFF',
    fontWeight: 'bold'
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#F7F9FA',
    padding: 12,
    borderRadius: 8
  },
  connectedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2ea44f',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4
  },
  connectedText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold'
  },
  refreshBtn: {
    padding: 4
  },
  listTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8
  },
  listContent: {
    paddingBottom: 20
  },
  repoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE'
  },
  repoInfo: {
    flex: 1,
    marginRight: 12
  },
  repoName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4
  },
  repoDesc: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4
  },
  repoMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  repoLang: {
    fontSize: 12,
    color: '#2196F3', // Blue-ish
    fontWeight: '500'
  },
  repoStar: {
    fontSize: 12,
    color: '#666'
  }
});
