import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { setWidth } from "../../utils/variable";

export const styles = StyleSheet.create({
    container:{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent:'center'
    },
    content:{
        backgroundColor: colors.white,
        marginHorizontal: setWidth(4),
        paddingVertical: setWidth(5),
        borderRadius: setWidth(3)
    },
    title:{
        fontSize: setWidth(5),
        color: colors.dark_charcoal,
        textAlign:'center'
    },
    title2:{
        fontSize: setWidth(3),
        color: colors.dark_charcoal,
        textAlign:'center',
        marginTop: setWidth(6)
    }
})