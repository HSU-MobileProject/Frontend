import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

import styles from "../ProjectDetail.styles";
import MainThumbnail from "./main/MainThumbnail";
import MainInfo from "./main/MainInfo";
import MainStats from "./main/MainStats";
import MainActions from "./main/MainActions";

export default function DetailMainCard({ project, onPurchasePress, isOwner, onApplyPress, myApplication, isLiked, onLikePress, onChatPress, onEditPress }) {
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

      {isOwner && (
        <View style={{ marginTop: 10 }}>
          {/* Using a secondary style for Edit button to distinguish from primary actions or just adding it to MainActions? 
                MainActions handles the row of buttons. Let's inspect MainActions or put it below.
                The user requested "Edit" button to be visible. 
                Ideally, inside MainActions is better, but seeing MainActions content might be cleaner.
                Let's put it here for now as a separate block or pass it to MainActions. 
                Wait, MainActions takes 'isOwner' but doesn't seem to use it for an Edit button based on previous readings?
                Checking MainActions content (I haven't read it but I can guess).
                Actually, simpler to just add it below MainActions for visibility.
             */}
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 }}>
            <TouchableOpacity onPress={onEditPress} style={{ padding: 10 }}>
              <Text style={{ color: '#888', textDecorationLine: 'underline' }}>프로젝트 수정</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

    </View>
  );
}