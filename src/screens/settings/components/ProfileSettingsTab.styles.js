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
    marginBottom: 20 * scale,
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
  profilePictureSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20 * scale,
    paddingVertical: 20 * scale,
    gap: 20 * scale,
  },
  avatarContainer: {
    width: 80 * scale,
    height: 80 * scale,
    borderRadius: 40 * scale,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 28 * scale,
    fontWeight: 'bold',
    color: colors.white,
  },
  uploadSection: {
    flex: 1,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.beige,
    borderRadius: 8 * scale,
    paddingVertical: 10 * scale,
    paddingHorizontal: 12 * scale,
    marginBottom: 8 * scale,
  },
  uploadIcon: {
    marginRight: 8 * scale,
  },
  uploadButtonText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 12 * scale,
    color: colors.black,
    fontWeight: '600',
  },
  uploadHint: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 12 * scale,
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
    marginBottom: 0,
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
  },
  textInput: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 14 * scale,
    color: colors.black,
    padding: 0,
  },
  textareaInput: {
    minHeight: 100 * scale,
    justifyContent: 'flex-start',
    paddingTop: 12 * scale,
  },
  textarea: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 14 * scale,
    color: colors.black,
    textAlignVertical: 'top',
    padding: 0,
  },
  saveButton: {
    backgroundColor: '#00b26b',
    borderRadius: 8 * scale,
    paddingVertical: 12 * scale,
    paddingHorizontal: 16 * scale,
    alignItems: 'center',
    marginBottom: 40 * scale,
    alignSelf: 'flex-end',
  },
  saveButtonText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 12 * scale,
    fontWeight: '600',
    color: colors.white,
  },
});

export default styles;
