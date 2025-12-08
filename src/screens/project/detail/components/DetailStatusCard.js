// src/screens/project/components/DetailStatusCard.jsx
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../ProjectDetail.styles";

export default function DetailStatusCard({ project, isOwner, onManagePress }) {
  const progress = project.progress ?? 0;
  const teamMemberCount = project.teamMemberCount ?? 0;
  const applicantCount = project.applicantCount ?? 0;
  const isRecruiting = project.isRecruiting ?? false;

  return (
    <View style={styles.card}>
      <Text style={styles.sectionLabel}>프로젝트 현황</Text>

      {/* 진행률 */}
      <View style={styles.rowBetween}>
        <Text style={styles.grayText}>진행률</Text>
        <Text style={styles.boldText}>{progress}%</Text>
      </View>

      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>

      {/* 팀 멤버 */}
      <View style={styles.rowBetween}>
        <Text style={styles.grayText}>팀 멤버</Text>
        <Text style={styles.boldText}>{teamMemberCount}명</Text>
      </View>

      {/* 지원자 */}
      <View style={styles.rowBetween}>
        <Text style={styles.grayText}>지원자</Text>
        <Text style={styles.boldText}>{applicantCount}명</Text>
      </View>

      {/* 지원하기 버튼 (모집중이고 참여자가 아닐 때) */}
      {!isOwner && isRecruiting && (
        <TouchableOpacity style={styles.applyBtn} activeOpacity={0.9}>
          <Text style={styles.applyBtnText}>지원하기</Text>
        </TouchableOpacity>
      )}

      {/* 관리 버튼 (소유자일 때) */}
      {isOwner && (
        <TouchableOpacity 
          style={[styles.applyBtn, { backgroundColor: '#333' }]} 
          activeOpacity={0.9}
          onPress={onManagePress}
        >
          <Text style={styles.applyBtnText}>지원자 관리 ({applicantCount})</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}