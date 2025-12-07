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
    marginBottom: 20 * scale,
  },
  cardHeader: {
    paddingHorizontal: 20 * scale,
    paddingVertical: 16 * scale,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  cardTitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 14 * scale,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 4 * scale,
  },
  cardDescription: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 14 * scale,
    color: colors.grayDark,
  },
  cardContent: {
    paddingHorizontal: 20 * scale,
    paddingVertical: 16 * scale,
    gap: 12 * scale,
  },
  privacyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 8 * scale,
  },
  privacyTextContainer: {
    flex: 1,
    marginRight: 12 * scale,
  },
  privacyLabel: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 14 * scale,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 2 * scale,
  },
  privacyDescription: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 13 * scale,
    color: colors.grayDark,
    marginTop: 2 * scale,
  },
  dangerCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12 * scale,
    borderWidth: 1,
    borderColor: '#ef5350',
    overflow: 'hidden',
    marginBottom: 40 * scale,
  },
  dangerContent: {
    backgroundColor: 'rgba(220, 38, 38, 0.1)',
    borderRadius: 10 * scale,
    padding: 16 * scale,
    marginHorizontal: 20 * scale,
    marginVertical: 16 * scale,
  },
  dangerTitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 14 * scale,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 8 * scale,
  },
  dangerDescription: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 13 * scale,
    color: colors.grayDark,
    marginBottom: 12 * scale,
    lineHeight: 20 * scale,
  },
  deleteButton: {
    backgroundColor: '#ef5350',
    borderRadius: 8 * scale,
    paddingVertical: 10 * scale,
    paddingHorizontal: 12 * scale,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  deleteIcon: {
    marginRight: 8 * scale,
  },
  deleteButtonText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 12 * scale,
    fontWeight: '600',
    color: 'white',
  },
});

export default styles;
