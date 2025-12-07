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
    paddingVertical: 20 * scale,
  },
  formGroup: {
    marginBottom: 16 * scale,
  },
  lastFormGroup: {
    marginBottom: 20 * scale,
  },
  formLabel: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 12 * scale,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 8 * scale,
  },
  formInput: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    borderRadius: 8 * scale,
    paddingHorizontal: 12 * scale,
    paddingVertical: 10 * scale,
    minHeight: 44 * scale,
    justifyContent: 'center',
    marginBottom: 4 * scale,
  },
  textInput: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 14 * scale,
    color: colors.black,
    padding: 0,
  },
  formHint: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 12 * scale,
    color: colors.grayDark,
    marginTop: 4 * scale,
  },
  changeButton: {
    backgroundColor: '#00b26b',
    borderRadius: 8 * scale,
    paddingVertical: 12 * scale,
    paddingHorizontal: 16 * scale,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  changeButtonText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 12 * scale,
    fontWeight: '600',
    color: colors.white,
  },
});

export default styles;
