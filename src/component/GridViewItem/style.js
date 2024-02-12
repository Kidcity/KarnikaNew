import { StyleSheet, Dimensions } from "react-native";
import colors from "../../utils/colors";
import { fonts, normalize, setWidth } from "../../utils/variable";

const width = Dimensions.get("screen").width

export const styles = StyleSheet.create({
    container: {
        borderRadius: setWidth(2),
        overflow: 'hidden',
        marginTop: setWidth(2),
        width: (width / 2 - setWidth(3)),
        borderColor: colors.grey5,
        borderWidth: setWidth(0.3)
    },
    favBtn: {
        backgroundColor: 'transparent',
        position: 'absolute',
        right: 10,
        top: 5,
        padding: setWidth(1),
        borderRadius: setWidth(5),
        // elevation: 8,
        // shadowColor: colors.grey2,
        // shadowOffset: { width: 0, height: 1 },
        // shadowOpacity: 0.9,
        // shadowRadius: 1,
    },
    itemsLeftContainer: {
        // position: 'absolute',
        // left: 0,
        // bottom: 0,  
        backgroundColor: colors.themeColor,
        paddingHorizontal: setWidth(2),
        paddingVertical: setWidth(1.5),
        borderTopRightRadius: normalize(10),
        borderBottomRightRadius: normalize(10)
    },
    itemsRightContainer: {
        position: 'absolute',
        left: 15,
        top: 0,
        // width: 0,
        // height: 0,
        // backgroundColor: "#f69009",
        // backgroundColor: "transparent",
        // borderStyle: "solid",
        // borderLeftWidth: 50,
        // borderRightWidth: 50,
        // borderBottomWidth: 100,
        // borderLeftColor: "transparent",
        // borderRightColor: "transparent",
        // borderBottomColor: "red",
        // paddingHorizontal: setWidth(2),
        // paddingVertical: setWidth(1.5),
        // borderTopRightRadius: normalize(10),
        // borderBottomRightRadius: normalize(10)
        // borderTopLeftRadius: normalize(10),
        // borderBottomLeftRadius: normalize(10)
    },
    squre: {
        width: normalize(35),
        height: normalize(30),
        backgroundColor:"#62A25D",
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        justifyContent:'center',
        overflow:'visible'
    },
    tringle: {
        overflow:'visible',
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderLeftWidth: normalize(18),
        borderRightWidth: normalize(18),
        borderBottomWidth: normalize(10),
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: "#62A25D",
        transform: [{ rotate: "180deg" }],
    },
    productImage: {
        flex: 1,
        width: '100%',
        // width: (width / 2 - 13),
        height: normalize(210),
    },
    row: {
        flexDirection: 'row'
    },
    justifyBetween: {
        justifyContent: 'space-between'
    },
    justifyEnd: {
        justifyContent: 'flex-end'
    },
    alignItemEnd: {
        alignItems: 'flex-end'
    },
    block: {
        borderLeftColor: colors.grey5,
        borderLeftWidth: setWidth(0.3),
        borderRightColor: colors.grey5,
        borderRightWidth: setWidth(0.3),
        borderBottomColor: colors.grey5,
        borderBottomWidth: setWidth(0.3),
        paddingHorizontal: setWidth(3),
        paddingVertical: setWidth(2),
        justifyContent: 'center',
        overflow: 'hidden'
    },
    text: {
        flexWrap: 'wrap',
        fontSize: setWidth(3),
        color: colors.grey2,
        fontFamily: fonts.fontBold,
        flexShrink: 1,
    },
    largeBoldFont: {
        fontSize: setWidth(4),
        fontFamily: fonts.fontBold,
        color: colors.dark_charcoal
    },
    strikThroughFont: {
        textDecorationLine: 'line-through',
        color: colors.lightRed
    },
    subHeading: {
        color: colors.grey3,
        fontFamily: fonts.fontBold
    }
})