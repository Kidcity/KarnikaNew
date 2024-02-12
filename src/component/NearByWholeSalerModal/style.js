import { StyleSheet } from "react-native";
import { fonts, normalize, setHeight, setWidth } from "../../utils/variable";
import colors from "../../utils/colors";


export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent:'center'
    },
    content:{
        backgroundColor: colors.grey5,
        marginHorizontal: setWidth(5),
        maxHeight: setHeight(80),
        paddingHorizontal: normalize(10),
        paddingTop: normalize(10)
    },
    crossBtn:{
        padding: normalize(10),
    },
    heading:{
        fontFamily: fonts.bold,
        color: colors.black,
        fontSize: normalize(15),
    },
})