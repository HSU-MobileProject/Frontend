import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ProjectSection from "./components/ProjectSection";
import styles from "./ProjectList.styles";
import useProjects from "../../hooks/useProjects";

export default function ProjectListScreen() {
  const navigation = useNavigation();
  const { recommendedProjects, latestProjects } = useProjects();

  const handlePressCard = (project) => {
    navigation.navigate("ProjectDetail", { project });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ProjectSection
          title="추천 프로젝트"
          data={recommendedProjects}
          type="recommended"
          onPressCard={handlePressCard}
        />

        <ProjectSection
          title="최신 등록 프로젝트"
          data={latestProjects}
          type="latest"
          onPressCard={handlePressCard}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
