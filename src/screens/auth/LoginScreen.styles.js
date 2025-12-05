import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../assets/colors';
import typography from '../../assets/typography';

const { width } = Dimensions.get('window');
const scale = width / 409;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.beige,
  },

  centerWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    width: 382 * scale,
    backgroundColor: colors.white,
    borderRadius: 12 * scale,
    padding: 22 * scale,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 6,
  },

  header: {
    alignItems: 'center',
    marginBottom: 12 * scale,
  },

  title: {
    fontSize: typography.size.title,
    fontFamily: typography.fontFamily.medium,
    flexDirection: 'row',
  },

  titleToy: {
    color: colors.yellow,
    fontSize: typography.size.title,
  },

  titleLink: {
    color: colors.primary,
    fontSize: typography.size.title,
  },

  subtitle: {
    color: colors.grayDark,
    marginTop: 6 * scale,
    fontSize: typography.size.body2,
  },

  segmentWrap: {
    flexDirection: 'row',
    backgroundColor: colors.grayLight,
    borderRadius: 12 * scale,
    padding: 3 * scale,
    marginTop: 10 * scale,
    marginBottom: 14 * scale,
  },

  segment: {
    flex: 1,
    paddingVertical: 6 * scale,
    alignItems: 'center',
    borderRadius: 10 * scale,
  },

  segmentActive: {
    backgroundColor: colors.white,
  },

  segmentText: {
    color: colors.black,
    fontSize: typography.size.small,
  },

  segmentTextActive: {
    color: colors.black,
    fontWeight: '600',
  },

  form: {
    marginTop: 6 * scale,
  },

  label: {
    color: colors.black,
    fontSize: typography.size.body2,
    marginBottom: 6 * scale,
  },

  input: {
    height: 38 * scale,
    borderRadius: 6 * scale,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'transparent',
    paddingHorizontal: 10 * scale,
    marginBottom: 12 * scale,
    justifyContent: 'center',
    color: colors.black,
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  forgot: {
    color: colors.grayDark,
    fontSize: typography.size.body2,
  },

  loginButton: {
    height: 38 * scale,
    backgroundColor: colors.green,
    borderRadius: 6 * scale,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6 * scale,
  },

  loginButtonText: {
    color: colors.white,
    fontSize: typography.size.body,
    fontFamily: typography.fontFamily.medium,
  },

  dividerWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 14 * scale,
  },

  dividerLine: {
    height: 1,
    flex: 1,
    backgroundColor: colors.grayMedium,
  },

  orText: {
    marginHorizontal: 8 * scale,
    color: colors.grayDark,
    backgroundColor: colors.white,
    paddingHorizontal: 6 * scale,
    fontSize: typography.size.body2,
  },

  oauthButton: {
    height: 38 * scale,
    borderRadius: 6 * scale,
    borderWidth: 1,
    borderColor: colors.grayMedium,
    backgroundColor: colors.beige,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  oauthIcon: {
    marginRight: 8 * scale,
  },

  oauthText: {
    color: colors.black,
    fontSize: typography.size.body2,
  },
});
