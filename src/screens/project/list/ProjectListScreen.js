import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ProjectSection from "./components/ProjectSection";
import styles from "./ProjectList.styles";
import useProjects from "../../../hooks/useProjects";
import usePaymentModal from "../../../hooks/usePaymentModal";

import PaymentModal from "../../payment/PaymentModal";

export default function ProjectListScreen() {
  const navigation = useNavigation();
  const { recommendedProjects, latestProjects } = useProjects();

  const { 
    isPaymentModalVisible, 
    paymentProject, 
    openPaymentModal, 
    closePaymentModal 
  } = usePaymentModal();

  const handlePressCard = (project) => {
    navigation.navigate("ProjectDetail", { project });
  };

  const handlePurchasePress = (project) => {
    openPaymentModal(project);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ProjectSection
          title="추천 프로젝트"
          data={recommendedProjects}
          type="recommended"
          onPressCard={handlePressCard}
          onPurchasePress={handlePurchasePress}
        />

        <ProjectSection
          title="최신 등록 프로젝트"
          data={latestProjects}
          type="latest"
          onPressCard={handlePressCard}
          onPurchasePress={handlePurchasePress}
        />
      </ScrollView>

      <PaymentModal 
        visible={isPaymentModalVisible} 
        onClose={closePaymentModal}
        project={paymentProject}
      />
    </SafeAreaView>
  );
}
