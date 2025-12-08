import React from "react";
import { View } from "react-native";

import styles from "../ProjectDetail.styles";
import MainThumbnail from "./main/MainThumbnail";
import MainInfo from "./main/MainInfo";
import MainStats from "./main/MainStats";
import MainActions from "./main/MainActions";

export default function DetailMainCard({ project, onPurchasePress, isOwner, onApplyPress, myApplication, isLiked, onLikePress, onChatPress }) {
  const isFree =
    project.priceType === "free" ||
    project.price === 0 ||
    project.price === "무료";

  const thumbnailUrl = project.thumbnailUrl || project.thumbnail;

  return (
    <View style={styles.mainCard}>
      <MainThumbnail thumbnailUrl={thumbnailUrl} />

      <MainInfo
        category={project.category}
        isRecruiting={project.isRecruiting}
        title={project.title}
        description={project.description}
      />

      <MainStats
        likes={project.likes}
        views={project.views}
        createdAt={project.createdAt}
      />

      <MainActions
        isFree={isFree}
        onPurchasePress={onPurchasePress}
        isOwner={isOwner}
        onApplyPress={onApplyPress}
        myApplication={myApplication}
        isLiked={isLiked}
        onLikePress={onLikePress}
        onChatPress={onChatPress}
      />
    </View>
  );
}