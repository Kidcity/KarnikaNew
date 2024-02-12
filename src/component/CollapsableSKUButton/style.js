import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { fonts, setHeight, setWidth } from "../../utils/variable";

export const styles = StyleSheet.create({
    row: {
        flexDirection: 'row'
    },
    card: {
        backgroundColor: colors.white,
        marginTop: setHeight(2),
        borderRadius: setWidth(2),
        overflow: 'hidden',
    },
    header: {
        paddingVertical: setWidth(2),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: setWidth(3),
        // backgroundColor:'red'
    },
    cardHeaderImageContainer: {
        width: setWidth(13),
        height: setHeight(9),
        borderRadius: setWidth(2),
        overflow: 'hidden'
    },
    cardHeaderImage: {
        flex: 1,
        // aspectRatio: 1,
        // borderRadius: setWidth(2)
    },
    cardHeading: {
        fontFamily: fonts.fontBold,
        fontSize: setWidth(3.5),
        color: colors.dark_charcoal
    },
    cardSubHeading: {
        fontFamily: fonts.fontRegular,
        fontSize: setWidth(3),
        color: colors.dark_charcoal
    },
    mt_1: {
        marginTop: setHeight(1)
    },
    collapsableContainer: {
        paddingHorizontal: setWidth(3),
        paddingVertical: setWidth(2)
    },
    incrementBtnContainer: {
        flex: 1,
        alignItems:'center'
    },
    reasonCard:{
        padding: setWidth(3),
        backgroundColor: colors.grey6,
        flexDirection:'row',
        marginTop: setWidth(3),
        borderRadius: setWidth(2),
        justifyContent:'space-between',
        alignItems:'center'
    },
    uploadBtn:{
        backgroundColor: colors.grey3,
        flexDirection:'row',
        marginTop: setWidth(8),
        // marginHorizontal: setWidth(2),
        padding: setWidth(4),
        borderRadius: setWidth(2),
        alignItems:'center'
    },
    itemView:{
        flex: 1,
        justifyContent:'center',
        // paddingVertical: setWidth(),
        paddingLeft: setWidth(4),
        borderBottomColor: colors.grey1,
        borderBottomWidth: setWidth(0.3)
    },
    actionsheetTitle:{
        fontSize: setWidth(3.5),
        color: colors.dark_charcoal,
        fontFamily: fonts.fontBold,
        // textAlign:'center'
    },
    reasonImageView:{
        backgroundColor: colors.grey6,
        padding: 10,
        marginTop: setWidth(3),
        flexDirection: 'row',        
    },
    reasonImage:{
        width: setWidth(15),
        height: setHeight(10),
        marginLeft: 2
    },


    text: {
        fontFamily: fonts.fontRegular,
        textAlign: 'center'
    },
    textBold: {
        fontFamily: fonts.fontBold
    },
    heading: {
        fontFamily: fonts.fontBold,
        fontSize: setWidth(3.5),
        color: colors.white
    }
})