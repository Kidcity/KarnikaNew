import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { fonts, setWidth } from "../../utils/variable";

export const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        backgroundColor: colors.themeColor,
        borderRadius: setWidth(2),
        alignItems:'center',
        justifyContent:'center',
        width: setWidth(30)
    },
    plusBtn:{
        paddingHorizontal: setWidth(2),
        paddingVertical: setWidth(2),
    },
    minusBtn:{
        paddingHorizontal: setWidth(2),
        paddingVertical: setWidth(2)
    },
    btnText:{
        color: colors.white,
        fontSize: setWidth(3),
        fontFamily: fonts.fontRegular
    }
})