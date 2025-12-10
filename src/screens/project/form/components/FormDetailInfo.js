import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { Plus, X, Github } from "lucide-react-native";
import styles from "../ProjectCreate.styles";
import GitHubRepositoryModal from "./GitHubRepositoryModal";

export default function FormDetailInfo({
  intro,
  setIntro,
  tags,
  isAddingTag,
  setIsAddingTag,
  newTag,
  setNewTag,
  handleAddTag,
  removeTag,
  githubUrl,
  setGithubUrl,
}) {
  const [isGithubModalOpen, setIsGithubModalOpen] = useState(false);

  const handleGitHubSelect = (repo) => {
    // repo.html_url 을 githubUrl에 설정
    setGithubUrl(repo.html_url);
    // 필요하다면 제목이나 설명도 채울 수 있지만, 현재는 URL만
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>상세 정보</Text>

      {/* 상세 설명 */}
      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>상세 설명</Text>

        <TextInput
          style={[styles.textInput, styles.multilineInput]}
          value={intro}
          onChangeText={setIntro}
          placeholder="내용 입력"
          multiline
        />
      </View>

      {/* 기술 스택 */}
      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>기술 스택</Text>

        <View style={styles.tagWrap}>
          {tags.map((tag, idx) => (
            <View key={idx} style={styles.tagChipItem}>
              <Text style={styles.tagChipTextActive}>{tag}</Text>

              <TouchableOpacity
                onPress={() => removeTag(tag)}
                style={styles.tagRemoveBtn}
              >
                <X size={14} color="#FFF" />
              </TouchableOpacity>
            </View>
          ))}

          {isAddingTag ? (
            <TextInput
              style={styles.tagInput}
              value={newTag}
              onChangeText={setNewTag}
              placeholder="입력"
              autoFocus
              onSubmitEditing={handleAddTag}
              onBlur={handleAddTag}
              returnKeyType="done"
            />
          ) : (
            <TouchableOpacity
              style={styles.addTagBtn}
              onPress={() => setIsAddingTag(true)}
            >
              <Plus size={14} color="#6B7280" />
              <Text style={styles.addTagText}>추가</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* GitHub - With Link Button */}
      <View style={styles.fieldGroup}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <Text style={styles.fieldLabel}>GitHub URL</Text>
            <TouchableOpacity 
                onPress={() => setIsGithubModalOpen(true)}
                style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}
            >
                <Github size={16} color="#333" />
                <Text style={{ fontSize: 13, color: '#333', fontWeight: 'bold' }}>불러오기</Text>
            </TouchableOpacity>
        </View>

        <TextInput
          style={styles.textInput}
          value={githubUrl}
          onChangeText={setGithubUrl}
          placeholder="https://"
          autoCapitalize="none"
        />
      </View>

      <GitHubRepositoryModal 
        visible={isGithubModalOpen}
        onClose={() => setIsGithubModalOpen(false)}
        onSelect={handleGitHubSelect}
      />
    </View>
  );
}
