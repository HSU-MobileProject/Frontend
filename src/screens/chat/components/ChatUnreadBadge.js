import React from 'react';
import { View, Text, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const scale = width / 409;

export default function ChatUnreadBadge({ count }) {
    if (!count || count === 0) return null;

    return (
        <View style={{
            backgroundColor: '#FF4D4D',
            borderRadius: 10.6 * scale,
            minWidth: 21.2 * scale,
            height: 21.2 * scale,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 4 * scale,
        }}>
            <Text style={{ color: 'white', fontSize: 11 * scale, fontWeight: 'bold' }}>
                {count > 99 ? '99+' : count}
            </Text>
        </View>
    );
}
