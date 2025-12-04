import { StyleSheet } from "react-native";
import { theme, CommonStyles } from "../../../styles/theme";

const { scale, colors, typography } = theme;

export default StyleSheet.create({
  screenWrapper: CommonStyles.screenWrapper,

  scrollContainer: {
    paddingHorizontal: 16 * scale,
    paddingBottom: 32 * scale,
    paddingTop: 12 * scale,
    gap: 18 * scale,
  },

  // ---------- Header ----------
  headerWrap: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16 * scale,
    paddingTop: 16 * scale,
    paddingBottom: 10 * scale,
    backgroundColor: colors.beige,
  },

  headerBackBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6 * scale,
    paddingHorizontal: 0,
  },
  headerBackIcon: {
    fontSize: 16 * scale,
    marginRight: 4 * scale,
    color: colors.black,
  },
  headerBackText: {
    fontFamily: typography.fontFamily.bold,
    fontWeight: typography.weight.bold,
    fontSize: 14.8 * scale,
    color: colors.black,
  },

  headerEditBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12 * scale,
    height: 33 * scale,
    borderRadius: 7.4 * scale,
    backgroundColor: colors.beige,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
  headerEditIcon: {
    fontSize: 13 * scale,
    marginRight: 6 * scale,
    color: colors.black,
  },
  headerEditText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 13 * scale,
    color: colors.black,
  },

  // ---------- 공통 Card ----------
  card: CommonStyles.card,

  // ---------- Main Card ----------
  mainCard: {
    backgroundColor: colors.white,
    borderRadius: 13 * scale,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    paddingVertical: 22 * scale,
    paddingHorizontal: 22 * scale,
    marginBottom: 22 * scale,
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },

  /* 썸네일 */
  mainThumbnail: {
    width: "100%",
    height: 190 * scale,
    borderRadius: 9.2 * scale,
    backgroundColor: colors.grayLight,
    marginBottom: 22 * scale,
  },

  /* 프로젝트 썸네일 */
  mainThumbnailText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.body2 * scale,
    color: colors.grayDark,
    textAlign: "center",
    marginTop: 6 * scale,
  },

  /* 카테고리 + 진행중 */
  mainBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10 * scale,
  },

  mainCategoryBadge: {
    paddingVertical: 2 * scale,
    paddingHorizontal: 8 * scale,
    borderRadius: 7.4 * scale,
    marginRight: 6 * scale,
  },

  mainCategoryBadgeText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 11 * scale,
    color: colors.white,
  },

  mainStatusBadge: {
    paddingVertical: 2 * scale,
    paddingHorizontal: 8 * scale,
    borderRadius: 7.4 * scale,
    backgroundColor: colors.yellow,
  },

  mainStatusBadgeText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 11 * scale,
    color: colors.black,
  },

  /* 제목 */
  mainTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.size.title * scale,
    color: colors.black,
    marginBottom: 6 * scale,
  },

  /* 설명 */
  mainDescription: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.body2 * scale,
    lineHeight: typography.lineHeight.body2 * scale,
    color: colors.grayDark,
  },

  /* 통계 */
  mainStatsRow: {
    flexDirection: "row",
    gap: 22 * scale,
    alignItems: "center",
    marginTop: 12 * scale,
  },

  mainStatText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.body2 * scale,
    color: colors.grayDark,
  },

  mainActions: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16 * scale,
    justifyContent: "space-between", 
  },

  mainBuyBtn: {
    height: 34 * scale,
    paddingHorizontal: 32 * scale,
    borderRadius: 7.4 * scale,
    backgroundColor: colors.green,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8 * scale,
  },
  mainBuyBtnText: {
    color: colors.white,
    fontFamily: typography.fontFamily.regular,
    fontSize: 13 * scale,
  },

  mainChatBtn: {
    flexDirection: "row",   
    alignItems: "center",
    justifyContent: "center",

    height: 34 * scale,
    paddingHorizontal: 32 * scale, 
    borderRadius: 7.4 * scale,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    backgroundColor: colors.beige,
    marginRight: 8 * scale,
  },
  mainChatBtnText: {
    marginLeft: 6 * scale,
    color: colors.black,
    fontFamily: typography.fontFamily.regular,
    fontSize: 13 * scale,
  },

  mainIconBtn: {
    paddingHorizontal: 8 * scale, 
    height: 34 * scale,
    borderRadius: 7.4 * scale,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    backgroundColor: colors.beige,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8 * scale,
  },
  mainIconBtnText: {
    fontSize: 15 * scale,
    color: colors.black,
  },


  // ---------- 섹션 공통 ----------
  sectionTitle: {
    fontSize: 14 * scale,
    fontFamily: typography.fontFamily.medium,
    color: colors.black,
  },

  sectionTitleCenter: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.body2 * scale,
    color: colors.grayDark,
    textAlign: "center",
    marginBottom: 6 * scale,
  },

  sectionBody: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.body2 * scale,
    lineHeight: typography.lineHeight.body2 * scale,
    color: colors.grayDark,
  },

  divider: CommonStyles.divider,

  emptyText: {
    paddingHorizontal: 22 * scale,
    fontFamily: typography.fontFamily.regular,
    fontSize: 12 * scale,
    color: colors.grayDark,
    marginTop: 4 * scale,
  },

  // ---------- 기술 스택 ----------
  techWrap: {
    paddingTop: 8 * scale, 
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8 * scale,
  },
  techBadge: {
    paddingVertical: 2 * scale,
    paddingHorizontal: 8 * scale,
    borderRadius: 7.4 * scale,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
  techText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 11 * scale,
    color: colors.black,
  },

  // ---------- 찾는 역할 ----------
  roleItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 9.2 * scale,
    backgroundColor: colors.grayLight,
    paddingVertical: 10 * scale,
    paddingHorizontal: 16 * scale,
    marginTop: 8 * scale,
  },
  roleName: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.body2 * scale,
    color: colors.black,
  },
  roleStatus: {
    paddingVertical: 2 * scale,
    paddingHorizontal: 8 * scale,
    borderRadius: 7.4 * scale,
  },
  roleOpen: {
    backgroundColor: colors.green,
  },
  roleClosed: {
    backgroundColor: colors.grayMedium,
  },
  roleStatusText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 11 * scale,
    color: colors.white,
  },

  // ---------- 가격 카드 ----------
  priceCard: {
    borderColor: colors.green,
    borderWidth: 1,
  },
  priceValue: {
    textAlign: "center",
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.body * scale,
    color: colors.green,
    marginBottom: 10 * scale,
  },
  bigBuyBtn: {
    width: "100%",
    height: 34 * scale,
    borderRadius: 7.4 * scale,
    backgroundColor: colors.green,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8 * scale,
  },
  bigBuyBtnText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 13 * scale,
    color: colors.white,
  },
  priceSubText: {
    textAlign: "center",
    fontFamily: typography.fontFamily.regular,
    fontSize: 12 * scale,
    color: colors.grayDark,
  },
  detailBulletItem: {
    paddingHorizontal: 22 * scale,
    fontFamily: typography.fontFamily.regular,
    fontSize: 13 * scale,
    lineHeight: 20 * scale,
    color: colors.grayDark,
    marginTop: 2 * scale,
  },


  // ---------- 프로젝트 리더 ----------
  leaderRow: {
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: 10 * scale,
  gap: 12 * scale,
  },

  /* --- 프로필 이미지가 있을 때 --- */
  leaderAvatarImage: {
    width: 42 * scale,
    height: 42 * scale,
    borderRadius: 42 * scale,
    backgroundColor: colors.grayLight,
  },

  /* --- 프로필 이미지가 없을 때 (이니셜 원형) --- */
  profileCircle: {
    width: 42 * scale,
    height: 42 * scale,
    borderRadius: 42 * scale,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  profileInitial: {
    fontFamily: typography.fontFamily.bold,
    fontSize: 16 * scale,
    color: colors.white,
  },

  leaderName: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.body2 * scale,
    color: colors.black,
    marginBottom: 2 * scale,
  },

  leaderRole: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 13 * scale,
    color: colors.grayDark,
  },

  profileBtn: {
    marginTop: 12 * scale,
    height: 33 * scale,
    borderRadius: 7.4 * scale,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    backgroundColor: colors.beige,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6 * scale,
  },

  profileBtnText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 13 * scale,
    color: colors.black,
  },

  // ---------- GitHub ----------
  sectionLabel: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.body2,
    color: colors.black,
  },

  githubBox: {
    backgroundColor: colors.grayLight,    
    borderRadius: 10 * scale,
    marginTop: 8 * scale,
    padding: 16 * scale,          
  },

  githubTopRow: {
    flexDirection: "row",
    alignItems: "center",                 
    width: "100%",
  },

  githubRepo: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.title,                
    color: colors.black,
    marginLeft: 8 * scale,
  },

  githubBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 33 * scale,
    borderRadius: 7.4 * scale,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.beige,
    marginTop: 10 * scale,
    gap: 6 * scale,
  },

  githubBtnText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.body2,
    color: colors.primary,
  },

  // ---------- 현황 ----------
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 22 * scale,
    marginTop: 10 * scale,
  },
  grayText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.body2 * scale,
    color: colors.grayDark,
  },
  boldText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.body2 * scale,
    color: colors.black,
  },
  progressBar: {
    marginTop: 8 * scale,
    height: 7 * scale,
    backgroundColor: colors.grayLight,
    borderRadius: 999,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: colors.green,
    borderRadius: 999,
  },
  applyBtn: {
    marginTop: 16 * scale,
    height: 33 * scale,
    borderRadius: 7.4 * scale,
    backgroundColor: colors.green,
    alignItems: "center",
    justifyContent: "center",
  },
  applyBtnText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 13 * scale,
    color: colors.white,
  },

  // 가격 카드
    priceLabel: {
    textAlign: "center",
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.body2 * scale,
    color: colors.black,
    marginBottom: 6 * scale,
  },

  priceBuyBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 33 * scale,
    borderRadius: 7.4 * scale,
    backgroundColor: colors.green,
    marginBottom: 10 * scale,
  },

  priceBuyIcon: {
    fontSize: 14 * scale,
    marginRight: 6 * scale,
    color: colors.white,
  },

  priceBuyText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 13 * scale,
    color: colors.white,
  },

  // 소개/기술스택/역할
    cardTitle: {
    paddingHorizontal: 22 * scale,
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.body * scale,
    color: colors.black,
    marginBottom: 6 * scale,
  },

  cardBody: {
    paddingHorizontal: 22 * scale,
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.size.body2 * scale,
    lineHeight: typography.lineHeight.body2 * scale,
    color: colors.grayDark,
  },

  cardDivider: {
    height: 1,
    backgroundColor: "rgba(0,0,0,0.1)",
    marginVertical: 16 * scale,
  },

  roleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 22 * scale,
    paddingVertical: 10 * scale,
    backgroundColor: colors.grayLight,
    borderRadius: 7.4 * scale,
    marginBottom: 8 * scale,
  },

});