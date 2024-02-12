import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { fonts, setHeight, setWidth } from "../../utils/variable";

export const styles = StyleSheet.create({
    contianer: {
        // backgroundColor:'red'
        width: setWidth(100),
        height: setHeight(50),
        // backgroundColor:'red'
    },
    backgroundVideo: {
        flex: 1
    },
    loaderCover: {
        position: 'absolute',
        zIndex: 99,
        bottom: 50,
        width: '100%',
    },
    lottiView: {
        position: 'absolute',
        height: setWidth(25),
        alignSelf: 'center',
        bottom: 0
    },
    loaderView: {
        flex: 1,
        height: 15,
        marginHorizontal: setWidth(15),
        borderColor: colors.white,
        borderWidth: setWidth(0.3),
        borderRadius: setWidth(8),
        overflow: 'hidden',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    loader: {
        // height: 5,
        width: 15,
        height: 15,
        backgroundColor: colors.white,
    },
    loadingText: {
        color: colors.white,
        textAlign: 'center',
        fontFamily: fonts.fontRegular,
        fontSize: setWidth(3.5)
    }
})