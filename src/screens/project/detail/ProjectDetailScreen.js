import React from "react";
import { View, ScrollView } from "react-native";
import styles from "./ProjectDetail.styles";
import DetailHeader from "./components/DetailHeader";
import DetailMainCard from "./components/DetailMainCard";
import DetailAboutCard from "./components/DetailAboutCard";
import DetailPriceCard from "./components/DetailPriceCard";
import DetailLeaderCard from "./components/DetailLeaderCard";
import DetailGitHubCard from "./components/DetailGitHubCard";
import DetailStatusCard from "./components/DetailStatusCard";
import PaymentModal from "../../payment/PaymentModal";

import { usersDummy, dummyCurrentUser } from "../../../utils/usersDummy";

import { getFirestore, collection, addDoc, serverTimestamp, query, where, getDocs } from '@react-native-firebase/firestore';
import { authService } from "../../../services/authService";
import { Alert } from "react-native";

export default function ProjectDetailScreen({ route, navigation }) {
  const project = route?.params?.project || {};

  const owner = usersDummy.find((u) => u.id === project.ownerId) || null;

  const handleApply = async () => {
    const user = authService.getCurrentUser();
    if (!user) {
      Alert.alert("알림", "로그인이 필요한 서비스입니다.");
      return;
    }
    if (user.uid === project.ownerId) {
      Alert.alert("알림", "자신의 프로젝트에는 지원할 수 없습니다.");
      return;
    }

    try {
      const db = getFirestore();
      // 중복 지원 확인
      const q = query(
        collection(db, 'applications'),
        where('projectId', '==', project.id),
        where('applicantId', '==', user.uid)
      );
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        Alert.alert("알림", "이미 지원한 프로젝트입니다.");
        return;
      }

      // 지원하기 저장
      await addDoc(collection(db, 'applications'), {
        projectId: project.id,
        projectTitle: project.title, // 편의상 저장
        applicantId: user.uid,
        ownerId: project.ownerId,
        status: 'pending',
        createdAt: serverTimestamp(),
      });

      Alert.alert("성공", "프로젝트 지원이 완료되었습니다.");
    } catch (e) {
      console.error("Apply Error:", e);
      Alert.alert("오류", "지원 중 문제가 발생했습니다.");
    }
  };

  if (!project) return null;

  const [isPaymentModalVisible, setIsPaymentModalVisible] = React.useState(false);

  return (
    <View style={styles.screenWrapper}>
      <DetailHeader project={project} currentUser={dummyCurrentUser} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <DetailMainCard
          project={project}
          isOwner={authService.getCurrentUser()?.uid === project.ownerId}
          onApplyPress={handleApply}
        />
        <DetailAboutCard project={project} />

        {project.githubUrl && <DetailGitHubCard project={project} />}

        <DetailLeaderCard project={project} owner={owner} />
        <DetailStatusCard project={project} />

        <DetailPriceCard
          project={project}
          isOwner={authService.getCurrentUser()?.uid === project.ownerId}
          onPurchasePress={() => setIsPaymentModalVisible(true)}
        />
      </ScrollView>

      <PaymentModal
        visible={isPaymentModalVisible}
        onClose={() => setIsPaymentModalVisible(false)}
        project={project}
      />
    </View>
  );
}