import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { fonts, normalize } from "../../utils/variable";

export const styles = StyleSheet.create({
    container: {
        
        backgroundColor: colors.white,
    },
    catalogHeader: {
        paddingVertical: normalize(15),
        paddingLeft: normalize(10)
    },
    catalogBody: {
        flexDirection: 'row',
        height: normalize(390),
        backgroundColor: "#CFD1CE"
    },
    catalogFooter: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: normalize(10),
        paddingLeft: normalize(10)
    },
    catalogTitle: {
        fontFamily: fonts.bold,
        color: colors.black,
        fontSize: normalize(12),
        letterSpacing: 1
    },
    image: {
        width: '92%',
        height: '95%',
        backgroundColor: colors.white,
        borderRadius: normalize(10)
    },
    smallimage: {
        width: '92%',
        height: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.grey6,
        borderRadius: normalize(10),
        overflow:'hidden'
    },
    logo: {
        width: normalize(40),
        height: normalize(40),
        borderRadius: normalize(50),
        borderColor: colors.themeColor,
        borderWidth: normalize(1),
    },
    brandDetails: {
        flex: 1,
        marginLeft: normalize(10),
        paddingVertical: normalize(5),
    },
    brandTitle: {
        fontFamily: fonts.bold,
        color: colors.black,
        fontSize: normalize(10)
    },
    followerTitle: {
        fontFamily: fonts.bold,
        color: colors.grey1,
        fontSize: normalize(12),
        letterSpacing: 1
    },
    buttonContainer: {
        position: 'absolute',
        right: 0,
        bottom: 50,
        flexDirection: 'row'
    },

})