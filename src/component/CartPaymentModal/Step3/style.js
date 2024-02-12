import { StyleSheet } from "react-native";

import { fonts, normalize, setHeight, setWidth } from "../../../utils/variables";
import { colors } from "../../../utils/colors";


export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    marginTop: setHeight(3)
  },
  heading: {
    borderBottomColor: colors.grey2,
    borderBottomWidth: setWidth(0.3),
    paddingBottom: setHeight(1)
  },
  headingText: {
    fontFamily: fonts.bold,
    color: colors.grey2,
    fontSize: setWidth(4),
  },
  expandBox: {
    paddingHorizontal: normalize(15),
    paddingVertical: normalize(10),
    borderColor: colors.grey1,
    borderWidth: setWidth(0.2),
    // backgroundColor: colors.lightgrey
  },

})