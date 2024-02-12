import { StyleSheet } from "react-native";
import colors  from "../../utils/colors";
import { fonts, normalize } from "../../utils/variable";

export const styles = StyleSheet.create({
    container:{
        // backgroundColor: colors.grey1,
        paddingBottom:normalize(10),
        marginHorizontal: normalize(5),
        borderRadius: normalize(10),
        marginTop: normalize(10)
    },
    heading: {
        paddingVertical: normalize(10)
    },
    title:{
        fontFamily: fonts.bold,
        color: colors.dark_charcoal,
        fontSize: normalize(12),
        textAlign:'center',
        letterSpacing: 1,
        textTransform:'uppercase',
    }
})