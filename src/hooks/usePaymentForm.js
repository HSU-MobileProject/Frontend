import { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { paymentService } from "../services/paymentService";

export default function usePaymentForm(project, onClose) {
  // Debug Log
  console.log("💰 usePaymentForm Project:", JSON.stringify(project, null, 2));

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [easyPayProvider, setEasyPayProvider] = useState(null);
  const [agreed, setAgreed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Card inputs removed as they are handled by PG
  const [ownerName, setOwnerName] = useState("");

  // Fix: Parse price safely. Explicitly handle strings or undefined.
  const rawPrice = project?.price;
  const parsedPrice = Number(rawPrice);
  const price = !isNaN(parsedPrice) ? parsedPrice : 0;
  const fee = 0;
  const totalPrice = price + fee;

  const navigation = useNavigation();

  const handlePay = () => {
    if (!agreed) {
      Alert.alert("알림", "약관에 동의해주세요.");
      return;
    }

    // Close modal first
    onClose();

    // Navigate to Iamport Payment Screen
    navigation.navigate('Payment', {
      project,
      amount: totalPrice,
      buyerName: ownerName,
      buyerEmail: "",
      buyerTel: "",
      paymentMethod,
      easyPayProvider,
    });
  };

  return {
    paymentMethod, setPaymentMethod,
    easyPayProvider, setEasyPayProvider,
    agreed, setAgreed,
    isProcessing,
    ownerName, setOwnerName,
    totalPrice, price, fee,
    handlePay
  };
}
