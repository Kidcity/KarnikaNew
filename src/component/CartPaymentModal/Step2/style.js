import { StyleSheet } from "react-native";
import { fonts, normalize, setHeight, setWidth } from "../../../utils/variables";
import { colors } from "../../../utils/colors";

export const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  content:{
    flexGrow: 1,
    paddingBottom: normalize(10),
  },
  heading:{    
    // marginHorizontal: normalize(15),
    borderBottomColor: colors.grey2,
    borderBottomWidth: normalize(2),
    paddingBottom: normalize(10),  
  },
  headingText:{
    fontFamily: fonts.fontBold,
    color: colors.grey2,
    fontSize: setWidth(4),
    textTransform: 'uppercase'
  },
})