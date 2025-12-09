import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../../assets/colors';
import typography from '../../../assets/typography';

const { width } = Dimensions.get('window');
const scale = width / 409;

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 12 * scale,
    paddingHorizontal: 16 * scale,
    paddingVertical: 16 * scale,
    marginBottom: 16 * scale,
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },

  title: {
    fontSize: 16 * scale,
    fontWeight: '700',
    color: colors.black,
    marginBottom: 16 * scale,
    fontFamily: typography.fontFamily,
  },

  contentSection: {
    gap: 12 * scale,
  },

  githubInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.beige,
    borderRadius: 10 * scale,
    paddingHorizontal: 12 * scale,
    paddingVertical: 12 * scale,
  },

  githubIcon: {
    marginRight: 12 * scale,
  },

  infoText: {
    flex: 1,
  },

  username: {
    fontSize: 16 * scale,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 2 * scale,
    fontFamily: typography.fontFamily,
  },

  status: {
    fontSize: 12 * scale,
    color: colors.grayDark,
    fontFamily: typography.fontFamily,
  },

  button: {
    backgroundColor: colors.beige,
    borderRadius: 8 * scale,
    paddingVertical: 10 * scale,
    paddingHorizontal: 16 * scale,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
  },

  buttonConnected: {
    borderColor: colors.primary,
  },

  buttonText: {
    fontSize: 14 * scale,
    fontWeight: '600',
    color: colors.primary,
    fontFamily: typography.fontFamily,
  },

  buttonTextConnected: {
    color: colors.primary,
  },
});
