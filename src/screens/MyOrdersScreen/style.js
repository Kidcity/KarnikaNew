import { StyleSheet, Dimensions } from "react-native";
import colors from "../../utils/colors";
import { fonts, setWidth } from "../../utils/variable";

const {width, height} = Dimensions.get("screen")

export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: colors.white,
    },
    content:{
        flex:1,
        marginHorizontal: setWidth(4)
    },
    searchTextInut:{
        flex:1,
        height: setWidth(10),   
        fontFamily: fonts.fontRegular     
    },  
    text:{
        fontFamily: fonts.fontRegular,
        fontSize: setWidth(3.4),
        marginTop: setWidth(10)
    },
    /* order type item view */
    ordertypeItemView:{
        paddingVertical: setWidth(3),
        marginHorizontal: setWidth(4),
        // paddingHorizontal: setWidth(4),
        borderBottomColor: colors.grey5,
        borderBottomWidth: setWidth(0.3),
    },
    orderTypeBtn:{
        width:  (width - setWidth(3)) / 2.8  , // setWidth(35),
        paddingVertical: setWidth(2),
        marginRight: setWidth(2),
        borderRadius: setWidth(1.5),
        borderColor: colors.lightRed,
        borderWidth: setWidth(0.3)
    },
    activeOrderTypeBtn:{
        backgroundColor: colors.lightRed
    },
    orderTypeBtnText:{
        textAlign:'center',
        fontFamily: fonts.fontRegular,
        color: colors.red,
        fontSize: setWidth(3.2)
    },
    activeOrderTypeBtnText:{
        color: colors.white
    },

    /* search view  */
    searchViewContainer:{
        flexDirection:'row',
        alignItems:'center',
        borderColor: colors.grey3,
        borderWidth: setWidth(0.3),
        marginTop: setWidth(2)
    },
})