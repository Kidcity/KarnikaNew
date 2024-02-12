import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { setWidth } from "../../utils/variable";

export const styles = StyleSheet.create({
    container:{
        width: setWidth(30),
        height: setWidth(30),
        borderRadius: setWidth(30),
        backgroundColor: colors.themeColor,
        justifyContent:'center',
        alignItems:'center',
        //overflow: 'hidden'
    },
    image:{
        width: setWidth(30),
        height: setWidth(30),
        borderRadius: setWidth(30),
    },
    footerImage:{
        position:'absolute',
        zIndex: 9,
        bottom: -15,
        padding: setWidth(1.5),
        borderRadius: setWidth(10),
        backgroundColor: colors.white,
        borderColor: colors.grey5,
        borderWidth: setWidth(0.5)
    }
})