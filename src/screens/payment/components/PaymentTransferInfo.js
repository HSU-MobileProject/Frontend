import React from "react";
import { View, Text } from "react-native";
import styles from "../PaymentModal.styles";

export default function PaymentTransferInfo({ totalPrice }) {
  return (
    <View style={styles.transferCard}>
      <View style={styles.transferRow}>
        <Text style={styles.transferLabel}>입금 은행</Text>
        <Text style={styles.transferValue}>ToyLink은행</Text>
      </View>
      <View style={styles.transferRow}>
        <Text style={styles.transferLabel}>계좌번호</Text>
        <Text style={styles.transferValue}>123-456-789012</Text>
      </View>
      <View style={styles.transferRow}>
        <Text style={styles.transferLabel}>예금주</Text>
        <Text style={styles.transferValue}>(주)토이링크</Text>
      </View>
      <View style={styles.transferRow}>
        <Text style={styles.transferLabel}>입금액</Text>
        <Text style={styles.transferAmount}>{totalPrice.toLocaleString()}원</Text>
      </View>
    </View>
  );
}