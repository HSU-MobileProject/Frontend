import { StyleSheet } from "react-native";
import { theme } from "../../../styles/theme";

const { scale, colors } = theme;

export default StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 0.5,
    borderLeftWidth: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  profileWrapper: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  profileText: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "bold",
  },
  contentContainer: {
    flex: 1,
    marginRight: 8,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  title: {
    fontSize: 12 * scale,
    fontWeight: "bold",
    color: colors.black,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  time: {
    fontSize: 10 * scale,
    color: colors.grayDark,
  },
  message: {
    fontSize: 11 * scale,
    color: colors.grayDark,
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 0.5,
    marginBottom: 4,
  },
  badgeText: {
    fontSize: 9 * scale,
    fontWeight: "500",
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 4,
  },
  actionButton: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: '#F9FAFB',
  },
  confirmButton: {
    // backgroundColor: '#E8F5E9',
  },
  deleteButton: {
    // backgroundColor: '#FFEBEE',
  },
});
