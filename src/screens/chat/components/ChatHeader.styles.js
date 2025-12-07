import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../../assets/colors';
import typography from '../../../assets/typography';

const { width } = Dimensions.get('window');
const scale = width / 409;

const styles = StyleSheet.create({
  container: {
    height: 85.7 * scale,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 17 * scale,
    paddingVertical: 17 * scale,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    padding: 8 * scale,
    marginRight: 12 * scale,
  },
  avatar: {
    width: 42.5 * scale,
    height: 42.5 * scale,
    borderRadius: 21.25 * scale,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12 * scale,
  },
  avatarText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 17 * scale,
    fontWeight: '600',
    color: colors.white,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 17 * scale,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 2 * scale,
  },
  status: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 17 * scale,
    color: colors.grayDark,
  },
  menuButton: {
    padding: 8 * scale,
  },
});

export default styles;
