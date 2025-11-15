import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../assets/colors';
import typography from '../../assets/typography';

const { width } = Dimensions.get('window');
const scale = width / 409;

export default StyleSheet.create({
  button: {
    width: 160 * scale,
    paddingVertical: 12 * scale,
    backgroundColor: colors.green,
    borderRadius: 32 * scale,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },

  icon: {
    marginRight: 4 * scale,
  },

  text: {
    color: colors.white,
    fontSize: typography.size.button,
    fontFamily: typography.fontFamily.medium,
  },
});
