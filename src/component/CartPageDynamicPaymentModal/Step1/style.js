import { StyleSheet } from "react-native";
import colors from "../../../utils/colors";
import { fonts, setHeight, setWidth } from "../../../utils/variable";


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red'
    paddingTop: setHeight(6)
  },
  row: {
    flexDirection: 'row'
  },
  alignCenter: {
    alignItems: 'center'
  },
  margin_L_2: {
    marginLeft: setWidth(2)
  },
  flex_1: {
    flex: 1
  },
  textBold: {
    fontFamily: fonts.fontBold
  },
  heading: {
    marginHorizontal: setWidth(4),
    borderBottomColor: colors.grey2,
    borderBottomWidth: setWidth(0.3),
    paddingBottom: setHeight(1)
  },
  headingText: {
    fontFamily: fonts.fontBold,
    color: colors.grey2,
    fontSize: setWidth(4),
  },
  listContainer: {
    marginTop: setHeight(3)
  },
  listContentContainer: {
    flexGrow: 1,
    paddingBottom: setHeight(4),
  },
  cartItemsContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: setWidth(4),
    paddingVertical: setHeight(2),
  },
  cartText: {
    color: colors.grey3,
    fontSize: setWidth(3.5),
    // textAlign:'center'
  },
  checkBox: {
    alignSelf: 'flex-end',
    width: setWidth(6),
    height: setWidth(6),
    borderColor: colors.red,
    borderWidth: setWidth(0.3),
    borderRadius: setWidth(1.5)
  },
  minimun_order_warning_text: {
    fontSize: setWidth(3),
    fontFamily: fonts.fontRegular,
    color: colors.black,
    marginLeft: setWidth(2),
  },
  warningView: {
    // marginTop: setHeight(1),
    paddingTop: 10,
    borderTopColor: colors.grey1,
    borderTopWidth: setWidth(0.2),
    // backgroundColor: colors.red,    
    justifyContent: 'center',
    alignItems:'center'
  },
})