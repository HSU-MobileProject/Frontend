import { useState, useEffect, useMemo } from "react";
import { getFirestore, collection, onSnapshot, query, orderBy } from '@react-native-firebase/firestore';

import { authService } from "../services/authService";

export default function useProjects() {
  const [projects, setProjects] = useState([]);
  const [likedProjectIds, setLikedProjectIds] = useState(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getFirestore();
    const user = authService.getCurrentUser();

    // 1. Projects Listener
    const q = collection(db, 'projects');
    const unsubscribeProjects = onSnapshot(q, 
      (querySnapshot) => {
        const list = [];
        querySnapshot.forEach(doc => {
          list.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setProjects(list);
        setLoading(false);
      }, 
      (error) => {
        console.error("Projects Fetch Error:", error);
        setLoading(false);
      }
    );

    // 2. User Likes Listener (if logged in)
    let unsubscribeLikes = () => {};
    if (user) {
      unsubscribeLikes = onSnapshot(collection(db, 'userLikes', user.uid, 'projects'), (snapshot) => {
        const ids = new Set();
        snapshot.forEach(doc => ids.add(doc.id));
        setLikedProjectIds(ids);
      });
    }

    return () => {
      unsubscribeProjects();
      unsubscribeLikes();
    };
  }, []);

  // Merge isLiked into projects
  const projectsWithLike = useMemo(() => {
    return projects.map(p => ({
      ...p,
      isLiked: likedProjectIds.has(p.id)
    }));
  }, [projects, likedProjectIds]);

  const recommendedProjects = useMemo(() => {
    return [...projectsWithLike]
      .sort((a, b) => (b.likes || 0) - (a.likes || 0))
      .slice(0, 3);
  }, [projectsWithLike]);

  const latestProjects = useMemo(() => {
    return [...projectsWithLike]
      .sort((a, b) => {
        // Handle Firestore Timestamp or ISO string
        const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
        const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
        return dateB - dateA;
      })
      .slice(0, 3);
  }, [projectsWithLike]);

  const likedProjects = useMemo(() => {
    return projectsWithLike.filter((p) => p.isLiked);
  }, [projectsWithLike]);

  const deadlineProjects = useMemo(() => {
    return [...projectsWithLike].reverse().slice(0, 3); // Simplified logic
  }, [projectsWithLike]);

  const getAllProjects = (type) => {
    if (type === "recommended") {
      return [...projectsWithLike].sort((a, b) => (b.likes || 0) - (a.likes || 0));
    }
    return [...projectsWithLike].sort((a, b) => {
      const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
      const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
      return dateB - dateA;
    });
  };

  return {
    recommendedProjects,
    latestProjects,
    likedProjects,
    deadlineProjects,
    allProjects: projectsWithLike,
    getAllProjects,
    loading,
  };
}
