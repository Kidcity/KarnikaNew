import { Dimensions, Platform, StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { fonts, setHeight, setWidth } from "../../utils/variable";
const { width, height } = Dimensions.get("screen")

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: width,
    height: height,
    zIndex: 999,
    justifyContent: 'center',
    paddingHorizontal: setWidth(2)
  },
  content: {
    height: setHeight(60),
    backgroundColor: colors.white,   
    // padding: setWidth(5),
    paddingHorizontal: setWidth(5),
    paddingBottom: setHeight(3),
    borderRadius: setWidth(3)
  },
  crossView:{
    position: 'absolute',
    right: 0,
    padding: setHeight(1.5),
    alignItems:'flex-end',
    // backgroundColor:'pink'
  },
  lottiView: {
    // position: 'relative',
    height: setWidth(45),
    alignSelf: 'center',
    // backgroundColor:'red'
  },
  heading:{
    fontFamily: fonts.fontBold,
    fontSize: setWidth(8),
    textAlign: 'center',
    color: colors.primaryyellow,
    marginTop: setHeight(2)
  },
  subHeading:{
    fontFamily: fonts.fontBold,
    fontSize: setWidth(4),
    textAlign: 'center',
    color: colors.dark_charcoal,
    marginTop: setHeight(2)
  },
  text:{
    fontFamily: fonts.fontRegular,
    fontSize: setWidth(3),
    textAlign: 'center',
    color: colors.dark_charcoal,
    marginTop: setHeight(2),
    letterSpacing: 0.7
  }
})