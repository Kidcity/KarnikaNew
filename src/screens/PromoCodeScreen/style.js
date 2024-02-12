import { StyleSheet } from "react-native";
import colors from '../../utils/colors'
import { fonts, setWidth } from "../../utils/variable";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    content: {
        flex: 1,
        backgroundColor: colors.grey5,
        paddingHorizontal: setWidth(2)
    },
    row:{
        flexDirection:'row'
    },
    heading: {
        fontSize: setWidth(4),
        color: colors.black,
        fontWeight:'bold',
        marginTop: setWidth(5),        
    },
    horizontalFlatlistContainer: {
        height: setWidth(25),
        marginTop: setWidth(5),
    },
    leftView: {
        flex: 0.2,
        backgroundColor: colors.grey5,
        overflow:'hidden',
        borderTopLeftRadius: setWidth(5),
        borderBottomLeftRadius: setWidth(5)
    },
    rightView: {
        flex: 0.8,
        paddingTop: setWidth(6),
        paddingBottom: setWidth(6),
        paddingLeft: setWidth(3),
        justifyContent: 'space-between'
    },
    justifyContentCenter: {
        justifyContent: 'center'
    },
    alignItemsCenter: {
        alignItems: 'center'
    },
    leftSideOfferTextView: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        justifyContent: 'center',
    },
    leftSideOfferText: {
        textAlign: 'center',
        fontSize: setWidth(4),
        transform: [{
            rotate: '-90deg'
        }],
        width: '110%',
        fontFamily: fonts.fontBold,
        color: colors.white
    },
    promocodesidebg: {
        width: '100%',
        height: '100%',
        //backgroundColor: colors.white
    },
    listItem: {
        backgroundColor: colors.white,
        height: setWidth(50),
        borderRadius: setWidth(5)
    },
    itemImg: {
        width: setWidth(18),
        height: setWidth(18),
        borderRadius: setWidth(20),
    },
    logoView: {
        borderColor: colors.yellow,
        borderWidth: setWidth(0.5),
        borderRadius: setWidth(1),
        padding: setWidth(0.5)
    },
    logo: {
        width: setWidth(6),
        height: setWidth(6),
        tintColor: colors.yellow,
    },
    code: {
        marginLeft: setWidth(2),
        fontFamily: fonts.fontBold
    },
    codeDescriptionText: {
        fontSize: setWidth(3),
        color: colors.circleyellow,
        fontFamily: fonts.fontRegular,
    },

    borderDashedTop:{
        borderTopColor: colors.grey5,
        borderStyle: 'dashed',
        borderTopWidth: setWidth(0.4),
    },
    codeFooterView: {
        // paddingTop: setWidth(4),        
        // marginRight: setWidth(3)
    },

    /* searchbox view */
    searchBoxView:{
        backgroundColor: colors.white,
        marginTop: setWidth(5),
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal: setWidth(3),
        borderRadius: setWidth(2),
        borderColor: colors.grey5,
        borderWidth: setWidth(0.3)
    },
    searchInput:{
        flex:1,
        marginHorizontal: setWidth(2),
        height: setWidth(12),
        fontFamily: fonts.fontRegular
    }
})