import { StyleSheet } from "react-native";
import { colors } from "../../utils/colors";
import { normalize } from "../../utils/variables";


export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: normalize(10),
        paddingVertical: normalize(10),
        borderBottomColor: colors.grey1,
        borderBottomWidth: normalize(2),        
    },
    imageContainer:{
        width: normalize(80),
        height: normalize(80),
        overflow:'hidden',
        borderRadius: normalize(10)
    },
    image:{
        flex:1
    },
    detailsContainer:{
        paddingLeft: normalize(10)
    },
    priceParameterContainer:{
        flex:1,
        alignItems:'flex-end',
        justifyContent:'center'
    }
})