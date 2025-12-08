import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ProjectSection from "./components/ProjectSection";
import styles from "./ProjectList.styles";
import useProjects from "../../../hooks/useProjects";
import usePaymentModal from "../../../hooks/usePaymentModal";

import PaymentModal from "../../payment/PaymentModal";

import { dummyCurrentUser } from "../../../utils/usersDummy";
import { getFirestore, collection, onSnapshot } from '@react-native-firebase/firestore';
import { authService } from "../../../services/authService";

export default function ProjectListScreen() {
  const navigation = useNavigation();
  const { recommendedProjects, latestProjects } = useProjects();
  const currentUser = dummyCurrentUser;

  const { 
    isPaymentModalVisible, 
    paymentProject, 
    openPaymentModal, 
    closePaymentModal 
  } = usePaymentModal();

  const [likedProjectIds, setLikedProjectIds] = React.useState(new Set());

  React.useEffect(() => {
    const user = authService.getCurrentUser();
    if (!user) return;

    const db = getFirestore();
    const unsubscribe = onSnapshot(collection(db, 'userLikes', user.uid, 'projects'), (snapshot) => {
      const ids = new Set();
      snapshot.forEach(doc => ids.add(doc.id));
      setLikedProjectIds(ids);
    });

    return () => unsubscribe();
  }, []);

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
          currentUser={currentUser}
          likedProjectIds={likedProjectIds}
        />

        <ProjectSection
          title="최신 등록 프로젝트"
          data={latestProjects}
          type="latest"
          onPressCard={handlePressCard}
          onPurchasePress={handlePurchasePress}
          currentUser={currentUser}
          likedProjectIds={likedProjectIds}
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
