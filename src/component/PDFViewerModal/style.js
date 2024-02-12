import { StyleSheet, Dimensions } from "react-native";
import colors from "../../utils/colors";
import { fonts, setHeight, setWidth } from "../../utils/variable";

const {width, height} = Dimensions.get("screen")

export const styles = StyleSheet.create({
    container:{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: width,
        backgroundColor: colors.black,        
    },
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    },
    footerBtnView:{
        padding: setWidth(5),
        backgroundColor: colors.white,
        paddingVertical: setWidth(6)

    },
    footerBtn:{
        backgroundColor: colors.lightRed,
        flexDirection: 'row',
        paddingVertical: setHeight(1),
        borderRadius: setWidth(2),
        justifyContent:'center',
        alignItems:'center'
    },
    btnText:{
        color: colors.white,
        fontFamily: fonts.fontRegular,
        marginLeft: setWidth(2)
    }
})
