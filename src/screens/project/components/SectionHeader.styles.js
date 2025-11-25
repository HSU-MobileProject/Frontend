import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../../assets/colors";
import Typography from "../../../assets/typography";

const scale = Dimensions.get("window").width / 409;

export default StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16 * scale,
  },

  title: {
    fontSize: 17 * scale,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.black,
    marginLeft: 8 * scale,
  },

  button: {
    paddingVertical: 8 * scale,
    paddingHorizontal: 16 * scale,
    borderRadius: 8 * scale,
  },

  buttonText: {
    fontSize: 14 * scale,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.black,
  },
});