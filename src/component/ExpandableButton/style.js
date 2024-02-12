import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { fonts, setWidth } from "../../utils/variable";

export const styles = StyleSheet.create({
    row:{
        flexDirection:'row'
    },
    subHeading:{
        color: colors.grey2,
        fontSize: setWidth(3.5),
        fontFamily: fonts.fontRegular
    },
    textBold: {
        fontFamily: fonts.fontBold
    },
    collapsableButton:{
        padding: setWidth(2),
        paddingHorizontal: setWidth(4),
        backgroundColor: colors.white,
        marginTop: setWidth(2),
        marginHorizontal: setWidth(3),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderColor: colors.grey1,
        borderWidth: setWidth(0.2)
    },
    expandBox:{
        paddingHorizontal: setWidth(3), 
        paddingVertical: setWidth(3), 
        marginHorizontal: setWidth(3), 
        borderColor: colors.grey1, 
        borderWidth: setWidth(0.2)
    },

})