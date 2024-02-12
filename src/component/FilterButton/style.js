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
        alignItems: 'center',
        marginHorizontal: setWidth(2)
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
        fontSize: setWidth(3)
    },
    optionText: {
        fontSize: setWidth(3),
        fontFamily: fonts.fontRegular,
        color: colors.lightRed
    },
})