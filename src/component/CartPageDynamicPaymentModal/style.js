import { Platform, StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { fonts, setHeight, setWidth } from "../../utils/variable";



export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    position: 'absolute',
    zIndex: 9999,
    justifyContent: 'flex-end'
  },
  backDrop:{
    flex:1,    
  },
  content: {
    height: setHeight(80),
    backgroundColor: colors.grey6
  },
  row: {
    flexDirection: 'row'
  },
  textBold:{
    fontFamily: fonts.fontBold
  },
  footerBtnView: {
    marginTop: 'auto',
    padding: setWidth(3),
    justifyContent:'space-between',
    paddingBottom: Platform.OS === 'ios' ? setHeight(5) : null,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center'
  },
  footerBtn: {
    flex: 1,
    padding: setWidth(3),
    backgroundColor: colors.btnGreen,
    borderRadius: setWidth(2),
    marginLeft: setWidth(2)
  },
  footerBtnText: {
    color: colors.white,
    textAlign: 'center',
    fontSize: setWidth(3),
    fontFamily: fonts.fontBold,
  },
  footerText:{
    color: colors.grey3,
    textAlign: 'center',
    fontSize: setWidth(3.8),
    fontFamily: fonts.fontRegular,
  }
})