import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { X, Check } from "lucide-react-native";
import styles from "./PaymentModal.styles";
import { paymentService } from "../../services/paymentService";

// Sub-components
import PaymentMethodSelector from "./components/PaymentMethodSelector";
import PaymentCardForm from "./components/PaymentCardForm";
import PaymentTransferInfo from "./components/PaymentTransferInfo";
import PaymentEasyPay from "./components/PaymentEasyPay";
import PaymentProjectInfo from "./components/PaymentProjectInfo";
import PaymentPriceSummary from "./components/PaymentPriceSummary";

export default function PaymentModal({ visible, onClose, project }) {
  const [paymentMethod, setPaymentMethod] = useState("card"); // card, transfer, easy
  const [easyPayProvider, setEasyPayProvider] = useState(null);
  const [agreed, setAgreed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Card Inputs
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [ownerName, setOwnerName] = useState("");

  if (!project) return null;

  const price = typeof project.price === 'number' ? project.price : 0;
  const fee = 0;
  const totalPrice = price + fee;

  const handlePay = async () => {
    if (!agreed) {
      Alert.alert("알림", "약관에 동의해주세요.");
      return;
    }

    setIsProcessing(true);

    try {
      const paymentData = {
        method: paymentMethod,
        amount: totalPrice,
        project: {
          id: project.id,
          title: project.title,
        },
        details: {
          card: paymentMethod === 'card' ? { cardNumber, expiry } : null,
          easyPayProvider: paymentMethod === 'easy' ? easyPayProvider : null,
        }
      };

      const result = await paymentService.processPayment(paymentData);
      
      Alert.alert("결제 완료", result.message, [
        { text: "확인", onPress: onClose }
      ]);
    } catch (error) {
      Alert.alert("결제 실패", error.message || "알 수 없는 오류가 발생했습니다.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ width: "100%", alignItems: "center" }}
        >
          <View style={styles.modalContainer}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.headerTitle}>프로젝트 구매</Text>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <X size={24} color="#1A1A1A" />
              </TouchableOpacity>
            </View>

            <ScrollView 
              style={styles.scrollContent} 
              showsVerticalScrollIndicator={false}
            >
              {/* Project Info */}
              <PaymentProjectInfo project={project} totalPrice={totalPrice} />

              {/* Payment Method Selector */}
              <PaymentMethodSelector 
                paymentMethod={paymentMethod} 
                setPaymentMethod={setPaymentMethod} 
              />

              {/* Payment Forms */}
              {paymentMethod === "card" && (
                <PaymentCardForm 
                  cardNumber={cardNumber} setCardNumber={setCardNumber}
                  expiry={expiry} setExpiry={setExpiry}
                  cvc={cvc} setCvc={setCvc}
                  ownerName={ownerName} setOwnerName={setOwnerName}
                />
              )}

              {paymentMethod === "transfer" && (
                <PaymentTransferInfo totalPrice={totalPrice} />
              )}

              {paymentMethod === "easy" && (
                <PaymentEasyPay 
                  easyPayProvider={easyPayProvider} 
                  setEasyPayProvider={setEasyPayProvider} 
                />
              )}

              <View style={styles.divider} />

              {/* Price Summary */}
              <PaymentPriceSummary 
                price={price} 
                fee={fee} 
                totalPrice={totalPrice} 
              />

              {/* Terms */}
              <TouchableOpacity 
                style={styles.termsContainer} 
                onPress={() => setAgreed(!agreed)}
                activeOpacity={1}
              >
                <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
                   {agreed && <Check size={10} color="#FFF" />}
                </View>
                <Text style={styles.termsText}>
                  ToyLink의 <Text style={styles.linkText}>이용약관</Text> 및 <Text style={styles.linkText}>개인정보 처리방침</Text>에{"\n"}동의합니다.
                </Text>
              </TouchableOpacity>

              {/* Buttons */}
              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
                  <Text style={styles.cancelText}>취소</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.payBtn, (!agreed || isProcessing) && styles.payBtnDisabled]} 
                  onPress={handlePay}
                  disabled={!agreed || isProcessing}
                >
                  {isProcessing ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <Text style={styles.payText}>{totalPrice.toLocaleString()}원 결제하기</Text>
                  )}
                </TouchableOpacity>
              </View>

            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}
