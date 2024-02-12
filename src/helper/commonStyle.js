import { StyleSheet } from "react-native";

import { fonts, normalize } from "../utils/variable";
import colors from "../utils/colors";

export const commonStyle = StyleSheet.create({
    row: {
        flexDirection: 'row'
    },
    flex1: {
        flex: 1
    },
    alignItemsCenter: {
        alignItems: 'center'
    },
    justifyContentCenter: {
        justifyContent: 'center'
    },
    justifyContentEvenly: {
        justifyContent: 'space-evenly'
    },
    justifyContentBetween: {
        justifyContent: 'space-between'
    },
    justifyContentEnd: {
        justifyContent: 'flex-end'
    },
    text10: {
        fontSize: normalize(10)
    },
    text11: {
        fontSize: normalize(11)
    },
    text12: {
        fontSize: normalize(12)
    },
    text13: {
        fontSize: normalize(13)
    },
    text14: {
        fontSize: normalize(14)
    },
    fontBold: {
        fontFamily: fonts.bold
    },
    fontRegular: {
        fontFamily: fonts.regular
    },
    fontThin: {
        fontFamily: fonts.light
    },
    textAlignCenter: {
        textAlign: 'center'
    },
    textUpperCase: {
        textTransform: 'uppercase'
    },
    textCapitalize: {
        textTransform: 'capitalize'
    },
    textgrey: {
        color: colors.grey3
    },
    textgrey2: {
        color: colors.grey2
    },
    textBlack: {
        color: colors.black
    },
    textRed: {
        color: colors.lightRed
    },
    textCharcoal: {
        color: colors.dark_charcoal
    },
    textWhite: {
        color: colors.white
    },
    textThemeColor: {
        color: colors.themeColor
    },
    textUnderline: {
        textDecorationLine: 'underline'
    },
    textCrossed: {
        textDecorationLine: 'line-through'
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 5
    },
    borderBottom: {
        borderBottomColor: colors.grey1,
        borderBottomWidth: normalize(2)
    },
    gapLeft6: {
        marginLeft: normalize(6)
    },
    gapTop6: {
        marginTop: normalize(6)
    },
    gapTop10: {
        marginTop: normalize(10)
    },
    gapTop20: {
        marginTop: normalize(20)
    },
    padding_V_10: {
        paddingVertical: normalize(10)
    },
    padding_H_15: {
        paddingHorizontal: normalize(15)
    },
    margin_H_15: {
        marginHorizontal: normalize(15)
    },
    bluredText: {
        color: "#fff0",
        textShadowColor: "rgba(255,0,0,0.9)",
        textShadowOffset: {
            width: 0,
            height: 0,
        },
        textShadowRadius: 30,
    }
})