import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Plus, X } from "lucide-react-native";
import styles from "../ProjectCreate.styles";

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

      {/* GitHub */}
      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>GitHub URL</Text>

        <TextInput
          style={styles.textInput}
          value={githubUrl}
          onChangeText={setGithubUrl}
          placeholder="https://"
          autoCapitalize="none"
        />
      </View>
    </View>
  );
}
