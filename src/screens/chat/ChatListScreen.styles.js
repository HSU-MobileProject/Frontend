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
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 0,
  },
  header: {
    height: 60 * scale,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16 * scale,
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoToy: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 20 * scale,
    fontWeight: 'bold',
    color: '#ffe57f',
  },
  logoLink: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 20 * scale,
    fontWeight: 'bold',
    color: colors.primary,
    marginLeft: 4 * scale,
  },
  headerButton: {
    padding: 8 * scale,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20 * scale,
    paddingVertical: 20 * scale,
  },
  title: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 24 * scale,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 20 * scale,
  },
});

export default styles;
