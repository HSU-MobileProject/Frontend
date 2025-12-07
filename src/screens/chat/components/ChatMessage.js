import React from 'react';
import {
  View,
  Text,
  Linking,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './ChatMessage.styles';
import colors from '../../../assets/colors';

const { width } = Dimensions.get('window');
const scale = width / 409;

export default function ChatMessage({ sender, text, timestamp, isLink }) {
  const isMe = sender === 'me';

  const handleLinkPress = () => {
    if (isLink) {
      Linking.openURL(text).catch(err =>
        console.error('Failed to open link', err),
      );
    }
  };

  return (
    <View
      style={[
        styles.messageWrapper,
        isMe ? styles.messageWrapperMe : styles.messageWrapperOther,
      ]}
    >
      <TouchableOpacity
        disabled={!isLink}
        onPress={handleLinkPress}
        style={[
          styles.messageBubble,
          isMe ? styles.messageBubbleMe : styles.messageBubbleOther,
        ]}
      >
        {isLink ? (
          <View style={styles.linkContainer}>
            <Icon
              name="link"
              size={17 * scale}
              color={colors.black}
              style={styles.linkIcon}
            />
            <Text style={[styles.text, styles.linkText]} numberOfLines={3}>
              {text}
            </Text>
          </View>
        ) : (
          <Text
            style={[styles.text, isMe ? styles.textMe : styles.textOther]}
            numberOfLines={5}
          >
            {text}
          </Text>
        )}
      </TouchableOpacity>
      <Text
        style={[
          styles.timestamp,
          isMe ? styles.timestampMe : styles.timestampOther,
        ]}
      >
        {timestamp}
      </Text>
    </View>
  );
}
