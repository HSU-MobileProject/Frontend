import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Github } from "lucide-react-native";
import styles from "./ProjectDetail.styles";

export default function DetailGitHubCard({ project }) {
  if (!project.githubUrl) return null;

  return (
    <View style={styles.card}>
      <Text style={styles.sectionLabel}>GitHub 저장소</Text>

      {/* GitHub 정보 박스 */}
      <View style={styles.githubBox}>
        {/* 아이콘 + repo 한 줄 */}
        <View style={styles.githubTopRow}>
            <Github size={22} color="#1A1A1A" />
            <Text style={styles.githubRepo}>{project.githubUrl}</Text>
        </View>

        {/* meta 한 줄 */}
        <Text style={styles.githubMeta}></Text>
      </View>

      {/* GitHub 버튼 */}
      <TouchableOpacity style={styles.githubBtn} activeOpacity={0.9}>
        <Github size={16} color="#34C3F1" />
        <Text style={styles.githubBtnText}>GitHub에서 보기</Text>
      </TouchableOpacity>
    </View>
  );
}