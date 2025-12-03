import { StyleSheet } from "react-native";
import { theme, CommonStyles } from "../../../styles/theme";

const { scale, colors, typography } = theme;

export default StyleSheet.create({
  screenWrapper: CommonStyles.screenWrapper,

  createHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16 * scale,
    backgroundColor: colors.beige,
  },

  headerTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: 18 * scale,
    color: colors.black,
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
    ...CommonStyles.scrollContainer,
    gap: 16 * scale,
    paddingBottom: 40 * scale,
  },

  card: CommonStyles.card,

  cardTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: 16 * scale,
    color: colors.black,
    marginBottom: 12 * scale,
  },

  subDescription: {
    fontSize: 12 * scale,
    color: colors.grayDark,
    marginBottom: 12 * scale,
  },

  fieldGroup: {
    marginTop: 16 * scale,
  },

  fieldLabel: {
    fontSize: 14 * scale,
    color: "#374151",
    marginBottom: 6 * scale,
    fontFamily: typography.fontFamily.medium,
  },

  textInput: CommonStyles.textInput,

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
    borderColor: colors.primary,
    backgroundColor: colors.primary,
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
    borderColor: colors.yellow,
    backgroundColor: colors.yellow,
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
    borderColor: colors.primary,
    minWidth: 70 * scale,
    alignItems: "center",
  },

  roleStatusBtnCompleted: {
    backgroundColor: "#F3F4F6",
    borderColor: "#D1D5DB",
  },

  roleStatusText: {
    fontSize: 12 * scale,
    color: colors.primary,
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
    backgroundColor: colors.olive,
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
    borderColor: colors.olive,
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
    backgroundColor: colors.green,
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
    backgroundColor: colors.green,
    borderColor: colors.green,
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
    borderColor: colors.green,
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
    borderColor: colors.green,
    backgroundColor: colors.green,
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

  submitBtn: CommonStyles.primaryButton,

  submitBtnText: CommonStyles.primaryButtonText,
});
