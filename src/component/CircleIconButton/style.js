import { StyleSheet } from "react-native";

import  colors from "../../utils/colors";
import { normalize } from "../../utils/variable";

export const styles = StyleSheet.create({
    btn:{
        width: normalize(40),
        height: normalize(40),
        borderRadius: normalize(50),
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: colors.white,
        marginHorizontal: normalize(10)
    }
})