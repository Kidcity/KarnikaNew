import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { fonts, setWidth } from "../../utils/variable";

export const styles = StyleSheet.create({
    shippingCardView:{
        backgroundColor: colors.white, 
        marginTop: setWidth(5), 
        paddingHorizontal: setWidth(5),
        // paddingLeft: setWidth(5),
        paddingVertical: setWidth(4),
        borderRadius: setWidth(3),
        justifyContent:'space-between'
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
    textRed:{
        color: colors.red
    },
    textGrey3:{
        color: colors.grey3
    },
    darkText:{
        color: colors.dark_charcoal
    },
    row:{
        flexDirection:'row'
    },
})