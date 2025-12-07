import { StyleSheet, Dimensions } from "react-native";
import { theme } from "../../styles/theme";

const { width } = Dimensions.get("window");
const scale = width / 375;
const { colors } = theme;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.beige,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18 * scale,
    paddingVertical: 12 * scale,
    backgroundColor: colors.beige,
  },
  headerTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerTitle: {
    fontSize: 18 * scale,
    fontWeight: "bold",
    color: colors.black,
  },
  headerCount: {
    fontSize: 12 * scale,
    color: colors.grayDark,
    fontWeight: "500",
  },
  readAllButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.beige,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
    gap: 4,
  },
  readAllText: {
    fontSize: 10 * scale,
    color: colors.black,
  },
  contentContainer: {
    paddingHorizontal: 18 * scale,
    paddingBottom: 20 * scale,
  },
  listContent: {
    paddingTop: 10,
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18 * scale,
    paddingVertical: 12 * scale,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.05)",
    backgroundColor: colors.white,
  },
  totalCount: {
    fontSize: 12 * scale,
    color: colors.grayDark,
  },
  deleteAllButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  deleteAllText: {
    fontSize: 11 * scale,
    color: colors.black,
  },
});
