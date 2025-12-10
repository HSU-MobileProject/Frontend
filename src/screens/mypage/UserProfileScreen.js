import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Dimensions, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getFirestore, doc, getDoc, collection, query, where, getDocs, onSnapshot, addDoc, serverTimestamp } from '@react-native-firebase/firestore';
import { ChevronLeft, MessageCircle, UserPlus, FileText, BarChart2, Link as LinkIcon, Github, MapPin, Calendar, Heart, Eye, Users, CheckCircle, Clock } from 'lucide-react-native';
import colors from '../../assets/colors';
import categoryColors from '../../assets/categoryColors';
import typography from '../../assets/typography';
import { authService } from '../../services/authService';

const { width } = Dimensions.get('window');
const scale = width / 409; 

// 헬퍼 함수: 카테고리 색상 매핑
const getCategoryColor = (cat) => {
    return categoryColors[cat] || categoryColors.default;
};

const SimpleProjectCard = ({ project, onPress, isLiked }) => (
  <TouchableOpacity style={styles.projectCard} onPress={onPress}>
    <View style={styles.projectHeader}>
        <View style={styles.projectHeaderLeft}>
            <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(project.category) }]}>
                <Text style={styles.categoryText}>{project.category}</Text>
            </View>
            <View style={styles.statusBadge}>
                <Text style={styles.statusText}>{project.status || '진행중'}</Text>
            </View>
        </View>
    </View>

    <Text style={styles.projectTitle} numberOfLines={1}>{project.title}</Text>
    <Text style={styles.projectDesc} numberOfLines={2}>{project.description}</Text>

    {/* Tech Stack Badges */}
    <View style={styles.techStackContainer}>
        {(project.techStack || ['React Native', 'TypeScript']).slice(0, 3).map((tech, i) => (
             <View key={i} style={styles.techBadge}>
                 <Text style={styles.techText}>{tech}</Text>
             </View>
        ))}
    </View>

    {/* Price & Progress */}
    <View style={styles.priceRow}>
        <Text style={styles.priceLabel}>가격</Text>
        <Text style={styles.priceValue}>{project.price || '450,000'}원</Text> 
    </View>
    <View style={styles.progressRow}>
         <View style={styles.progressTextRow}>
             <Text style={styles.progressLabel}>진행률</Text>
             <Text style={styles.progressValue}>{project.progress || 65}%</Text>
         </View>
         <View style={styles.progressBarBg}>
             <View style={[styles.progressBarFill, { width: `${project.progress || 65}%`, backgroundColor: colors.green }]} />
         </View>
    </View>


    {/* Footer Stats */}
    <View style={styles.cardFooter}>
         <View style={styles.statRow}>
             <View style={styles.iconStat}>
                <Heart 
                    size={14} 
                    color={isLiked ? "#E91E63" : colors.grayDark} 
                    fill={isLiked ? "#E91E63" : "transparent"}
                />
                <Text style={styles.statCount}>{project.likes || 0}</Text>
             </View>
             <View style={styles.iconStat}>
                <Eye size={14} color={colors.grayDark} />
                <Text style={styles.statCount}>{project.views || 0}</Text>
             </View>
             <View style={styles.iconStat}>
                <Users size={14} color={colors.grayDark} />
                <Text style={styles.statCount}>{project.members || 3}</Text>
             </View>
         </View>
    </View>
  </TouchableOpacity>
);

