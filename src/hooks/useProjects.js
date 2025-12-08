import { useState, useEffect, useMemo } from "react";
import { getFirestore, collection, onSnapshot, query, orderBy } from '@react-native-firebase/firestore';

export default function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getFirestore();
    // Real-time subscription to 'projects' collection
    // const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc')); // Optional sorting
    const q = collection(db, 'projects');

    const unsubscribe = onSnapshot(q, 
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

    return () => unsubscribe();
  }, []);

  const recommendedProjects = useMemo(() => {
    return [...projects]
      .sort((a, b) => (b.likes || 0) - (a.likes || 0))
      .slice(0, 3);
  }, [projects]);

  const latestProjects = useMemo(() => {
    return [...projects]
      .sort((a, b) => {
        // Handle Firestore Timestamp or ISO string
        const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
        const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
        return dateB - dateA;
      })
      .slice(0, 3);
  }, [projects]);

  const likedProjects = useMemo(() => {
    return projects.filter((p) => p.isLiked); // Note: isLiked might need local management or subcollection check
  }, [projects]);

  const deadlineProjects = useMemo(() => {
    return [...projects].reverse().slice(0, 3); // Simplified logic
  }, [projects]);

  const getAllProjects = (type) => {
    if (type === "recommended") {
      return [...projects].sort((a, b) => (b.likes || 0) - (a.likes || 0));
    }
    return [...projects].sort((a, b) => {
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
    allProjects: projects,
    getAllProjects,
    loading,
  };
}
