import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { User } from "lucide-react-native";
import { getFirestore, doc, getDoc } from '@react-native-firebase/firestore'; // Import Firestore Modular SDK
import styles from "../ProjectDetail.styles";
import Colors from "../../../../assets/colors";

export default function DetailLeaderCard({ project, owner }) {
  // If 'owner' is passed from parent (e.g. dummy), use it.
  // Otherwise fetch from Firestore using project.ownerId
  const [leader, setLeader] = useState(owner || null);

  useEffect(() => {
    // If owner is already provided or no project, skip
    if (owner || !project?.ownerId) return;

    const fetchLeader = async () => {
      try {
        const db = getFirestore();
        const userDocRef = doc(db, 'users', project.ownerId);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          setLeader(userDoc.data());
        } else {
          setLeader({ displayName: "알 수 없음", role: "" });
        }
      } catch (e) {
        console.error("Leader Fetch Error:", e);
      }
    };
    fetchLeader();
  }, [owner, project]);

  const displayUser = leader || {};
  const initial = displayUser.displayName?.[0] ?? "유";

  return (
    <View style={styles.card}>
      <View style={styles.leaderRow}>
        {/* 프로필 이미지가 있을 때 */}
        {displayUser.profileImage ? (
          <Image
            source={{ uri: displayUser.profileImage }}
            style={styles.leaderAvatarImage}
          />
        ) : (
          /* 없으면 이니셜 */
          <View style={styles.leaderAvatar}>
            <Text style={styles.leaderInitial}>{initial}</Text>
          </View>
        )}

        {/* 이름/이메일 */}
        <View style={{ marginLeft: 4 }}>
          <Text style={styles.leaderName}>{displayUser.displayName}</Text>
          <Text style={styles.leaderRole}>{displayUser.email}</Text>
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