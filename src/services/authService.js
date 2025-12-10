import { 
    getAuth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    updateProfile, 
    signInWithCredential, 
    signOut, 
    onAuthStateChanged,
    GithubAuthProvider 
} from '@react-native-firebase/auth';
import { 
    getFirestore, 
    collection, 
    doc, 
    setDoc, 
    getDoc, 
    serverTimestamp 
} from '@react-native-firebase/firestore';

const auth = getAuth();
const db = getFirestore();

export const authService = {
    // 로그인
    login: async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential.user;
        } catch (error) {
            throw error;
        }
    },

    // 회원가입
    signup: async ({ email, password, name, userType, companyName, role, skills, bio }) => {
        try {
            // 1. Auth 생성
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // 2. 프로필 업데이트 (Display Name)
            await updateProfile(user, {
                displayName: name,
            });

            // 3. Firestore에 유저 정보 저장
            await setDoc(doc(db, 'users', user.uid), {
                id: user.uid,
                email: email,
                displayName: name,
                nickname: name, // Initial nickname same as displayName
                userType: userType || 'personal', // 'personal' or 'business'
                companyName: companyName || '',
                role: role || '신규 회원',
                skills: skills || [],
                bio: bio || '',
                photoURL: null, // 초기값 null
                createdAt: serverTimestamp(),
            });

            return user;
        } catch (error) {
            throw error;
        }
    },

    // GitHub 로그인
    loginWithGithub: async () => {
        try {
            // 1. AppAuth로 GitHub 인증 (토큰 받아오기)
            const { authorize } = require('react-native-app-auth');
            const { GITHUB_CONFIG } = require('../config');

            const authState = await authorize(GITHUB_CONFIG);
            const accessToken = authState.accessToken;

            // 2. GitHub API로 유저 정보 가져오기 (추가된 로직)
            const response = await fetch('https://api.github.com/user', {
                headers: {
                    Authorization: `token ${accessToken}`,
                    Accept: 'application/json'
                }
            });
            const githubData = await response.json();
            
            // 3. Firebase 자격 증명 생성
            const credential = GithubAuthProvider.credential(accessToken);

            // 4. Firebase 로그인
            const userCredential = await signInWithCredential(auth, credential);
            const user = userCredential.user;

            // 5. Firestore에 유저 정보 저장
            const userDocRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists()) {
                await setDoc(userDocRef, {
                    id: user.uid,
                    email: user.email || githubData.email || '',
                    displayName: user.displayName || githubData.name || githubData.login || 'GitHub User',
                    nickname: user.displayName || githubData.name || githubData.login || 'GitHub User',
                    userType: 'personal',
                    role: 'GitHub 개발자',
                    skills: [],
                    bio: githubData.bio || 'GitHub 계정으로 가입된 사용자입니다.',
                    photoURL: user.photoURL || githubData.avatar_url,
                    githubId: githubData.id,
                    githubUsername: githubData.login,
                    githubUrl: githubData.html_url,
                    githubToken: accessToken,
                    createdAt: serverTimestamp(),
                });
            } else {
                // 기존 유저라면 정보 업데이트
                await userDocRef.update({
                    githubToken: accessToken,
                    githubUsername: githubData.login,
                    githubUrl: githubData.html_url,
                    photoURL: user.photoURL 
                });
            }

            return user;
        } catch (error) {
            console.error("GitHub Login Error:", error);
            if (error.code === 'auth/account-exists-with-different-credential') {
                throw new Error("이미 이메일로 가입된 계정입니다. 이메일 로그인을 이용해주세요.");
            }
            throw error;
        }
    },

    // [NEW] GitHub 계정 연동 (이미 로그인된 상태에서 토큰만 추가/갱신)
    linkGitHub: async () => {
        try {
            const user = auth.currentUser;
            if (!user) throw new Error("로그인이 필요합니다.");

            // 1. AppAuth로 GitHub 인증 (토큰 받아오기)
            const { authorize } = require('react-native-app-auth');
            const { GITHUB_CONFIG } = require('../config');
            const authState = await authorize(GITHUB_CONFIG);
            const accessToken = authState.accessToken;

            // 2. GitHub API로 유저 정보 가져오기
            const response = await fetch('https://api.github.com/user', {
                headers: {
                    Authorization: `token ${accessToken}`,
                    Accept: 'application/json'
                }
            });
            const githubData = await response.json();

            // 3. Firestore에 토큰 및 정보 저장
            const userDocRef = doc(db, 'users', user.uid);
            await userDocRef.update({
                githubToken: accessToken,
                githubId: githubData.id,
                githubUsername: githubData.login,
                githubUrl: githubData.html_url,
                // photoURL: githubData.avatar_url // 기존 프로필 유지를 위해 주석 처리 (선택사항)
            });

            return true;
        } catch (error) {
            console.error("GitHub Link Error:", error);
            throw error;
        }
    },

    // 로그아웃
    logout: async () => {
        try {
            await signOut(auth);
        } catch (error) {
            throw error;
        }
    },

    // 현재 유저 가져오기
    getCurrentUser: () => {
        return auth.currentUser;
    },

    // 상태 변경 감지
    onAuthStateChanged: (callback) => {
        return onAuthStateChanged(auth, callback);
    }
};
