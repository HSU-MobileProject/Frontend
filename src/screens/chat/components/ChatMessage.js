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

import { Image } from 'react-native';

export default function ChatMessage({ sender, text, timestamp, isLink, type, imageUrl }) {
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
        disabled={!isLink && type !== 'image'}
        onPress={handleLinkPress} // TODO: Handle image press (view full screen)
        style={[
          styles.messageBubble,
          isMe ? styles.messageBubbleMe : styles.messageBubbleOther,
        ]}
      >
        {type === 'image' && imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            style={{ width: 200 * scale, height: 200 * scale, borderRadius: 10, marginBottom: text ? 5 : 0 }}
            resizeMode="cover"
          />
        ) : isLink ? (
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
