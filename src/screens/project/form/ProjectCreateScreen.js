import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from "./ProjectCreate.styles";
import Colors from "../../../assets/colors";
import ProjectForm from "./components/ProjectForm";
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { authService } from '../../../services/authService';

export default function ProjectCreateScreen({ navigation }) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (data) => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      const currentUser = authService.getCurrentUser();
      if (!currentUser) {
        Alert.alert("오류", "로그인이 필요합니다.");
        setIsSubmitting(false);
        return;
      }

      let thumbnailUrl = null;

      // 썸네일 업로드
      if (data.thumbnail) {
        try {
          const filename = `projects/${Date.now()}_${currentUser.uid}.jpg`;
          const reference = storage().ref(filename);
          await reference.putFile(data.thumbnail);
          thumbnailUrl = await reference.getDownloadURL();
        } catch (uploadError) {
          console.error("Upload Failed:", uploadError);
          Alert.alert("알림", "이미지 업로드에 실패했습니다. 기본 이미지로 저장됩니다.");
        }
      }

      await firestore().collection('projects').add({
        ...data,
        thumbnail: thumbnailUrl, // URL로 교체
        ownerId: currentUser.uid,
        createdAt: firestore.FieldValue.serverTimestamp(),
        status: '진행중',
        likes: 0,
        views: 0,
        members: 1, // 본인 포함
      });

      console.log("✅ 새 프로젝트 등록 완료");
      setIsSubmitting(false);
      navigation.goBack();
    } catch (e) {
      console.error("Project Create Error:", e);
      setIsSubmitting(false);
      Alert.alert("오류", "프로젝트 등록 중 문제가 발생했습니다.");
    }
  };

  return (
    <SafeAreaView style={styles.screenWrapper}>
      {/* Header */}
      <View style={styles.createHeader}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-left" size={20} color={Colors.black} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>새 프로젝트 등록</Text>

        <View style={{ width: 40 }} />
      </View>

      <ProjectForm onSubmit={handleSubmit} submitLabel="프로젝트 등록 완료" />
    </SafeAreaView>
  );
}