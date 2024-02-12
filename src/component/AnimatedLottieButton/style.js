import { StyleSheet } from "react-native";

import  colors  from "../../utils/colors";
import { fonts, normalize, setWidth } from "../../utils/variable";

export const styles = StyleSheet.create({

    // heading:{
    //     paddingVertical: normalize(10)
    // },
    // title:{
    //     textAlign: 'center',
    //     fontSize: normalize(15),
    //     fontFamily: fonts.bold,
    //     color: colors.dark_charcoal,
    // }
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderColor: colors.themeColor,
        borderWidth: normalize(1),
        borderRadius: normalize(15),
        marginHorizontal: normalize(10)
    },
    labelView:{
        marginLeft: normalize(10)
    },
    btnText: {
        fontSize: setWidth(3),
        fontFamily: fonts.bold,        
        color: colors.dark_charcoal,
        textTransform: 'uppercase'
    },
    lottieContainer:{
        height: normalize(40),
        width: normalize(40),
    },
})