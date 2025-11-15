import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../assets/colors';
import typography from '../../assets/typography';

const { width } = Dimensions.get('window'); 
const scale = width / 409;

const LONGEST_TEXT_WIDTH = 70 * scale;

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    paddingTop: 24 * scale,
    paddingBottom: (24 * scale) + 8,
    alignItems: 'center',
    backgroundColor: colors.white,

    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 8,
  },

  menuItem: {
    flex: 1,
    alignItems: 'center',
  },

  specialLeft: {
    alignItems: 'flex-start',
    paddingLeft: 8 * scale,
  },

  specialRight: {
    alignItems: 'flex-end',
    paddingRight: 8 * scale,
  },

  textBox: {
    width: LONGEST_TEXT_WIDTH,
    alignItems: 'center',
  },

  menuText: {
    fontSize: typography.size.subtitle,
    lineHeight: typography.lineHeight.subtitle,
    color: colors.grayDark,
    fontFamily: typography.fontFamily.medium,
    textAlign: 'center',
  },

  activeText: {
    color: colors.accent,
    fontFamily: typography.fontFamily.bold,
  },
});