import { StyleSheet } from "react-native";
import { fonts, setHeight, setWidth, shadow_css } from "../../utils/variable";
import colors from "../../utils/colors";

export const styles = StyleSheet.create({
    container:{
        // flex: 1,
        // backgroundColor:'red'
    },
    imageView:{
        width: setWidth(40),
        height: setWidth(40),       
        borderRadius: setWidth(3),
        borderColor: colors.grey1,
        borderWidth: setWidth(0.1),
        backgroundColor: colors.white,
        ...shadow_css
    },    
    image:{
       flex:1,
       aspectRatio: 1,
    },
    viewMore:{
        width: setWidth(60),
        height: setWidth(40),       
        borderRadius: setWidth(3),
        borderColor: colors.grey1,
        borderWidth: setWidth(0.1),
        backgroundColor: colors.white,
        ...shadow_css,
        justifyContent:'center',
        alignItems:'center'
    },
    viewmoreText:{
        fontFamily: fonts.fontBold,
        color: colors.white,
        fontSize: setWidth(5),
        textDecorationLine: "underline",
    },
    animatedTextStyle: {
        fontSize: setWidth(5),
        fontFamily: fonts.fontBold,
        textDecorationLine: "underline",
        color: colors.black
    },
    animatedTextContainerStyle: {      
        alignItems:'center',
        paddingVertical: setHeight(0.6)
    },
    footer:{
        width: '100%',
        position:'absolute',
        bottom: -40,
        alignItems:'center',
        justifyContent:'center', 
    },
    logo:{
        width: setWidth(15),
        height: setWidth(15),
        borderRadius: setWidth(30),
        borderColor: colors.grey1,
        borderWidth: setWidth(0.1),
        backgroundColor: colors.white,
        ...shadow_css
    }
})