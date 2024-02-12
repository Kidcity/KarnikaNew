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
        marginHorizontal: setWidth(4)
    },
    inputStyle:{
        paddingLeft: 0,
        fontFamily: fonts.fontRegular,
        fontSize: setWidth(3.4),
        color: colors.dark_charcoal
    },
    footerView:{
        padding: setWidth(4),
        backgroundColor: colors.white,
        flexDirection:'row'
    },
    footerBtn:{
        flex: 1,
        backgroundColor: colors.lightRed,
        paddingVertical: setWidth(3),
        borderRadius: setWidth(2),
        borderColor: colors.lightRed,
        borderWidth: setWidth(0.5)
    },
    footerBtnText:{
        color: colors.white,
        textAlign: 'center',
        fontSize: setWidth(4),
        fontFamily: fonts.fontRegular
    },
    dropdownContainer:{
        borderColor: colors.white,
        borderBottomColor: colors.grey1,
        borderBottomWidth: setWidth(0.3),
        marginTop: setWidth(5)
    },
    dropdownPlacholderStyle:{
        fontSize: setWidth(3.2),
        color: colors.grey3,
        fontFamily: fonts.fontRegular
    },
    dropdownItemStyle:{
        borderBottomColor: colors.grey1,
        borderBottomWidth: setWidth(0.4),
        paddingHorizontal: setWidth(2)
    },
    dropdownItemTextStyle:{
        color: colors.dark_charcoal,
        fontFamily: fonts.fontRegular,
        fontSize: setWidth(3.2)
    },
})