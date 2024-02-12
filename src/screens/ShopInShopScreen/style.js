import { StyleSheet } from "react-native";
import { fonts, setHeight, setWidth } from "../../utils/variable";
import colors from "../../utils/colors";

export const styles = StyleSheet.create({
    container:{
        flex:1
    },
    content:{
        flex:1,
    },
    row:{
        flexDirection:'row'
    },
    heading:{
        fontFamily: fonts.fontBold,
        fontSize: setWidth(6),
        textAlign:'center',
        color: colors.black,
        marginTop: setHeight(2)
    },
    itemLeft: {
        flex: 0.4,
        borderRightColor: colors.grey5,
        borderRightWidth: setWidth(0.3),
    },
    itemRight: {
        flex: 0.6,
        justifyContent: 'space-around',
        paddingHorizontal: setWidth(2),
        paddingVertical: setHeight(1.3)
    },
    itemContainer: {
        // height: setHeight(15),
        backgroundColor: colors.white,
        borderColor: colors.grey1,
        borderWidth: setWidth(0.2),
        borderRadius: setWidth(2),
        overflow: 'hidden',        
    },
    itemImage: {
        flex: 1,
        aspectRatio: 1
    },
    itemTitle: {
        color: colors.grey2
    },
    alignItemsCenter: {
        alignItems: 'center'
    },
    top_gap:{
        marginTop: setHeight(1)
    }

})