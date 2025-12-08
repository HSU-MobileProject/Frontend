import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles/NavigationBar.styles';

export default function NavigationBar({
  activeTab,
  onPress,
  onLayoutNavBar,
}) {
  const navigation = useNavigation();

  const menuItems = [
    // ProjectDetail 수정하여 사용
    { key: '메인', label: '메인', screen: 'ProjectList' },
    { key: '검색', label: '검색', screen: 'ProjectSearch' },
    { key: '즐겨찾기', label: '즐겨찾기', screen: 'ProjectLike' },
    { key: '채팅', label: '채팅', screen: 'ChatList' },
    { key: '내정보', label: '내정보', screen: 'MyPage' },
  ];

  const handlePress = item => {
    onPress(item.key);
    // Stack reset logic for Main to ensure fresh state
    if (item.key === '메인') {
      navigation.reset({
        index: 0,
        routes: [{ name: 'ProjectList' }],
      });
    } else {
      navigation.navigate(item.screen);
    }
  };

  return (
    <View
      style={styles.container}
      onLayout={e => {
        const height = e.nativeEvent.layout.height;
        onLayoutNavBar && onLayoutNavBar(height);
      }}
    >
      {menuItems.map(item => (
        <TouchableOpacity
          key={item.key}
          style={[
            styles.menuItem,
            item.key === '메인' && styles.specialRight,
            item.key === '내정보' && styles.specialLeft,
          ]}
          onPress={() => handlePress(item)}
        >
          <Text
            style={[
              styles.menuText,
              activeTab === item.key && styles.activeText,
            ]}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
