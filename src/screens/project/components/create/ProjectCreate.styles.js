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

  createHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16 * scale,
    backgroundColor: Colors.beige,
  },

  headerTitle: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: 18 * scale,
    color: Colors.black,
    flex: 1,
    textAlign: "center",
  },

  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: 40 * scale,
    height: 40 * scale,
  },

  deleteBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    width: 40 * scale,
    height: 40 * scale,
  },

  deleteText: {
    color: "#EF4444",
    fontWeight: "600",
    fontSize: 14 * scale,
  },

  rightSpacer: {
    width: 40 * scale,
  },

  scrollContainer: {
    padding: 16 * scale,
    gap: 16 * scale,
    paddingBottom: 40 * scale,
  },

  card: {
    backgroundColor: Colors.white,
    borderRadius: 12 * scale,
    padding: 20 * scale,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },

  cardTitle: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: 16 * scale,
    color: Colors.black,
    marginBottom: 12 * scale,
  },

  subDescription: {
    fontSize: 12 * scale,
    color: Colors.grayDark,
    marginBottom: 12 * scale,
  },

  fieldGroup: {
    marginTop: 16 * scale,
  },

  fieldLabel: {
    fontSize: 14 * scale,
    color: "#374151",
    marginBottom: 6 * scale,
    fontFamily: Typography.fontFamily.medium,
  },

  textInput: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8 * scale,
    paddingHorizontal: 12 * scale,
    paddingVertical: 10 * scale,
    fontSize: 14 * scale,
    color: Colors.black,
  },

  multilineInput: {
    minHeight: 100 * scale,
    textAlignVertical: "top",
  },

  thumbUploadBox: {
    width: "100%",
    height: 160 * scale,
    backgroundColor: "#F3F4F6",
    borderRadius: 12 * scale,
    borderWidth: 1.5,
    borderColor: "#D1D5DB",
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginBottom: 10 * scale,
  },

  thumbPlaceholder: {
    alignItems: "center",
    justifyContent: "center",
  },

  thumbUploadText: {
    marginTop: 8 * scale,
    color: "#6B7280",
    fontSize: 14 * scale,
  },

  thumbnailImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  thumbOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingVertical: 4 * scale,
    alignItems: "center",
  },

  thumbOverlayText: {
    color: "#FFF",
    fontSize: 12 * scale,
  },

  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8 * scale,
  },

  chip: {
    paddingHorizontal: 12 * scale,
    paddingVertical: 6 * scale,
    borderRadius: 20 * scale,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFF",
  },

  chipActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
  },

  chipText: {
    fontSize: 13 * scale,
    color: "#4B5563",
  },

  chipTextActive: {
    color: "#FFF",
    fontWeight: "bold",
  },

  chipSmall: {
    paddingHorizontal: 10 * scale,
    paddingVertical: 4 * scale,
    borderRadius: 20 * scale,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFF",
  },

  chipActiveSmall: {
    borderColor: Colors.yellow,
    backgroundColor: Colors.yellow,
  },

  chipTextSmall: {
    fontSize: 12 * scale,
    color: "#374151",
  },

  chipTextActiveSmall: {
    fontWeight: "bold",
    color: "#000",
  },

  roleList: {
    gap: 10 * scale,
    marginBottom: 10 * scale,
  },

  roleItemRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8 * scale,
  },

  roleInput: {
    flex: 1,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8 * scale,
    paddingHorizontal: 10 * scale,
    paddingVertical: 8 * scale,
    fontSize: 14 * scale,
  },

  roleStatusBtn: {
    paddingHorizontal: 10 * scale,
    paddingVertical: 8 * scale,
    borderRadius: 8 * scale,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: Colors.primary,
    minWidth: 70 * scale,
    alignItems: "center",
  },

  roleStatusBtnCompleted: {
    backgroundColor: "#F3F4F6",
    borderColor: "#D1D5DB",
  },

  roleStatusText: {
    fontSize: 12 * scale,
    color: Colors.primary,
    fontWeight: "600",
  },

  roleStatusTextCompleted: {
    color: "#9CA3AF",
  },

  roleDeleteBtn: {
    padding: 6 * scale,
  },

  addRoleBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10 * scale,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderStyle: "dashed",
    borderRadius: 8 * scale,
    backgroundColor: "#F9FAFB",
  },

  addRoleText: {
    marginLeft: 6 * scale,
    fontSize: 14 * scale,
    color: "#4B5563",
  },

  tagWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8 * scale,
  },

  tagChipItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.olive,
    paddingVertical: 4 * scale,
    paddingHorizontal: 10 * scale,
    borderRadius: 20 * scale,
  },

  tagChipTextActive: {
    fontSize: 12 * scale,
    color: "#FFF",
    marginRight: 4 * scale,
  },

  tagRemoveBtn: {
    padding: 2,
  },

  addTagBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10 * scale,
    paddingVertical: 4 * scale,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 20 * scale,
    borderStyle: "dashed",
  },

  addTagText: {
    fontSize: 12 * scale,
    color: "#6B7280",
    marginLeft: 4,
  },

  tagInput: {
    minWidth: 60 * scale,
    height: 28 * scale,
    borderWidth: 1,
    borderColor: Colors.olive,
    borderRadius: 20 * scale,
    paddingHorizontal: 10 * scale,
    fontSize: 12 * scale,
  },

  progressBar: {
    height: 8 * scale,
    backgroundColor: "#E5E7EB",
    borderRadius: 4 * scale,
    overflow: "hidden",
    marginVertical: 10 * scale,
  },

  progressFill: {
    height: "100%",
    backgroundColor: Colors.green,
  },

  progressButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  progressBtn: {
    paddingVertical: 4 * scale,
    paddingHorizontal: 10 * scale,
    borderRadius: 12 * scale,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  progressBtnActive: {
    backgroundColor: Colors.green,
    borderColor: Colors.green,
  },

  progressBtnText: {
    fontSize: 12 * scale,
    color: "#6B7280",
  },

  progressBtnTextActive: {
    color: "#FFF",
    fontWeight: "bold",
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10 * scale,
  },

  licenseItem: {
    flexDirection: "row",
    padding: 10 * scale,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8 * scale,
    marginBottom: 8 * scale,
  },

  licenseItemActive: {
    borderColor: Colors.green,
    backgroundColor: "#F0FDF4",
  },

  licenseDotWrap: {
    marginRight: 10 * scale,
    marginTop: 4 * scale,
  },

  licenseDot: {
    width: 12 * scale,
    height: 12 * scale,
    borderRadius: 6 * scale,
    borderWidth: 1,
    borderColor: "#9CA3AF",
  },

  licenseDotActive: {
    borderColor: Colors.green,
    backgroundColor: Colors.green,
  },

  licenseTitle: {
    fontSize: 14 * scale,
    color: "#1F2937",
    marginBottom: 2 * scale,
  },

  licenseTitleActive: {
    fontWeight: "bold",
  },

  licenseDesc: {
    fontSize: 12 * scale,
    color: "#6B7280",
  },

  bottomButtonsRow: {
    marginTop: 10 * scale,
  },

  submitBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 14 * scale,
    borderRadius: 10 * scale,
    alignItems: "center",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },

  submitBtnText: {
    fontSize: 16 * scale,
    color: "#FFF",
    fontWeight: "bold",
  },
});