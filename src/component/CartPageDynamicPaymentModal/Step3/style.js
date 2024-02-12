import { StyleSheet } from "react-native";
import colors from "../../../utils/colors";
import { fonts, setHeight, setWidth } from "../../../utils/variable";

export const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingTop: setHeight(6)
  },
  content:{
    marginTop: setHeight(3)
  },
  heading:{
    marginHorizontal: setWidth(4),
    borderBottomColor: colors.grey2,
    borderBottomWidth: setWidth(0.3),
    paddingBottom: setHeight(1)
  },
  headingText:{
    fontFamily: fonts.fontBold,
    color: colors.grey2,
    fontSize: setWidth(4),
  },
})