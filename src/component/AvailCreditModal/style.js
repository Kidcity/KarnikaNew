import { Dimensions, StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { fonts, setHeight, setWidth } from "../../utils/variable";

const {width, height} = Dimensions.get("screen")

export const styles = StyleSheet.create({
    container:{
        position: 'absolute',
        width:width,
        height: height,
        backgroundColor: 'rgba(0,0,0,0.935)',
        justifyContent: 'center',
        alignItems:'center'
    },
    content:{ 
        width: setWidth(70),
        paddingVertical: setHeight(3),
        backgroundColor: colors.white,        
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: setWidth(5),
        paddingBottom: setHeight(10)
        // paddingHorizontal: setWidth(10)
    },
    lottiView:{
        // position: 'relative',
        height: setHeight(25)
    },
    heading:{
        fontFamily: fonts.fontRegular,
        color: colors.blue1,
        fontSize: setWidth(8),
        textAlign: 'center'
    },
    smallText:{
        fontFamily: fonts.fontRegular,
        color: colors.grey2,
        fontSize: setWidth(5),
        textAlign: 'center',
        marginTop: setHeight(1)
    },
    boldText:{
        fontFamily: fonts.fontBold,
        color: colors.blue2,
        fontSize: setWidth(5),
        marginTop: setHeight(1)
    },    
    footerTextView:{
        marginTop: -50
    },
    btn:{
        // backgroundColor: colors.blue2,
        width: setWidth(25),
        height: setWidth(25),
        borderRadius: setWidth(40),
        justifyContent:'center',
        alignItems:'center',
    },
    correctIcon:{
        flex:1
    },
})