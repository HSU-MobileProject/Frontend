import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { X, Check } from "lucide-react-native";
import styles from "./PaymentModal.styles";
import usePaymentForm from "../../hooks/usePaymentForm";
import { getFirestore, doc, getDoc } from '@react-native-firebase/firestore';

// Sub-components
// import PaymentMethodSelector removed
import PaymentProjectInfo from "./components/PaymentProjectInfo";
import PaymentPriceSummary from "./components/PaymentPriceSummary";



export default function PaymentModal({ visible, onClose, project }) {
  const [owner, setOwner] = React.useState(null);

  React.useEffect(() => {
    // Only fetch if project exists
    if (!project?.ownerId) {
      setOwner(null);
      return;
    }

    const fetchOwner = async () => {
      try {
        // 2. Fetch from Firestore
        const db = getFirestore();
        const userDoc = await getDoc(doc(db, 'users', project.ownerId));
        if (userDoc.exists()) {
          setOwner(userDoc.data());
        } else {
          setOwner({ displayName: "알 수 없음" });
        }
      } catch (e) {
        console.error("Owner Fetch Error:", e);
        setOwner({ displayName: "알 수 없음" });
      }
    };
    fetchOwner();
  }, [project]);

  // Always call hooks
  const {
    paymentMethod, setPaymentMethod,
    easyPayProvider, setEasyPayProvider,
    agreed, setAgreed,
    isProcessing,
    ownerName, setOwnerName,
    totalPrice, price, fee,
    handlePay
  } = usePaymentForm(project || {}, onClose);

  // Conditional rendering for UI ONLY
  if (!visible || !project?.id) return null;

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
              <PaymentProjectInfo
                project={project}
                totalPrice={totalPrice}
                ownerName={owner?.displayName || "알 수 없음"}
              />

              {/* Payment Method Selector Removed */}

              {/* Payment Forms Removed - Handled by PG */}
              {/* Just a visual spacer if needed, or nothing */}
              <View style={{ marginBottom: 20 }} />

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
