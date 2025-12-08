import React from "react";
import { View, Text } from "react-native";
import styles from "../../ProjectDetail.styles";

export default function AboutRoles({ roles }) {
  return (
    <View style={styles.cardContent}>
      <Text style={styles.sectionTitle}>찾는 역할</Text>

      {roles?.length > 0 ? (
        roles.map((role, index) => (
          <View key={index} style={styles.roleItem}>
            <Text style={styles.roleName}>{role.name}</Text>

            <View
              style={[
                styles.roleStatus,
                role.status === "recruiting" ? styles.roleOpen : styles.roleClosed,
              ]}
            >
              <Text style={styles.roleStatusText}>
                {role.status === "recruiting" ? "모집중" : "마감"}
              </Text>
            </View>
          </View>
        ))
      ) : (
        <></>
      )}
    </View>
  );
}
