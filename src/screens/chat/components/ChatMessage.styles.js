import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../../assets/colors';
import typography from '../../../assets/typography';

const { width } = Dimensions.get('window');
const scale = width / 409;

const styles = StyleSheet.create({
  messageWrapper: {
    marginVertical: 8 * scale,
    alignItems: 'flex-end',
  },
  messageWrapperMe: {
    alignItems: 'flex-end',
  },
  messageWrapperOther: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    borderRadius: 10.6 * scale,
    paddingVertical: 8.5 * scale,
    paddingHorizontal: 17 * scale,
    shadowColor: '#000',
    shadowOffset: { width: 4 * scale, height: 4 * scale },
    shadowOpacity: 0.25,
    shadowRadius: 4 * scale,
    elevation: 5,
  },
  messageBubbleMe: {
    backgroundColor: colors.primary,
  },
  messageBubbleOther: {
    backgroundColor: '#eaeaea',
  },
  text: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 17 * scale,
  },
  textMe: {
    color: colors.white,
  },
  textOther: {
    color: colors.black,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkIcon: {
    marginRight: 8.5 * scale,
  },
  linkText: {
    color: colors.black,
    textDecorationLine: 'underline',
  },
  timestamp: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 13 * scale,
    color: colors.grayDark,
    marginTop: 4 * scale,
    marginHorizontal: 4 * scale,
  },
  timestampMe: {
    alignSelf: 'flex-end',
    marginRight: 4 * scale,
  },
  timestampOther: {
    alignSelf: 'flex-start',
    marginLeft: 4 * scale,
  },
});

export default styles;
