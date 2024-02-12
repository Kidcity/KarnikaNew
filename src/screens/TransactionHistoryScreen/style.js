import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { fonts, setHeight, setWidth } from "../../utils/variable";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    content: {
        flex: 1,
    },
    header: {
        backgroundColor: colors.primaryyellow,
        height: setHeight(30),
        paddingTop: setHeight(2),
        paddingHorizontal: setWidth(3)
        // justifyContent: 'center'
    },
    row: {
        flexDirection: 'row'
    },
    headerLeftSide: {
        // backgroundColor: 'red',
        flex: 1,
        justifyContent:'center'
    },
    headerRightSide: {
        // backgroundColor: 'red',
        flex: 1,
        alignItems: 'flex-end'
    },
    heading: {
        fontFamily: fonts.fontBold,
        fontSize: setWidth(5),
        color: colors.white,
        textTransform: 'capitalize',
    },
    subHeading:{
        fontFamily: fonts.fontBold,
        fontSize: setWidth(3),
        color: colors.white,
        textTransform: 'capitalize',
    },
    profilePicOuterView: {
        height: setHeight(9),
        width: setWidth(15),
        borderRadius: setWidth(10),
        backgroundColor: colors.white,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center'
    },
    profilePicInnerView: {
        height: setHeight(8),
        width: setWidth(13),
        borderRadius: setWidth(10),
        overflow: 'hidden',
    },
    profilePic: {
        flex: 1
    },

    floatingCard:{
        backgroundColor: colors.white,
        borderRadius: setWidth(2),
        marginHorizontal: setWidth(5),
        marginTop: setHeight(-10),
        elevation: 8
    },
    cardHeadingView:{
        paddingVertical: setHeight(2),
        paddingHorizontal: setWidth(3),
        borderBottomColor: colors.grey1,
        borderBottomWidth: setWidth(0.3)
    },
    cardHeading:{
        fontFamily: fonts.fontBold,
        fontSize: setWidth(3.5),
        color: colors.grey2,
        textTransform: 'capitalize',
    }
})