import { Platform, StyleSheet } from "react-native";
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
        paddingBottom: setWidth(25),
        justifyContent:'center'
    },
    uploadText:{
        fontSize: setWidth(4.5),
        color: colors.black,
        fontFamily: fonts.fontBold,
        textAlign: 'center',
        marginTop: setWidth(2)
    },
    inputStyle:{
        paddingLeft: 0,
        height: setWidth(10),
        fontFamily: fonts.fontRegular,
        
    },
    row:{
        flexDirection: 'row'
    },
    text:{
        color: colors.grey2,
        fontFamily: fonts.fontBold,
    },
    dropdownContainer:{
        borderColor: colors.white,
        borderBottomColor: colors.grey3,
        borderBottomWidth: setWidth(0.1),
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
    btn:{
       width: setWidth(18),
       height: setWidth(6),
       justifyContent:'center',
       borderRadius: 5,
       borderColor: colors.primaryyellow,
       borderWidth: setWidth(0.5)
    },
    activeBtn:{
        backgroundColor: colors.primaryyellow
    },
    btnText:{
        textAlign: 'center',
        color: colors.primaryyellow,
        fontFamily: fonts.fontRegular
    },
    activeBtnText:{
        color: colors.white
    },
    info:{
        marginTop: setWidth(10),
        alignItems:'center',
        fontFamily: fonts.fontRegular
    },
    infoText:{
        marginLeft: setWidth(2),
        flexShrink: 1,
        color: colors.grey2,
        fontFamily: fonts.fontRegular
    },
    dashedBorder:{
        borderStyle: 'dashed',
        borderBottomColor: colors.grey3,
        borderBottomWidth: setWidth(0.5),
        marginTop: setWidth(10)
    },
    footerText: {
        flexShrink: 1,
        color: colors.black,
        fontSize: setWidth(2),
        fontFamily: fonts.fontRegular
    },
    link:{
        color: colors.red
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