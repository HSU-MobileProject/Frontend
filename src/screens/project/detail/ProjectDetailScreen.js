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
import ApplicationModal from "./components/ApplicationModal";
import ProjectManageModal from "./components/ProjectManageModal";

import { usersDummy, dummyCurrentUser } from "../../../utils/usersDummy";

import { getFirestore, collection, addDoc, serverTimestamp, query, where, getDocs } from '@react-native-firebase/firestore';
import { authService } from "../../../services/authService";
import { Alert } from "react-native";

export default function ProjectDetailScreen({ route, navigation }) {
  const project = route?.params?.project || {};

  const owner = usersDummy.find((u) => u.id === project.ownerId) || null;

  const [isAppModalVisible, setIsAppModalVisible] = React.useState(false);
  const [isManageModalVisible, setIsManageModalVisible] = React.useState(false);
  const [myApplication, setMyApplication] = React.useState(null);

  React.useEffect(() => {
    const fetchApplication = async () => {
      const user = authService.getCurrentUser();
      if (!user) return;

      try {
        const db = getFirestore();
        const q = query(
          collection(db, 'applications'),
          where('projectId', '==', project.id),
          where('applicantId', '==', user.uid)
        );
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          setMyApplication(snapshot.docs[0].data());
        }
      } catch (e) {
        console.error("Fetch Application Error:", e);
      }
    };
    fetchApplication();
  }, [project]);

  // 1. 지원 버튼 클릭 (유효성 검사 후 모달 오픈)
  const handleApplyPress = async () => {
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
      // 중복 지원 확인 (여기서 미리 체크)
      const db = getFirestore();
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

      // 모든 검사 통과 시 모달 오픈
      setIsAppModalVisible(true);

    } catch (e) {
      console.error("Check Apply Error:", e);
      Alert.alert("오류", "정보를 확인하는 중 문제가 발생했습니다.");
    }
  };

  // 2. 모달에서 역할 선택 후 지원 확정
  const handleConfirmApply = async (selectedRole) => {
    setIsAppModalVisible(false);
    const user = authService.getCurrentUser();
    if (!user) return; // Should not happen

    try {
      const db = getFirestore();
      const newApplication = {
        projectId: project.id,
        projectTitle: project.title,
        applicantId: user.uid,
        ownerId: project.ownerId,
        role: selectedRole.name, // 선택한 역할 저장
        status: 'pending',
        createdAt: serverTimestamp(),
      };
      
      await addDoc(collection(db, 'applications'), newApplication);
      setMyApplication(newApplication);

      Alert.alert("성공", `${selectedRole.name} 역할로 지원이 완료되었습니다.`);
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
          onApplyPress={handleApplyPress}
          myApplication={myApplication}
        />
        <DetailAboutCard project={project} />

        {project.githubUrl && <DetailGitHubCard project={project} />}

        <DetailLeaderCard project={project} owner={owner} />
        <DetailStatusCard 
          project={project} 
          isOwner={authService.getCurrentUser()?.uid === project.ownerId}
          onManagePress={() => setIsManageModalVisible(true)}
        />

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

      <ApplicationModal
        visible={isAppModalVisible}
        onClose={() => setIsAppModalVisible(false)}
        roles={project.roles || []}
        onApply={handleConfirmApply}
      />

      <ProjectManageModal
        visible={isManageModalVisible}
        onClose={() => setIsManageModalVisible(false)}
        project={project}
      />
    </View>
  );
}