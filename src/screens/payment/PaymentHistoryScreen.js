import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, TextInput, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getFirestore, collection, query, where, orderBy, getDocs, doc, updateDoc } from '@react-native-firebase/firestore';
import { authService } from '../../services/authService';
import { 
    ChevronLeft, 
    Search, 
    Receipt, 
    ShoppingCart, 
    TrendingUp, 
    ArrowUpRight, 
    ArrowDownLeft, // For item icons
    MoreHorizontal 
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function PaymentHistoryScreen({ navigation }) {
    const [allPayments, setAllPayments] = useState([]);
    const [filteredPayments, setFilteredPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('all'); // 'all', 'purchase', 'sales'

    const [summary, setSummary] = useState({
        total: 0,
        purchase: 0,
        sales: 0
    });

    useEffect(() => {
        fetchPayments();
    }, []);

    useEffect(() => {
        filterData();
    }, [activeTab, allPayments]);

    const fetchPayments = async () => {
        const user = authService.getCurrentUser();
        if (!user) {
            setLoading(false);
            return;
        }

        try {
            const db = getFirestore();
            const paymentsRef = collection(db, 'payments');

            // 1. Fetch Purchases (I am payer)
            const purchaseQ = query(
                paymentsRef,
                where('payerId', '==', user.uid),
            );

            // 2. Fetch Sales (I am payee)
            const salesQ = query(
                paymentsRef,
                where('payeeId', '==', user.uid),
            );

            const [purchaseSnapshot, salesSnapshot] = await Promise.all([
                getDocs(purchaseQ),
                getDocs(salesQ)
            ]);

            const purchases = purchaseSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                type: 'purchase',
                dateObj: doc.data().createdAt ? doc.data().createdAt.toDate() : new Date(),
                date: doc.data().createdAt ? doc.data().createdAt.toDate().toLocaleDateString() : ''
            }));

            const sales = salesSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                type: 'sales',
                dateObj: doc.data().createdAt ? doc.data().createdAt.toDate() : new Date(),
                date: doc.data().createdAt ? doc.data().createdAt.toDate().toLocaleDateString() : ''
            }));

            // Merge and sort desc
            const combined = [...purchases, ...sales].sort((a, b) => b.dateObj - a.dateObj);
            
            // Deduplicate if any (shouldn't be, unless payer==payee)
            const uniqueMap = new Map();
            combined.forEach(item => uniqueMap.set(item.id, item));
            const uniqueList = Array.from(uniqueMap.values());

            setAllPayments(uniqueList);

            // Calculate Summary
            const totalPurchaseAmount = purchases.reduce((sum, item) => sum + (item.amount || 0), 0);
            const totalSalesAmount = sales.reduce((sum, item) => sum + (item.amount || 0), 0);

            setSummary({
                total: totalPurchaseAmount + totalSalesAmount,
                purchase: totalPurchaseAmount,
                sales: totalSalesAmount
            });

        } catch (e) {
            console.log("Payment History Error:", e);
        } finally {
            setLoading(false);
        }
    };

    const filterData = () => {
        if (activeTab === 'all') {
            setFilteredPayments(allPayments);
        } else if (activeTab === 'purchase') {
            setFilteredPayments(allPayments.filter(p => p.type === 'purchase'));
        } else if (activeTab === 'sales') {
            setFilteredPayments(allPayments.filter(p => p.type === 'sales'));
        }
    };

    const handleRefund = (paymentId) => {
        Alert.alert(
            "거래 취소",
            "정말로 이 거래를 취소하시겠습니까? (환불 처리됨)",
            [
                { text: "아니오", style: "cancel" },
                {
                    text: "예",
                    onPress: async () => {
                        try {
                            const db = getFirestore();
                            await updateDoc(doc(db, 'payments', paymentId), {
                                status: 'cancelled'
                            });
                            // Update local state
                            setAllPayments(prev => prev.map(p => 
                                p.id === paymentId ? { ...p, status: 'cancelled' } : p
                            ));
                            Alert.alert("알림", "거래가 취소되었습니다.");
                        } catch (e) {
                            console.error("Refund Error:", e);
                            Alert.alert("오류", "취소 처리 중 문제가 발생했습니다.");
                        }
                    }
                }
            ]
        );
    };

    // Dynamic Width Calculation
    const getCardWidth = (value) => {
        const minWidth = 130;
        const maxWidth = 220; // Maximum extended width
        const total = summary.total || 1; // Avoid division by zero
        
        // Scale based on percentage of total
        // If value is 0, just return minWidth
        if (value === 0) return minWidth;

        const percentage = value / total;
        // Total card (100%) gets maxWidth
        // Purchase/Sales get proportional width between min and max
        // Formula: minWidth + (percentage * (maxWidth - minWidth))
        const scaledWidth = minWidth + (percentage * (maxWidth - minWidth));
        
        return scaledWidth;
    };

    // --- Render Components ---

    const renderHeader = () => (
        <View style={styles.listHeaderContainer}>
            {/* Summary Cards Carousel */}
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false} 
                contentContainerStyle={styles.summaryContainer}
            >
                {/* 1. Total Card */}
                <View style={[styles.summaryCard, { width: getCardWidth(summary.total) }]}>
                    <View style={styles.summaryHeader}>
                        <View style={[styles.summaryIconBox, { backgroundColor: 'rgba(0, 178, 107, 0.125)' }]}>
                            <Receipt size={20} color="#00B26B" />
                        </View>
                        <View style={{flex:1}} />
                    </View>
                    <View style={styles.summaryContent}>
                        <Text style={styles.summaryLabel}>총 거래액</Text>
                        <Text style={[styles.summaryValue, { color: '#00B26B' }]}>
                            {(summary.total / 10000).toFixed(0)}만원
                        </Text>
                    </View>
                </View>

                {/* 2. Purchase Card */}
                <View style={[styles.summaryCard, { width: getCardWidth(summary.purchase) }]}>
                    <View style={styles.summaryHeader}>
                        <View style={[styles.summaryIconBox, { backgroundColor: 'rgba(52, 195, 241, 0.125)' }]}>
                            <ShoppingCart size={20} color="#34C3F1" />
                        </View>
                        <View style={{flex:1}} />
                    </View>
                    <View style={styles.summaryContent}>
                        <Text style={styles.summaryLabel}>구매 총액</Text>
                        <Text style={[styles.summaryValue, { color: '#34C3F1' }]}>
                            {(summary.purchase / 10000).toFixed(0)}만원
                        </Text>
                    </View>
                </View>

                {/* 3. Sales Card */}
                <View style={[styles.summaryCard, { width: getCardWidth(summary.sales) }]}>
                    <View style={styles.summaryHeader}>
                        <View style={[styles.summaryIconBox, { backgroundColor: 'rgba(255, 229, 127, 0.25)' }]}>
                            <TrendingUp size={20} color="#D97706" />
                        </View>
                        <View style={{flex:1}} />
                    </View>
                    <View style={styles.summaryContent}>
                        <Text style={styles.summaryLabel}>판매 총액</Text>
                        <Text style={[styles.summaryValue, { color: '#D97706' }]}>
                            {(summary.sales / 10000).toFixed(0)}만원
                        </Text>
                    </View>
                </View>
            </ScrollView>

            {/* Tabs */}
            <View style={styles.tabContainer}>
                <View style={styles.tabWrapper}>
                    {['all', 'purchase', 'sales'].map((tab) => {
                        const labels = { all: '전체', purchase: '구매 내역', sales: '판매 내역' };
                        const isActive = activeTab === tab;
                        return (
                            <TouchableOpacity 
                                key={tab} 
                                style={[styles.tabButton, isActive && styles.tabButtonActive]}
                                onPress={() => setActiveTab(tab)}
                            >
                                <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                                    {labels[tab]}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
        </View>
    );

    const renderItem = ({ item }) => {
        const isPurchase = item.type === 'purchase';
        const isSuccess = item.status === 'success';
        const isCancelled = item.status === 'cancelled';
        
        // Colors & Texts based on type
        const typeColor = isPurchase ? '#34C3F1' : '#00B26B'; // Purchase: Blue, Sales: Green (as per design spec analysis)
        // Wait, design spec says:
        // Purchase Item: "구매" badge is Blue (#34C3F1), Amount is Blue.
        // Sales Item: "판매" badge is Green (#00B26B) or Yellow?
        // Let's look closer at the prompt's CSS text...
        // "구매" badge background: #34C3F1 (Blue)
        // "판매" badge background: #00B26B (Green) -> Wait, other part says #FFE57F (Yellow) for "진행중"?
        // Let's use Blue for Purchase, Green for Sales generally. 
        
        const badgeColor = isPurchase ? '#34C3F1' : '#00B26B';
        const badgeText = isPurchase ? '구매' : '판매';

        return (
            <View style={styles.card}>
                {/* Top Row: Badges & Date */}
                <View style={styles.cardHeader}>
                    <View style={styles.badgeRow}>
                        {/* Type Badge */}
                        <View style={[styles.badge, { backgroundColor: badgeColor }]}>
                            <Text style={styles.badgeTextWhite}>{badgeText}</Text>
                        </View>
                        {/* Status Badge */}
                        <View style={[styles.badgeOutline, { borderColor: isSuccess ? '#00B26B' : '#9CA3AF' }]}>
                            <Text style={[styles.badgeTextOutline, { color: isSuccess ? '#00B26B' : '#9CA3AF' }]}>
                                {isSuccess ? '완료' : isCancelled ? '취소됨' : '실패'}
                            </Text>
                        </View>
                    </View>
                    <Text style={styles.dateText}>{item.date}</Text>
                </View>

                {/* Middle: Title */}
                <Text style={styles.itemTitle} numberOfLines={1}>
                    {item.projectTitle || '프로젝트 이름 없음'}
                </Text>

                {/* Bottom: User Info & Amount */}
                <View style={styles.cardFooter}>
                    <Text style={styles.counterpartyText}>
                        {isPurchase ? `판매자: ${item.payeeName || '알수없음'}` : `구매자: ${item.payerName || '알수없음'}`}
                    </Text>
                    
                    <View style={styles.amountRow}>
                        {/* Icon */}
                        {isPurchase ? (
                            <ArrowDownLeft size={16} color={badgeColor} style={{marginTop:2}} />
                        ) : (
                            <ArrowUpRight size={16} color={badgeColor} style={{marginTop:2}} />
                        )}
                        <Text style={styles.typeLabel}>{badgeText}</Text>
                        <Text style={[styles.amountText, { color: badgeColor }]}>
                            {item.amount?.toLocaleString()}원
                        </Text>
                    </View>
                </View>

                {/* Action Button: Cancel (Only for successful purchases usually, but maybe sales too?) */}
                {/* Design shows a gray '거래 취소' button */}
                {isSuccess && (
                     <View style={{ alignItems: 'flex-end', marginTop: 12 }}>
                        <TouchableOpacity 
                            style={styles.cancelButton}
                            onPress={() => handleRefund(item.id)}
                        >
                            <Text style={styles.cancelButtonText}>거래 취소</Text>
                        </TouchableOpacity>
                     </View>
                )}
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Main Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ChevronLeft size={24} color="#1A1A1A" />
                </TouchableOpacity>
                <View>
                    <Text style={styles.headerTitle}>거래 내역</Text>
                    <Text style={styles.headerSubtitle}>총 {allPayments.length}건의 거래</Text>
                </View>
                <View style={{ width: 24 }} />
            </View>

            {loading ? (
                <View style={styles.center}>
                    <Text>로딩 중...</Text>
                </View>
            ) : (
                <FlatList
                    data={filteredPayments}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    ListHeaderComponent={renderHeader}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View style={styles.center}>
                            <Text style={styles.emptyText}>거래 내역이 없습니다.</Text>
                        </View>
                    }
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAF8F3', // Beige background from spec
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40,
    },
    emptyText: {
        color: '#6B7280',
        fontSize: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingBottom: 16,
        paddingTop: 8,
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '400', // Regular font weight from spec
        color: '#1A1A1A',
        textAlign: 'left',
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#6B7280',
        marginTop: 4,
    },
    listContent: {
        paddingBottom: 40,
    },
    listHeaderContainer: {
        marginBottom: 16,
    },
    // Summary Cards
    summaryContainer: {
        paddingHorizontal: 16,
        gap: 12,
        paddingBottom: 20,
    },
    summaryCard: {
        width: 130,
        height: 100,
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    summaryHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    summaryIconBox: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    summaryContent: {
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    summaryLabel: {
        fontSize: 14,
        color: '#6B7280',
    },
    summaryValue: {
        fontSize: 16,
        fontWeight: 'bold', // Made bold for emphasis
    },
    // Tabs
    tabContainer: {
        paddingHorizontal: 16,
        marginTop: 10,
    },
    tabWrapper: {
        flexDirection: 'row',
        backgroundColor: '#EAEAEA',
        borderRadius: 14,
        padding: 4,
        height: 48,
        alignItems: 'center'
    },
    tabButton: {
        flex: 1,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
    },
    tabButtonActive: {
        backgroundColor: '#FFFFFF',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 1,
    },
    tabText: {
        fontSize: 14,
        color: '#6B7280',
        fontWeight: '500'
    },
    tabTextActive: {
        color: '#1A1A1A',
        fontWeight: 'bold'
    },
    // Card Item
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        marginHorizontal: 16,
        marginBottom: 12,
        padding: 24,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    badgeRow: {
        flexDirection: 'row',
        gap: 8,
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        height: 22,
    },
    badgeTextWhite: {
        color: '#FFFFFF',
        fontSize: 12,
    },
    badgeOutline: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 8,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 22,
    },
    badgeTextOutline: {
        fontSize: 12,
    },
    dateText: {
        fontSize: 14,
        color: '#6B7280',
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold', // Heading 3 style
        color: '#1A1A1A',
        marginBottom: 16,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    counterpartyText: {
        fontSize: 14,
        color: '#6B7280',
    },
    amountRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    typeLabel: {
        fontSize: 16,
        color: '#00B26B', // Default color, overridden inline
        marginRight: 4,
        fontWeight: '500' // Added weight
    },
    amountText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cancelButton: {
        backgroundColor: '#FAF8F3', // Light beige/gray from spec
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    cancelButtonText: {
        fontSize: 14,
        color: '#1A1A1A',
    }
});
