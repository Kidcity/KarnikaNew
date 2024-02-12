import { Dimensions, StyleSheet, } from "react-native"
import colors from "../../utils/colors"
import { fonts, setHeight, setWidth } from "../../utils/variable"

const { width, height } = Dimensions.get('window')

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    backgroundColor: "rgba(0,0,0,0.6)",  
    zIndex: 9999, 
    // justifyContent:"flex-end" 
  },
  mr_t_2: {
    marginTop: setHeight(2)
  },
  row: {
    flexDirection: 'row'
  },
  pad_v_2:{
    paddingVertical: setHeight(2)
  },  
  closeBtn:{        
    alignItems:'flex-end',
    justifyContent:'center',
    paddingTop: setHeight(5),
    paddingRight: setWidth(4),
  },
  termConditionContainer: {
    backgroundColor: colors.white,  
    height: setHeight(80),  
    paddingTop: setHeight(3),
    marginTop: 'auto'    
  },
  card:{
    // flex:1,
    backgroundColor: colors.grey6,
    marginBottom: setHeight(3),
    marginHorizontal: setWidth(4),
    borderRadius: setWidth(3),
    overflow: 'hidden'
  },
  cardHeader:{
    backgroundColor: colors.grey5,
    paddingHorizontal: setWidth(3),
    paddingVertical: setHeight(2)
  },
  cardHeaderText:{
    fontFamily: fonts.fontBold,
    fontSize: setWidth(4),
    color: colors.grey2
  },
  cardBody:{
    paddingHorizontal: setWidth(3),
    paddingVertical: setHeight(1.5),
    borderBottomColor: colors.grey5,
    borderBottomWidth: setWidth(0.3),
  },
  cardText:{
    fontFamily: fonts.fontRegular,
    fontSize: setWidth(3.5),
    color: colors.black
  },
  cardTextBold: {
    fontFamily: fonts.fontBold,
    color: colors.dark_charcoal
  },
  cardFooter:{
    // backgroundColor: 'red',
    paddingHorizontal: setWidth(3),     
    marginTop: 'auto'
  },
  termConditionDetails:{
    flex:1,
    // height: 230,
    // paddingVertical: setHeight(2),
    paddingHorizontal: setWidth(3),    
    overflow: 'hidden'
  },
  sideborder_of_3:{
    borderBottomColor: colors.grey5,
    borderBottomWidth: setWidth(0.3),
    borderLeftColor: colors.grey5,
    borderLeftWidth: setWidth(0.3),
    borderRightColor: colors.grey5,
    borderRightWidth: setWidth(0.3),
  },

  ///////////////////////////////
   
  footerBtnView: {
    marginTop: 'auto',
    paddingVertical: setHeight(3),
    // backgroundColor: 'pink',
    paddingHorizontal: setWidth(3),
    borderTopColor: colors.grey5,
    borderTopWidth: setWidth(0.3),
    borderBottomColor: colors.grey5,
    borderBottomWidth: setWidth(0.3),
    marginBottom: Platform.OS === 'ios' ? setHeight(5) : null
  },
})