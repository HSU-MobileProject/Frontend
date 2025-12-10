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
import { getFirestore, doc, onSnapshot, getDoc, updateDoc, increment, setDoc, deleteDoc, runTransaction, writeBatch } from "@react-native-firebase/firestore";

export default function ProjectDetailScreen({ route, navigation }) {
  const initialProject = route?.params?.project || {};
  const [project, setProject] = useState(initialProject);
  const owner = route?.params?.ownerData || { displayName: "알 수 없음", photoURL: null };

  const [isAppModalVisible, setIsAppModalVisible] = useState(false);
  const [isManageModalVisible, setIsManageModalVisible] = useState(false);
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  
  const [myApplication, setMyApplication] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const currentUser = authService.getCurrentUser();
  const db = getFirestore();

  // Real-time update for project
  useEffect(() => {
    if (!initialProject.id) return;
    const unsubscribe = onSnapshot(doc(db, "projects", initialProject.id), (docSnapshot) => {
        if (docSnapshot.exists) {
            setProject({ id: docSnapshot.id, ...docSnapshot.data() });
        }
    });
    return () => unsubscribe();
  }, [initialProject.id]);

  // 1. 조회수 증가 (Mount 시 1회)
  useEffect(() => {
    if (!initialProject.id) return;
    const projectRef = doc(db, "projects", initialProject.id);
    updateDoc(projectRef, {
        views: increment(1)
    }).catch(e => console.log("View Inc Error", e));
  }, [initialProject.id]);

  // 2. 좋아요 상태 확인
  useEffect(() => {
    if (!currentUser || !initialProject.id) return;
    const checkLike = async () => {
        const likeDoc = await getDoc(doc(db, "userLikes", currentUser.uid, "projects", initialProject.id));
        setIsLiked(likeDoc.exists);
    };
    checkLike();
  }, [currentUser, initialProject.id]);

  if (!project || !project.id) {
    // ...
    return <View><Text>프로젝트 정보를 불러올 수 없습니다.</Text></View>;
  }

  const [ownerData, setOwnerData] = useState(route?.params?.ownerData || null);

  useEffect(() => {
    if (ownerData || !project.ownerId) return;
    const fetchOwner = async () => {
        // ... owner fetch logic (keep existing)
        try {
            const userDoc = await getDoc(doc(db, 'users', project.ownerId));
            if (userDoc.exists()) {
                setOwnerData(userDoc.data());
            }
        } catch (e) { console.error(e); }
    };
    fetchOwner();
  }, [project.ownerId, ownerData]);

  const applicantCount = project.applicantCount || 0;
  const handleApplyPress = () => setIsAppModalVisible(true);
  
  // 3. 좋아요 토글 핸들러 (Optimistic Update + Batch)
  const isUpdatingLike = React.useRef(false);

  const handleLikePress = async () => {
    if (isUpdatingLike.current) return;
    if (!currentUser || !project.id) return;

    isUpdatingLike.current = true;
    
    const wasLiked = isLiked;
    const originalLikes = project.likes || 0;

    // 1. Optimistic Update (UI 즉시 반영)
    setIsLiked(!wasLiked);
    setProject(prev => ({
        ...prev,
        likes: Math.max(0, (prev.likes || 0) + (wasLiked ? -1 : 1))
    }));

    try {
        const batch = writeBatch(db);
        const projectRef = doc(db, "projects", project.id);
        const likeRef = doc(db, "userLikes", currentUser.uid, "projects", project.id);

        if (wasLiked) {
            // Unlike
            batch.delete(likeRef);
            batch.update(projectRef, { likes: increment(-1) });
        } else {
            // Like
            batch.set(likeRef, {
                likedAt: new Date(),
                title: project.title,
                thumbnail: project.thumbnailUrl || null
            });
            batch.update(projectRef, { likes: increment(1) });
        }

        await batch.commit();
    } catch (e) {
        console.error("Like Toggle Error:", e);
        // Revert on error
        setIsLiked(wasLiked);
        setProject(prev => ({ ...prev, likes: originalLikes }));
    } finally {
       setTimeout(() => { isUpdatingLike.current = false; }, 500); // 0.5초 딜레이
    }
  };

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

        <DetailLeaderCard 
          project={project} 
          owner={ownerData || owner} 
          onProfilePress={() => {
            if (project?.ownerId) {
              navigation.push('UserProfile', { userId: project.ownerId });
            }
          }}
        />

        <DetailStatusCard
          project={project}
          applicantCount={applicantCount}
          isOwner={authService.getCurrentUser()?.uid === project.ownerId}
          onManagePress={() => {
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