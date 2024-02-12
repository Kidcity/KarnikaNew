import { StyleSheet, Dimensions, Platform } from "react-native";
import colors from '../../utils/colors'
import { fonts, normalize, setHeight, setWidth, shadow_css } from "../../utils/variable";

export const styles = StyleSheet.create({
    contianer: {
        flex: 1,
        backgroundColor: colors.white
    },
    content: {
        flexGrow: 1,
        paddingBottom: setWidth(5)
    },
    topBanner: {
        height: setHeight(72),
        // height: SCREEN_HEIGHT * 2        
    },
    row: {
        flexDirection: 'row'
    },
    itemsLeftContainer: {
        // position: 'absolute',
        // left: 0,
        // bottom: 0,  
        backgroundColor: colors.themeColor,
        paddingHorizontal: setWidth(2),
        paddingVertical: setHeight(1.3),
        // borderTopRightRadius: normalize(10),
        // borderBottomRightRadius: normalize(10)
    },
    shareBtn:{
        position: 'absolute',
        right: 10,
        top: 10,
        zIndex: 99,
        borderRadius: normalize(50),
        backgroundColor: colors.white
    },
    smallBlock: {
        paddingHorizontal: setWidth(4),
        paddingVertical: setWidth(3),
        borderColor: colors.grey1,
        borderWidth: setWidth(0.3),
    },
    text: {
        fontSize: setWidth(3),
        fontFamily: fonts.fontRegular,
        color: colors.dark_charcoal
    },
    subHeading: {
        fontSize: setWidth(3.5),
        fontFamily: fonts.fontRegular
    },
    textBold: {
        fontFamily: fonts.fontBold
    },
    textStrikeThrough: {
        textDecorationLine: 'line-through'
    },
    textCenter: {
        textAlign: 'center'
    },
    justifyCenter: {
        justifyContent: 'color'
    },
    alignitemCenter: {
        alignItems: 'center'
    },

    shareBtn: {
        position: 'absolute',
        right: 10,
        zIndex: 999,
        width: setWidth(15),
        height: setWidth(15),
        borderRadius: setWidth(15),
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        ...shadow_css
    },

    /* product size block style */
    productSizeView: {
        paddingVertical: setWidth(3),
        paddingHorizontal: setWidth(4),
        backgroundColor: colors.grey5, //'rgba(242, 242, 242, 0.5)',
        borderBottomColor: colors.grey1,
        borderBottomWidth: setWidth(0.2)
    },
    sizeBtn: {
        backgroundColor: colors.white,
        paddingVertical: setWidth(2.5),
        width: setWidth(30),
        // paddingHorizontal: setWidth(10),
        borderRadius: setWidth(15),
        borderColor: colors.grey2,
        borderWidth: setWidth(0.3)
    },

    /* Collapsable Button */
    collasableBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: setWidth(4),
        paddingVertical: setWidth(2),
        backgroundColor: colors.white,
        alignItems: 'center',
        marginTop: setWidth(4),
        borderBottomColor: colors.grey5,
        borderTopColor: colors.grey5,
        borderBottomWidth: setWidth(0.3),
        borderTopWidth: setWidth(0.3)
    },

    /* Product Details View */
    productDetailsView: {
        paddingVertical: setWidth(10),
        paddingHorizontal: setWidth(5)
    },

    /* similer product section */
    similerProductSection: {
        // paddingHorizontal: setWidth(2.5),
        //paddingRight: setWidth(4),
        marginTop: setHeight(2)
    },

    /* Footer Btn View */
    footerbtnView: {
        paddingVertical: Platform.OS === 'ios' ? setWidth(7) : setWidth(5),
        backgroundColor: colors.white,
        flexDirection: 'row',
        paddingHorizontal: setWidth(2),
        elevation: 50,
        shadowColor: '#000',
        shadowOffset: { width: -2, height: 14 },
        shadowOpacity: 8,
        shadowRadius: 3,
    },
    heartBtn: {
        paddingHorizontal: setWidth(10),
        paddingVertical: setWidth(3),
        borderColor: "#FF834D",
        borderWidth: setWidth(0.3),
        borderRadius: setWidth(3)
    },
    addtoCartbtn: {
        flex: 1,
        backgroundColor: "#62A25D",
        borderRadius: setWidth(3),
        justifyContent: 'center',
        marginLeft: setWidth(3)
    },
    addtoCartBtnText: {
        textAlign: 'center',
        color: colors.white,
        fontFamily: fonts.fontBold
    },

    //mov
    movView: {
        backgroundColor: colors.orange2,
        paddingVertical: setHeight(1.3),
        fontFamily: fonts.fontBold,
        fontSize: setWidth(4),
        color: colors.black,
        textAlign: 'center'
    },
    movText: {
        flexWrap: 'wrap',
        fontSize: setWidth(4),
        color: colors.white,
        fontFamily: fonts.fontBold,
        textAlign: 'center',
        flexShrink: 1,
    },
    movWarningView: {
        flexDirection: 'row',
        backgroundColor: colors.red,
        paddingVertical: setHeight(1),
        justifyContent: 'center',
        alignItems: 'center'
    },
    movWarnText: {
        fontSize: setWidth(4),
        color: colors.white
    },
    labelView: {
        position: 'absolute',
        left: 15,
        top: 0,
        zIndex: 9999,
    },
    squre: {
        width: normalize(60),
        height: normalize(50),
        backgroundColor: "rgba(98,	162,	93, 0.9)",
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        justifyContent: 'center',
        overflow: 'visible'
    },
    tringle: {
        overflow: 'visible',
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderLeftWidth: normalize(30),
        borderRightWidth: normalize(30),
        borderBottomWidth: normalize(20),
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: "rgba(98,	162,	93, 0.8)",
        transform: [{ rotate: "180deg" }],
    },
})