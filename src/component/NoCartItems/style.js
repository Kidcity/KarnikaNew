import { StyleSheet } from "react-native";
import { colors } from "../../utils/colors";
import { fonts, normalize } from "../../utils/variables";



export const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.white,
        marginHorizontal: normalize(20),
        marginTop: normalize(20),
        paddingVertical: normalize(20),
        borderRadius: normalize(10),
        alignItems:'center'
    },
    image:{
        width: normalize(100),
        height: normalize(100)
    },
    heading:{
        fontSize: normalize(20),
        color: colors.charcoal
    },
    subheading:{
        fontSize: normalize(13),
        color: colors.grey3
    },
    button:{
        backgroundColor: colors.lightRed,
        paddingVertical: normalize(10),
        paddingHorizontal: normalize(20),
        borderRadius: normalize(20),
        marginTop: normalize(20)
    },
    btnText:{
        fontFamily: fonts.bold,
        color: colors.white,
        fontSize: normalize(15),
    }
})