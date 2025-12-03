import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Trash2, Plus } from "lucide-react-native";
import Colors from "../../../../assets/colors";
import styles from "../ProjectCreate.styles";

export default function FormRecruitment({
  roles,
  addRole,
  removeRole,
  updateRoleName,
  toggleRoleStatus,
  progress,
  setProgress,
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>모집 정보</Text>

      <Text style={styles.subDescription}>
        팀원을 찾고 있다면 역할을 추가하세요.
      </Text>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>찾는 역할</Text>

        <View style={styles.roleList}>
          {roles.map((role, idx) => (
            <View key={idx} style={styles.roleItemRow}>
              {/* 역할 입력 */}
              <TextInput
                style={styles.roleInput}
                value={role.name}
                onChangeText={(t) => updateRoleName(idx, t)}
                placeholder="예: 디자이너"
              />

              {/* 모집중 / 모집완료 */}
              <TouchableOpacity
                style={[
                  styles.roleStatusBtn,
                  role.status === "completed" && styles.roleStatusBtnCompleted,
                ]}
                onPress={() => toggleRoleStatus(idx)}
              >
                <Text
                  style={[
                    styles.roleStatusText,
                    role.status === "completed" &&
                      styles.roleStatusTextCompleted,
                  ]}
                >
                  {role.status === "recruiting" ? "모집중" : "모집완료"}
                </Text>
              </TouchableOpacity>

              {/* 삭제 */}
              <TouchableOpacity
                style={styles.roleDeleteBtn}
                onPress={() => removeRole(idx)}
              >
                <Trash2 size={18} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* 역할 추가 버튼 */}
        <TouchableOpacity style={styles.addRoleBtn} onPress={addRole}>
          <Plus size={16} color={Colors.black} />

          <Text style={styles.addRoleText}>역할 추가</Text>
        </TouchableOpacity>
      </View>

      {/* 진행률 */}
      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>진행률 ({progress}%)</Text>

        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>

        <View style={styles.progressButtonsRow}>
          {[0, 25, 50, 75, 100].map((p) => (
            <TouchableOpacity
              key={p}
              style={[
                styles.progressBtn,
                progress === p && styles.progressBtnActive,
              ]}
              onPress={() => setProgress(p)}
            >
              <Text
                style={[
                  styles.progressBtnText,
                  progress === p && styles.progressBtnTextActive,
                ]}
              >
                {p}%
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}
