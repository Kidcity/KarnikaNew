import { StyleSheet } from "react-native";

import { fonts, normalize } from "../../utils/variable";
import colors from "../../utils/colors";

export const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'space-evenly',
        alignItems:'center',
        // backgroundColor:'red'
    },
    outCircle:{
        width: normalize(55),
        height: normalize(55),
        backgroundColor: colors.themeColor,
        borderRadius: normalize(60),
        justifyContent:'center',
        alignItems:'center'
    },
    innerCircle:{
        width: normalize(50),
        height: normalize(50),
        backgroundColor: colors.themeColor,
        borderRadius: normalize(60),
        borderColor: colors.white,
        borderWidth: normalize(4),
        justifyContent:'center',
        alignItems:'center'
    },
    circleText:{
        fontFamily: fonts.regular,
        fontSize: normalize(15),
        color: colors.white
    },
    feedText:{
        fontFamily: fonts.bold,
        fontSize: normalize(10),
        color: colors.dark_charcoal,
        letterSpacing: 1
    }
})