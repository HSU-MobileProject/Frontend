import React, { useMemo, useCallback } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft } from "lucide-react-native";
import { useFocusEffect } from "@react-navigation/native";
import styles from "./ProjectEdit.styles";
import Colors from "../../../assets/colors";
import ProjectForm from "./components/ProjectForm";
import { getFirestore, doc, updateDoc, serverTimestamp, deleteDoc } from '@react-native-firebase/firestore';

export default function ProjectEditScreen({ route, navigation, setHideAddButton }) {
  const projectParam = route?.params?.project;
  const project = useMemo(() => projectParam || {}, [projectParam]);

  useFocusEffect(
    useCallback(() => {
      if (setHideAddButton) setHideAddButton(true);
      return () => {
        if (setHideAddButton) setHideAddButton(false);
      };
    }, [setHideAddButton])
  );

  const handleSubmit = async (data) => {
    try {
      const db = getFirestore();
      await updateDoc(doc(db, 'projects', project.id), {
        ...data,
        updatedAt: serverTimestamp(),
      });
      Alert.alert("성공", "프로젝트가 수정되었습니다.", [
        { text: "확인", onPress: () => navigation.goBack() }
      ]);
    } catch (e) {
      console.error("Update Project Error:", e);
      Alert.alert("오류", "프로젝트 수정 중 문제가 발생했습니다.");
    }
  };

  const handleDelete = () => {
    Alert.alert("삭제", "프로젝트를 삭제하시겠습니까?", [
      { text: "취소", style: "cancel" },
      {
        text: "삭제",
        style: "destructive",
        onPress: async () => {
          try {
            const db = getFirestore();
            await deleteDoc(doc(db, 'projects', project.id));
            Alert.alert("삭제 완료", "프로젝트가 삭제되었습니다.", [
              { text: "확인", onPress: () => navigation.popToTop() }
            ]);
          } catch (e) {
            console.error("Delete Error:", e);
            Alert.alert("오류", "삭제 중 문제가 발생했습니다.");
          }
        }
      }
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

      <ProjectForm
        initialValues={project}
        onSubmit={handleSubmit}
        submitLabel="수정 완료"
      />
    </SafeAreaView>
  );
}