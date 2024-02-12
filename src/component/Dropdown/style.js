import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { fonts, setWidth } from "../../utils/variable";

export const styles = StyleSheet.create({
    dropdownContainer:{
        borderColor: colors.red,
        borderWidth: setWidth(0.5),
        //paddingHorizontal: setWidth(2),
        padding: 0
    },
    itemStyle:{
        paddingVertical: setWidth(2),
    },
    textItem:{
        color: colors.red,
        fontFamily: fonts.fontRegular
    },
    placeholderStyle:{
        color: colors.grey3,
    },
    selectedTextStyle:{
        color: colors.dark_charcoal,
        fontFamily: fonts.fontRegular
    }
})