import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { fonts, normalize, setHeight, setWidth } from "../../utils/variable";

export const styles = StyleSheet.create({
    row:{
        flexDirection:'row'
    },
    text:{
        fontSize: setWidth(3.5),
        fontFamily: fonts.fontRegular
    },
    warningView:{
        backgroundColor: colors.white,
        paddingHorizontal: setWidth(7),
        paddingVertical: setHeight(2),
        alignItems: 'center'
    },
    minimun_order_warning_text:{
        fontSize: setWidth(3),
        fontFamily: fonts.fontRegular,
        color: colors.black,
        marginLeft: setWidth(2),
        lineHeight: normalize(15)
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

    /* Button */
    btn:{
        flexDirection:'row',
        paddingVertical: setWidth(2),
        paddingHorizontal: setWidth(2),
        marginHorizontal: setWidth(4),
        backgroundColor: colors.white,
        marginTop: setWidth(6),
        justifyContent:'space-between',
        alignItems:'center',
        borderRadius: setWidth(2),
        borderColor: colors.grey1,
        borderWidth: setWidth(0.3)
    },

    buyBtnView:{
        backgroundColor: colors.white,
        paddingVertical: setHeight(2),
        alignItems: 'flex-end',
        paddingHorizontal: setWidth(3)
    },
    buyBtn:{
        paddingVertical: setHeight(1.8),
        paddingHorizontal: setWidth(3),
        backgroundColor: colors.lightRed,
        borderRadius: setWidth(2),
        justifyContent:'center',
        alignItems:'center'
    },
    buyBtnText:{
        color: colors.white,
        fontSize: setWidth(3),
        fontFamily: fonts.fontBold
    }
})