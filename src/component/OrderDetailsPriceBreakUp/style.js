import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { fonts, setHeight, setWidth } from "../../utils/variable";

export const styles = StyleSheet.create({
    container:{
        marginHorizontal: setWidth(4),
        paddingHorizontal: setWidth(5),
        paddingVertical: setWidth(6),
        marginTop:setWidth(5),
        backgroundColor: colors.white,
        borderRadius: setWidth(3),
        borderColor: colors.grey1,
        borderWidth: setWidth(0.2)
    },
    row:{
        flexDirection: 'row'
    },
    justifyBetween:{
        justifyContent:'space-between'
    },
    text:{
        fontSize: setWidth(3.5),
        fontFamily: fonts.fontRegular,
        color: colors.grey3
    },
    textRed:{
        color: colors.red
    },
    textBlack:{
        color: colors.black
    },
    textBold:{
        fontFamily: fonts.fontBold
    },
    mr_t_2:{
        marginTop: setHeight(2)
    },
    pd_t_2:{
        paddingTop: setHeight(2)
    },
    borderTop:{
        borderTopColor: colors.black,
        borderTopWidth: setWidth(0.2),        
    }
})