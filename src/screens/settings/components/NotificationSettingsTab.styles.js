import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../../assets/colors';
import typography from '../../../assets/typography';

const { width } = Dimensions.get('window');
const scale = width / 409;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12 * scale,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e8e8e8',
    paddingHorizontal: 20 * scale,
    paddingTop: 20 * scale,
    paddingBottom: 20 * scale,
  },
  divider: {
    height: 1,
    backgroundColor: '#e8e8e8',
    marginVertical: 12 * scale,
  },
  notificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 12 * scale,
  },
  notificationTextContainer: {
    flex: 1,
    marginRight: 12 * scale,
  },
  notificationLabel: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 14 * scale,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 4 * scale,
  },
  notificationDescription: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 13 * scale,
    color: colors.grayDark,
  },
  preferencesSection: {
    marginTop: 12 * scale,
    gap: 12 * scale,
  },
});

export default styles;
