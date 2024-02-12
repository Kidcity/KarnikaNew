import { StyleSheet, Dimensions } from "react-native";
import colors from "../../utils/colors";
import { fonts, setHeight, setWidth } from "../../utils/variable";


const {width, height} = Dimensions.get("screen")

export const styles = StyleSheet.create({
    searchBoxContainer: {
        flexDirection: 'row',
        height: setWidth(12),
        paddingHorizontal: setWidth(4),
        borderBottomColor: colors.grey1,
        borderBottomWidth: setWidth(0.3),
    },
    justifyCenter: {
        justifyContent: 'center',
    },
    alignCenter: {
        alignItems: 'center'
    },
    searchbox: {
        flex: 1,
        fontSize: setWidth(3.7),
        fontFamily: fonts.fontRegular,
        color: colors.dark_charcoal
    },
    suggestionBox:{
        position: 'absolute',                
        left: 0,
        right: 0,
        // top: 90,
        backgroundColor: 'rgba(0,0,0,0.6)',
        zIndex: 9,
        height: height,
        overflow:'hidden'
    },
    suggestionContainer:{
        backgroundColor: colors.white,
        height: setHeight(40),
        position: 'relative',
        zIndex: 999,
        top: 0
    },
    suggestionTextView:{
        paddingVertical: setWidth(4),
        borderBottomColor: colors.grey1,
        borderBottomWidth: setWidth(0.3),
        paddingHorizontal: setWidth(4)
    },
    suggestionText:{
        fontFamily: fonts.fontRegular,
        fontSize: setWidth(3.5),
        color: colors.dark_charcoal
    }
})