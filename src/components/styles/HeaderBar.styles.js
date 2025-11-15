import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../assets/colors';
import typography from '../../assets/typography';

const { width } = Dimensions.get('window');
const scale = width / 409;

export default StyleSheet.create({
  container: {
    width: '100%',
    paddingBottom: 14 * scale,
    paddingTop: (16 * scale) + 4,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24 * scale,
    backgroundColor: colors.white,

    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 8,
  },

  logoContainer: { flexDirection: 'row', alignItems: 'center' },

  toy: {
    fontSize: 22 * scale,
    color: colors.yellow,
    fontFamily: typography.fontFamily.bold,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1.5,
  },

  link: {
    fontSize: 22 * scale,
    paddingLeft: 2 * scale,
    color: colors.primary,
    fontFamily: typography.fontFamily.bold,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1.5,
  },

  notificationBtn: {
    marginLeft: 'auto',
  },

  icon: {
    width: 24 * scale,
    height: 24 * scale,
  },
});