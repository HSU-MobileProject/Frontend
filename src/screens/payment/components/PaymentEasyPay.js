import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../PaymentModal.styles";

export default function PaymentEasyPay({ easyPayProvider, setEasyPayProvider }) {
  return (
    <View style={styles.easyPaymentGrid}>
      {["카카오페이", "네이버페이", "토스페이", "페이코"].map((provider) => (
        <TouchableOpacity
          key={provider}
          style={[
            styles.easyPaymentBtn,
            easyPayProvider === provider && styles.easyPaymentBtnSelected
          ]}
          onPress={() => setEasyPayProvider(provider)}
          activeOpacity={0.8}
        >
          <Text 
            style={[
              styles.easyPaymentLabel,
              easyPayProvider === provider && styles.easyPaymentLabelSelected
            ]}
          >
            {provider}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
