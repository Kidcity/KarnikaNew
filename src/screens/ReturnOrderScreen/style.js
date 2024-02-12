import { Platform, StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { fonts, setHeight, setWidth } from "../../utils/variable";

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.white
    },
    content:{
        flexGrow: 1,
        backgroundColor: colors.grey5,
        paddingBottom: setWidth(8)
    },
    headingView:{
        marginTop: setWidth(3),
        marginHorizontal: setWidth(2)
    },
    heading:{
        fontSize: setWidth(3.5),
        // fontWeight:'bold',
        color: colors.dark_charcoal,
        fontFamily: fonts.fontRegular
    },
    row:{
        flexDirection:'row',        
    },
    subHeading:{
        color: colors.grey2,
        fontSize: setWidth(3.5),
        fontFamily: fonts.fontRegular
    },
    textBold:{        
        fontWeight:'bold',
        fontFamily: fonts.fontBold
    },
    text:{
        fontSize: setWidth(3.5),
        fontFamily: fonts.fontRegular
    },
    textDark:{
        color: colors.dark_charcoal
    },
    textBtnText:{
        textDecorationLine:'underline',
        fontSize: setWidth(3)
    },
    textCenter:{
        textAlign:'center'
    },
     /* Product Card */
     productCardView:{
        backgroundColor: colors.white,
        flexDirection:'row',
        padding: setWidth(3),
        
        borderBottomColor: colors.grey1,
        borderBottomWidth: setWidth(0.3)
        // marginTop: setWidth(3)
    },
    leftBlock: {
        flex: 0.2
    },
    rightBlock:{
        flex: 0.8,
        justifyContent:'space-between',
        paddingLeft: setWidth(1)
    },
    productimage:{
        width: '100%',
        height: setWidth(20),
    },
    orderstatusView:{
        paddingVertical: setWidth(0.8)
    },
    orderstatusText:{
        color: colors.white,
        textAlign:'center',
        textTransform:'capitalize'
    },
    status_blue:{
        backgroundColor: colors.blue2
    },
    status_green: {
        backgroundColor: colors.green1
    },
    status_red: {
        backgroundColor: colors.red
    },
    bottomBorderView:{
        borderBottomColor: colors.yellow4,
        borderBottomWidth: setWidth(1.5),
        width: setWidth(19),
        marginTop: setWidth(1)
    },
    /* Order status block */
    orderStatusblock:{
        marginHorizontal: setWidth(4),
        height: setWidth(10),         
    },
    orderStatusBlockHeading:{
        fontSize: setWidth(3.5),
        fontFamily: fonts.fontRegular,
        color: colors.black,
        paddingLeft: setWidth(3),
        position: 'absolute',
        top: -10
    },
    circleIconOutline:{
        position: 'absolute',
        top: -10,
        left: -12,        
    },
    orderStatusBlockSubTextView:{
        paddingLeft: setWidth(4),
        marginTop: setWidth(4),
        flexDirection:'row',
        alignItems:'center'
    },
    orderStatusBlockText:{       
        color: colors.grey3,
        fontFamily: fonts.fontRegular,
        fontSize: setWidth(3)
    },
    circleOutline:{
        width: setWidth(6),
        height: setWidth(6),
        borderColor: colors.orange,
        borderWidth: setWidth(0.5),
        borderRadius: setWidth(10),
        position: 'absolute',
        top: -10,
        left: -12,
        backgroundColor: colors.grey5      
    },
    
   
    /* footer btn */
    footerView:{
        padding: setWidth(4),
        paddingBottom: Platform.OS === 'ios' ? setWidth(5): null,
        backgroundColor: colors.white,        
    },
    footerBtn:{       
        backgroundColor: colors.lightRed,
        paddingVertical: setHeight(1.5),
        borderRadius: setWidth(2),
        borderColor: colors.lightRed,
        borderWidth: setWidth(0.5),
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    footerBtnText:{
        color: colors.white,
        textAlign: 'center',
        fontSize: setWidth(4),
        marginLeft: setWidth(3) ,
        fontFamily: fonts.fontRegular       
    },

    
})