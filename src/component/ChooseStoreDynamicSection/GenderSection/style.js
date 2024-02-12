import { StyleSheet } from "react-native";
import colors from "../../../utils/colors";
import { fonts, setHeight, setWidth } from "../../../utils/variable";

export const styles = StyleSheet.create({
    storeImage: {
        height: setHeight(19),
        width: setWidth(26),
        borderRadius: setWidth(4),
        overflow:'hidden'
    },
    row: {
        flexDirection: 'row'
    },
    justifyCenter: {
        justifyContent: 'center',
    },
    alignCenter: {
        alignItems: 'center'
    },
    storeTitle:{
        color: colors.dark_charcoal, 
        fontFamily: fonts.fontBold,
        fontSize: setWidth(3.4)
    },
    buttonContainer:{
        borderColor: colors.red,
        borderWidth: setWidth(0.3),
        marginTop: setHeight(5),        
    },
    buttonLabelStyle:{
        color: colors.red
    },
    minimumOrderView:{
        backgroundColor: colors.red,
        paddingVertical: setHeight(0.5),
        marginTop: setHeight(3)
    },
    minimumOrderText:{
        color: colors.white,
        textAlign: 'center',
        fontFamily: fonts.fontBold,
        textTransform: 'uppercase'
    }
})