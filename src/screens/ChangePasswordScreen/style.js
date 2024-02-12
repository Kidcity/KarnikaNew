import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { fonts, setWidth } from "../../utils/variable";

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.white
    },
    content:{
        flexGrow: 1,
        marginHorizontal: setWidth(4),
        paddingTop: setWidth(30),
        paddingBottom: setWidth(20)
    },
    image:{
        width: setWidth(40),
        height: setWidth(40),
        alignSelf:'center'
    },
    inputStyle:{
        paddingLeft: 0,
        height: setWidth(10),
        fontFamily: fonts.fontRegular
    },
})