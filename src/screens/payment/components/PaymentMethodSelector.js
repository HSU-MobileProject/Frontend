import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { CreditCard, Wallet, Smartphone } from "lucide-react-native";
import styles from "../PaymentModal.styles";

export default function PaymentMethodSelector({ paymentMethod, setPaymentMethod }) {
  const renderPaymentMethodBtn = (id, label, icon) => {
    const isActive = paymentMethod === id;
    return (
      <TouchableOpacity
        style={[styles.methodBtn, isActive && styles.methodBtnActive]}
        onPress={() => setPaymentMethod(id)}
        activeOpacity={0.8}
      >
        <View style={[styles.radioCircle, isActive && styles.radioCircleActive]}>
          {isActive && <View style={styles.radioInner} />}
        </View>
        {icon}
        <Text style={styles.methodLabel}>{label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Text style={styles.sectionTitle}>결제 수단</Text>
      <View style={styles.paymentMethods}>
        {renderPaymentMethodBtn("card", "신용/체크카드", <CreditCard size={18} color="#1A1A1A" />)}
        {renderPaymentMethodBtn("transfer", "계좌이체", <Wallet size={18} color="#1A1A1A" />)}
        {renderPaymentMethodBtn("easy", "간편결제", <Smartphone size={18} color="#1A1A1A" />)}
      </View>
    </View>
  );
}
