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

const { width } = Dimensions.get('window');
const scale = width / 409;

// 더미 데이터
const REGISTERED_PROJECTS = [
  {
    id: 1,
    title: '스마트 블록 조립 앱',
    status: '진행중',
    statusColor: colors.green,
    members: 3,
    likes: 45,
    views: 230,
  },
  {
    id: 2,
    title: '장난감 리뷰 커뮤니티',
    status: '완료',
    statusColor: colors.grayDark,
    members: 2,
    likes: 23,
    views: 156,
  },
];

const SUPPORTED_PROJECTS = [
  {
    id: 3,
    title: '스마트 홈 시스템',
    status: '진행중',
    statusColor: colors.green,
    members: 4,
    likes: 32,
    views: 180,
  },
];

export default function ProjectTabPanel() {
  const [activeTab, setActiveTab] = useState('registered'); // 'registered' or 'supported'

  const projects =
    activeTab === 'registered' ? REGISTERED_PROJECTS : SUPPORTED_PROJECTS;

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
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+ 새 프로젝트 등록</Text>
      </TouchableOpacity>
    </View>
  );
}
