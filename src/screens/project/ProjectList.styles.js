import { StyleSheet, Dimensions } from "react-native";
import colors from '../../assets/colors';

const { width } = Dimensions.get("window");
const scale = width / 409;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.beige,
    padding: 16 * scale,
    paddingBottom: 28 * scale,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  /* ------------------ 페이징 ------------------ */
  paginationWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20 * scale,
    marginBottom: 40 * scale,
    flexWrap: "wrap",
  },

  /* 숫자 버튼 */
  pageNumber: {
    fontSize: 16 * scale,
    marginHorizontal: 6 * scale,
    paddingVertical: 6 * scale,
    paddingHorizontal: 10 * scale,
    borderRadius: 6 * scale,
    color: colors.grayDark,      
    backgroundColor: "transparent", 
  },

  /* 현재 페이지 활성 */
  pageActive: {
    color: colors.green,         
    fontWeight: "bold",
  },

  /* 이전/다음 버튼 */
  pageButton: {
    fontSize: 15 * scale,
    paddingVertical: 6 * scale,
    paddingHorizontal: 12 * scale,
    marginHorizontal: 8 * scale,
    backgroundColor: "transparent", 
    color: colors.black,           
  },

  disabledButton: {
    opacity: 0.2,
  },
});