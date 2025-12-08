import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../../assets/colors';
import typography from '../../../assets/typography';

const { width } = Dimensions.get('window');
const scale = width / 409;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12.7 * scale,
    paddingHorizontal: 12.7 * scale,
    borderRadius: 10.6 * scale,
    marginBottom: 8.5 * scale,
    backgroundColor: colors.white,
  },
  avatar: {
    width: 42.5 * scale,
    height: 42.5 * scale,
    borderRadius: 21.25 * scale,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12.7 * scale,
  },
  avatarText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 17 * scale,
    fontWeight: '600',
    color: colors.white,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4.2 * scale,
  },
  name: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 17 * scale,
    fontWeight: '600',
    color: colors.black,
  },
  time: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 17 * scale,
    color: colors.grayDark,
  },
  message: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 17 * scale,
    color: colors.grayDark,
  },
  badge: {
    width: 21.2 * scale,
    height: 21.2 * scale,
    borderRadius: 10.6 * scale,
    backgroundColor: '#00b26b',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12.7 * scale,
  },
  badgeContainer: {
    marginLeft: 12.7 * scale,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 17 * scale,
    fontWeight: '600',
    color: colors.white,
  },
});

export default styles;
