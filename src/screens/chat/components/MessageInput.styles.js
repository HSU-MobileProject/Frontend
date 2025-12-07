import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../../assets/colors';
import typography from '../../../assets/typography';

const { width } = Dimensions.get('window');
const scale = width / 409;

const styles = StyleSheet.create({
  container: {
    height: 42.5 * scale,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 17 * scale,
    paddingVertical: 8.5 * scale,
    gap: 8.5 * scale,
  },
  iconButton: {
    width: 42.5 * scale,
    height: 42.5 * scale,
    borderRadius: 8.5 * scale,
    backgroundColor: colors.beige,
    borderWidth: 0.75,
    borderColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 42.5 * scale,
    borderRadius: 8.5 * scale,
    backgroundColor: colors.white,
    borderWidth: 0.75,
    borderColor: 'rgba(0,0,0,0.1)',
    paddingHorizontal: 12.7 * scale,
    paddingVertical: 8.5 * scale,
    fontFamily: typography.fontFamily.regular,
    fontSize: 17 * scale,
    color: colors.black,
  },
  sendButton: {
    width: 42.5 * scale,
    height: 42.5 * scale,
    borderRadius: 8.5 * scale,
    backgroundColor: '#00b26b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});

export default styles;
