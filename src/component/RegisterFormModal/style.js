import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { DEVICE_HEIGHT, DEVICE_WIDTH, fonts, normalize, setHeight, setWidth } from "../../utils/variable";

export const styles = StyleSheet.create({
    container: {
        width: DEVICE_WIDTH,
        // height: DEVICE_HEIGHT,
        position: 'absolute',
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.8)',             
        zIndex: 9999,
        justifyContent:'center'             
    },
    content: {       
        backgroundColor: colors.white,
        marginHorizontal: normalize(10),
        paddingHorizontal: normalize(8),
        paddingVertical: normalize(15),
        borderRadius: normalize(10),
        paddingBottom: normalize(25)
    },
    row: {
        flexDirection: 'row'
    },
    heading:{
        textAlign: 'center',
        color: colors.dark_charcoal,
        fontFamily: fonts.bold,
        fontSize: normalize(15)
    },
    inputStyle: {
        paddingLeft: 0,
        height: setWidth(10),
        fontFamily: fonts.fontRegular,
    },
    smallBtn: {
        width: setWidth(18),
        height: setWidth(6),
        justifyContent: 'center',
        borderRadius: 5,
        borderColor: colors.primaryyellow,
        borderWidth: setWidth(0.5)
    },
    activeBtn: {
        backgroundColor: colors.primaryyellow
    },
    btnText: {
        textAlign: 'center',
        color: colors.primaryyellow,
        fontFamily: fonts.fontRegular
    },
    activeBtnText:{
        color: colors.white
    },
    dropdownContainer:{
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderWidth: 0,
        borderBottomColor: colors.grey1,
        borderBottomWidth: setWidth(0.2),
        marginTop: setWidth(5)
    },
    dropdownPlacholderStyle:{
        fontSize: setWidth(3.2),
        color: colors.grey3,
        fontFamily: fonts.fontRegular,
    },
    dropdownItemStyle:{
        borderBottomColor: colors.grey1,
        borderBottomWidth: setWidth(0.4),
        paddingHorizontal: setWidth(2)
    },
    dropdownItemTextStyle:{
        fontFamily: fonts.fontRegular,
        color: colors.dark_charcoal
    },
});