import { StyleSheet } from "react-native";
import { fonts, setHeight, setWidth } from "../../utils/variable";
import colors from "../../utils/colors";


export const styles = StyleSheet.create({
    container: {
        marginVertical: setHeight(1),
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoriesView: {
        // backgroundColor: 'pink',
        justifyContent: 'center',
        alignItems: 'center',
        // maxWidth: setWidth(18)
    },
    imageView: {
        width: setWidth(20),
        height: setWidth(20),
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderRadius: setWidth(4),
    },
    image: {
        flex: 1,
        aspectRatio: 1,
        borderRadius: setWidth(12),
    },
    title: {
        flexShrink: 1,
        fontFamily: fonts.fontBold,
        fontSize: setWidth(3.4),
        textAlign: 'center',
        color: colors.dark_charcoal,
        marginTop: setHeight(0.60)
    }
})