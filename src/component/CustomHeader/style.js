import { StyleSheet, Dimensions } from "react-native";
import colors from "../../utils/colors";
import { fonts, setHeight, setWidth } from "../../utils/variable";

const {width, height} = Dimensions.get("screen")

export const styles = StyleSheet.create({
    container:{        
        height: setHeight(9),  
        backgroundColor: colors.white,
        // paddingHorizontal: 10,       
        borderBottomColor: colors.grey1,
        borderBottomWidth: setWidth(0.3),
        zIndex: 999
    },
    heading_image:{
        width: setWidth(30),
        height: setHeight(10),
        alignSelf:'center'
    },
    backBtn:{
        flex:1,
        paddingLeft: setWidth(2),
        justifyContent:'center'
    },
    heading:{
        fontSize: setWidth(4),
        fontFamily: fonts.fontBold,
        color: colors.grey2,
        textAlign:'center'
    },
    brandName:{
        fontSize: setWidth(7),
        fontFamily: fonts.fontStylish,
        color: colors.primaryyellow,
        textAlign:'center'
    },
    menuBtn:{
        flex: 1,        
        justifyContent:'center',
        paddingLeft: setWidth(5)
    },
    justifyCenter:{
        justifyContent:'center',
    },
    justifyBetween:{
        justifyContent: 'space-between'
    },
    alignItemsCenter:{
        alignItems: 'center'
    },
    row:{
        flexDirection: 'row'
    },
    rightIconContainer:{   
        flex: 1,     
        justifyContent: 'space-around',
    },
    icon:{
        flex: 1,
        alignItems:'center',
        justifyContent:'center',  
    },
    image:{
        width: setWidth(8),
        height: setWidth(8)
    },
    searchboxContainer:{
        height: setWidth(15),
        borderBottomColor: colors.grey1,
        borderBottomWidth: setWidth(0.3),
        backgroundColor: colors.white
    },
    searchbox:{
        flex: 1,
        fontSize: setWidth(4),
        color: colors.dark_charcoal,        
    },   
    notificationView:{
        backgroundColor: 'red',        
        position: 'absolute',
        top: -10,
        right: -10,
        width: setWidth(6),
        height: setWidth(6),
        borderRadius: setWidth(6),
        zIndex: 1,
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center'
    },
    notificationNumber:{        
        color: colors.white,
        fontFamily: fonts.fontBold,  
        fontSize: setWidth(3)
    },
    suggestionBox:{
        position: 'absolute',                
        left: 0,
        right: 0,
        top: 62,
        backgroundColor: 'rgba(0,0,0,0.6)',
        zIndex: 9,
        height: height,
        overflow:'hidden'
    },
    suggestionContainer:{
        backgroundColor: colors.white,
        height: setHeight(40),
        position: 'relative',
        zIndex: 999,
        backgroundColor: colors.white
    },
    suggestionTextView:{
        paddingVertical: setWidth(4),
        borderBottomColor: colors.grey1,
        borderBottomWidth: setWidth(0.3),
        paddingHorizontal: setWidth(4)
    },
    suggestionText:{
        fontFamily: fonts.fontRegular,
        fontSize: setWidth(3.5),
        color: colors.dark_charcoal
    },
    menuText:{
        fontFamily: fonts.fontBold,
        fontSize: setWidth(3),
        color: colors.dark_charcoal
    },
    menuView:{
        borderColor: colors.grey3,
        borderWidth: setWidth(0.3),
        borderRadius: setWidth(1),
        paddingHorizontal: setWidth(2)
    }
})