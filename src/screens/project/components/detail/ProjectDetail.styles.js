import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../../../assets/colors";
import Typography from "../../../../assets/typography";

const { width } = Dimensions.get("window");
const BASE_WIDTH = 413;
const scale = width / BASE_WIDTH;

export default StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: Colors.beige,
  },

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
    backgroundColor: Colors.beige,
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
    color: Colors.black,
  },
  headerBackText: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: Typography.weight.bold,
    fontSize: 14.8 * scale,
    color: Colors.black,
  },

  headerEditBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12 * scale,
    height: 33 * scale,
    borderRadius: 7.4 * scale,
    backgroundColor: Colors.beige,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
  headerEditIcon: {
    fontSize: 13 * scale,
    marginRight: 6 * scale,
    color: Colors.black,
  },
  headerEditText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 13 * scale,
    color: Colors.black,
  },

  // ---------- 공통 Card ----------
  card: {
    backgroundColor: Colors.white,
    borderRadius: 13 * scale,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    paddingTop: 22 * scale,
    paddingHorizontal: 0,
    paddingBottom: 22 * scale,
    marginBottom: 16 * scale,
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },

  cardContent: {
    paddingHorizontal: 22 * scale,
  },

  // ---------- Main Card ----------
  mainCard: {
    backgroundColor: Colors.white,
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
    backgroundColor: Colors.grayLight,
    marginBottom: 22 * scale,
  },

  /* 프로젝트 썸네일 */
  mainThumbnailText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.size.body2 * scale,
    color: Colors.grayDark,
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
    fontFamily: Typography.fontFamily.regular,
    fontSize: 11 * scale,
    color: Colors.white,
  },

  mainStatusBadge: {
    paddingVertical: 2 * scale,
    paddingHorizontal: 8 * scale,
    borderRadius: 7.4 * scale,
    backgroundColor: Colors.yellow,
  },

  mainStatusBadgeText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 11 * scale,
    color: Colors.black,
  },

  /* 제목 */
  mainTitle: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.size.title * scale,
    color: Colors.black,
    marginBottom: 6 * scale,
  },

  /* 설명 */
  mainDescription: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.size.body2 * scale,
    lineHeight: Typography.lineHeight.body2 * scale,
    color: Colors.grayDark,
  },

  /* 통계 */
  mainStatsRow: {
    flexDirection: "row",
    gap: 22 * scale,
    alignItems: "center",
    marginTop: 12 * scale,
  },

  mainStatText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.size.body2 * scale,
    color: Colors.grayDark,
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
    backgroundColor: Colors.green,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8 * scale,
  },
  mainBuyBtnText: {
    color: Colors.white,
    fontFamily: Typography.fontFamily.regular,
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
    backgroundColor: Colors.beige,
    marginRight: 8 * scale,
  },
  mainChatBtnText: {
    marginLeft: 6 * scale,
    color: Colors.black,
    fontFamily: Typography.fontFamily.regular,
    fontSize: 13 * scale,
  },

  mainIconBtn: {
    paddingHorizontal: 8 * scale, 
    height: 34 * scale,
    borderRadius: 7.4 * scale,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    backgroundColor: Colors.beige,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8 * scale,
  },
  mainIconBtnText: {
    fontSize: 15 * scale,
    color: Colors.black,
  },


  // ---------- 섹션 공통 ----------
  sectionTitle: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.size.body2,
    color: Colors.black,
  },

  sectionTitleCenter: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.size.body2 * scale,
    color: Colors.grayDark,
    textAlign: "center",
    marginBottom: 6 * scale,
  },

  sectionBody: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.size.body2 * scale,
    lineHeight: Typography.lineHeight.body2 * scale,
    color: Colors.grayDark,
  },

  divider: {
    height: 1,
    backgroundColor: "rgba(0,0,0,0.1)",
    marginVertical: 18 * scale,
    marginHorizontal: 22 * scale,
  },

  emptyText: {
    paddingHorizontal: 22 * scale,
    fontFamily: Typography.fontFamily.regular,
    fontSize: 12 * scale,
    color: Colors.grayDark,
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
    fontFamily: Typography.fontFamily.regular,
    fontSize: 11 * scale,
    color: Colors.black,
  },

  // ---------- 찾는 역할 ----------
  roleItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 9.2 * scale,
    backgroundColor: Colors.grayLight,
    paddingVertical: 10 * scale,
    paddingHorizontal: 16 * scale,
    marginTop: 8 * scale,
  },
  roleName: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.size.body2 * scale,
    color: Colors.black,
  },
  roleStatus: {
    paddingVertical: 2 * scale,
    paddingHorizontal: 8 * scale,
    borderRadius: 7.4 * scale,
  },
  roleOpen: {
    backgroundColor: Colors.green,
  },
  roleClosed: {
    backgroundColor: Colors.grayMedium,
  },
  roleStatusText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 11 * scale,
    color: Colors.white,
  },

  // ---------- 가격 카드 ----------
  priceCard: {
    borderColor: Colors.green,
    borderWidth: 1,
  },
  priceValue: {
    textAlign: "center",
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.size.body * scale,
    color: Colors.green,
    marginBottom: 10 * scale,
  },
  bigBuyBtn: {
    width: "100%",
    height: 34 * scale,
    borderRadius: 7.4 * scale,
    backgroundColor: Colors.green,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8 * scale,
  },
  bigBuyBtnText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 13 * scale,
    color: Colors.white,
  },
  priceSubText: {
    textAlign: "center",
    fontFamily: Typography.fontFamily.regular,
    fontSize: 12 * scale,
    color: Colors.grayDark,
  },
  detailBulletItem: {
    paddingHorizontal: 22 * scale,
    fontFamily: Typography.fontFamily.regular,
    fontSize: 13 * scale,
    lineHeight: 20 * scale,
    color: Colors.grayDark,
    marginTop: 2 * scale,
  },


  // ---------- 프로젝트 리더 ----------
  leaderRow: {
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: 22 * scale,
  paddingVertical: 10 * scale,
  gap: 12 * scale,
  },

  /* --- 프로필 이미지가 있을 때 --- */
  leaderAvatarImage: {
    width: 42 * scale,
    height: 42 * scale,
    borderRadius: 42 * scale,
    backgroundColor: Colors.grayLight,
  },

  /* --- 프로필 이미지가 없을 때 (이니셜 원형) --- */
  profileCircle: {
    width: 42 * scale,
    height: 42 * scale,
    borderRadius: 42 * scale,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  profileInitial: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: 16 * scale,
    color: Colors.white,
  },

  leaderName: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.size.body2 * scale,
    color: Colors.black,
    marginBottom: 2 * scale,
  },

  leaderRole: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 13 * scale,
    color: Colors.grayDark,
  },

  profileBtn: {
    marginHorizontal: 22 * scale,
    marginTop: 12 * scale,
    height: 33 * scale,
    borderRadius: 7.4 * scale,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    backgroundColor: Colors.beige,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6 * scale,
  },

  profileBtnText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 13 * scale,
    color: Colors.black,
  },

  // ---------- GitHub ----------
  sectionLabel: {
    paddingHorizontal: 22 * scale,
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.size.body2,
    color: Colors.black,
  },

  githubBox: {
    backgroundColor: Colors.grayLight,    
    borderRadius: 10 * scale,
    marginHorizontal: 22 * scale,
    marginTop: 8 * scale,
    padding: 16 * scale,          
  },

  githubTopRow: {
    flexDirection: "row",
    alignItems: "center",                 
    width: "100%",
  },

  githubRepo: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.size.title,                
    color: Colors.black,
    marginLeft: 8 * scale,
  },

  githubMeta: {
    marginTop: 4 * scale,
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.size.subtitle,                
    color: Colors.grayDark,               
  },

  githubBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 33 * scale,
    borderRadius: 7.4 * scale,
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: Colors.beige,
    marginHorizontal: 22 * scale,
    marginTop: 10 * scale,
    gap: 6 * scale,
  },

  githubBtnText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.size.body2,
    color: Colors.primary,
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
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.size.body2 * scale,
    color: Colors.grayDark,
  },
  boldText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.size.body2 * scale,
    color: Colors.black,
  },
  progressBar: {
    marginHorizontal: 22 * scale,
    marginTop: 8 * scale,
    height: 7 * scale,
    backgroundColor: Colors.grayLight,
    borderRadius: 999,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: Colors.green,
    borderRadius: 999,
  },
  applyBtn: {
    marginHorizontal: 22 * scale,
    marginTop: 16 * scale,
    height: 33 * scale,
    borderRadius: 7.4 * scale,
    backgroundColor: Colors.green,
    alignItems: "center",
    justifyContent: "center",
  },
  applyBtnText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 13 * scale,
    color: Colors.white,
  },

  // 가격 카드
    priceLabel: {
    textAlign: "center",
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.size.body2 * scale,
    color: Colors.black,
    marginBottom: 6 * scale,
  },

  priceBuyBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 33 * scale,
    borderRadius: 7.4 * scale,
    backgroundColor: Colors.green,
    marginBottom: 10 * scale,
  },

  priceBuyIcon: {
    fontSize: 14 * scale,
    marginRight: 6 * scale,
    color: Colors.white,
  },

  priceBuyText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 13 * scale,
    color: Colors.white,
  },

  // 소개/기술스택/역할
    cardTitle: {
    paddingHorizontal: 22 * scale,
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.size.body * scale,
    color: Colors.black,
    marginBottom: 6 * scale,
  },

  cardBody: {
    paddingHorizontal: 22 * scale,
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.size.body2 * scale,
    lineHeight: Typography.lineHeight.body2 * scale,
    color: Colors.grayDark,
  },

  cardDivider: {
    height: 1,
    backgroundColor: "rgba(0,0,0,0.1)",
    marginVertical: 16 * scale,
    marginHorizontal: 22 * scale,
  },

  roleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 22 * scale,
    paddingVertical: 10 * scale,
    backgroundColor: Colors.grayLight,
    borderRadius: 7.4 * scale,
    marginBottom: 8 * scale,
  },

});