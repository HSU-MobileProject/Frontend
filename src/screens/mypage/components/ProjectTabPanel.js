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
import firestore from '@react-native-firebase/firestore';

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
          const snapshot = await firestore()
            .collection('projects')
            .where('ownerId', '==', user.uid)
            .get();

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
      } else {
        setProjects([]);
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
                {activeTab === 'registered' ? (
                  <>
                    <TouchableOpacity style={styles.editButton}>
                      <Text style={styles.editButtonText}>수정</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.manageButton}>
                      <Text style={styles.manageButtonText}>관리</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <TouchableOpacity style={styles.detailButton}>
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
