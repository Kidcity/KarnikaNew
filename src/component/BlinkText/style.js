import { StyleSheet } from "react-native";
import { fonts, setWidth } from "../../utils/variable";
import colors from "../../utils/colors";


export const styles= StyleSheet.create({
    text:{
        fontFamily: fonts.fontBold,
        fontSize: setWidth(4),
        color: colors.black,
        textAlign:'center'
    }
})