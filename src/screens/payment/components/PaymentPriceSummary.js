import React from "react";
import { View, Text } from "react-native";
import styles from "../PaymentModal.styles";

export default function PaymentPriceSummary({ price, fee, totalPrice }) {
  return (
    <View style={styles.priceSummary}>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>상품 금액</Text>
        <Text style={styles.summaryValue}>{price.toLocaleString()}원</Text>
      </View>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>수수료</Text>
        <Text style={styles.summaryValue}>{fee.toLocaleString()}원</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.summaryRow}>
        <Text style={styles.totalLabel}>최종 결제 금액</Text>
        <Text style={styles.totalValue}>{totalPrice.toLocaleString()}원</Text>
      </View>
    </View>
  );
}
