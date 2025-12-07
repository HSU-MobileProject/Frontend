// 더미 채팅 목록 데이터
export const chatListData = [
  {
    id: 1,
    name: '이디자이너',
    lastMessage: '네, 내일 회의 가능합니다',
    lastMessageTime: '10:30',
    unreadCount: 2,
    avatarColor: '#34C3F1',
    status: 'online',
  },
  {
    id: 2,
    name: '박개발',
    lastMessage: '코드 리뷰 부탁드립니다',
    lastMessageTime: '어제',
    unreadCount: 0,
    avatarColor: '#00B26B',
    status: 'offline',
  },
  {
    id: 3,
    name: '최기획',
    lastMessage: '프로젝트 일정 공유드립니다',
    lastMessageTime: '2일 전',
    unreadCount: 0,
    avatarColor: '#FFE57F',
    status: 'offline',
  },
];

// 더미 채팅 메시지 데이터
export const chatMessagesData = {
  1: [
    {
      id: 1,
      sender: 'other',
      text: '안녕하세요! AR 블록 앱 프로젝트에 관심이 있어서 연락드립니다.',
      timestamp: '10:15',
    },
    {
      id: 2,
      sender: 'me',
      text: '안녕하세요! 관심 가져주셔서 감사합니다.',
      timestamp: '10:16',
    },
    {
      id: 3,
      sender: 'other',
      text: '프론트엔드 개발 경험이 3년 정도 있고, React Native 프로젝트도 진행해봤습니다.',
      timestamp: '10:17',
    },
    {
      id: 4,
      sender: 'me',
      text: '좋네요! 포트폴리오 공유해주실 수 있을까요?',
      timestamp: '10:18',
    },
    {
      id: 5,
      sender: 'other',
      text: '네, GitHub 링크 보내드리겠습니다.',
      timestamp: '10:20',
    },
    {
      id: 6,
      sender: 'other',
      text: 'https://github.com/example/portfolio',
      timestamp: '10:20',
      isLink: true,
    },
    {
      id: 7,
      sender: 'me',
      text: '확인했습니다. 내일 오후 2시에 화상 미팅 어떠신가요?',
      timestamp: '10:25',
    },
    {
      id: 8,
      sender: 'other',
      text: '네, 내일 회의 가능합니다',
      timestamp: '10:30',
    },
  ],
};

// 채팅 현재 사용자 정보
export const currentUserData = {
  id: 'me',
  name: '김개발',
};
