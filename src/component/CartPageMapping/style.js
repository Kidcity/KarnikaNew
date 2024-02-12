import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { fonts, setHeight, setWidth } from "../../utils/variable";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        justifyContent:'center',
        paddingVertical: setHeight(1),
        paddingTop: setHeight(2)
    },
    row: {
        flexDirection: 'row'
    },
    mapPointerCircle: {
        width: setWidth(6),
        height: setWidth(6),
        backgroundColor: colors.grey1,
        borderRadius: setWidth(10)
    },
    mapTitle: {
        fontSize: setWidth(3.5),
        color: colors.dark_charcoal,
        fontFamily: fonts.fontBold,
        marginLeft: setWidth(1)
    },
    sideDash: {
        borderColor: colors.grey3,
        borderWidth: setWidth(0.3),
        width: setWidth(12),
        marginHorizontal: setWidth(3)
    },
})