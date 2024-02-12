import { StyleSheet, Dimensions, Platform } from "react-native";
import colors from "../../utils/colors";
import { fonts, setHeight, setWidth } from "../../utils/variable";

const {width, height} = Dimensions.get("screen")

export const styles = StyleSheet.create({
    container:{
        // position: 'absolute',
        // bottom: 0,
        height: Platform.OS === 'ios' ? setHeight(9) : setHeight(8),
        // paddingBottom: 9,
        width: width,
        flexDirection:'row',
        zIndex: -99,
    },
    title:{
        fontSize: setWidth(3),
        textAlign:'center',
        color: colors.dark_charcoal,
        fontFamily: fonts.fontRegular
    },
    icon:{
        alignSelf:'center'
    },
    menuView:{
        // width: width / 5,
        flex:1,
        justifyContent:'center',
        borderColor: colors.grey6,
        borderWidth: setWidth(0.3)
    }
})