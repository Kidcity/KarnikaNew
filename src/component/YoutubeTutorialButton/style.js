import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { fonts, setHeight, setWidth } from "../../utils/variable";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.grey6,
        paddingVertical: setHeight(5),        
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
    heading: {
        textAlign: 'center',
        fontSize: setWidth(4.5),
        fontFamily: fonts.fontBold,
        color: colors.dark_charcoal,
        marginBottom: setWidth(5)
    },
    youtubeBtn: {
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
        paddingHorizontal: setWidth(4),
        marginHorizontal: setWidth(10),        
        backgroundColor: colors.white,
        borderColor: colors.red,
        borderWidth: setWidth(0.3),
        paddingVertical: setHeight(1),        
        borderRadius: setWidth(4)
    },
    btnText: {
        color: colors.dark_charcoal,
        fontFamily: fonts.fontBold,
        fontSize: setWidth(3)
    },
    lottiView: {
        position: 'relative',
        height: setWidth(10),
        alignSelf: 'center',
    },
})