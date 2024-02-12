import { StyleSheet } from "react-native";
import { fonts, setHeight, setWidth } from "../../utils/variable";

export const styles = StyleSheet.create({
    row: {
        flexDirection: 'row'
    },
    justifyCenter: {
        justifyContent: 'center',
    },
    alignCenter: {
        alignItems: 'center'
    },
    retailerZoneContainer: {
        // marginTop: setHeight(9),
        // marginTop: normalize(50),
        marginHorizontal: setWidth(4)
    },
    retailerZoneHeadingView: {
        paddingVertical: setWidth(2),
        borderTopLeftRadius: setWidth(15),
        borderBottomRightRadius: setWidth(15)
    },
    retailerZoneHeading: {
        fontSize: setWidth(5),
        fontFamily: fonts.fontBold
    },
    retailerZoneImageView: {
        height: setWidth(20),
        height: setWidth(40)
    },
    retailerZoneImage: {
        flex: 1,
        width: '100%',
    },
})