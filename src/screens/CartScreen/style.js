import { StyleSheet, Dimensions, Platform } from "react-native";
import colors from "../../utils/colors";
import { fonts, setHeight, setWidth } from "../../utils/variable";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const screenheight = Dimensions.get("screen").height
const windowheight = Dimensions.get("window").height
const navheight = screenheight - windowheight


export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.grey6
    },
    content:{
        flexGrow: 1,
       // height: height,
        backgroundColor: colors.grey5,
        paddingBottom: setHeight(15),
        paddingTop: setHeight(3)
    },
    row:{
        flexDirection:'row'
    },
    text:{
        fontSize: setWidth(3.5),
        fontFamily: fonts.fontRegular
    },
    subHeading:{
        color: colors.grey2,
        fontSize: setWidth(3.5),
        fontFamily: fonts.fontRegular
    },
    textBold: {
        fontFamily: fonts.fontBold
    },
    darkText:{
        color: colors.dark_charcoal
    },

    /* Map View */
    mapPointerView:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        marginVertical: setWidth(6),
        paddingHorizontal: setWidth(7)
    },
   
    /* product price details */
    priceDetailsView:{
        marginTop: setWidth(5)
    },
    priceBoxView:{
        backgroundColor: colors.white,
        paddingHorizontal: setWidth(2),
        paddingVertical: setWidth(5),
        borderColor: colors.grey5,
        borderWidth: setWidth(0.5),
        marginTop: setWidth(2)
    },

    /* Button */
    btn:{
        flexDirection:'row',
        paddingVertical: setWidth(3),
        paddingHorizontal: setWidth(2),
        backgroundColor: colors.white,
        marginTop: setWidth(5),
        justifyContent:'space-between',
        alignItems:'center',
        borderRadius: setWidth(2)
    },

    /* Footer */
    footer:{
        padding: setWidth(3),
        paddingVertical: setHeight(2.5),
        paddingBottom: Platform.OS === 'ios' ? setHeight(5): null,
        backgroundColor: colors.white,
        flexDirection:'row',
        alignItems:'center'
    },
    footerBtn:{
        flex: 1,
        padding: setWidth(3),        
        backgroundColor: colors.btnGreen,
        borderRadius: setWidth(2),
        // marginLeft: setWidth(7)
    },
    footerBtnText:{
        color: colors.white,
        textAlign:'center',
        fontSize: setWidth(4),
        fontFamily: fonts.fontBold,
    }
})