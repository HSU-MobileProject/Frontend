import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../../assets/colors';
import typography from '../../../assets/typography';

const { width } = Dimensions.get('window');
const scale = width / 409;

export default StyleSheet.create({
  container: {
    marginBottom: 20 * scale,
  },

  // ===== 탭 =====
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#EAEAEA',
    borderRadius: 12 * scale,
    padding: 4 * scale,
    marginBottom: 16 * scale,
    gap: 4 * scale,
  },

  tab: {
    flex: 1,
    paddingVertical: 8 * scale,
    paddingHorizontal: 12 * scale,
    borderRadius: 10 * scale,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EAEAEA',
  },

  tabActive: {
    backgroundColor: colors.white,
  },

  tabText: {
    fontSize: 13 * scale,
    fontWeight: '500',
    color: colors.black,
    fontFamily: typography.fontFamily,
  },

  tabTextActive: {
    color: colors.black,
    fontWeight: '600',
  },

  // ===== 프로젝트 리스트 =====
  projectList: {
    marginBottom: 12 * scale,
  },

  projectCard: {
    backgroundColor: colors.white,
    borderRadius: 12 * scale,
    padding: 16 * scale,
    marginBottom: 12 * scale,
    borderWidth: 1,
    borderColor: colors.beige,
  },

  projectContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  projectInfo: {
    flex: 1,
    marginRight: 12 * scale,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8 * scale,
    gap: 12 * scale,
  },

  statusBadge: {
    paddingHorizontal: 8 * scale,
    paddingVertical: 4 * scale,
    borderRadius: 8 * scale,
  },

  statusText: {
    fontSize: 10 * scale,
    fontWeight: '500',
    color: colors.white,
    fontFamily: typography.fontFamily,
  },

  teamInfo: {
    fontSize: 14 * scale,
    color: colors.grayDark,
    fontFamily: typography.fontFamily,
  },

  projectTitle: {
    fontSize: 16 * scale,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 8 * scale,
    fontFamily: typography.fontFamily,
  },

  statsRow: {
    flexDirection: 'row',
    gap: 16 * scale,
  },

  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4 * scale,
  },

  statText: {
    fontSize: 14 * scale,
    color: colors.grayDark,
    fontFamily: typography.fontFamily,
  },

  // ===== 액션 버튼 =====
  actionButtons: {
    flexDirection: 'row',
    gap: 8 * scale,
  },

  editButton: {
    backgroundColor: colors.beige,
    borderRadius: 8 * scale,
    paddingHorizontal: 12 * scale,
    paddingVertical: 8 * scale,
    borderWidth: 1,
    borderColor: colors.beige,
    alignItems: 'center',
    justifyContent: 'center',
  },

  editButtonText: {
    fontSize: 13 * scale,
    fontWeight: '600',
    color: colors.black,
    fontFamily: typography.fontFamily,
  },

  manageButton: {
    backgroundColor: colors.beige,
    borderRadius: 8 * scale,
    paddingHorizontal: 12 * scale,
    paddingVertical: 8 * scale,
    borderWidth: 1,
    borderColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },

  manageButtonText: {
    fontSize: 13 * scale,
    fontWeight: '600',
    color: colors.green,
    fontFamily: typography.fontFamily,
  },

  detailButton: {
    backgroundColor: colors.beige,
    borderRadius: 8 * scale,
    paddingHorizontal: 12 * scale,
    paddingVertical: 8 * scale,
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  detailButtonText: {
    fontSize: 13 * scale,
    fontWeight: '600',
    color: colors.primary,
    fontFamily: typography.fontFamily,
  },

  // ===== 새 프로젝트 등록 버튼 =====
  addButton: {
    backgroundColor: colors.green,
    borderRadius: 8 * scale,
    paddingVertical: 12 * scale,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4 * scale,
  },

  addButtonText: {
    fontSize: 14 * scale,
    fontWeight: '600',
    color: colors.white,
    fontFamily: typography.fontFamily,
  },
});
