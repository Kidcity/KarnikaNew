import { StyleSheet } from "react-native";
import { fonts, setHeight, setWidth } from "../../utils/variable";
import colors from "../../utils/colors";

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: setWidth(4)  
    },
    textBold: {
        fontFamily: fonts.fontBold
    },
    darkText:{
        color: colors.dark_charcoal
    },
    textGap:{
        marginVertical: setWidth(1)
    },
    subHeading:{
        color: colors.grey2,
        fontSize: setWidth(3.5),
        fontFamily: fonts.fontRegular,        
    },
    textRight:{
        textAlign:'right'
    },
    row:{
        flexDirection:'row'
    },
    priceBoxView:{
        backgroundColor: colors.white,
        paddingHorizontal: setWidth(4),
        paddingVertical: setWidth(4),
        marginTop: setWidth(4),
        borderRadius: setWidth(3),
        borderColor: colors.grey1,
        borderWidth: setWidth(0.3)
    },
})