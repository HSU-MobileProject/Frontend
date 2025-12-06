import React, { useMemo, useCallback } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft } from "lucide-react-native";
import { useFocusEffect } from "@react-navigation/native";
import styles from "./ProjectEdit.styles"; 
import Colors from "../../../assets/colors";
import ProjectForm from "./components/ProjectForm";
import { dummyProjects } from "../../../utils/dummyProjects";

export default function ProjectEditScreen({ route, navigation, setHideAddButton }) {
  const projectId = route?.params?.projectId;
  const project = useMemo(
    () => dummyProjects.find((p) => String(p.id) === String(projectId)) || dummyProjects[0],
    [projectId]
  );

  useFocusEffect(
    useCallback(() => {
      if (setHideAddButton) setHideAddButton(true);
      return () => {
        if (setHideAddButton) setHideAddButton(false);
      };
    }, [setHideAddButton])
  );

  const handleSubmit = (data) => {
    console.log("✅ 수정된 프로젝트", { ...project, ...data });
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
      <View style={styles.createHeader}>
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