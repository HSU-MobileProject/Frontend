import React from 'react';
import { View, Alert, SafeAreaView } from 'react-native';
import IMP from 'iamport-react-native';
import { useNavigation } from '@react-navigation/native';
import { getFunctions, httpsCallable } from '@react-native-firebase/functions';
import LoadingScreen from '../../components/LoadingScreen';

export default function PaymentScreen({ route }) {
    const navigation = useNavigation();
    const { project, amount, buyerName, buyerEmail, buyerTel, paymentMethod, easyPayProvider } = route.params;

    // 가맹점 식별코드
    const userCode = 'imp11861355';

    // PG & Pay Method Mapping
    // User only has 'nice_v2' enabled in screenshot.
    // If they selected 'easy' (Naver/Kakao), it usually requires a separate channel (e.g. pg: 'kakaopay').
    // But since they only have nice_v2, we will try to use nice_v2 for all, 
    // or fallback to nice_v2 if others are not configured.
    // For now, let's enforce nice_v2 as the PG since that's what's confirmed.
    // We map our internal 'card'/'transfer'/'easy' to I'mport pay_methods.

    let pg = 'nice_v2';
    let pay_method = 'card';

    if (paymentMethod === 'transfer') {
        pay_method = 'trans';
    } else if (paymentMethod === 'easy') {
        // If user explicitly selected an easy pay provider but only has NicePay,
        // NicePay might support it internally or it might fail if we don't switch PG.
        // Given the error "Invalid PG", sticking to the enabled PG 'nice_v2' is safest.
        // We will default to 'card' or let NicePay handle it.
        pay_method = 'card'; // NicePay generic checkout usually starts with card/general
    }

    const callback = async (response) => {
        const { imp_uid, merchant_uid, error_msg, imp_success, success } = response;
        const isSuccess = imp_success === 'true' || imp_success === true || success === 'true' || success === true;

        if (isSuccess) {
            try {
                const functions = getFunctions();
                const verifyPayment = httpsCallable(functions, 'verifyPayment');

                await verifyPayment({
                    imp_uid,
                    merchant_uid,
                    amount: Number(amount),
                    projectId: project.id
                });

                Alert.alert('결제 성공', '결제가 성공적으로 완료되었습니다.', [
                    { text: '확인', onPress: () => navigation.navigate('PaymentHistory') }
                ]);

            } catch (e) {
                console.error("Verification Error:", e);
                Alert.alert('결제 검증 실패', `결제는 완료되었으나 검증에 실패했습니다. 관리자에게 문의하세요.\n(${e.message})`, [
                    { text: '확인', onPress: () => navigation.goBack() }
                ]);
            }
        } else {
            Alert.alert('결제 실패', error_msg || '결제가 취소되었습니다.', [
                { text: '돌아가기', onPress: () => navigation.goBack() }
            ]);
        }
    };

    const data = {
        pg: pg,
        pay_method: pay_method,
        name: project.title,
        merchant_uid: `mid_${new Date().getTime()}`,
        amount: amount,
        buyer_name: buyerName || '익명',
        buyer_tel: buyerTel || '010-0000-0000',
        buyer_email: buyerEmail || 'example@test.com',
        app_scheme: 'toylink',
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <IMP.Payment
                userCode={userCode}
                data={data}
                callback={callback}
                loading={<LoadingScreen />}
            />
        </SafeAreaView>
    );
}
