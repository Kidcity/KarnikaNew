import { StyleSheet } from "react-native";
import colors from "../utils/colors";
import { setWidth } from "../utils/variable";

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignSelf: 'stretch',
        justifyContent:'center', 
        // shadowOffset: { width: 1, height: 1}, 
        // shadowColor: 'gray', 
        // shadowRadius: 1,
        // elevation: 12
    },
    title:{
        fontSize: setWidth(3),
        textAlign:'center',
        color: colors.dark_charcoal
    },
    icon:{
        alignSelf:'center'
    }
})