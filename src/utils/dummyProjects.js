export const dummyProjects = [
  {
    id: "project_001",
    ownerId: "user_001",

    title: "스마트 블록 조립 앱",
    category: "모바일",
    description:
      "AR 기술을 활용하여 레고 블록 조립을 쉽게 도와주는 교육용 모바일 앱입니다.",
    tags: ["React Native", "ARKit", "TypeScript", "Node.js", "MongoDB"],

    thumbnailUrl: null,

    priceType: "paid",
    price: 450000,

    likes: 450,
    views: 230,
    isPublic: true,

    createdAt: "2025-06-15T10:00:00Z",
    updatedAt: "2025-06-16T10:00:00Z",

    intro:
      "이 프로젝트는 어린이와 성인 모두가 레고 블록을 더 쉽게 조립하도록 도와주는 AR 기반 안내 시스템입니다.",

    progress: 45,
    teamMemberCount: 3,
    applicantCount: 12,

    githubUrl: "toylink/ar-block-app",
    roles: [
      { name: "프론트엔드 개발자", status: "open" },
      { name: "UI/UX 디자이너", status: "open" },
    ],

    deliverInfo: "다운로드 가능, 소스코드 포함",
    isRecruiting: true,

    licenseType: "개인 · 상업용 라이선스",
    includes: ["소스코드", "API 문서", "설치 가이드", "기술 지원(30일)"],
  },

  {
    id: "project_002",
    ownerId: "user_002",

    category: "웹",
    title: "AI 기반 영화 추천 시스템",
    description: "AI를 활용해 사용자 취향을 분석하여 영화 추천을 수행합니다.",
    tags: ["Next.js", "AI", "TensorFlow"],
    likes: 145,
    views: 980,
    priceType: "free",
    price: 0,
    thumbnailUrl: "https://picsum.photos/id/1025/400/300",
    createdAt: "2025-01-20T09:12:00.000Z",

    intro: "사용자 취향을 학습하여 자동으로 영화를 추천해주는 시스템입니다.",
    roles: [{ name: "백엔드 개발자", status: "open" }],

    githubUrl: "toylink/movie-ai",
    githubMeta: "develop branch • 23 commits",

    progress: 80,
    teamMemberCount: 4,
    applicantCount: 20,
    isRecruiting: false,
  },

  {
    id: "project_003",
    ownerId: "user_003",

    category: "IoT",
    title: "실시간 온습도 감지 스마트홈",
    description: "IoT 기반 온습도 감지 자동화 시스템",
    tags: ["ESP32", "MQTT", "Firebase"],
    likes: 140,
    views: 543,
    priceType: "paid",
    price: 120000,
    thumbnailUrl: "https://picsum.photos/id/103/400/300",

    intro:
      "ESP32 기반으로 온습도를 실시간으로 감지하고 자동화하는 스마트홈 시스템입니다.",
    roles: [{ name: "임베디드 개발자", status: "closed" }],

    githubUrl: "toylink/iot-home",
    githubMeta: "main branch • 12 commits",

    progress: 30,
    teamMemberCount: 2,
    applicantCount: 7,
    isRecruiting: false,
  },

  {
    id: "project_004",
    ownerId: "user_004",
    category: "AI",
    title: "음성 기반 번역 비서",
    description: "음성 인식 및 번역 기능 제공",
    tags: ["AI", "Speech-to-Text", "Python"],

    priceType: "paid",
    price: 300000,

    thumbnailUrl: "https://picsum.photos/id/1040/400/300",

    likes: 100,
    views: 1402,
    isPublic: true,

    progress: 80,
    teamMemberCount: 4,
    applicantCount: 1,

    roles: [],
    deliverInfo: "Python 코드 & 모델 체크포인트 제공",
    githubUrl: "https://github.com/example/voice-translator",
    isRecruiting: false,

    createdAt: "2025-01-21T11:30:00.000Z",
    updatedAt: "2025-01-22T12:00:00.000Z",
  },

  {
    id: "project_005",
    ownerId: "user_004",
    category: "도구",
    title: "코드 스니펫 저장/공유 플랫폼",
    description: "개발자용 코드 자동 저장 및 공유 도구",
    tags: ["React", "Firebase", "Tool"],

    priceType: "free",
    price: null,

    thumbnailUrl: null,

    likes: 85,
    views: 411,
    isPublic: true,

    progress: 20,
    teamMemberCount: 1,
    applicantCount: 0,

    roles: [{ name: "프론트엔드 개발자", status: "open" }],
    deliverInfo: "무료 사용 가능",
    githubUrl: null,
    isRecruiting: true,

    createdAt: "2025-01-17T15:22:00.000Z",
    updatedAt: "2025-01-18T08:00:00.000Z",
  },

  {
    id: "project_006",
    ownerId: "user_004",
    category: "기타",
    title: "스터디 그룹 자동 매칭 서비스",
    description: "학습 주제 기반 스터디 매칭 플랫폼",
    tags: ["Matching", "React", "Node"],

    priceType: "paid",
    price: 30000,

    thumbnailUrl: "https://picsum.photos/id/237/400/300",

    likes: 115,
    views: 712,
    isPublic: true,

    progress: 55,
    teamMemberCount: 3,
    applicantCount: 7,

    roles: [{ name: "백엔드 개발자", status: "open" }],
    deliverInfo: "서버 코드 및 배포 스크립트 제공",
    githubUrl: "https://github.com/example/study-matching",
    isRecruiting: true,

    createdAt: "2025-01-22T12:10:00.000Z",
    updatedAt: "2025-01-23T09:30:00.000Z",
  },

  {
    id: "project_007",
    ownerId: "user_001",
    category: "웹",
    title: "실시간 퀴즈 생성 도구",
    description: "퀴즈 제작 및 실시간 결과 조회",
    tags: ["Vue", "Firebase", "Quiz"],

    priceType: "free",
    price: null,

    thumbnailUrl: null,

    likes: 99,
    views: 510,
    isPublic: true,

    progress: 70,
    teamMemberCount: 2,
    applicantCount: 0,

    roles: [],
    deliverInfo: "무료 사용 가능",
    githubUrl: null,
    isRecruiting: false,

    createdAt: "2025-01-18T16:05:00.000Z",
    updatedAt: "2025-01-19T08:50:00.000Z",
  },

  {
    id: "project_008",
    ownerId: "user_001",
    category: "모바일",
    title: "위치 기반 맛집 추천 앱",
    description: "GPS 기반 주변 맛집 추천 기능 제공",
    tags: ["React Native", "GPS", "Map"],

    priceType: "paid",
    price: 70000,

    thumbnailUrl: "https://picsum.photos/id/1005/400/300",

    likes: 150,
    views: 900,
    isPublic: true,

    progress: 90,
    teamMemberCount: 6,
    applicantCount: 0,

    roles: [{ name: "백엔드 개발자", status: "closed" }],
    deliverInfo: "소스코드 + 배포파일 제공",
    githubUrl: "https://github.com/example/food-map",
    isRecruiting: false,

    createdAt: "2025-01-23T08:50:00.000Z",
    updatedAt: "2025-01-23T09:00:00.000Z",
  },

  {
    id: "project_009",
    ownerId: "user_001",
    category: "AI",
    title: "이미지 객체 탐지 모델",
    description: "YOLO 기반 실시간 물체 인식",
    tags: ["YOLO", "Python", "AI Model"],

    priceType: "paid",
    price: 150000,

    thumbnailUrl: null,

    likes: 388,
    views: 2301,
    isPublic: true,

    progress: 65,
    teamMemberCount: 2,
    applicantCount: 0,

    roles: [{ name: "AI 엔지니어", status: "open" }],
    deliverInfo: "YOLO 모델 및 학습 코드 포함",
    githubUrl: "https://github.com/example/yolo-object",
    isRecruiting: true,

    createdAt: "2025-01-19T09:00:00.000Z",
    updatedAt: "2025-01-20T06:00:00.000Z",
  },

  {
    id: "project_010",
    ownerId: "user_001",
    category: "IoT",
    title: "스마트 램프(음성 제어)",
    description: "음성 명령으로 제어 가능한 스마트 조명",
    tags: ["ESP32", "Voice", "SmartHome"],

    priceType: "paid",
    price: 40000,

    thumbnailUrl: "https://picsum.photos/id/1084/400/300",

    likes: 61,
    views: 400,
    isPublic: true,

    progress: 25,
    teamMemberCount: 1,
    applicantCount: 3,

    roles: [],
    deliverInfo: "펌웨어 + 스마트홈 연동 스크립트 제공",
    githubUrl: null,
    isRecruiting: true,

    createdAt: "2025-01-20T20:00:00.000Z",
    updatedAt: "2025-01-21T03:10:00.000Z",
  },
];