import { Dimensions, StyleSheet } from "react-native";
import Colors from "../assets/colors";
import Typography from "../assets/typography";

const { width } = Dimensions.get("window");
const BASE_WIDTH = 413;
const scale = width / BASE_WIDTH;

export const theme = {
  colors: Colors,
  typography: Typography,
  scale,
};

export const CommonStyles = {
  // Containers
  screenWrapper: {
    flex: 1,
    backgroundColor: Colors.beige,
  },
  scrollContainer: {
    paddingHorizontal: 16 * scale,
    paddingBottom: 32 * scale,
    paddingTop: 12 * scale,
  },
  
  // Cards
  card: {
    backgroundColor: Colors.white,
    borderRadius: 13 * scale,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    padding: 22 * scale,
    marginBottom: 16 * scale,
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },

  // Buttons
  primaryButton: {
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
  primaryButtonText: {
    fontSize: 16 * scale,
    color: "#FFF",
    fontWeight: "bold",
  },

  // Inputs
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

  // Divider
  divider: {
    height: 1,
    backgroundColor: "rgba(0,0,0,0.1)",
    marginVertical: 18 * scale,
    marginHorizontal: 22 * scale,
  },
};

export default theme;
