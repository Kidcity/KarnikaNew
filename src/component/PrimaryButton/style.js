import { StyleSheet } from "react-native";
import  colors  from "../../utils/colors";
import { fonts, normalize } from "../../utils/variable";

export const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.yellow,
        height: normalize(40),
        borderRadius: normalize(7),
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal: normalize(20),
        flexDirection:'row'
    },
    btnText:{
        color: colors.white,
        fontFamily: fonts.bold,
        fontSize: normalize(10),
        textTransform: 'uppercase'
    }
})