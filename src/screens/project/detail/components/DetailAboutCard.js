import React from "react";
import { View } from "react-native";
import styles from "../ProjectDetail.styles";
import AboutIntro from "./about/AboutIntro";
import AboutTechStack from "./about/AboutTechStack";
import AboutRoles from "./about/AboutRoles";

export default function DetailAboutCard({ project }) {
  return (
    <View style={styles.card}>
      {/* ---------- 프로젝트 소개 ---------- */}
      <AboutIntro
        description={project.description}
        descriptionLong={project.descriptionLong}
      />

      <View style={styles.divider} />

      {/* ---------- 기술 스택 ---------- */}
      <AboutTechStack tags={project.tags} />

      <View style={styles.divider} />

      {/* ---------- 찾는 역할 ---------- */}
      <AboutRoles roles={project.roles} />
    </View>
  );
}