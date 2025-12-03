import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft } from "lucide-react-native";
import styles from "./components/ProjectCreate.styles";
import Colors from "../../assets/colors";
import ProjectForm from "./components/ProjectForm";

export default function ProjectCreateScreen({ navigation }) {
  const handleSubmit = (data) => {
    console.log("✅ 새 프로젝트 등록:", data);
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

        <View style={{ width: 40 }} />
      </View>

      <ProjectForm onSubmit={handleSubmit} submitLabel="프로젝트 등록 완료" />
    </SafeAreaView>
  );
}