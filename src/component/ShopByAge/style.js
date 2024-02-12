import { StyleSheet, Dimensions } from "react-native";
import colors from "../../utils/colors";
import { fonts, setHeight, setWidth } from "../../utils/variable";

const width = Dimensions.get("screen").width

export const styles = StyleSheet.create({
    row: {
        flexDirection: 'row'
    },
    heading: {
        textAlign: 'center',
        fontSize: setWidth(4.5),
        fontFamily: fonts.fontBold,
        color: colors.black,
        marginBottom: setWidth(5)
    },
    shopByAgeContianer: {
        paddingTop: setWidth(12),
        paddingBottom: setWidth(20)
    },
    shopByAgeImageView: {
        flex: 0.5,
    },
    shopAgeImage: {  
        width: '100%',
        height: undefined,
         aspectRatio: 1,
    },
    sunImage: {
        position: 'absolute',
        zIndex: 1,
        width: setWidth(10),
        height: setWidth(10)
    },
})