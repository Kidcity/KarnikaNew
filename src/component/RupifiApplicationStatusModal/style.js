import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { fonts, setHeight, setWidth, shadow_css } from "../../utils/variable";

export const styles = StyleSheet.create({
    modalContainer:{
        backgroundColor:'rgba(0,0,0,0.7)', 
        position:'absolute', 
        top: 0,
        bottom: 0, 
        right:0, 
        left: 0,  
        justifyContent:'center', 
        alignItems:'center'
    },
    content:{
        backgroundColor: colors.white,
        width: setWidth(75),
        paddingHorizontal: setWidth(5),
        borderRadius: setWidth(3),
        // paddingTop: setHeight(5),
        elevation: 5,
        ...shadow_css,
        overflow:'hidden'
    },
    lottiView:{
        height: '60%',
    },
    lotti:{
        flex:1,
        alignSelf:'center'
    },
    heading1:{
        fontFamily: fonts.fontBold,
        fontSize: setWidth(5),
        textAlign:'center',
        color: colors.green
    },
    heading2:{
        fontFamily: fonts.fontBold,
        fontSize: setWidth(3.5),
        textAlign:'center',
        color: colors.grey3,
        marginTop: setHeight(3)
    },
    crossBtn:{
        // padding: setWidth(2),
        borderColor: colors.white,
        borderWidth: setWidth(0.3),
        borderRadius: setWidth(20),
        marginTop: setHeight(5)
    }
})