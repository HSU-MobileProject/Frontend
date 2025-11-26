import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Switch,
  Alert,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ChevronLeft,
  Trash2,
  Plus,
  X,
  Upload
} from "lucide-react-native";
import { launchImageLibrary } from "react-native-image-picker";

import styles from "./components/create/ProjectCreate.styles";
import Colors from "../../assets/colors";


const CATEGORY_OPTIONS = ["모바일", "웹", "IoT", "AI", "도구", "기타"];

const LICENSE_OPTIONS = [
  {
    key: "personal",
    label: "개인 사용 라이선스",
    desc: "개인 프로젝트나 학습 목적으로만 사용 가능",
  },
  {
    key: "business",
    label: "상업용 라이선스",
    desc: "상업적 목적으로 자유롭게 사용 가능",
  },
  {
    key: "enterprise",
    label: "기업용 라이선스",
    desc: "기업용으로 무제한 사용 및 재배포 가능",
  },
];


export default function ProjectCreateScreen({ navigation }) {

  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [intro, setIntro] = useState("");
  const [category, setCategory] = useState("모바일");
  const [status, setStatus] = useState("진행중");

  const [tags, setTags] = useState([]);
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [newTag, setNewTag] = useState("");

  const [roles, setRoles] = useState([]);

  const [githubUrl, setGithubUrl] = useState("");
  const [isForSale, setIsForSale] = useState(false);
  const [price, setPrice] = useState("");

  const [licenseKey, setLicenseKey] = useState("personal");
  const [progress, setProgress] = useState(0);

  const pickThumbnail = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        quality: 1,
      },
      (response) => {
        if (response.didCancel) return;

        if (response.errorCode) {
          console.log("Image Picker Error:", response.errorMessage);
          Alert.alert("이미지 오류", "이미지를 불러오는 동안 문제가 발생했습니다.");
          return;
        }

        const uri = response.assets?.[0]?.uri;

        if (uri) {
          setThumbnail(uri);
        }
      }
    );
  };


  const handleAddTag = () => {
    const trimmed = newTag.trim();

    if (trimmed.length === 0) {
      setIsAddingTag(false);
      return;
    }

    if (!tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
    }

    setNewTag("");
    setIsAddingTag(false);
  };

  const removeTag = (t) => {
    setTags((prev) => prev.filter((tag) => tag !== t));
  };


  const addRole = () => {
    setRoles([...roles, { name: "", status: "recruiting" }]);
  };

  const removeRole = (idx) => {
    const clone = [...roles];
    clone.splice(idx, 1);
    setRoles(clone);
  };

  const updateRoleName = (idx, text) => {
    const clone = [...roles];
    clone[idx].name = text;
    setRoles(clone);
  };

  const toggleRoleStatus = (idx) => {
    const clone = [...roles];
    clone[idx].status =
      clone[idx].status === "recruiting" ? "completed" : "recruiting";
    setRoles(clone);
  };


  const handleSubmit = () => {
    if (!title.trim() || !shortDesc.trim()) {
      Alert.alert("알림", "프로젝트 제목과 한 줄 소개는 필수입니다.");
      return;
    }

    const payload = {
      thumbnail,
      title,
      description: shortDesc,
      intro,
      category,
      status,
      tags,
      roles,
      githubUrl,
      priceType: isForSale ? "paid" : "free",
      price,
      licenseKey,
      progress,
    };

    console.log("✅ 새 프로젝트 등록:", payload);

    navigation.goBack();
  };


  return (
    <SafeAreaView style={styles.screenWrapper}>

      {/* Header */}
      <View style={styles.createHeader}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <ChevronLeft size={24} color={Colors.black} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>새 프로젝트 등록</Text>

        <View style={{ width: 24 }} />
      </View>


      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.card}>
          <Text style={styles.cardTitle}>기본 정보</Text>
          <TouchableOpacity
            style={styles.thumbUploadBox}
            onPress={pickThumbnail}
            activeOpacity={0.9}
          >
            {thumbnail ? (
              <Image
                source={{ uri: thumbnail }}
                style={styles.thumbnailImage}
              />
            ) : (
              <View style={styles.thumbPlaceholder}>
                <Upload size={28} color={Colors.grayMedium} />
                <Text style={styles.thumbUploadText}>
                  대표 이미지 업로드
                </Text>
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
              {CATEGORY_OPTIONS.map((c) => (
                <TouchableOpacity
                  key={c}
                  style={[
                    styles.chip,
                    category === c && styles.chipActive,
                  ]}
                  onPress={() => setCategory(c)}
                >
                  <Text
                    style={[
                      styles.chipText,
                      category === c && styles.chipTextActive,
                    ]}
                  >
                    {c}
                  </Text>
                </TouchableOpacity>
              ))}
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
                      role.status === "completed" &&
                        styles.roleStatusBtnCompleted,
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
                      {role.status === "recruiting"
                        ? "모집중"
                        : "모집완료"}
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
            <TouchableOpacity
              style={styles.addRoleBtn}
              onPress={addRole}
            >
              <Plus size={16} color={Colors.black} />

              <Text style={styles.addRoleText}>
                역할 추가
              </Text>
            </TouchableOpacity>
          </View>

          {/* 진행률 */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>
              진행률 ({progress}%)
            </Text>

            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${progress}%` },
                ]}
              />
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

                  <Text style={styles.tagChipTextActive}>
                    {tag}
                  </Text>

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


        <View style={styles.card}>
          <Text style={styles.cardTitle}>판매 설정</Text>

          <View style={styles.rowBetween}>
            <Text style={styles.fieldLabel}>소스 코드 판매</Text>

            <Switch
              value={isForSale}
              onValueChange={setIsForSale}
              thumbColor={isForSale ? Colors.green : "#f4f3f4"}
              trackColor={{
                false: "#D1D5DB",
                true: "#A7F3D0",
              }}
            />
          </View>

          {isForSale && (
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>가격</Text>

              <TextInput
                style={styles.textInput}
                keyboardType="numeric"
                value={price}
                onChangeText={setPrice}
                placeholder="0"
              />
            </View>
          )}
        </View>


        <View style={styles.bottomButtonsRow}>
          <TouchableOpacity
            style={styles.submitBtn}
            onPress={handleSubmit}
          >
            <Text style={styles.submitBtnText}>
              프로젝트 등록 완료
            </Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}