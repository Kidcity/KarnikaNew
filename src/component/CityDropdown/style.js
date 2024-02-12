import { Dimensions, StyleSheet } from "react-native";
import { fonts, setHeight, setWidth, shadow_css } from "../../utils/variable";
import colors from "../../utils/colors";

const { width, height } = Dimensions.get("screen")

export const styles = StyleSheet.create({
    container:{
        paddingVertical: setHeight(2),
        backgroundColor: colors.white,
        zIndex: 9999,
    },
    row:{
        flexDirection:'row'
    },
    fixed_button_3:{
        // width: width / 3 - setWidth(2),
        flex:1
    },
    cityBtn:{
        width: width / 4 - setWidth(2),
        marginRight: setWidth(2),
        borderRadius: setWidth(1),
        borderColor: colors.lightRed,
        borderWidth: setWidth(0.3),
        height: setHeight(5),
        justifyContent: 'center',
        backgroundColor: colors.white,
        ...shadow_css
    },
    cityName:{
        textAlign: 'center',
        fontFamily: fonts.fontRegular,
        color: colors.red,
        fontSize: setWidth(3.2)
    },
    activeCity: {
        backgroundColor: colors.lightRed
    },
    activeCityText: {
        color: colors.white
    },


    showmoreBtn:{
        flexDirection:'row',
        paddingHorizontal: setWidth(2),
        borderRadius: setWidth(5),
        borderColor: colors.white,
        borderWidth: setWidth(0.3),
        height: setHeight(5),
        alignItems:'center',
        backgroundColor: colors.blue3,
        ...shadow_css,
    },
    showmoreText:{
        textAlign: 'center',
        fontFamily: fonts.fontRegular,
        color: colors.white,
        fontSize: setWidth(3.2)
    },
    modal:{
        position: 'absolute',
        right: 0,
        top: setHeight(5),
        backgroundColor: colors.white,
        zIndex: 9999,
        width: setWidth(40),
        alignItems:'center',
        paddingVertical: setHeight(2),
        ...shadow_css
    },
    modalBtn:{
        width:'80%',
        marginRight: 0,
        marginTop: 10
    }
})