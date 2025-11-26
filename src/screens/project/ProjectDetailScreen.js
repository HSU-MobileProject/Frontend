import React, { useEffect } from "react";
import { View, ScrollView } from "react-native";
import styles from "./components/detail/ProjectDetail.styles";
import DetailHeader from "./components/detail/DetailHeader";
import DetailMainCard from "./components/detail/DetailMainCard";
import DetailAboutCard from "./components/detail/DetailAboutCard";
import DetailPriceCard from "./components/detail/DetailPriceCard";
import DetailLeaderCard from "./components/detail/DetailLeaderCard";
import DetailGitHubCard from "./components/detail/DetailGitHubCard";
import DetailStatusCard from "./components/detail/DetailStatusCard";

import { usersDummy } from "../../utils/usersDummy";

export default function ProjectDetailScreen({ route, setAddButton }) {
  const project = route?.params?.project || {};

  const owner = usersDummy.find((u) => u.id === project.ownerId) || null;

  useEffect(() => {
    setAddButton && setAddButton(true);
    return () => {
      setAddButton && setAddButton(false);
    };
  }, [setAddButton]);

  if (!project) return null;

  return (
    <View style={styles.screenWrapper}>
      <DetailHeader project={project} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <DetailMainCard project={project} />
        <DetailAboutCard project={project} />

        {project.githubUrl && <DetailGitHubCard project={project} />}

        <DetailLeaderCard project={project} owner={owner} />
        <DetailStatusCard project={project} />

        <DetailPriceCard project={project} />
      </ScrollView>
    </View>
  );
}