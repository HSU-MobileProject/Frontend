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
import { authService } from "../../../services/authService";

export default function ProjectDetailScreen({ route, navigation }) {
  const project = route?.params?.project || {};

  const owner = ownerData || { displayName: "알 수 없음", profileImage: null };

  if (!project || !project.id) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>프로젝트 정보를 불러올 수 없습니다.</Text>
      </View>
    );
  }

  const [isAppModalVisible, setIsAppModalVisible] = React.useState(false);
  const [isManageModalVisible, setIsManageModalVisible] = React.useState(false);
  const [myApplication, setMyApplication] = React.useState(null);

  const [applicantCount, setApplicantCount] = React.useState(project.applicantCount || 0);

  if (!realtimeProject) return null;

  const [isPaymentModalVisible, setIsPaymentModalVisible] = React.useState(false);

  return (
    <View style={styles.screenWrapper}>
      <DetailHeader project={realtimeProject} currentUser={authService.getCurrentUser()} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <DetailMainCard
          project={realtimeProject}
          isOwner={authService.getCurrentUser()?.uid === realtimeProject.ownerId}
          onApplyPress={handleApplyPress}
          myApplication={myApplication}
          isLiked={isLiked}
          onLikePress={handleLikePress}
          onChatPress={handleChatPress}
          onEditPress={() => navigation.navigate('ProjectEdit', { project: realtimeProject })}
        />
        <DetailAboutCard project={realtimeProject} />

        {realtimeProject.githubUrl && <DetailGitHubCard project={realtimeProject} />}

        <DetailLeaderCard project={realtimeProject} owner={owner} />

        <DetailStatusCard
          project={realtimeProject}
          applicantCount={applicantCount}
          isOwner={authService.getCurrentUser()?.uid === realtimeProject.ownerId}
          onManagePress={() => {
            console.log("Manage Button Pressed");
            setIsManageModalVisible(true);
          }}
        />

        <DetailPriceCard
          project={realtimeProject}
          isOwner={authService.getCurrentUser()?.uid === realtimeProject.ownerId}
          onPurchasePress={() => setIsPaymentModalVisible(true)}
        />
      </ScrollView>

      <ApplicationModal
        visible={isAppModalVisible}
        onClose={() => setIsAppModalVisible(false)}
        roles={realtimeProject.roles || []}
        onApply={handleConfirmApply}
      />

      <ProjectManageModal
        visible={isManageModalVisible}
        onClose={() => setIsManageModalVisible(false)}
        project={realtimeProject}
      />
    </View>
  );
}