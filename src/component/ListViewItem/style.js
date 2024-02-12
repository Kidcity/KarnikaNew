import { StyleSheet, Dimensions } from "react-native";
import colors from "../../utils/colors";
import { fonts, setHeight, setWidth } from "../../utils/variable";

const width = Dimensions.get("screen").width

export const styles = StyleSheet.create({
    container:{
        // height: setHeight(26),
        borderRadius: setWidth(2),
        overflow:'hidden',
        marginTop: setWidth(2),
        marginHorizontal: setWidth(2),
        borderColor: colors.grey5,
        borderWidth: setWidth(0.3),    
        // height: setWidth(61),    
    },
    left:{
        flex: 0.5,
        justifyContent:'center'
    },
    right:{
        flex: 0.5,  
    },
    productImage:{
        flex:1,
        width: '100%',
        height: '100%',        
    },
    row:{
        flexDirection:'row'
    },
    favBtn:{
        backgroundColor: colors.white, 
        position: 'absolute', 
        right: 10, 
        top: 5,
        padding: setWidth(1),
        borderRadius: setWidth(5),
        elevation: 8,
        shadowColor: colors.grey2,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.9,
        shadowRadius: 1,
    },
    itemsLeftContainer:{
        position: 'absolute',
        bottom: 10,
        right: 0,
        backgroundColor: colors.lightRed,
        paddingHorizontal: setWidth(5),
        paddingVertical: setWidth(1),
        borderTopLeftRadius: setWidth(1.2),
        borderBottomLeftRadius: setWidth(1.2)
    },  
    justifyBetween:{
        justifyContent:'space-between'
    },
    justifyEnd:{
        justifyContent:'flex-end'
    },
    alignItemEnd:{
        alignItems:'flex-end'
    },
    block:{      
        borderLeftColor: colors.grey5,
        borderLeftWidth: setWidth(0.3),
        borderRightColor: colors.grey5,
        borderRightWidth: setWidth(0.3),
        borderBottomColor: colors.grey5,
        borderBottomWidth: setWidth(0.3),
        paddingHorizontal: setWidth(3),
        // paddingVertical: setWidth(2),
        justifyContent:'center'
    },
    text:{
        fontSize: setWidth(3),
        color: colors.dark_charcoal,
        fontFamily: fonts.fontBold,
        flexWrap: 'wrap',
        flexShrink: 1
    },
    largeBoldFont:{
        fontSize: setWidth(4),
        fontFamily: fonts.fontBold,
        color: colors.grey2
    },
    strikThroughFont:{
        textDecorationLine:'line-through',
        color: colors.lightRed
    },
    subHeading:{
        color: colors.borderColor,
        fontFamily: fonts.fontBold,
    },
    fontBold:{
        fontFamily: fonts.fontBold
    },
    movView:{
        backgroundColor: colors.primaryyellow,
        paddingVertical: setHeight(1)
    },
})