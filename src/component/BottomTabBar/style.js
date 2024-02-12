import { StyleSheet } from "react-native";
import { fonts, normalize, setHeight, setWidth } from "../../utils/variables";
import { colors } from "../../utils/colors";

export const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        height: setHeight(7),
    },
    tabBtn:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    },
    tabBtnText:{
        color: colors.black,
        fontFamily: fonts.regular,
        fontSize: normalize(10),        
    },
    isFocusedBtn:{
        backgroundColor: colors.themeColor
    },
    isFocusedBtnText:{
        color: colors.white,
    }
})