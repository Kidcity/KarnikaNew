import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { DEVICE_WIDTH, fonts, normalize, setHeight, setWidth } from "../../utils/variable";

export const styles = StyleSheet.create({
    container: {
        marginTop: setWidth(2),
    },
    brandView: {
        // height: 180,
        width: setWidth(100),
        overflow: 'visible',
        // paddingLeft: setWidth(2),
        borderColor: colors.dark_charcoal,
        // backgroundColor:'green'
    },
    heading:{
        paddingVertical: normalize(10),
        paddingHorizontal: normalize(10), 
        
    },
    title:{
        fontFamily: fonts.bold,
        color: colors.black,
        fontSize: normalize(12),
        textTransform:'uppercase'
    },
    animatedTextStyle: {
        fontSize: setWidth(4),
        fontFamily: fonts.fontBold,
        color: colors.white,
        textAlign:'center',
        textTransform:'uppercase'
    },
    animatedTextContainerStyle: {      
        alignItems:'center',
        paddingVertical: setHeight(0.6)
    },
    headingView:{
        width: '100%',
        height: normalize(50),
        // paddingVertical: setHeight(1.6),
        // paddingLeft: setWidth(2),
        // backgroundColor: colors.primaryyellow,
        // borderRadius: setWidth(2),
        // marginHorizontal: setWidth(2),
        justifyContent:'center',
        alignItems:'center'
    },
    titleImage:{
        width: '100%',
        height: '100%'
    },
    brandImageView:{
        width: (DEVICE_WIDTH / 3) - 20 ,
        height: normalize(90),       
        borderRadius: setWidth(3),
        borderColor: colors.grey1,
        borderWidth: setWidth(0.1),
        backgroundColor: colors.white,
        overflow:'hidden'        
    }, 
    brandimage:{
        flex:1
    }

})