// 통계 탭 컴포넌트
const StatsTab = ({ projects }) => {
  // 1. 통계 계산
  const totalProjects = projects.length;
  const totalLikes = projects.reduce((sum, p) => sum + (p.likes || 0), 0);
  const totalViews = projects.reduce((sum, p) => sum + (p.views || 0), 0);
  const contribution = projects.length * 12 + totalLikes; // 더미 로직: 프로젝트당 12점 + 좋아요당 1점

  // 2. 카테고리 분포 계산
  const categories = projects.reduce((acc, p) => {
    const cat = p.category || '기타';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const categoryList = Object.keys(categories).map(cat => ({
    label: cat,
    count: categories[cat],
    percent: (categories[cat] / totalProjects) * 100
  })).sort((a, b) => b.count - a.count);

  // 디자인에 정의된 색상 (colors.js 활용)
  const cardColors = {
    projects: colors.primary,  // #34C3F1
    likes: colors.yellow,      // #FBC02D (or Accent/Star color)
    views: colors.olive,       // #A8D474
    contrib: colors.mint       // #34D7B0
  };

  const StatCard = ({ label, value, color, icon: IconComponent }) => (
    <View style={styles.statCard}>
      <View style={[styles.statIconWrapper, { borderColor: color }]}>
        <IconComponent size={24} color={color} style={{ opacity: 0.8 }} />
      </View>
      <View style={styles.statContent}>
        <Text style={styles.statValue}>{value.toLocaleString()}</Text>
        <Text style={styles.statLabel}>{label}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.statsContainer}>
      {/* 2x2 Grid Stats */}
      <View style={styles.statsGrid}>
        <StatCard 
          label="등록 프로젝트" 
          value={totalProjects} 
          color={cardColors.projects} 
          icon={FileText} 
        />
        <StatCard 
          label="총 즐겨찾기" 
          value={totalLikes} 
          color={cardColors.likes} 
          icon={BarChart2} 
        />
        <StatCard 
          label="총 조회수" 
          value={totalViews} 
          color={cardColors.views} 
          icon={LinkIcon} 
        />
        <StatCard 
          label="기여 프로젝트" 
          value={contribution} 
          color={cardColors.contrib} 
          icon={Github} 
        />
      </View>

      {/* Category Progress Bars */}
      <View style={styles.categoryCard}>
        <Text style={styles.categoryTitle}>카테고리별 프로젝트</Text>
        <View style={styles.categoryList}>
          {categoryList.length > 0 ? categoryList.map((item, index) => (
            <View key={index} style={styles.categoryItem}>
              <View style={styles.categoryHeader}>
                <Text style={styles.categoryLabel}>{item.label}</Text>
                <Text style={styles.categoryCount}>{item.count}개</Text>
              </View>
              <View style={styles.progressBackground}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${item.percent}%`, backgroundColor: colors.green }
                  ]} 
                />
              </View>
            </View>
          )) : (
            <Text style={{ color: colors.grayDark, marginTop: 10 }}>데이터가 없습니다.</Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default function UserProfileScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { userId } = route.params || {}; // 타겟 유저 ID

  const [userData, setUserData] = useState(null);
  const [projects, setProjects] = useState([]);
  const [activeTab, setActiveTab] = useState('projects'); // projects | stats
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [likedProjectIds, setLikedProjectIds] = useState(new Set());

  const currentUser = authService.getCurrentUser();

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        const db = getFirestore();
        
        // 1. 유저 정보 Fetch
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }

        // 2. 유저 프로젝트 Fetch (공개된 것만? 일단 전부)
        const q = query(
            collection(db, 'projects'), 
            where('ownerId', '==', userId)
        );
        const pSnap = await getDocs(q);
        const pList = pSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        setProjects(pList);

      } catch (e) {
        console.error("Profile Load Error:", e);
      }
    };
    fetchData();
  }, [userId]);

  // Fetch Current User Likes
  useEffect(() => {
    if (!currentUser) return;
    const db = getFirestore();
    const unsubscribe = onSnapshot(collection(db, 'userLikes', currentUser.uid, 'projects'), 
        (snapshot) => {
            const ids = new Set();
            snapshot.forEach(doc => ids.add(doc.id));
            setLikedProjectIds(ids);
        },
        (error) => console.log("Likes Fetch Error:", error)
    );
    return () => unsubscribe();
  }, [currentUser]);

  const handleMessagePress = async () => {
    if (isChatLoading) return;
    if (!currentUser) {
        // 로그인 필요 알림 등 처리
        return;
    }
    
    setIsChatLoading(true);
    try {
        const db = getFirestore();
        
        // 1. 기존 채팅방 확인
        // firestore의 array-contains는 단일 값만 지원하므로, 내 ID가 포함된 방을 찾고 결과에서 상대방 ID를 필터링합니다.
        const q = query(
            collection(db, 'chatRooms'),
            where('participants', 'array-contains', currentUser.uid)
        );
        const snapshot = await getDocs(q);
        
        const existingRoom = snapshot.docs.find(doc => {
            const data = doc.data();
            return data.participants && data.participants.includes(userId);
        });

        if (existingRoom) {
            // 이미 존재하면 이동
            navigation.navigate('ChatDetail', { 
                chatId: existingRoom.id, 
                otherUserId: userId,
                userName: userData.displayName || '알 수 없음'
            });
        } else {
            // 없으면 새로 생성
            const newRoomRef = await addDoc(collection(db, 'chatRooms'), {
                participants: [currentUser.uid, userId],
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                lastMessage: '',
                type: 'direct'
            });
            
            navigation.navigate('ChatDetail', { 
                chatId: newRoomRef.id, 
                otherUserId: userId,
                userName: userData.displayName || '알 수 없음'
            });
        }
    } catch (e) {
        console.error("Chat Room Init Error:", e);
    } finally {
        setIsChatLoading(false);
    }
  };

  if (!userData) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  const githubUrl = userData?.githubUrl || (userData?.githubUsername ? `https://github.com/${userData.githubUsername}` : null);

  return (
    <SafeAreaView style={styles.container}>
        {/* 헤더 */}
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <ChevronLeft size={18} color={colors.black} />
                <Text style={styles.backBtnText}>돌아가기</Text>
            </TouchableOpacity>
        </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
             {userData.photoURL ? (
                <Image source={{ uri: userData.photoURL }} style={styles.avatar} />
             ) : (
                <View style={[styles.avatar, styles.defaultAvatar]}>
                    <Text style={styles.avatarText}>{userData.displayName?.[0] || 'U'}</Text>
                </View>
             )}
             
             <View style={styles.profileTextContainer}>
                <Text style={styles.name}>{userData.displayName || '알 수 없는 사용자'}</Text>
                <Text style={styles.handle}>@{userData.email?.split('@')[0] || 'unknown'}</Text>
             </View>
          </View>


          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            {currentUser?.uid !== userId && (
                <>

                <TouchableOpacity 
                    style={[styles.actionBtn, styles.messageBtn]}
                    onPress={handleMessagePress}
                >
                    <MessageCircle size={16} color={colors.black} />
                    <Text style={styles.messageBtnText}>메시지</Text>
                </TouchableOpacity>
                </>
            )}
          </View>

          {userData.bio ? (
            <Text style={styles.bio}>
              {userData.bio}
            </Text>
          ) : null}

          {/* GitHub Section */}
          {githubUrl && (
              <TouchableOpacity 
                style={styles.githubCard}
                onPress={() => Linking.openURL(githubUrl)}
              >
                 <View style={styles.githubProfile}>
                    <View style={styles.githubLogo}>
                        <Github size={20} color="white" />
                    </View>
                    <View>
                        <Text style={styles.githubHandle}>@{userData.githubUsername || 'Unknown'}</Text>
                        <Text style={styles.githubLinkText}>GitHub 프로필 보기</Text>
                    </View>
                 </View>
              </TouchableOpacity>
          )}
        </View>

        <View style={styles.divider} />

        {/* Custom Tabs */}
        <View style={styles.tabBar}>
            <TouchableOpacity 
                style={[styles.tabItem, activeTab === 'projects' && styles.activeTab]}
                onPress={() => setActiveTab('projects')}
            >
                <Text style={[styles.tabText, activeTab === 'projects' && styles.activeTabText]}>프로젝트 ({projects.length})</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.tabItem, activeTab === 'stats' && styles.activeTab]}
                onPress={() => setActiveTab('stats')}
            >
                <Text style={[styles.tabText, activeTab === 'stats' && styles.activeTabText]}>통계</Text>
            </TouchableOpacity>
        </View>

        {/* Tab Content */}
        <View style={styles.tabContent}>
            {activeTab === 'projects' ? (
                <View>
                    {projects.map(p => (
                        <SimpleProjectCard 
                            key={p.id} 
                            project={p} 
                            isLiked={likedProjectIds.has(p.id)}
                            onPress={() => navigation.push('ProjectDetail', { project: p })}
                        />
                    ))}
                    {projects.length === 0 && <Text style={styles.emptyText}>등록한 프로젝트가 없습니다.</Text>}
                </View>
            ) : (
                <StatsTab projects={projects} />
            )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.beige },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  
  header: { paddingHorizontal: 20 * scale, paddingVertical: 10 * scale },
  backButton: { flexDirection: 'row', alignItems: 'center', paddingVertical: 6 * scale },
  backBtnText: { fontSize: 15 * scale, fontWeight: 'bold', color: colors.black, marginLeft: 4 * scale },
  
  scrollContent: { paddingBottom: 40 * scale },

  // Profile Section
  profileSection: { paddingHorizontal: 20 * scale, alignItems: 'center' },
  
  avatarContainer: { alignItems: 'center', marginBottom: 20 * scale },
  avatar: { width: 128 * scale, height: 128 * scale, borderRadius: 64 * scale, marginBottom: 16 * scale },
  defaultAvatar: { width: 128 * scale, height: 128 * scale, borderRadius: 64 * scale, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', marginBottom: 16 * scale },
  avatarText: { fontSize: 36 * scale, color: colors.white, fontWeight: 'bold' },
  profileTextContainer: { alignItems: 'center', gap: 4 * scale },
  
  name: { fontSize: 24 * scale, fontWeight: 'bold', color: colors.black },
  handle: { fontSize: 16 * scale, color: colors.grayDark },
  
  // Action Buttons
  actionButtons: { flexDirection: 'row', gap: 8 * scale, marginBottom: 24 * scale },
  actionBtn: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 36 * scale, borderRadius: 8 * scale, paddingHorizontal: 16 * scale, gap: 6 * scale },
  followBtn: { backgroundColor: colors.green, paddingHorizontal: 20 * scale },
  followBtnText: { color: colors.white, fontSize: 14 * scale, fontWeight: 'bold' },
  messageBtn: { backgroundColor: colors.beige, borderWidth: 1, borderColor: 'rgba(0,0,0,0.1)', paddingHorizontal: 16 * scale },
  messageBtnText: { color: colors.black, fontSize: 14 * scale },

  // Bio & Meta
  bio: { fontSize: 16 * scale, color: colors.black, textAlign: 'center', lineHeight: 24 * scale, marginBottom: 24 * scale, paddingHorizontal: 10 * scale },

  metaInfo: { width: '100%', gap: 8 * scale, alignItems: 'flex-start', paddingHorizontal: 20 * scale },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 8 * scale, marginBottom: 4 * scale },
  metaText: { fontSize: 16 * scale, color: colors.grayDark },

  followStats: { flexDirection: 'row', gap: 16 * scale, marginTop: 20 * scale, paddingHorizontal: 20 * scale, alignSelf: 'flex-start' },
  statItem: { fontSize: 16 * scale, color: colors.grayDark },
  bold: { fontWeight: 'bold', color: colors.black },

  // GitHub Card
  githubCard: { 
    width: width - 40 * scale, 
    borderRadius: 10 * scale, 
    padding: 16 * scale, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 20 * scale
  },
  githubHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 * scale },
  githubTitle: { fontSize: 16 * scale, fontWeight: 'bold', color: colors.black },
  githubProfile: { flexDirection: 'row', alignItems: 'center', gap: 12 * scale },
  githubLogo: { width: 40 * scale, height: 40 * scale, borderRadius: 20 * scale, backgroundColor: '#24292E', justifyContent: 'center', alignItems: 'center' },
  githubHandle: { fontSize: 16 * scale, color: colors.black, fontWeight: 'bold' },
  githubLinkText: { fontSize: 14 * scale, color: colors.grayDark },

  divider: { height: 1, backgroundColor: colors.grayLight, borderRadius: 4 * scale, marginHorizontal: 20 * scale, marginBottom: 32 * scale },

  // Tab Bar
  tabBar: { flexDirection: 'row', backgroundColor: colors.grayLight, borderRadius: 14 * scale, marginHorizontal: 20 * scale, padding: 3 * scale, marginBottom: 16 * scale },
  tabItem: { flex: 1, paddingVertical: 6 * scale, borderRadius: 12 * scale, alignItems: 'center', justifyContent: 'center' },
  activeTab: { backgroundColor: colors.white },
  tabText: { fontSize: 14 * scale, color: colors.black },
  activeTabText: { fontWeight: 'bold' },

  tabContent: { paddingHorizontal: 20 * scale },
  
  // Project Card
  projectCard: { 
    backgroundColor: colors.white, 
    borderRadius: 13 * scale, 
    borderWidth: 1, 
    borderColor: "rgba(0,0,0,0.1)",
    paddingVertical: 22 * scale,
    paddingHorizontal: 22 * scale,
    marginBottom: 22 * scale,
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  projectHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 * scale },
  projectHeaderLeft: { flexDirection: 'row', gap: 8 * scale },
  
  categoryBadge: { paddingHorizontal: 8 * scale, paddingVertical: 2 * scale, borderRadius: 7.4 * scale, marginRight: 6 * scale },
  categoryText: { fontSize: 11 * scale, color: colors.white, fontFamily: typography.fontFamily.regular },
  
  statusBadge: { paddingHorizontal: 8 * scale, paddingVertical: 2 * scale, borderRadius: 7.4 * scale, backgroundColor: colors.yellow },
  statusText: { fontSize: 11 * scale, color: colors.black, fontFamily: typography.fontFamily.regular },

  projectTitle: { fontSize: 16 * scale, fontWeight: 'bold', color: colors.black, marginBottom: 8 * scale },
  projectDesc: { fontSize: 16 * scale, color: colors.grayDark, lineHeight: 24 * scale, marginBottom: 16 * scale },

  techStackContainer: { flexDirection: 'row', gap: 6 * scale, marginBottom: 16 * scale },
  techBadge: { paddingHorizontal: 8 * scale, paddingVertical: 2 * scale, borderRadius: 7.4 * scale, borderWidth: 1, borderColor: 'rgba(0,0,0,0.1)', backgroundColor: 'transparent' },
  techText: { fontSize: 11 * scale, color: colors.black, fontFamily: typography.fontFamily.regular },

  priceRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 * scale },
  priceLabel: { fontSize: 16 * scale, color: colors.grayDark },
  priceValue: { fontSize: 16 * scale, color: colors.green, fontWeight: 'bold' },

  progressRow: { gap: 4 * scale, marginBottom: 20 * scale },
  progressTextRow: { flexDirection: 'row', justifyContent: 'space-between' },
  progressLabel: { fontSize: 16 * scale, color: colors.grayDark },
  progressValue: { fontSize: 16 * scale, color: colors.grayDark }, 
  progressBarBg: { height: 7 * scale, backgroundColor: colors.grayLight, borderRadius: 999, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: colors.green, borderRadius: 999 },

  cardFooter: { flexDirection: 'row', gap: 16 * scale },
  statRow: { flexDirection: 'row', gap: 16 * scale },
  iconStat: { flexDirection: 'row', alignItems: 'center', gap: 4 * scale },
  statIcon: { fontSize: 14 * scale },
  statCount: { fontSize: 16 * scale, color: colors.grayDark },

  // ... Stats styles reuse ...
  statsContainer: { gap: 20 * scale },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 * scale },
  statCard: { 
    width: (width - 40 * scale - 16 * scale) / 2, 
    backgroundColor: colors.white, 
    borderRadius: 14 * scale, 
    padding: 16 * scale,
    borderWidth: 1, 
    borderColor: 'rgba(0,0,0,0.1)',
    height: 153 * scale,
    justifyContent: 'space-between',
    marginBottom: 8 * scale 
  },
  statIconWrapper: { 
    width: 48 * scale, 
    height: 48 * scale, 
    borderRadius: 24 * scale, 
    borderWidth: 2, 
    justifyContent: 'center', 
    alignItems: 'center',
    marginBottom: 12 * scale
  },
  statContent: { gap: 4 * scale },
  statValue: { fontSize: 28 * scale, fontWeight: 'bold', color: colors.black },
  statLabel: { fontSize: 14 * scale, color: colors.grayDark },

  categoryCard: {
    backgroundColor: colors.white,
    borderRadius: 14 * scale,
    padding: 24 * scale,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)'
  },
  categoryTitle: { fontSize: 16 * scale, fontWeight: '600', color: colors.black, marginBottom: 16 * scale },
  categoryList: { gap: 16 * scale },
  categoryItem: { gap: 8 * scale },
  categoryHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  categoryLabel: { fontSize: 15 * scale, color: colors.black },
  categoryCount: { fontSize: 14 * scale, color: colors.grayDark },
  progressBackground: { 
    height: 8 * scale, 
    backgroundColor: colors.grayLight, 
    borderRadius: 4 * scale, 
    overflow: 'hidden' 
  },
  progressFill: { height: '100%', borderRadius: 4 * scale },
});
