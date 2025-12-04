import { useState } from "react";
import { Alert } from "react-native";
import { paymentService } from "../screens/payment/services/paymentService";

export default function usePaymentForm(project, onClose) {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [easyPayProvider, setEasyPayProvider] = useState(null);
  const [agreed, setAgreed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Card Inputs
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [ownerName, setOwnerName] = useState("");

  const price = typeof project?.price === 'number' ? project.price : 0;
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

  return {
    paymentMethod, setPaymentMethod,
    easyPayProvider, setEasyPayProvider,
    agreed, setAgreed,
    isProcessing,
    cardNumber, setCardNumber,
    expiry, setExpiry,
    cvc, setCvc,
    ownerName, setOwnerName,
    totalPrice, price, fee,
    handlePay
  };
}
