import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../assets/colors';
import typography from '../../assets/typography';

const { width } = Dimensions.get('window');
const scale = width / 409;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.beige,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16 * scale,
    paddingVertical: 12 * scale,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    fontFamily: typography.fontFamily.regular,
    fontWeight: 'bold',
    fontSize: 20 * scale,
  },
  logoToy: {
    color: '#ffe57f',
  },
  logoLink: {
    color: colors.primary,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 14 * scale,
    paddingVertical: 20 * scale,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.beige,
    paddingHorizontal: 12 * scale,
    paddingVertical: 8 * scale,
    borderRadius: 8 * scale,
    alignSelf: 'flex-start',
    marginBottom: 20 * scale,
  },
  backIcon: {
    marginRight: 8 * scale,
  },
  backButtonText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 12 * scale,
    color: colors.black,
  },
  title: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 16 * scale,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 20 * scale,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#eaeaea',
    borderRadius: 12 * scale,
    padding: 4 * scale,
    marginBottom: 24 * scale,
    height: 48 * scale,
    justifyContent: 'space-between',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10 * scale,
    backgroundColor: 'transparent',
  },
  tabActive: {
    backgroundColor: colors.white,
  },
  tabIcon: {
    marginRight: 6 * scale,
  },
  tabText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 12 * scale,
    color: colors.black,
  },
  tabTextActive: {
    fontWeight: '600',
  },
});

export default styles;
