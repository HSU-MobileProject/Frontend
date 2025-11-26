import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";

import ProjectCard from "./components/ProjectCard";
import SectionHeader from "./components/SectionHeader";
import styles from "./ProjectList.styles";

import { dummyProjects } from "../../utils/dummyProjects";
import { useNavigation } from "@react-navigation/native";

export default function ProjectListScreen() {
  const navigation = useNavigation();

  const recommendedData = [...dummyProjects]
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 3);

  const latestData = [...dummyProjects]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <SectionHeader title="추천 프로젝트" buttonText="전체보기 →" type="recommended" />

        {recommendedData.map(item => (
          <ProjectCard
            key={item.id}
            project={item}
            onPress={() => navigation.navigate("ProjectDetail", { project: item })}
          />
        ))}

        <SectionHeader title="최신 등록 프로젝트" buttonText="전체보기 →" type="latest" />

        {latestData.map(item => (
          <ProjectCard
            key={item.id}
            project={item}
            onPress={() => navigation.navigate("ProjectDetail", { project: item })}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
