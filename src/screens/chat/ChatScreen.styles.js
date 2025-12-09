import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../assets/colors';

const { width } = Dimensions.get('window');
const scale = width / 409;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  messagesContent: {
    paddingHorizontal: 17 * scale,
    paddingVertical: 17 * scale,
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
});

export default styles;
