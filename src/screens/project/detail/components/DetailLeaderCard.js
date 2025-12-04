import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { User } from "lucide-react-native";
import styles from "./ProjectDetail.styles";
import Colors from "../../../../assets/colors";

export default function DetailLeaderCard({ project, owner }) {
  const initial = owner?.displayName?.[0] ?? "유";

  return (
    <View style={styles.card}>
      <View style={styles.leaderRow}>
        {/* 프로필 이미지가 있을 때 */}
        {owner?.profileImage ? (
          <Image
            source={{ uri: owner.profileImage }}
            style={styles.leaderAvatarImage}
          />
        ) : (
          /* 없으면 이니셜 */
          <View style={styles.leaderAvatar}>
            <Text style={styles.leaderInitial}>{initial}</Text>
          </View>
        )}

        {/* 이름/역할 */}
        <View style={{ marginLeft: 4 }}>
          <Text style={styles.leaderName}>{owner?.displayName}</Text>
          <Text style={styles.leaderRole}>{owner?.role}</Text>
        </View>
      </View>

      {/* 프로필 보기 버튼 */}
      <TouchableOpacity style={styles.profileBtn}>
        <User size={16} color={Colors.Black} />
        <Text style={styles.profileBtnText}>프로필 보기</Text>
      </TouchableOpacity>
    </View>
  );
}