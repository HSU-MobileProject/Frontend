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
                profileImage: null, // 초기값 null
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
            // 동적 import로 네이티브 모듈 의존성 문제 방지
            const { authorize } = require('react-native-app-auth');
            const { GITHUB_CONFIG } = require('../config');

            const authState = await authorize(GITHUB_CONFIG);

            // 2. Firebase 자격 증명 생성
            const credential = GithubAuthProvider.credential(authState.accessToken);

            // 3. Firebase 로그인
            const userCredential = await signInWithCredential(auth, credential);
            const user = userCredential.user;

            // 4. Firestore에 유저 정보 저장 (존재하지 않을 경우만 생성)
            const userDocRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists()) {
                await setDoc(userDocRef, {
                    id: user.uid,
                    email: user.email || '',
                    displayName: user.displayName || 'GitHub User',
                    nickname: user.displayName || 'GitHub User', // Initial nickname same as displayName
                    userType: 'personal',
                    role: 'GitHub 개발자',
                    skills: [],
                    bio: 'GitHub 계정으로 가입된 사용자입니다.',
                    profileImage: user.photoURL,
                    githubToken: authState.accessToken, // [추가] GitHub API 사용을 위해 토큰 저장
                    createdAt: serverTimestamp(),
                });
            } else {
                // [추가] 기존 유저라면 토큰 업데이트 (토큰이 달라졌을 수 있으므로)
                await userDocRef.update({
                    githubToken: authState.accessToken
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

            // 2. Firestore에 토큰 저장
            const userDocRef = doc(db, 'users', user.uid);
            await userDocRef.update({
                githubToken: authState.accessToken
            });

            // 3. (옵션) Firebase Auth에도 credential 연동 시도
            // 실패하더라도(이미 다른 계정에 연동된 경우 등) 토큰 저장은 성공했으므로 API 사용은 가능함.
            try {
                const credential = GithubAuthProvider.credential(authState.accessToken);
                // v9 modular SDK: linkWithCredential(user, credential)
                // But specifically for namespaced 'auth.currentUser' (which is Compat User usually if strictly modular not used everywhere)
                // However, user obtained from getAuth() in modular is UserImpl.
                // We need to import linkWithCredential from firebase/auth
                const { linkWithCredential } = require('@react-native-firebase/auth'); 
                // Note: @react-native-firebase/auth exports linkWithCredential in modular style? 
                // Actually rnfirebase v18+ supports modular. 
                // Let's check imports. We already imported other modular functions.
                // We need to add 'linkWithCredential' to the top imports or use it here.
                // Let's rely on stored token for now to avoid complexity with linking errors.
            } catch (linkError) {
                console.log("Credential linking skipped or failed:", linkError);
            }

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
