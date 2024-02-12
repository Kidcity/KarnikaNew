import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { fonts, setWidth } from "../../utils/variable";

export const styles = StyleSheet.create({
    container:{
        paddingBottom: setWidth(5)
    },
    row:{
        flexDirection:'row'
    },
    text:{
        fontSize: setWidth(3.5),
        fontFamily: fonts.fontRegular
    },
    subHeading:{
        color: colors.grey2,
        fontSize: setWidth(3.5),
        fontFamily: fonts.fontRegular
    },
    textBold: {
        fontFamily: fonts.fontBold
    },
    darkText:{
        color: colors.dark_charcoal
    },
    textGap:{
        marginVertical: setWidth(1)
    },
    collapsableButton:{
        padding: setWidth(2),
        paddingHorizontal: setWidth(4),
        backgroundColor: colors.white,
        marginTop: setWidth(2),
        marginHorizontal: setWidth(3),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderColor: colors.grey1,
        borderWidth: setWidth(0.2)
    },
    paynowBtn:{
        backgroundColor: colors.lightRed,
        paddingHorizontal: setWidth(8),
        paddingVertical: setWidth(1),
        borderRadius: setWidth(1)
    },
    paynowBtnText:{
        color: colors.white,
        fontFamily: fonts.fontRegular
    },
    shippingAddressView:{        
        paddingHorizontal: setWidth(3),
        //paddingVertical: setWidth(5),
         marginTop:setWidth(9),
    },
    shippingAddressHeading:{
        fontSize: setWidth(3.3),
        fontFamily: fonts.fontBold,
        color: colors.dark_charcoal,
    },
    shippingCardView:{
        backgroundColor: colors.white, 
        marginTop: setWidth(2), 
        paddingHorizontal: setWidth(2),
        paddingLeft: setWidth(5),
        paddingVertical: setWidth(4),
        borderRadius: setWidth(3),
        justifyContent:'space-between',
        borderColor: colors.grey1,
        borderWidth: setWidth(0.2)
    },
    expandBox:{
        paddingHorizontal: setWidth(3), 
        paddingVertical: setWidth(3), 
        marginHorizontal: setWidth(3), 
        borderColor: colors.grey1, 
        borderWidth: setWidth(0.2)
    }
})