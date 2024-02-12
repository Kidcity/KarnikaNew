import { StyleSheet } from "react-native";
import { fonts, setWidth } from "../../utils/variable";

export const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        height: setWidth(13),
        borderRadius: setWidth(3),
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal: setWidth(4)
    },
    label:{
        fontFamily: fonts.fontBold,
        fontSize: setWidth(3),
    }
})