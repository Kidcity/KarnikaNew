import { StyleSheet, Dimensions } from "react-native";
import colors from "../../utils/colors";
import { fonts, setWidth } from "../../utils/variable";

const {width, height} = Dimensions.get("screen")

export const styles = StyleSheet.create({
    container:{
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.8)',
        width: width,
        height: height,
        justifyContent:'center',      
    },
    content:{
        backgroundColor:colors.white,
        padding: setWidth(5),
        borderRadius: setWidth(3),
        marginHorizontal: setWidth(5),
        alignItems:'center'
    },
    heading1:{
        fontFamily: fonts.fontBold,
        fontSize: setWidth(5),
        color: colors.dark_charcoal,
        textAlign:'center'
    },
    heading2:{
        fontFamily: fonts.fontRegular,
        fontSize: setWidth(4),
        color: colors.dark_charcoal,
        marginTop: setWidth(5),
        textAlign:'center'
    },
    btn:{
        padding: setWidth(3),
        width: setWidth(50),
        backgroundColor: colors.primaryyellow,
        borderRadius: setWidth(3),
        marginTop: setWidth(5)
    },
    btnText:{
        textAlign:'center',
        color: colors.white,
        fontWeight:'bold',
        fontSize: setWidth(4),
        fontFamily: fonts.fontRegular
    }
})