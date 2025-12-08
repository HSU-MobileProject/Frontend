import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './MessageInput.styles';
import colors from '../../../assets/colors';

const { width } = Dimensions.get('window');
const scale = width / 409;

export default function MessageInput({ onSendMessage, onSendImage }) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconButton}>
        <Icon name="plus" size={17 * scale} color={colors.black} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconButton} onPress={onSendImage}>
        <Icon name="image" size={17 * scale} color={colors.black} />
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="메시지를 입력하세요..."
        placeholderTextColor={colors.grayDark}
        value={message}
        onChangeText={setMessage}
        multiline={true}
        blurOnSubmit={true}
        onSubmitEditing={handleSend}
        returnKeyType="send"
        maxHeight={100 * scale}
      />

      <TouchableOpacity
        style={[
          styles.sendButton,
          !message.trim() && styles.sendButtonDisabled,
        ]}
        onPress={handleSend}
        disabled={!message.trim()}
      >
        <Icon name="arrow-right" size={17 * scale} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
}
