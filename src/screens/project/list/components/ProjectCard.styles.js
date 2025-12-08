import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../../../assets/colors";
import Typography from "../../../../assets/typography";

const { width } = Dimensions.get("window");
const scale = width / 409;

export default StyleSheet.create({
  /* --- 그림자 래퍼 --- */
  shadowWrapper: {
    width: "100%",
    borderRadius: 16 * scale,
    marginBottom: 24 * scale,

    // iOS Shadow
    shadowColor: "#000",
    shadowOpacity: 0.20,
    shadowRadius: 16 * scale,
    shadowOffset: { width: 3, height: 4 }, 

    // Android Shadow
    elevation: 1,  

    backgroundColor: "transparent",
  },

  /* --- 카드 박스 --- */
  cardOuter: {
    width: "100%",
    borderRadius: 16 * scale,
    backgroundColor: Colors.white,
    overflow: "hidden",
    borderWidth: 2 * scale,
    borderColor: Colors.grayLight,
  },

  /* --- 상단 이미지 --- */
  topImage: {
    width: "100%",
    height: 128 * scale,
  },

  /* --- 카드 내용 --- */
  bottomCard: {
    width: "100%",
    paddingHorizontal: 24 * scale,
    paddingVertical: 20 * scale,
    backgroundColor: Colors.white,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12 * scale,
  },

  badge: {
    backgroundColor: Colors.green,
    paddingHorizontal: 12 * scale,
    paddingVertical: 6 * scale,
    borderRadius: 10 * scale,
  },

  badgeText: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: 13 * scale,
    color: Colors.white,
  },

  statItem: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 12 * scale,
  },  

  statTextOutline: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 14 * scale,
    color: Colors.black, 
    marginLeft: 4 * scale,
  },

  statsRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  statText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 14 * scale,
    color: Colors.grayDark,
    marginLeft: 12 * scale,
  },

  title: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: 18 * scale,
    color: Colors.black,
    marginTop: 4 * scale,
    marginBottom: 4 * scale,
  },

  description: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 15 * scale,
    color: Colors.grayDark,
    marginBottom: 12 * scale,
  },

  tagScroll: {
    marginBottom: 12 * scale,
  },

  tagContainer: {
    flexDirection: "row",
    flexWrap: "nowrap",
  },

  tag: {
    backgroundColor: Colors.grayLight,
    paddingVertical: 6 * scale,
    paddingHorizontal: 12 * scale,
    borderRadius: 10 * scale,
    marginRight: 8 * scale,
  },

  tagText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 12 * scale,
    color: Colors.black,
  },

  divider: {
    width: "100%",
    height: 1,
    backgroundColor: Colors.grayMedium,
    marginVertical: 12 * scale,
  },

  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  priceLabel: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 14 * scale,
    color: Colors.grayDark,
    marginRight: 4 * scale,
  },

  priceValue: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: 15 * scale,
    color: Colors.green,
    marginRight: "auto",
  },

  buyButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.green,
    paddingHorizontal: 16 * scale,
    paddingVertical: 6 * scale,
    borderRadius: 10 * scale,
  },

  buyButtonText: {
    fontFamily: Typography.fontFamily.medium,
    color: Colors.white,
    fontSize: 13 * scale,
  },
});