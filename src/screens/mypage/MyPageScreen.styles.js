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

  scrollContent: {
    paddingHorizontal: 16 * scale,
    paddingVertical: 16 * scale,
    paddingBottom: 30 * scale,
  },

  header: {
    height: 0,
    marginBottom: 0,
  },

  headerContent: {
    flex: 0,
  },
});
