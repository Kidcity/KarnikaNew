import { StyleSheet } from "react-native";
import colors from "../../../utils/colors";
import { fonts, setWidth } from "../../../utils/variable";


export const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal: setWidth(4),
        
    },
    heading:{
        fontFamily: fonts.fontBold,
        fontSize: setWidth(4.5),
        color: colors.grey2,
        textAlign: 'center'
    }
})