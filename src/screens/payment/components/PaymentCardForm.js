import React from "react";
import { View, Text, TextInput } from "react-native";
import styles from "../PaymentModal.styles";

export default function PaymentCardForm({
  cardNumber, setCardNumber,
  expiry, setExpiry,
  cvc, setCvc,
  ownerName, setOwnerName
}) {
  return (
    <View style={styles.cardForm}>
      <Text style={styles.sectionTitle}>카드 정보</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>카드 번호</Text>
        <TextInput 
          style={styles.textInput} 
          placeholder="1234 5678 9012 3456" 
          placeholderTextColor="#9CA3AF"
          keyboardType="numeric"
          value={cardNumber}
          onChangeText={setCardNumber}
        />
      </View>

      <View style={styles.rowInputs}>
        <View style={[styles.inputGroup, styles.halfInput]}>
          <Text style={styles.inputLabel}>유효기간</Text>
          <TextInput 
            style={styles.textInput} 
            placeholder="MM/YY" 
            placeholderTextColor="#9CA3AF"
            value={expiry}
            onChangeText={setExpiry}
          />
        </View>
        <View style={[styles.inputGroup, styles.halfInput]}>
          <Text style={styles.inputLabel}>CVC</Text>
          <TextInput 
            style={styles.textInput} 
            placeholder="123" 
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
            secureTextEntry
            value={cvc}
            onChangeText={setCvc}
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>카드 소유자명</Text>
        <TextInput 
          style={styles.textInput} 
          placeholder="홍길동" 
          placeholderTextColor="#9CA3AF"
          value={ownerName}
          onChangeText={setOwnerName}
        />
      </View>
    </View>
  );
}