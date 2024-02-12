import { Platform, StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { fonts, setHeight, setWidth } from "../../utils/variable";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    content:{
        flexGrow: 1,
        backgroundColor: colors.grey5,
        paddingBottom: setWidth(12)
        //marginHorizontal: setWidth(2)
    },
    headingView:{
        marginTop: setWidth(5),
        marginHorizontal: setWidth(4)
    },
    heading:{
        fontSize: setWidth(4),
        fontFamily: fonts.fontRegular,
        color: colors.dark_charcoal
    },
    bottomBorderView:{
        borderBottomColor: colors.yellow4,
        borderBottomWidth: setWidth(1.5),
        width: setWidth(19),
        marginTop: setWidth(1)
    },
    row:{
        flexDirection:'row',        
    },
    subHeading:{
        color: colors.grey2,
        fontSize: setWidth(3.2),
        fontFamily: fonts.fontRegular
    },
    textBold:{        
        fontWeight:'bold',
    },
    text:{
        fontSize: setWidth(3.1),
        fontFamily: fonts.fontRegular
    },
    darkText:{
        color: colors.dark_charcoal
    },
    redText:{
        color: colors.red
    },
    textBtnText:{
        textDecorationLine:'underline',
        fontSize: setWidth(3),
        fontFamily: fonts.fontRegular,
        color: colors.red
    },

    /* Product Card */
    productCardView:{
        backgroundColor: colors.white,
        padding: setWidth(4),
        // marginTop: setWidth(3),
        borderBottomColor: colors.grey1,
        borderBottomWidth: setWidth(0.3)
    },
    leftBlock: {
        flex: 0.2
    },
    rightBlock:{
        flex: 0.8,
        justifyContent:'space-between',
        paddingLeft: setWidth(3)
    },
    productimage:{
        flex:1,
        aspectRatio: 0.9
        // width: '98%',
        // height: setWidth(18),
    },
    orderstatusView:{
        paddingVertical: setWidth(2)
    },
    orderstatusText:{
        color: colors.white,
        textAlign:'center',
        textTransform:'capitalize',
        fontFamily: fonts.fontRegular,
        fontSize: setWidth(3)
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
    creditNoteBtn:{
        backgroundColor : colors.blue2,
        paddingHorizontal: setWidth(3),
        paddingVertical: setHeight(1)
    },
    creditNoteBtnText:{
        color: colors.white,
        fontFamily: fonts.fontRegular,
        fontSize: setWidth(3)
    },

    /* Order status block */
    orderStatusblock:{        
        marginHorizontal: setWidth(6),
        borderLeftColor: colors.grey2,
        borderLeftWidth: setWidth(0.3),
        borderStyle: Platform.OS === 'android' ? "dashed" : null,
        // marginBottom: setWidth(10)
        height: setWidth(20),  
        // backgroundColor:'red'      
    },
    orderStatusBlockHeading:{
        fontSize: setWidth(4),
        fontFamily: fonts.fontRegular,
        color: colors.black,
        paddingLeft: setWidth(5),
        position: 'absolute',
        top: -10
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
    circleIconOutline:{
        position: 'absolute',
        top: -10,
        left: -9,
        backgroundColor: colors.grey5
    },
    orderStatusBlockSubTextView:{
        paddingLeft: setWidth(4),
        marginTop: setWidth(4),
        flexDirection:'row',
        alignItems:'center'
    },
    orderStatusBlockText:{       
        color: colors.grey3,
        fontSize: setWidth(3.1),
        fontFamily: fonts.fontRegular,
        marginLeft: setWidth(1.2)
    },

    /* Price Details View */
    totalPriceView:{
        marginHorizontal: setWidth(4),
        paddingHorizontal: setWidth(5),
        paddingVertical: setWidth(6),
        marginTop:setWidth(5),
        backgroundColor: colors.white,
        borderRadius: setWidth(3),
        borderColor: colors.grey1,
        borderWidth: setWidth(0.2)
    },
    totalPriceViewText:{
        fontSize: setWidth(3.5),
        marginBottom: setWidth(3),
        fontFamily: fonts.fontRegular,
        color: colors.grey3
    },

    /* Button container style */
    buttonContainer:{
        backgroundColor: colors.white, 
        justifyContent:'center', 
        borderColor: colors.lightRed, 
        borderWidth: setWidth(0.3), 
        marginTop: setWidth(6), 
        marginHorizontal: setWidth(4),
        height: setHeight(5),
        borderRadius: setWidth(2)
    },

    /* Shipping address view */
    shippingAddressView:{
        marginHorizontal: setWidth(2),
        paddingHorizontal: setWidth(2),
        paddingVertical: setWidth(5),
        marginTop:setWidth(1),
    },
    shippingAddressHeading:{
        fontSize: setWidth(3.5),
        fontFamily: fonts.fontRegular,
        color: colors.dark_charcoal
    },    
    delivery_partner_view:{
        marginHorizontal: setWidth(4),
        paddingHorizontal: setWidth(5),
        paddingBottom: setWidth(6),
        marginTop:setWidth(3),
        backgroundColor: colors.white,
        borderRadius: setWidth(3),
        borderColor: colors.grey1,
        borderWidth: setWidth(0.2)
    },
    callBtnView:{
        backgroundColor: colors.blue2,
        padding: setWidth(2),
        marginTop: setWidth(3),
        alignSelf: 'center',
    },
    callBtnText:{
        color: colors.white,
        textAlign: 'center'
    }
})