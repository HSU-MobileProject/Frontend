import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../assets/colors';
import typography from '../../assets/typography';

const { width } = Dimensions.get('window');
const scale = width / 409;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.beige,
    paddingHorizontal: 17 * scale,
    paddingVertical: 17 * scale,
  },
  card: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 14.9 * scale,
    borderWidth: 0.75,
    borderColor: 'rgba(0,0,0,0.1)',
    padding: 17 * scale,
    overflow: 'hidden',
  },
  title: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 21.2 * scale,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 17 * scale,
  },
  chatListScroll: {
    flex: 1,
  },
  chatListContainer: {
    gap: 8.5 * scale,
  },
});

export default styles;
