import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { fonts, setHeight, setWidth } from "../../utils/variable";

export const styles = StyleSheet.create({
    container: {
        width: setWidth(40),
        height: setHeight(7),
        borderColor: colors.grey1,
        borderWidth: setWidth(0.3),
        borderRadius: setWidth(20),
        justifyContent: 'center',
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row'
    },
    alignItemsCenter: {
        alignItems: 'center',
    },
    justifyContentCenter: {
        justifyContent: 'center',
    },
    sortbyText: {
        fontFamily: fonts.fontBold,
        color: colors.black,
        fontSize: setWidth(3),
    },
    optionText: {
        fontSize: setWidth(3),
        fontFamily: fonts.fontRegular,
        color: colors.lightRed,
    },
    itemView:{
        paddingVertical: setWidth(4),
        paddingLeft: setWidth(4),
        borderBottomColor: colors.grey1,
        borderBottomWidth: setWidth(0.3)
    },
    actionsheetTitle:{
        fontSize: setWidth(3.5),
        color: colors.dark_charcoal,
        fontFamily: fonts.fontBold,
        // textAlign:'center'
    },
    fontBold: {
        fontFamily: fonts.fontBold,
    }
})