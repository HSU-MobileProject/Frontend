import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getFirestore, collection, query, where, orderBy, getDocs } from '@react-native-firebase/firestore';
import { authService } from '../../services/authService';
import { ChevronLeft } from 'lucide-react-native';

export default function PaymentHistoryScreen({ navigation }) {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPayments = async () => {
            const user = authService.getCurrentUser();
            if (!user) {
                setLoading(false);
                return;
            }

            try {
                const db = getFirestore();
                // Assuming there is a 'payments' collection. 
                // If not, this will just return empty.
                // We will create the collection structure via the payment logic later, 
                // but for now we read from it.
                const q = query(
                    collection(db, 'payments'),
                    where('payerId', '==', user.uid),
                    orderBy('createdAt', 'desc')
                );
                const snapshot = await getDocs(q);
                const list = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    date: doc.data().createdAt ? doc.data().createdAt.toDate().toLocaleDateString() : ''
                }));
                setPayments(list);
            } catch (e) {
                console.log("Payment History Error (possibly index missing or empty):", e);
            } finally {
                setLoading(false);
            }
        };
        fetchPayments();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.row}>
                <Text style={styles.projectTitle}>{item.projectTitle || '프로젝트'}</Text>
                <Text style={styles.amount}>{item.amount?.toLocaleString()}원</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.date}>{item.date}</Text>
                <Text style={[styles.status, { color: item.status === 'success' ? '#00b26b' : '#ff4d4d' }]}>
                    {item.status === 'success' ? '결제 완료' : '실패/취소'}
                </Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ChevronLeft size={24} color="#1A1A1A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>결제 내역</Text>
                <View style={{ width: 24 }} />
            </View>

            {loading ? (
                <View style={styles.center}>
                    <Text>로딩 중...</Text>
                </View>
            ) : payments.length === 0 ? (
                <View style={styles.center}>
                    <Text style={styles.emptyText}>결제 내역이 없습니다.</Text>
                </View>
            ) : (
                <FlatList
                    data={payments}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{ padding: 20 }}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
        paddingTop: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 10,
        height: 50,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        color: '#888',
        fontSize: 16,
    },
    card: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    projectTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    amount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#00b26b',
    },
    date: {
        fontSize: 14,
        color: '#888',
    },
    status: {
        fontSize: 14,
        fontWeight: '600',
    },
});
