import React, { useState, useEffect } from "react";
import { View, ScrollView, Text } from "react-native";
import styles from "./ProjectDetail.styles";
import DetailHeader from "./components/DetailHeader";
import DetailMainCard from "./components/DetailMainCard";
import DetailAboutCard from "./components/DetailAboutCard";
import DetailPriceCard from "./components/DetailPriceCard";
import DetailLeaderCard from "./components/DetailLeaderCard";
import DetailGitHubCard from "./components/DetailGitHubCard";
import DetailStatusCard from "./components/DetailStatusCard";
import ApplicationModal from "./components/ApplicationModal";
import ProjectManageModal from "./components/ProjectManageModal";
import { authService } from "../../../services/authService";
import { getFirestore, doc, onSnapshot } from "@react-native-firebase/firestore";

export default function ProjectDetailScreen({ route, navigation }) {
  const initialProject = route?.params?.project || {};
  const [project, setProject] = useState(initialProject);
  const owner = route?.params?.ownerData || { displayName: "알 수 없음", profileImage: null };

  const [isAppModalVisible, setIsAppModalVisible] = useState(false);
  const [isManageModalVisible, setIsManageModalVisible] = useState(false);
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  
  // Placeholder for missing states/functions based on the view
  const [myApplication, setMyApplication] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  
  // Real-time update for project
  useEffect(() => {
    if (!initialProject.id) return;
    const db = getFirestore();
    const unsubscribe = onSnapshot(doc(db, "projects", initialProject.id), (docSnapshot) => {
        if (docSnapshot.exists) {
            setProject({ id: docSnapshot.id, ...docSnapshot.data() });
        }
    });
    return () => unsubscribe();
  }, [initialProject.id]);


  if (!project || !project.id) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>프로젝트 정보를 불러올 수 없습니다.</Text>
      </View>
    );
  }

  const applicantCount = project.applicantCount || 0;

  // Dummy handlers for now to prevent crash if not defined
  const handleApplyPress = () => setIsAppModalVisible(true);
  const handleLikePress = () => setIsLiked(!isLiked);
  const handleChatPress = () => console.log("Chat Pressed");
  const handleConfirmApply = () => setIsAppModalVisible(false);

  return (
    <View style={styles.screenWrapper}>
      <DetailHeader project={project} currentUser={authService.getCurrentUser()} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <DetailMainCard
          project={project}
          isOwner={authService.getCurrentUser()?.uid === project.ownerId}
          onApplyPress={handleApplyPress}
          myApplication={myApplication}
          isLiked={isLiked}
          onLikePress={handleLikePress}
          onChatPress={handleChatPress}
          onEditPress={() => navigation.navigate('ProjectEdit', { project: project })}
        />
        <DetailAboutCard project={project} />

        {project.githubUrl && <DetailGitHubCard project={project} />}

        <DetailLeaderCard project={project} owner={owner} />

        <DetailStatusCard
          project={project}
          applicantCount={applicantCount}
          isOwner={authService.getCurrentUser()?.uid === project.ownerId}
          onManagePress={() => {
            console.log("Manage Button Pressed");
            setIsManageModalVisible(true);
          }}
        />

        <DetailPriceCard
          project={project}
          isOwner={authService.getCurrentUser()?.uid === project.ownerId}
          onPurchasePress={() => setIsPaymentModalVisible(true)}
        />
      </ScrollView>

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