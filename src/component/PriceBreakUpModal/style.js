import { StyleSheet, Dimensions } from "react-native";
import colors from "../../utils/colors";
import { fonts, setHeight, setWidth, shadow_css } from "../../utils/variable";

const {width, height} = Dimensions.get("screen")

export const styles = StyleSheet.create({
    container:{
        height: height,
        width: width,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent:'center',
        alignItems:'center',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: 99999,
    },
    content:{
        backgroundColor: colors.white,
        padding: setWidth(5),
        width: setWidth(80),
        borderRadius: setWidth(1.5),                
        ...shadow_css
    },
    headingView:{
        borderBottomColor: colors.grey1, 
        paddingBottom: setHeight(2), 
        borderBottomWidth: setWidth(0.3)
    },
    heading: {
        fontFamily: fonts.fontBold,
        fontSize: setWidth(5),
        color: colors.grey2
    },
    priceDetailsView:{
        marginTop: setHeight(2),
        // borderBottomColor: colors.grey2,
        // borderStyle:'dashed',
        // borderBottomWidth: setWidth(0.3),
        paddingVertical: setHeight(3),
        // paddingHorizontal: setWidth(2),
        backgroundColor: colors.white,
    },
    row:{
        flexDirection: 'row'
    },
    justifyBetween:{
        justifyContent:'space-between'
    },
    text:{
        fontFamily: fonts.fontRegular,
        fontSize: setWidth(4),
        color: colors.grey2
    },
    textBold: {
        fontFamily: fonts.fontBold
    },
    textUnderline:{
        textDecorationLine: 'underline',
        textDecorationStyle:'dotted',        
    },
    textRed:{
        color: colors.red
    },
    tinyText:{
        fontFamily: fonts.fontRegular,
        fontSize: setWidth(3),
        color: colors.green
    },
    borderTop:{
        borderTopColor: colors.grey2,
        borderTopWidth: setWidth(0.3),
        // borderStyle: 'dashed'
    },
    borderTopBottom:{
        borderTopColor: colors.grey2,
        borderTopWidth: setWidth(0.3),
        borderBottomColor: colors.grey2,
        borderBottomWidth: setWidth(0.3),
        // borderStyle: 'dashed'
    },
    mr_top_2:{
        marginTop: setHeight(2)
    },
    mr_top_4:{
        marginTop: setHeight(4)
    },
    totalAmountView:{
        borderTopColor: colors.grey2,
        borderTopWidth: setWidth(0.3),        
        borderBottomColor: colors.grey2, 
        borderBottomWidth: setWidth(0.3), 
        paddingVertical: setHeight(2), 
        borderStyle: 'dashed'
    },
    cancelBtn:{
        flex: 0.45,
        backgroundColor: colors.red,
        paddingVertical: setWidth(3),
        borderRadius: setWidth(1.5),   
        ...shadow_css
    },
    payBtn:{
        flex: 0.45,
        backgroundColor: colors.primaryyellow,
        paddingVertical: setWidth(3),
        borderRadius: setWidth(1.5),    
        ...shadow_css 
    },
    btnText:{
        fontFamily: fonts.fontBold,
        fontSize: setWidth(4),
        color: colors.white,
        textAlign:'center'
    }
})