import { Platform, StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { fonts, normalize, setWidth } from "../../utils/variable";

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.white
    },
    content:{
        flexGrow: 1,
        //backgroundColor: 'red'
        marginHorizontal: setWidth(4),
        paddingBottom: setWidth(20)
    },
    label:{
        fontSize: normalize(11),
        color: colors.dark_charcoal
    },
    changeProfilePicText:{
        color: colors.ligthCoral,
        textAlign:'center',
        marginTop: setWidth(5),
        fontFamily: fonts.fontRegular
    },
    inputStyle:{
        paddingLeft: 0,
        fontFamily: fonts.fontRegular,
        color: colors.dark_charcoal,
        fontSize: setWidth(3.2),
        height: setWidth(10)
        //marginTop: setWidth(150)
    },
    dropdownContainer:{
        borderColor: colors.white,
        borderBottomColor: colors.grey1,
        borderBottomWidth: setWidth(0.2),
        marginTop: setWidth(5),
        paddingBottom: normalize(4)
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
    footerBtnContainer:{
        flexDirection:'row',
        paddingVertical: Platform.OS === 'ios'? setWidth(7) : setWidth(4),
        justifyContent:'space-around',
        borderColor: colors.grey5,
        borderWidth: setWidth(0.4)
    },
    footerBtn:{
        width: setWidth(40),
        height: setWidth(13),
        backgroundColor: colors.primaryyellow,
        borderRadius: setWidth(3),
        justifyContent:'center',
        alignItems:'center',
        borderColor: colors.primaryyellow,
        borderWidth:setWidth(0.4)
    },
    btnText:{
        color: colors.white,
        fontSize: setWidth(4),
        fontFamily: fonts.fontBold
    },
    itemView:{
        flex: 1,
        justifyContent:'center',
        // paddingVertical: setWidth(),
        paddingLeft: setWidth(4),
        borderBottomColor: colors.grey1,
        borderBottomWidth: setWidth(0.3)
    },
    actionsheetTitle:{
        fontSize: setWidth(3.5),
        color: colors.dark_charcoal,
        fontFamily: fonts.fontBold,
        // textAlign:'center'
    },
})