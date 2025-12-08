import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../../assets/colors';
import styles from './ProjectTabPanel.styles';
import { authService } from '../../../services/authService';
import { getFirestore, collection, query, where, getDocs, doc, getDoc } from '@react-native-firebase/firestore';

const { width } = Dimensions.get('window');
const scale = width / 409;

export default function ProjectTabPanel({ navigation }) {
  const [activeTab, setActiveTab] = useState('registered'); // 'registered' or 'supported'
  const [projects, setProjects] = useState([]);

  React.useEffect(() => {
    const fetchProjects = async () => {
      const user = authService.getCurrentUser();
      if (!user) {
        setProjects([]);
        return;
      }

      if (activeTab === 'registered') {
        try {
          // Index Error 방지를 위해 orderBy 제거 후 Client-side sort
          const db = getFirestore();
          const q = query(collection(db, 'projects'), where('ownerId', '==', user.uid));
          const snapshot = await getDocs(q);

          const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            statusColor: doc.data().status === '완료' ? colors.grayDark : colors.green,
            status: doc.data().status || '진행중'
          }));

          // 최신순 정렬
          data.sort((a, b) => {
            const tA = a.createdAt?.seconds ?? 0;
            const tB = b.createdAt?.seconds ?? 0;
            return tB - tA;
          });

          setProjects(data);
        } catch (e) {
          console.error("MyProjects Fetch Error:", e);
        }
      } else if (activeTab === 'supported') {
        // [수정] 지원한 프로젝트 조회
        try {
          const db = getFirestore();
          const q = query(collection(db, 'applications'), where('applicantId', '==', user.uid));
          const appSnapshot = await getDocs(q);

          // Application에서 projectId 추출 후 프로젝트 정보 조회
          const projectPromises = appSnapshot.docs.map(async (appDoc) => {
            const appData = appDoc.data();
            const pDoc = await getDoc(doc(db, 'projects', appData.projectId));
            if (pDoc.exists()) {
              return {
                id: pDoc.id,
                ...pDoc.data(),
                statusColor: pDoc.data().status === '완료' ? colors.grayDark : colors.green,
                status: pDoc.data().status || '진행중',
                applicationStatus: appData.status // 지원 상태 표시용 (필요시)
              };
            }
            return null;
          });

          const pResults = await Promise.all(projectPromises);
          const validProjects = pResults.filter(p => p !== null);

          // 최신순 정렬 (지원일 기준이 좋겠지만, 여기선 프로젝트 생성일 기준 fallback)
          validProjects.sort((a, b) => {
            const tA = a.createdAt?.seconds ?? 0;
            const tB = b.createdAt?.seconds ?? 0;
            return tB - tA;
          });

          setProjects(validProjects);
        } catch (e) {
          console.error("Supported Projects Fetch Error:", e);
        }
      } else if (activeTab === 'liked') {
        try {
          // [찜한 프로젝트 조회]
          const db = getFirestore();
          // userLikes/{userId}/projects 컬렉션 조회
          const likesSnapshot = await getDocs(collection(db, 'userLikes', user.uid, 'projects'));

          const projectPromises = likesSnapshot.docs.map(async (likeDoc) => {
            const projectId = likeDoc.id; // 문서 ID가 projectId임
            const pDoc = await getDoc(doc(db, 'projects', projectId));
            if (pDoc.exists()) {
              return {
                id: pDoc.id,
                ...pDoc.data(),
                statusColor: pDoc.data().status === '완료' ? colors.grayDark : colors.green,
                status: pDoc.data().status || '진행중'
              };
            }
            return null;
          });

          const pResults = await Promise.all(projectPromises);
          const validProjects = pResults.filter(p => p !== null);

          // 정렬이 필요하면 여기서 수행 (예: 최근 찜한 순서? 하지만 timestamp가 userLikes에 있는지 확인 필요)
          // 여기선 단순 프로젝트 생성일 순으로 정렬
          validProjects.sort((a, b) => {
            const tA = a.createdAt?.seconds ?? 0;
            const tB = b.createdAt?.seconds ?? 0;
            return tB - tA;
          });

          setProjects(validProjects);
        } catch (e) {
          console.error("Liked Projects Fetch Error:", e);
        }
      }
    };

    fetchProjects();
  }, [activeTab]);

  return (
    <View style={styles.container}>
      {/* 탭 버튼 */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'registered' && styles.tabActive]}
          onPress={() => setActiveTab('registered')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'registered' && styles.tabTextActive,
            ]}
          >
            등록한 프로젝트
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'supported' && styles.tabActive]}
          onPress={() => setActiveTab('supported')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'supported' && styles.tabTextActive,
            ]}
          >
            지원한 프로젝트
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'liked' && styles.tabActive]}
          onPress={() => setActiveTab('liked')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'liked' && styles.tabTextActive,
            ]}
          >
            찜한 프로젝트
          </Text>
        </TouchableOpacity>
      </View>

      {/* 프로젝트 리스트 */}
      <ScrollView scrollEnabled={false} style={styles.projectList}>
        {projects.map(project => (
          <View key={project.id} style={styles.projectCard}>
            <View style={styles.projectContent}>
              {/* 좌측: 프로젝트 정보 */}
              <View style={styles.projectInfo}>
                {/* 상태 배지 및 팀원 정보 */}
                <View style={styles.headerRow}>
                  <View
                    style={[
                      styles.statusBadge,
                      { backgroundColor: project.statusColor },
                    ]}
                  >
                    <Text style={styles.statusText}>{project.status}</Text>
                  </View>
                  <Text style={styles.teamInfo}>팀원 {project.members}명</Text>
                </View>

                {/* 프로젝트 제목 */}
                <Text style={styles.projectTitle}>{project.title}</Text>

                {/* 좋아요 및 조회수 */}
                <View style={styles.statsRow}>
                  <View style={styles.stat}>
                    <Icon name="star-o" size={12} color={colors.grayDark} />
                    <Text style={styles.statText}>{project.likes}</Text>
                  </View>
                  <View style={styles.stat}>
                    <Icon name="eye" size={12} color={colors.grayDark} />
                    <Text style={styles.statText}>{project.views}</Text>
                  </View>
                </View>
              </View>

              {/* 우측: 액션 버튼 */}
              <View style={styles.actionButtons}>
                {/* 'registered' 탭과 달리 '찜한 프로젝트'는 내가 주인이 아닐 수도 있음. 
                    하지만 로직상 registered 탭에서만 편집 버튼을 보여주는 게 안전함. 
                    혹은 ownerId 체크를 해서 보여줘도 됨. 
                    여기서는 탭 기준 분기 유지.
                */}
                {activeTab === 'registered' ? (
                  <>
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => navigation?.navigate('ProjectEdit', { project })}
                    >
                      <Text style={styles.editButtonText}>수정</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.manageButton}
                      onPress={() => navigation?.navigate('ProjectDetail', { project })}
                    >
                      <Text style={styles.manageButtonText}>관리</Text>
                    </TouchableOpacity>
                  </>
                ) : ( // supported or liked
                  <TouchableOpacity
                    style={styles.detailButton}
                    onPress={() => navigation?.navigate('ProjectDetail', { project })}
                  >
                    <Text style={styles.detailButtonText}>상세보기</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* 새 프로젝트 등록 버튼 */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation?.navigate('ProjectCreate')}
      >
        <Text style={styles.addButtonText}>+ 새 프로젝트 등록</Text>
      </TouchableOpacity>
    </View>
  );
}
