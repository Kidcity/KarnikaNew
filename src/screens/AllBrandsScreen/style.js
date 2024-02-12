import { Dimensions, StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { fonts, setHeight, setWidth, shadow_css } from "../../utils/variable";

const { width, height } = Dimensions.get("screen")

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    content: {
        flex: 1,
        backgroundColor: colors.grey6,
    },
    row: {
        flexDirection: 'row'
    },
    textdark: {
        color: colors.grey2,
        fontFamily: fonts.fontBold,
    },
    itemLeft: {
        flex: 0.4,
        borderRightColor: colors.grey5,
        borderRightWidth: setWidth(0.3),
    },
    itemRight: {
        flex: 0.6,
        justifyContent: 'space-around',
        paddingHorizontal: setWidth(2)
    },
    itemContainer: {
        height: setHeight(15),
        backgroundColor: colors.white,
        borderColor: colors.grey1,
        borderWidth: setWidth(0.2),
        borderRadius: setWidth(2),
        overflow: 'hidden',
        // zIndex: 1,
        // marginTop: setWidth(4)
    },
    itemImage: {
        flex: 1,
        aspectRatio: 1
    },
    itemTitle: {
        color: colors.grey2
    },
    alignItemsCenter: {
        alignItems: 'center'
    },

    comingSoonView: {
        height: setHeight(25),
        paddingBottom: setHeight(3),
        ...shadow_css
    },

    comingSoonHeading: {
        fontSize: setWidth(4),
        fontFamily: fonts.fontBold,
        textAlign: 'center',
        marginTop: setWidth(4),
        color: colors.grey3
    },

    comingSoonItem: {
        // marginRight: setWidth(6),
        borderRadius: setWidth(4),
        width: setWidth(22),
        height: setWidth(22),
        backgroundColor: colors.white,
        overflow: 'hidden',
    },
    comingSoonImage: {
        // flex: 1,
        // aspectRatio: 1,
        width: '100%',
        height: undefined,
        aspectRatio: 1,
    },
  
    downArrow:{
        backgroundColor: colors.grey6,
        position: 'absolute',
        right: 15,
        bottom: 80,
        borderRadius: setWidth(10),
        overflow: 'hidden',
        ...shadow_css
    },
    upArrow:{
        backgroundColor: colors.grey6,
        position: 'absolute',
        right: 15,
        bottom: 150,
        borderRadius: setWidth(10),
        overflow: 'hidden',
        ...shadow_css
    },

    cityNameView: {
        backgroundColor: colors.white,
        ...shadow_css
    },
    cityItemView: {
        marginHorizontal: setWidth(2),
        marginVertical: setHeight(2),
    },
    cityBtn: {
        width: width / 3 - setWidth(2), // (width - setWidth(3)) / 2.8  , // setWidth(35),
        // paddingVertical: setWidth(2),
        marginRight: setWidth(2),
        borderRadius: setWidth(1),
        borderColor: colors.lightRed,
        borderWidth: setWidth(0.3),
        height: setHeight(5),
        justifyContent: 'center',
        backgroundColor: colors.white
    },
    activeCityBtn: {
        backgroundColor: colors.lightRed
    },
    cityBtnText: {
        textAlign: 'center',
        fontFamily: fonts.fontRegular,
        color: colors.red,
        fontSize: setWidth(3.2)
    },
    activeCityBtnText: {
        color: colors.white
    }

})