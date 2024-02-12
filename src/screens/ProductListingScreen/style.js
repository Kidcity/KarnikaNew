import { Dimensions, StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { fonts, setHeight, setWidth } from "../../utils/variable";

const {width, height} = Dimensions.get("screen")

export const styles = StyleSheet.create({
    container:{
      flex:1,
        backgroundColor: colors.white
    },
    content:{
        flex: 1
    },
    filterContainer:{
        backgroundColor: colors.white,
        paddingVertical: setWidth(2),
        alignItems:'center',
        justifyContent:'space-between'
    },
    row:{
        flexDirection:'row'
    },
    gridbtn:{
        padding: setWidth(4)
    },
    listContainer:{
        flex: 1,
        // backgroundColor:'red'
        marginTop: setWidth(2),
        marginHorizontal: setWidth(2),        
    },
    emptyMessageStyle:{
        textAlign:'center',
        fontFamily: fonts.fontRegular,
        marginTop: setHeight(2),
        color: colors.dark_charcoal
    }
})