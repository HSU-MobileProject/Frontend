import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import { User, Github } from "lucide-react-native";
import { getFirestore, doc, getDoc } from '@react-native-firebase/firestore'; // Import Firestore Modular SDK
import styles from "../ProjectDetail.styles";
import Colors from "../../../../assets/colors";

export default function DetailLeaderCard({ project, owner, onProfilePress }) {
  const [leader, setLeader] = useState(owner || null);

  useEffect(() => {
    if (owner && owner.uid) {
        setLeader(owner);
        return;
    }
    
    if (!project?.ownerId) return;

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
        {displayUser.photoURL ? (
          <Image
            source={{ uri: displayUser.photoURL }}
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

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        {/* GitHub Link Button */}
        {displayUser.githubUrl && (
             <TouchableOpacity 
                style={[styles.profileBtn, { backgroundColor: '#24292E', borderColor: '#24292E' }]} 
                onPress={() => Linking.openURL(displayUser.githubUrl)}
             >
               <Github size={16} color="white" />
               <Text style={[styles.profileBtnText, { color: 'white' }]}>GitHub</Text>
             </TouchableOpacity>
        )}

        {/* 프로필 보기 버튼 */}
        <TouchableOpacity style={styles.profileBtn} onPress={onProfilePress}>
            <User size={16} color={Colors.black} />
            <Text style={styles.profileBtnText}>프로필 보기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}