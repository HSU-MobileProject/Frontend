import { StyleSheet, Dimensions } from "react-native";
import { theme } from "../../styles/theme";

const { width } = Dimensions.get("window");
const scale = width / 375; // Design base width seems to be around 375-400, adjusting scale. User used 371px width in CSS.

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.beige,
  },
  safeArea: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16 * scale,
    paddingTop: 20 * scale,
    paddingBottom: 80 * scale, // Bottom nav space
  },
  
  // Search Input Area
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.white,
    borderRadius: 6 * scale,
    paddingHorizontal: 12 * scale,
    height: 44 * scale,
    marginBottom: 20 * scale,
    // Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  searchIcon: {
    marginRight: 12 * scale,
  },
  searchInput: {
    flex: 1,
    fontSize: 14 * scale,
    color: theme.colors.black,
    height: "100%",
  },

  // Filter Section
  filterSection: {
    marginBottom: 20 * scale,
  },
  
  // Results Header
  resultHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12 * scale,
  },
  resultTitle: {
    fontSize: 16 * scale,
    fontWeight: "bold",
    color: theme.colors.black,
    marginRight: 6 * scale,
  },
  resultCount: {
    fontSize: 16 * scale,
    color: theme.colors.grayDark,
  },

  // List
  listContainer: {
    gap: 16 * scale,
  },
  
  // Empty State
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60 * scale,
  },
  emptyText: {
    fontSize: 14 * scale,
    color: theme.colors.grayDark,
    marginTop: 10 * scale,
  },
});

export default styles;
