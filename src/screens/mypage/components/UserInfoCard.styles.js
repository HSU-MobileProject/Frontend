import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../../assets/colors';
import typography from '../../../assets/typography';

const { width } = Dimensions.get('window');
const scale = width / 409;

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 12 * scale,
    paddingHorizontal: 16 * scale,
    paddingVertical: 20 * scale,
    marginBottom: 16 * scale,
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },

  // ===== 프로필 섹션 =====
  profileSection: {
    alignItems: 'center',
    marginBottom: 16 * scale,
  },

  avatarContainer: {
    marginBottom: 12 * scale,
  },

  avatar: {
    width: 80 * scale,
    height: 80 * scale,
    borderRadius: 40 * scale,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    fontSize: 32 * scale,
    fontWeight: '700',
    color: colors.white,
    fontFamily: typography.fontFamily,
  },

  userName: {
    fontSize: 16 * scale,
    fontWeight: '700',
    color: colors.black,
    marginBottom: 4 * scale,
    fontFamily: typography.fontFamily,
  },

  userSubtitle: {
    fontSize: 12 * scale,
    color: colors.grayDark,
    marginBottom: 8 * scale,
    fontFamily: typography.fontFamily,
  },

  badgeContainer: {
    alignItems: 'center',
  },

  badge: {
    backgroundColor: colors.green,
    paddingHorizontal: 8 * scale,
    paddingVertical: 4 * scale,
    borderRadius: 8 * scale,
  },

  badgeText: {
    fontSize: 10 * scale,
    fontWeight: '500',
    color: colors.white,
    fontFamily: typography.fontFamily,
  },

  // ===== 구분선 =====
  divider: {
    height: 1,
    backgroundColor: colors.beige,
    marginVertical: 12 * scale,
  },

  // ===== 통계 섹션 =====
  statsSection: {
    marginBottom: 12 * scale,
  },

  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8 * scale,
  },

  statLabel: {
    fontSize: 14 * scale,
    color: colors.grayDark,
    fontFamily: typography.fontFamily,
  },

  statValue: {
    fontSize: 16 * scale,
    fontWeight: '600',
    color: colors.black,
    fontFamily: typography.fontFamily,
  },

  // ===== 버튼 섹션 =====
  buttonSection: {
    gap: 8 * scale,
  },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.beige,
    borderRadius: 8 * scale,
    paddingVertical: 10 * scale,
    paddingHorizontal: 16 * scale,
    borderWidth: 1,
    borderColor: colors.beige,
    gap: 10 * scale,
  },

  buttonText: {
    fontSize: 14 * scale,
    fontWeight: '500',
    color: colors.black,
    fontFamily: typography.fontFamily,
  },

  logoutText: {
    color: colors.accent,
  },
});
