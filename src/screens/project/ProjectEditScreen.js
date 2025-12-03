import React, { useCallback, useMemo, useState } from "react";
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
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft, Trash2, Plus, X, Upload } from "lucide-react-native";
import { launchImageLibrary } from "react-native-image-picker";

import styles from "./components/ProjectEdit.styles";
import Colors from "../../assets/colors";
import { dummyProjects } from "../../utils/dummyProjects";
import { usersDummy } from "../../utils/usersDummy";

const CATEGORY_OPTIONS = ["모바일", "웹", "IoT", "AI", "도구", "기타"];

const LICENSE_OPTIONS = [
  { key: "personal", label: "개인 사용 라이선스", desc: "개인 프로젝트나 학습 목적으로만 사용 가능" },
  { key: "business", label: "상업용 라이선스", desc: "상업적 목적으로 자유롭게 사용 가능" },
  { key: "enterprise", label: "기업용 라이선스", desc: "기업용으로 무제한 사용 및 재배포 가능" },
];

export default function ProjectEditScreen({ route, navigation, setHideAddButton }) {
  const projectId = route?.params?.projectId;
  const project = useMemo(
    () => dummyProjects.find((p) => String(p.id) === String(projectId)) || dummyProjects[0],
    [projectId]
  );

  // ---- 상태값 세팅 ----
  const [thumbnail, setThumbnail] = useState(project.thumbnail || null);
  const [title, setTitle] = useState(project.title || "");
  const [shortDesc, setShortDesc] = useState(project.description || "");
  const [intro, setIntro] = useState(project.intro || "");
  const [category, setCategory] = useState(project.category || "모바일");
  const [status, setStatus] = useState(project.status || "진행중");

  const [tags, setTags] = useState(project.tags || []);
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [newTag, setNewTag] = useState("");

  // [모집 역할] 초기 데이터 예시 (없으면 기본값)
  const [roles, setRoles] = useState(project.roles || [
    { name: "프론트엔드 개발자", status: "completed" },
    { name: "UI/UX 디자이너", status: "recruiting" },
  ]);

  const [githubUrl, setGithubUrl] = useState(project.githubUrl || "");

  const [isForSale, setIsForSale] = useState(project.priceType === "paid");
  const [price, setPrice] = useState(project.price ? String(project.price) : "");
  const [licenseKey, setLicenseKey] = useState(project.licenseKey || "business");
  const [includes, setIncludes] = useState(project.includes || ["소스코드", "문서", "기술 지원"]);

  const [progress, setProgress] = useState(project.progress || 0);

  // 버튼 숨김 처리
  useFocusEffect(
    useCallback(() => {
      if (setHideAddButton) setHideAddButton(true);
      return () => {
        if (setHideAddButton) setHideAddButton(false);
      };
    }, [setHideAddButton])
  );

  // 썸네일 선택
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

  // 태그 핸들러
  const handleAddTag = () => {
    const trimmed = newTag.trim();
    if (trimmed.length === 0) {
      setIsAddingTag(false);
      return;
    }
    if (tags.includes(trimmed)) {
      Alert.alert("알림", "이미 등록된 태그입니다.");
    } else {
      setTags([...tags, trimmed]);
    }
    setNewTag("");
    setIsAddingTag(false);
  };
  const removeTag = (t) => setTags((prev) => prev.filter((tag) => tag !== t));

  // [역할(Role) 핸들러]
  const addRole = () => {
    setRoles([...roles, { name: "", status: "recruiting" }]);
  };
  const removeRole = (index) => {
    const newRoles = [...roles];
    newRoles.splice(index, 1);
    setRoles(newRoles);
  };
  const updateRoleName = (index, text) => {
    const newRoles = [...roles];
    newRoles[index].name = text;
    setRoles(newRoles);
  };
  const toggleRoleStatus = (index) => {
    const newRoles = [...roles];
    newRoles[index].status = newRoles[index].status === "recruiting" ? "completed" : "recruiting";
    setRoles(newRoles);
  };

  const handleSave = () => {
    const payload = {
      ...project,
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
      price: isForSale ? Number(price || 0) : 0,
      licenseKey,
      includes,
      progress,
    };
    console.log("✅ 수정된 프로젝트", payload);
    navigation.goBack();
  };

  const handleDelete = () => {
    Alert.alert("삭제", "프로젝트를 삭제하시겠습니까?", [
      { text: "취소", style: "cancel" },
      { text: "삭제", style: "destructive", onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <SafeAreaView style={styles.screenWrapper}>
      <View style={styles.editHeader}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color={Colors.black} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>프로젝트 수정</Text>
        
        <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
          <Text style={styles.deleteText}>삭제</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        
        {/* 1. 기본 정보 & 이미지 */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>기본 정보</Text>

          <TouchableOpacity style={styles.thumbUploadBox} onPress={pickThumbnail} activeOpacity={0.9}>
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
                <Text style={styles.thumbOverlayText}>이미지 변경</Text>
              </View>
            )}
          </TouchableOpacity>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>프로젝트 제목</Text>
            <TextInput
              style={styles.textInput}
              value={title}
              onChangeText={setTitle}
              placeholder="제목 입력"
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>간단한 설명</Text>
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
                  style={[styles.chip, category === c && styles.chipActive]}
                  onPress={() => setCategory(c)}
                >
                  <Text style={[styles.chipText, category === c && styles.chipTextActive]}>{c}</Text>
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
                  style={[styles.chipSmall, status === s && styles.chipActiveSmall]}
                  onPress={() => setStatus(s)}
                >
                  <Text style={[styles.chipTextSmall, status === s && styles.chipTextActiveSmall]}>{s}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* 2. 모집 정보 (역할 관리) */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>모집 정보</Text>
          <Text style={styles.subDescription}>함께할 팀원을 찾고 있다면 역할을 추가하세요.</Text>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>찾는 역할</Text>
            
            <View style={styles.roleList}>
              {roles.map((role, idx) => (
                <View key={idx} style={styles.roleItemRow}>
                  <TextInput 
                    style={styles.roleInput}
                    value={role.name}
                    onChangeText={(text) => updateRoleName(idx, text)}
                    placeholder="예: 백엔드 개발자"
                  />
                  <TouchableOpacity 
                    style={[styles.roleStatusBtn, role.status === 'completed' && styles.roleStatusBtnCompleted]}
                    onPress={() => toggleRoleStatus(idx)}
                  >
                    <Text style={[styles.roleStatusText, role.status === 'completed' && styles.roleStatusTextCompleted]}>
                      {role.status === 'recruiting' ? '모집중' : '모집완료'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.roleDeleteBtn} onPress={() => removeRole(idx)}>
                    <Trash2 size={18} color="#9CA3AF" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            <TouchableOpacity style={styles.addRoleBtn} onPress={addRole}>
              <Plus size={16} color={Colors.black} />
              <Text style={styles.addRoleText}>역할 추가</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>프로젝트 진행률 ({progress}%)</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
            <View style={styles.progressButtonsRow}>
              {[0, 25, 50, 75, 100].map((p) => (
                <TouchableOpacity
                  key={p}
                  style={[styles.progressBtn, progress === p && styles.progressBtnActive]}
                  onPress={() => setProgress(p)}
                >
                  <Text style={[styles.progressBtnText, progress === p && styles.progressBtnTextActive]}>{p}%</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* 3. 상세 & 기술 스택 */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>상세 정보</Text>
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
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>기술 스택</Text>
            <View style={styles.tagWrap}>
              {tags.map((tag, idx) => (
                <View key={idx} style={styles.tagChipItem}>
                  <Text style={styles.tagChipTextActive}>{tag}</Text>
                  <TouchableOpacity onPress={() => removeTag(tag)} style={styles.tagRemoveBtn}>
                    <X size={14} color="#FFFFFF" />
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
                <TouchableOpacity style={styles.addTagBtn} onPress={() => setIsAddingTag(true)}>
                  <Plus size={14} color="#6B7280" />
                  <Text style={styles.addTagText}>추가</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>GitHub URL</Text>
            <TextInput
              style={styles.textInput}
              value={githubUrl}
              onChangeText={setGithubUrl}
              placeholder="[https://github.com/](https://github.com/)..."
              autoCapitalize="none"
            />
          </View>
        </View>

        {/* 4. 판매 설정 */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>판매 설정</Text>
          <View style={styles.rowBetween}>
            <Text style={styles.fieldLabel}>소스 코드 판매</Text>
            <Switch
              value={isForSale}
              onValueChange={setIsForSale}
              thumbColor={isForSale ? Colors.green : "#f4f3f4"}
              trackColor={{ false: "#D1D5DB", true: "#A7F3D0" }}
            />
          </View>
          {isForSale && (
            <>
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>가격 (원)</Text>
                <TextInput
                  style={styles.textInput}
                  keyboardType="numeric"
                  value={price}
                  onChangeText={setPrice}
                  placeholder="0"
                />
              </View>
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>라이선스</Text>
                {LICENSE_OPTIONS.map((opt) => (
                  <TouchableOpacity
                    key={opt.key}
                    style={[styles.licenseItem, licenseKey === opt.key && styles.licenseItemActive]}
                    onPress={() => setLicenseKey(opt.key)}
                  >
                    <View style={styles.licenseDotWrap}>
                      <View style={[styles.licenseDot, licenseKey === opt.key && styles.licenseDotActive]} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.licenseTitle, licenseKey === opt.key && styles.licenseTitleActive]}>{opt.label}</Text>
                      <Text style={styles.licenseDesc}>{opt.desc}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}
        </View>

        <View style={styles.bottomButtonsRow}>
          <TouchableOpacity style={styles.submitBtn} onPress={handleSave}>
            <Text style={styles.submitBtnText}>수정 완료</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}