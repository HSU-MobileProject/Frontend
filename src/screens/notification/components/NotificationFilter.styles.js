import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const scale = width / 375;

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#EAEAEA",
    borderRadius: 8,
    padding: 2,
    height: 34 * scale,
    marginBottom: 20 * scale,
  },
  tabButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 6,
    borderRadius: 6,
    gap: 4,
  },
  activeTabButton: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  tabText: {
    fontSize: 12 * scale,
    color: "#6B7280",
    fontWeight: "400",
  },
  activeTabText: {
    color: "#1A1A1A",
    fontWeight: "600",
  },
  badge: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
    minWidth: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 10 * scale,
    fontWeight: "bold",
  },
});
