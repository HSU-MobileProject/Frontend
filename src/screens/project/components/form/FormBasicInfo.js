import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { Upload } from "lucide-react-native";
import Colors from "../../../../assets/colors";
import styles from "../ProjectCreate.styles";
import categoryColors from "../../../../assets/categoryColors";

const CATEGORY_OPTIONS = ["모바일", "웹", "IoT", "AI", "도구", "기타"];

export default function FormBasicInfo({
  thumbnail,
  pickThumbnail,
  title,
  setTitle,
  shortDesc,
  setShortDesc,
  category,
  setCategory,
  status,
  setStatus,
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>기본 정보</Text>
      <TouchableOpacity
        style={styles.thumbUploadBox}
        onPress={pickThumbnail}
        activeOpacity={0.9}
      >
        {thumbnail ? (
          <Image source={{ uri: thumbnail }} style={styles.thumbnailImage} />
        ) : (
          <View style={styles.thumbPlaceholder}>
            <Upload size={28} color={Colors.grayMedium} />
            <Text style={styles.thumbUploadText}>대표 이미지 업로드</Text>
          </View>
        )}

        {thumbnail && (
          <View style={styles.thumbOverlay}>
            <Text style={styles.thumbOverlayText}>변경</Text>
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>프로젝트 제목 *</Text>

        <TextInput
          style={styles.textInput}
          value={title}
          onChangeText={setTitle}
          placeholder="제목 입력"
        />
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>간단한 설명 *</Text>

        <TextInput
          style={styles.textInput}
          value={shortDesc}
          onChangeText={setShortDesc}
          placeholder="한 줄 소개 입력"
        />
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>카테고리</Text>

        <View style={styles.chipRow}>
          {CATEGORY_OPTIONS.map((c) => {
            const isActive = category === c;
            const activeColor = categoryColors[c] || Colors.primary;

            return (
              <TouchableOpacity
                key={c}
                style={[
                  styles.chip,
                  isActive && {
                    backgroundColor: activeColor,
                    borderColor: activeColor,
                  },
                ]}
                onPress={() => setCategory(c)}
              >
                <Text
                  style={[
                    styles.chipText,
                    isActive && { color: "#FFFFFF", fontWeight: "bold" },
                  ]}
                >
                  {c}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>진행 상태</Text>

        <View style={styles.chipRow}>
          {["진행중", "모집중", "완료"].map((s) => (
            <TouchableOpacity
              key={s}
              style={[
                styles.chipSmall,
                status === s && styles.chipActiveSmall,
              ]}
              onPress={() => setStatus(s)}
            >
              <Text
                style={[
                  styles.chipTextSmall,
                  status === s && styles.chipTextActiveSmall,
                ]}
              >
                {s}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}
