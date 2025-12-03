import { StyleSheet, Dimensions } from "react-native";
import { theme } from "../../styles/theme";

const { width, height } = Dimensions.get("window");
const scale = width / 375; // Adjusting scale based on design width approx 375-400

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: 340 * scale, // Adjusted from 385px to fit screen with margins
    backgroundColor: "#FAF8F3",
    borderRadius: 9 * scale,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
    padding: 20 * scale,
    // Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 13,
    elevation: 5,
    maxHeight: height * 0.9,
  },
  
  /* Header */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20 * scale,
    position: "relative",
    height: 36 * scale,
  },
  headerTitle: {
    fontSize: 16 * scale,
    fontWeight: "bold",
    color: "#1A1A1A",
    textAlign: "center",
  },
  closeButton: {
    position: "absolute",
    right: 0,
    padding: 4 * scale,
  },

  /* Scroll Content */
  scrollContent: {
    flexGrow: 0,
  },

  /* Project Info Card */
  projectCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12 * scale,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
    padding: 21 * scale,
    marginBottom: 20 * scale,
    gap: 10 * scale,
  },
  projectRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4 * scale,
  },
  label: {
    fontSize: 14 * scale,
    color: "#6B7280",
    width: 82 * scale,
  },
  value: {
    fontSize: 16 * scale,
    color: "#1A1A1A",
    flex: 1,
  },
  valueRight: {
    fontSize: 14 * scale,
    color: "#00B26B",
    textAlign: "right",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    marginVertical: 10 * scale,
  },

  /* Payment Method Section */
  sectionTitle: {
    fontSize: 12 * scale,
    color: "#1A1A1A",
    marginBottom: 14 * scale,
  },
  paymentMethods: {
    gap: 10 * scale,
    marginBottom: 20 * scale,
  },
  methodBtn: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14 * scale,
    borderRadius: 9 * scale,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
    gap: 12 * scale,
  },
  methodBtnActive: {
    backgroundColor: "rgba(0, 178, 107, 0.05)",
    borderColor: "#00B26B",
  },
  radioCircle: {
    width: 14 * scale,
    height: 14 * scale,
    borderRadius: 7 * scale,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  radioCircleActive: {
    borderColor: "#00B26B",
  },
  radioInner: {
    width: 8 * scale,
    height: 8 * scale,
    borderRadius: 4 * scale,
    backgroundColor: "#00B26B",
  },
  methodLabel: {
    fontSize: 12 * scale,
    color: "#1A1A1A",
    flex: 1,
  },

  /* Card Input Form */
  cardForm: {
    gap: 14 * scale,
    marginBottom: 20 * scale,
  },
  inputGroup: {
    gap: 7 * scale,
  },
  inputLabel: {
    fontSize: 12 * scale,
    color: "#1A1A1A",
  },
  textInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 7 * scale,
    paddingHorizontal: 10 * scale,
    paddingVertical: 8 * scale, // Adjusted for height
    fontSize: 14 * scale,
    color: "#1A1A1A",
    height: 32 * scale,
  },
  rowInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 14 * scale,
  },
  halfInput: {
    flex: 1,
  },

  /* Price Summary */
  priceSummary: {
    gap: 10 * scale,
    marginBottom: 20 * scale,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 14 * scale,
    color: "#6B7280",
  },
  summaryValue: {
    fontSize: 14 * scale,
    color: "#1A1A1A",
    textAlign: "right",
  },
  totalLabel: {
    fontSize: 14 * scale,
    color: "#1A1A1A",
    fontWeight: "bold",
  },
  totalValue: {
    fontSize: 14 * scale,
    color: "#00B26B",
    fontWeight: "bold",
    textAlign: "right",
  },

  /* Terms */
  termsContainer: {
    marginBottom: 20 * scale,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  termsText: {
    fontSize: 12 * scale,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 18 * scale,
  },
  linkText: {
    color: "#00B26B",
    textDecorationLine: "underline",
  },
  checkbox: {
    width: 14 * scale,
    height: 14 * scale,
    borderWidth: 1,
    borderColor: "#1A1A1A",
    borderRadius: 4 * scale,
    marginRight: 6 * scale,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  checkboxChecked: {
    backgroundColor: "#00B26B",
    borderColor: "#00B26B",
  },

  /* Buttons */
  buttonRow: {
    flexDirection: "row",
    gap: 16 * scale,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 10 * scale,
    borderRadius: 8 * scale,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
    backgroundColor: "#FAF8F3",
    alignItems: "center",
    justifyContent: "center",
  },
  cancelText: {
    fontSize: 12 * scale,
    color: "#1A1A1A",
  },
  payBtn: {
    flex: 1,
    paddingVertical: 10 * scale,
    borderRadius: 8 * scale,
    backgroundColor: "#00B26B",
    alignItems: "center",
    justifyContent: "center",
  },
  payBtnDisabled: {
    opacity: 0.5,
  },
  payText: {
    fontSize: 12 * scale,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  /* Transfer Info */
  transferCard: {
    backgroundColor: "rgba(52, 195, 241, 0.063)",
    borderRadius: 12 * scale,
    borderWidth: 0.63 * scale,
    borderColor: "#34C3F1",
    paddingVertical: 10 * scale,
    paddingHorizontal: 20 * scale,
    gap: 4 * scale,
    marginBottom: 20 * scale,
  },
  transferRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10 * scale,
    marginBottom: 4 * scale,
  },
  transferLabel: {
    fontSize: 14 * scale,
    color: "#6B7280",
    width: 80 * scale,
  },
  transferValue: {
    fontSize: 14 * scale,
    color: "#6B7280",
  },
  transferAmount: {
    fontSize: 14 * scale,
    color: "#34C3F1",
    fontWeight: "bold",
  },

  /* Easy Payment */
  easyPaymentGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10 * scale,
    marginBottom: 20 * scale,
  },
  easyPaymentBtn: {
    width: "48%", // Approx for 2 columns with gap
    height: 44 * scale,
    backgroundColor: "#FAF8F3",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 8 * scale,
    justifyContent: "center",
    alignItems: "center",
  },
  easyPaymentBtnSelected: {
    backgroundColor: "rgba(0, 178, 107, 0.05)",
    borderColor: "#00B26B",
    borderWidth: 1.5,
  },
  easyPaymentLabel: {
    fontSize: 12 * scale,
    color: "#1A1A1A",
  },
  easyPaymentLabelSelected: {
    color: "#00B26B",
    fontWeight: "bold",
  },
});

export default styles;
