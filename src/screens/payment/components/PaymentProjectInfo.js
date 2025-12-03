import React from "react";
import { View, Text } from "react-native";
import styles from "../PaymentModal.styles";

export default function PaymentProjectInfo({ project, totalPrice, ownerName }) {
  return (
    <View style={styles.projectCard}>
      <View style={styles.projectRow}>
        <Text style={styles.label}>프로젝트</Text>
        <Text style={styles.value} numberOfLines={1}>{project.title}</Text>
      </View>
      <View style={styles.projectRow}>
        <Text style={styles.label}>판매자</Text>
        <Text style={styles.value}>{ownerName}</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.projectRow}>
        <Text style={styles.label}>결제 금액</Text>
        <Text style={styles.valueRight}>{totalPrice.toLocaleString()}원</Text>
      </View>
    </View>
  );
}