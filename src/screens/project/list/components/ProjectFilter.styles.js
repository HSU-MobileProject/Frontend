import { StyleSheet } from "react-native";
import { theme } from "../../../../styles/theme";

const { scale, colors, typography } = theme;

export default StyleSheet.create({
  container: {
    width: "100%",
    gap: 10 * scale,
    backgroundColor: colors.beige,
  },

  /* ---------- Header ---------- */
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 8 * scale,
    marginBottom: 4 * scale,
  },
  filterIconBox: {
    width: 18 * scale,
    height: 18 * scale,
    justifyContent: "center",
    alignItems: "center",
  },
  filterTitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 15 * scale,
    color: "#1A1A1A",
  },

  /* ---------- Categories ---------- */
  categoryScroll: {
    flexGrow: 0,
  },
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6 * scale,
    paddingRight: 16 * scale, // Scroll padding
  },
  categoryBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 4 * scale,
    paddingHorizontal: 12 * scale,
    borderRadius: 6 * scale,
    backgroundColor: colors.beige,
    borderWidth: 1,
    borderColor: colors.grayMedium,
  },
  
  /* Active State (Unified) */
  categoryBtnActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  categoryText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 11 * scale,
    color: colors.grayDark,
  },
  categoryTextActive: {
    color: colors.white,
    fontWeight: "600",
  },

  /* ---------- Tags ---------- */
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8 * scale,
    marginTop: 4 * scale,
    paddingBottom: 16 * scale,
  },
  tagBadge: {
    paddingVertical: 2 * scale,
    paddingHorizontal: 8 * scale,
    borderRadius: 8 * scale,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
    backgroundColor: "transparent",
  },
  tagBadgeActive: {
    backgroundColor: colors.grayLight,
    borderColor: colors.grayDark,
  },
  tagText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 11 * scale,
    color: "#1A1A1A",
  },
});
