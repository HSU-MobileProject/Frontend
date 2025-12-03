import React, { useState } from "react";
import {
  ScrollView,
  Alert,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";

import styles from "../ProjectCreate.styles";

import FormBasicInfo from "./FormBasicInfo";
import FormRecruitment from "./FormRecruitment";
import FormDetailInfo from "./FormDetailInfo";
import FormSalesSettings from "./FormSalesSettings";

export default function ProjectForm({ initialValues, onSubmit, submitLabel = "완료" }) {
  // ---- 상태값 세팅 ----
  const [thumbnail, setThumbnail] = useState(initialValues?.thumbnail || null);
  const [title, setTitle] = useState(initialValues?.title || "");
  const [shortDesc, setShortDesc] = useState(initialValues?.description || "");
  const [intro, setIntro] = useState(initialValues?.intro || "");
  const [category, setCategory] = useState(initialValues?.category || "모바일");
  const [status, setStatus] = useState(initialValues?.status || "진행중");

  const [tags, setTags] = useState(initialValues?.tags || []);
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [newTag, setNewTag] = useState("");

  const [roles, setRoles] = useState(initialValues?.roles || []);

  const [githubUrl, setGithubUrl] = useState(initialValues?.githubUrl || "");
  const [isForSale, setIsForSale] = useState(initialValues?.priceType === "paid");
  const [price, setPrice] = useState(initialValues?.price ? String(initialValues.price) : "");
  
  const [licenseKey, setLicenseKey] = useState(initialValues?.licenseKey || "personal");
  const [progress, setProgress] = useState(initialValues?.progress || 0);

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

    if (!tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
    } else {
        Alert.alert("알림", "이미 등록된 태그입니다.");
    }

    setNewTag("");
    setIsAddingTag(false);
  };

  const removeTag = (t) => {
    setTags((prev) => prev.filter((tag) => tag !== t));
  };

  // 역할(Role) 핸들러
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
      price: isForSale ? Number(price || 0) : 0,
      licenseKey,
      progress,
    };

    onSubmit(payload);
  };

  return (
    <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <FormBasicInfo
          thumbnail={thumbnail}
          pickThumbnail={pickThumbnail}
          title={title}
          setTitle={setTitle}
          shortDesc={shortDesc}
          setShortDesc={setShortDesc}
          category={category}
          setCategory={setCategory}
          status={status}
          setStatus={setStatus}
        />

        <FormRecruitment
          roles={roles}
          addRole={addRole}
          removeRole={removeRole}
          updateRoleName={updateRoleName}
          toggleRoleStatus={toggleRoleStatus}
          progress={progress}
          setProgress={setProgress}
        />

        <FormDetailInfo
          intro={intro}
          setIntro={setIntro}
          tags={tags}
          isAddingTag={isAddingTag}
          setIsAddingTag={setIsAddingTag}
          newTag={newTag}
          setNewTag={setNewTag}
          handleAddTag={handleAddTag}
          removeTag={removeTag}
          githubUrl={githubUrl}
          setGithubUrl={setGithubUrl}
        />

        <FormSalesSettings
          isForSale={isForSale}
          setIsForSale={setIsForSale}
          price={price}
          setPrice={setPrice}
          licenseKey={licenseKey}
          setLicenseKey={setLicenseKey}
        />

        <View style={styles.bottomButtonsRow}>
          <TouchableOpacity
            style={styles.submitBtn}
            onPress={handleSubmit}
          >
            <Text style={styles.submitBtnText}>
              {submitLabel}
            </Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
  );
}
