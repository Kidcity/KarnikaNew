import { StyleSheet, Dimensions } from "react-native";
import colors from "../../utils/colors";
import { DEVICE_HEIGHT, DEVICE_WIDTH, fonts, normalize, setWidth } from "../../utils/variable";

const {width, height} = Dimensions.get("screen")

export const styles = StyleSheet.create({
    container:{
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent:'center',
        alignItems:'center',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: 999999
    },
    row: {
        flexDirection: 'row'
    },
    btnClose:{
        position: 'absolute',
        right: 10,
        padding: normalize(10),
    },
    heading:{
        fontFamily: fonts.bold,
        fontSize: setWidth(10),
        textAlign:'center',
        color: colors.black,
        marginBottom: normalize(10)
    },
    content:{
        width: setWidth(100-10),
        backgroundColor: colors.white,
        paddingVertical: setWidth(8),
        paddingHorizontal: setWidth(4),
        borderRadius: setWidth(3),        
    },
    title: {
        fontFamily: fonts.fontRegular,
        fontSize: setWidth(4),
        textAlign:'center',
        color: colors.dark_charcoal
    },
    btn:{
        flexDirection:'row',
        paddingHorizontal: setWidth(6),
        paddingVertical: setWidth(2),
        borderRadius: setWidth(3),
        elevation: 8,
        overflow:'hidden',
        backgroundColor: colors.themeColor,
        height: normalize(50),
        alignItems:'center',
        justifyContent:'space-between'
    },
    btnText:{
        // flex:1,
        fontFamily: fonts.bold,
        color: colors.dark_charcoal,
    },
    footerText:{
        fontFamily: fonts.bold,
        color: colors.black,
        marginTop: normalize(8),
        fontSize: normalize(9),
        textAlign:'center'
    }
})