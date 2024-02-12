import { StyleSheet, Dimensions } from "react-native";
import colors from "../../utils/colors";
import { fonts, setHeight, setWidth } from "../../utils/variable";

const width = Dimensions.get("screen").width

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    content: {
        flexGrow: 1,
        // paddingBottom: setWidth(7)
    },
    bannerContainer: {
        height: setHeight(44)
    },
    row: {
        flexDirection: 'row'
    },
    justifyContentCenter:{
        justifyContent:'center'
    },
    alignItemsCenter:{
        alignItems:'center'
    },
    chooseStoreContainer: {
        paddingTop: setHeight(5),
        paddingBottom: setHeight(10),
        backgroundColor: colors.grey6
    },
    heading: {
        textAlign: 'center',
        fontSize: setWidth(5),
        fontFamily: fonts.fontBold,
        color: colors.dark_charcoal,
        marginBottom: setWidth(5)
    },
    storeImage: {
        height: setHeight(17),
        width: setWidth(27),
        borderRadius: setWidth(4),
        overflow:'hidden'
    },
    storeTitle:{
        color: colors.dark_charcoal, 
        fontFamily: fonts.fontBold,
        fontSize: setWidth(3.4)
    },
    applyCreditView:{
        marginTop: setWidth(18),
        marginHorizontal: setWidth(4),
        borderRadius: setWidth(5),
        overflow: 'hidden'
    },
    applyCreditimage:{
        width: '100%',
        height: setWidth(50),
        overflow: 'hidden',
        borderRadius: setWidth(5),
    },  
    footer:{
        paddingTop: setWidth(2),
        paddingBottom: setWidth(8),
        marginHorizontal: setWidth(4),
    },
    footerText:{
        fontSize: setWidth(6),
        fontFamily: fonts.fontBold,
        color: colors.grey3
    },
    dashedBorder:{
        borderStyle: 'dashed',
        borderBottomColor: colors.grey3,
        borderBottomWidth: setWidth(0.5),
        marginTop: setWidth(10),
        marginHorizontal: setWidth(4)
    }
})