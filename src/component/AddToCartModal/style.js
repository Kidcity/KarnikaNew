import { StyleSheet, Dimensions } from "react-native";
import colors from "../../utils/colors";
import { fonts, setHeight, setWidth } from "../../utils/variable";
const {width, height} = Dimensions.get("screen")

export const styles = StyleSheet.create({
    container:{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: width,
        height: height,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent:'center',
        zIndex: 999
    },
    content:{
        backgroundColor: colors.white,
        marginHorizontal: setWidth(13),
        paddingVertical: setWidth(5),
        borderRadius: setWidth(3)
    },
    heading:{
        textAlign: 'center',
        fontFamily: fonts.fontBold,
        color: colors.grey2,
        fontSize: setWidth(3.5)
    },
    productView:{
        borderTopColor: colors.grey1,
        borderTopWidth: setWidth(0.3),
        borderBottomColor: colors.grey1,
        borderBottomWidth: setWidth(0.3),
        paddingVertical: setWidth(3),
        flexDirection:'row'
    },
    leftBlock:{
        flex: 0.3,
        // backgroundColor:'pink',
        alignItems:'flex-end'
    },
    rightBlock:{
        flex: 0.7,
        justifyContent:'space-around',
        // paddingLeft: setWidth(1)
    },
    image:{
        width: setWidth(20),
        height: setHeight(10),
        // aspectRatio: 1,
        // backgroundColor:'red'
    },
    text:{
        fontFamily: fonts.fontRegular,
        color: colors.grey2,
        fontSize: setWidth(3.5)
    },
    textBold:{
        fontFamily: fonts.fontBold
    },
    textWhite:{
        color: colors.white
    },
    row:{
        flexDirection: 'row'
    },
    viewCartBtn:{
        backgroundColor: colors.primaryyellow,
        alignSelf:'center',
        paddingHorizontal: setWidth(8),
        paddingVertical: setWidth(2.5),
        borderRadius: setWidth(2),
        marginTop: setWidth(6)
    },
    moreProductBtn:{
        backgroundColor: colors.blue2,
        alignSelf:'center',
        paddingHorizontal: setWidth(8),
        paddingVertical: setWidth(2.5),
        borderRadius: setWidth(2),
        marginTop: setWidth(6)
    },
    closeBtnView:{
        position: 'absolute',
        bottom: -60,
        padding: setWidth(2),
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center'
    }
})