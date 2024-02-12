import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { fonts, setWidth } from "../../utils/variable";

export const styles = StyleSheet.create({
    container:{
        flex: 1,      
        paddingBottom: setWidth(6)  
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
    shippingAddressView:{        
        paddingHorizontal: setWidth(4),
    },
    shippingAddressHeading:{
        fontSize: setWidth(3.5),
        fontFamily: fonts.fontBold,
        color: colors.dark_charcoal,
        textTransform: 'uppercase'
    },
    shippingCardView:{
        backgroundColor: colors.white, 
        marginTop: setWidth(3), 
        paddingHorizontal: setWidth(2),
        paddingLeft: setWidth(5),
        paddingVertical: setWidth(4),
        borderRadius: setWidth(3),
        justifyContent:'space-between',
        borderColor: colors.grey1,
        borderWidth: setWidth(0.2)
    },
    button:{
        flex:1,
        padding: setWidth(2.5),        
        backgroundColor: colors.btnGreen,
        borderRadius: setWidth(2)
    },
    buttonText:{
        color: colors.white,
        textAlign:'center',
        fontFamily: fonts.fontRegular,
        fontSize: setWidth(3.2)
    },
    estimateTimeView:{
        backgroundColor: colors.primaryyellow,
        padding: setWidth(1),
        marginTop: setWidth(5),
        marginHorizontal: setWidth(4),
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    estimateText:{
        color: colors.dark_charcoal,
        fontFamily: fonts.fontBold,
        marginLeft: setWidth(2),
        fontSize: setWidth(3.5)
    },
    priceDetailsView:{
        marginTop: setWidth(7),
        paddingHorizontal: setWidth(4),
    },
    priceBoxView:{
        backgroundColor: colors.white,
        paddingHorizontal: setWidth(4),
        paddingVertical: setWidth(2),
        borderColor: colors.grey5,
        borderWidth: setWidth(0.5),
        marginTop: setWidth(4),
        borderRadius: setWidth(2),
        borderColor: colors.grey1,
        borderWidth: setWidth(0.2)
    },
})