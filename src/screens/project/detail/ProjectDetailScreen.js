import React, { useState } from "react";
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

export default function ProjectDetailScreen({ route }) {
  const project = route?.params?.project || {};
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);

  const owner = usersDummy.find((u) => u.id === project.ownerId) || null;

  if (!project) return null;

  return (
    <View style={styles.screenWrapper}>
      <DetailHeader project={project} currentUser={dummyCurrentUser}/>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <DetailMainCard 
          project={project} 
          onPurchasePress={() => setIsPaymentModalVisible(true)}
        />
        <DetailAboutCard project={project} />

        {project.githubUrl && <DetailGitHubCard project={project} />}

        <DetailLeaderCard project={project} owner={owner} />
        <DetailStatusCard project={project} />

        <DetailPriceCard 
          project={project} 
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