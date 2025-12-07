import { usersDummy as usersData } from "./usersDummy";

// 사용자 ID로 빠르게 조회하기 위해 객체로 변환
export const usersDummy = usersData.reduce((acc, user) => {
  acc[user.id] = {
    name: user.displayName,
    profileImage: user.profileImage
  };
  return acc;
}, {
  "system": { name: "System", profileImage: null }
});

import { dummyProjects } from "./dummyProjects";

const getProjectTitle = (id) => {
  const project = dummyProjects.find(p => p.id === id);
  return project ? project.title : "알 수 없는 프로젝트";
};

export const notificationsDummy = [
  {
    id: 1,
    type: "message",
    userId: "user_002", // 박디자이너
    action: "메시지를 보냈습니다.",
    target: getProjectTitle("project_001"), // 스마트 블록 조립 앱
    time: "5분 전",
    isRead: false,
  },
  {
    id: 2,
    type: "apply",
    userId: "user_002", // 박디자이너
    action: "포지션에 지원했습니다.",
    target: getProjectTitle("project_001"), // 스마트 블록 조립 앱
    role: "UI/UX 디자이너",
    time: "1시간 전",
    isRead: false,
  },
  {
    id: 3,
    type: "like",
    userId: "user_004", // 이추천
    action: "프로젝트를 좋아합니다.",
    target: getProjectTitle("project_007"), // 실시간 퀴즈 생성 도구
    time: "2시간 전",
    isRead: false,
  },
  {
    id: 4,
    type: "system",
    userId: "system",
    action: "새로운 커밋이 푸시되었습니다.",
    target: getProjectTitle("project_001"), // 스마트 블록 조립 앱
    time: "3시간 전",
    isRead: true,
  },
  {
    id: 5,
    type: "interest",
    userId: "user_003", // 박IoT
    action: "프로젝트에 관심을 표현했습니다.",
    target: getProjectTitle("project_008"), // 위치 기반 맛집 추천 앱
    time: "1일 전",
    isRead: true,
  },
  {
    id: 6,
    type: "approve",
    userId: "system",
    action: "지원이 승인되었습니다.",
    target: getProjectTitle("project_003"), // 실시간 온습도 감지 스마트홈
    role: "임베디드 개발자", 
    time: "2일 전",
    isRead: true,
  }
];
