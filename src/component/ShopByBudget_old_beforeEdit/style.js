import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { fonts, normalize, setHeight, setWidth } from "../../utils/variable";

export const styles = StyleSheet.create({
    shopByBudgetContainer:{
        // paddingTop: setWidth(20),
        // height: setHeight(80),
        height: normalize(400),
        
        // marginBottom: setWidth(5)
    },
    heading: {
        textAlign: 'center',
        fontSize: setWidth(4.5),
        fontFamily: fonts.fontBold,
        color: colors.black,
        marginBottom: setWidth(7),
        marginTop: setWidth(12)
    },
    row: {
        flexDirection: 'row'
    },
    justifyCenter: {
        justifyContent: 'center',
    },    
    budgetImageView:{
        width: setWidth(48),
        height: setWidth(52),
    },
    budgetImage:{
        width: '100%',
        height: undefined,
        aspectRatio: 1,
    },
})