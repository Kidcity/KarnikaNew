import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { fonts, setWidth } from "../../utils/variable";

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.white
    },
    content:{
        flex: 1,
        paddingHorizontal: setWidth(4)
    },
    row:{
        flexDirection:'row'
    },
    justifyBetween:{
        justifyContent:'space-between'
    },
    text:{
        fontSize: setWidth(3.5),
        color: colors.grey3,
        fontFamily: fonts.fontRegular
    },
    darkText:{
        color: colors.dark_charcoal
    },
    productCard:{
        marginTop: setWidth(5),
        flexDirection:'row',
        // height: setWidth(40)
    },
    leftBlock:{
        flex: 0.3,
        borderColor: colors.grey1,
        borderWidth: setWidth(0.3)
    },
    rightBlock:{
        flex: 0.7,
        borderColor: colors.grey5,
        borderWidth: setWidth(0.3),
    },
    productImage:{
        // width: '100%',
        // height: undefined,
        flex: 1,
        // aspectRatio: 1
    },
    detailsBlock:{
        //paddingVertical: setWidth(1)
        paddingHorizontal: setWidth(2),
        paddingVertical: setWidth(2)
    },
    bottomborder:{
        borderColor: colors.grey5,
        borderWidth: setWidth(0.1),
        backgroundColor: colors.grey5
    },
    removeButton:{
        // marginTop: 'auto',
        backgroundColor: colors.lightRed,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal: setWidth(4),
        paddingVertical: setWidth(3)
    },
    removeButtonText:{
        color: colors.white,
        fontFamily: fonts.fontRegular,
        fontSize: setWidth(3.2)
    }
})