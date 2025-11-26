import React from "react";
import { View, Text } from "react-native";
import styles from "./ProjectDetail.styles";

export default function DetailAboutCard({ project }) {
  return (
    <View style={styles.card}>
      {/* ---------- 프로젝트 소개 ---------- */}
      <View style={styles.cardContent}>
        <Text style={styles.sectionTitle}>프로젝트 소개</Text>

        <Text style={styles.sectionBody}>
          {project.descriptionLong || project.description}
        </Text>
      </View>

      <View style={styles.divider} />

      {/* ---------- 기술 스택 ---------- */}
      <View style={styles.cardContent}>
        <Text style={styles.sectionTitle}>기술 스택</Text>

        <View style={styles.techWrap}>
          {project.tags?.length > 0 ? (
            project.tags.map((tag, index) => (
              <View key={index} style={styles.techBadge}>
                <Text style={styles.techText}>{tag}</Text>
              </View>
            ))
          ) : (<></>)}
        </View>
      </View>

      <View style={styles.divider} />

      {/* ---------- 찾는 역할 ---------- */}
      <View style={styles.cardContent}>
        <Text style={styles.sectionTitle}>찾는 역할</Text>

        {project.roles?.length > 0 ? (
          project.roles.map((role, index) => (
            <View key={index} style={styles.roleItem}>
              <Text style={styles.roleName}>{role.name}</Text>

              <View
                style={[
                  styles.roleStatus,
                  role.status === "open"
                    ? styles.roleOpen
                    : styles.roleClosed,
                ]}
              >
                <Text style={styles.roleStatusText}>
                  {role.status === "open" ? "모집중" : "마감"}
                </Text>
              </View>
            </View>
          ))
        ) : (<></>)}
      </View>
    </View>
  );
}