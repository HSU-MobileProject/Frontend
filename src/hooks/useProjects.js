import { useMemo } from "react";
import { dummyProjects } from "../utils/dummyProjects";

export default function useProjects() {
  const recommendedProjects = useMemo(() => {
    return [...dummyProjects]
      .sort((a, b) => b.likes - a.likes)
      .slice(0, 3);
  }, []);

  const latestProjects = useMemo(() => {
    return [...dummyProjects]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 3);
  }, []);

  const likedProjects = useMemo(() => {
    return dummyProjects.filter((p) => p.isLiked);
  }, []);

  const deadlineProjects = useMemo(() => {
    return [...dummyProjects].reverse().slice(0, 3);
  }, []);

  const getAllProjects = (type) => {
    if (type === "recommended") {
      return [...dummyProjects].sort((a, b) => b.likes - a.likes);
    }
    // default: latest
    return [...dummyProjects].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  };

  return {
    recommendedProjects,
    latestProjects,
    likedProjects,
    deadlineProjects,
    allProjects: dummyProjects,
    getAllProjects,
    loading: false,
  };
}
