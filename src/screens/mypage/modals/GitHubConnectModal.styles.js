import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../../assets/colors';
import typography from '../../../assets/typography';

const { width } = Dimensions.get('window');
const scale = width / 409;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: width * 0.9,
    maxHeight: '92%',
    backgroundColor: colors.white,
    borderRadius: 16 * scale,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 * scale },
    shadowOpacity: 0.1,
    shadowRadius: 12 * scale,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20 * scale,
    paddingVertical: 16 * scale,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginRight: 12 * scale,
  },
  headerTitle: {
    fontFamily: typography.fontFamily.regular,
    fontWeight: 'bold',
    color: colors.black,
  },
  headerDescription: {
    paddingHorizontal: 20 * scale,
    color: colors.grayDark,
    fontFamily: typography.fontFamily.regular,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20 * scale,
    paddingTop: 16 * scale,
  },
  connectedCard: {
    backgroundColor: colors.beige,
    borderRadius: 12 * scale,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accountInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  accountAvatar: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountText: {
    flex: 1,
  },
  accountName: {
    fontFamily: typography.fontFamily.regular,
    fontWeight: '600',
    color: colors.black,
  },
  accountStatus: {
    fontFamily: typography.fontFamily.regular,
    color: colors.grayDark,
    marginTop: 4 * scale,
  },
  accountActions: {
    flexDirection: 'row',
  },
  iconButton: {
    backgroundColor: colors.beige,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  disconnectButton: {
    flexDirection: 'row',
    backgroundColor: colors.beige,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  disconnectText: {
    fontFamily: typography.fontFamily.regular,
    color: colors.black,
  },
  searchSection: {
    marginBottom: 16 * scale,
  },
  searchLabel: {
    fontFamily: typography.fontFamily.regular,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 8 * scale,
  },
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingHorizontal: 12 * scale,
    height: 44 * scale,
  },
  searchInputText: {
    flex: 1,
    fontFamily: typography.fontFamily.regular,
    color: colors.black,
    paddingVertical: 10 * scale,
  },
  repoListSection: {
    marginBottom: 16 * scale,
  },
  repoListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 8 * scale,
  },
  repoListTitle: {
    fontFamily: typography.fontFamily.regular,
    fontWeight: '600',
    color: colors.black,
  },
  repoListCount: {
    fontFamily: typography.fontFamily.regular,
    color: colors.grayDark,
  },
  repoCard: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    marginBottom: 8 * scale,
  },
  repoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  repoInfo: {
    flex: 1,
    marginRight: 8 * scale,
  },
  repoName: {
    fontFamily: typography.fontFamily.regular,
    fontWeight: '600',
    color: colors.black,
  },
  privateBadge: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: 4 * scale,
  },
  privateBadgeText: {
    fontFamily: typography.fontFamily.regular,
    color: colors.white,
    fontWeight: '600',
  },
  repoDescription: {
    fontFamily: typography.fontFamily.regular,
    color: colors.grayDark,
    marginTop: 4 * scale,
  },
  repoSelectButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  repoMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8 * scale,
  },
  languageTag: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageDot: {
    width: 8 * scale,
    height: 8 * scale,
    borderRadius: 4 * scale,
    marginRight: 6 * scale,
  },
  languageText: {
    fontFamily: typography.fontFamily.regular,
    color: colors.grayDark,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontFamily: typography.fontFamily.regular,
    color: colors.grayDark,
    marginLeft: 4 * scale,
  },
});

export default styles;
