import { StyleSheet } from "react-native";
import { normalize } from "../../utils/variable";


export const styles = StyleSheet.create({
    container:{
        width: normalize(20),
        height: normalize(20),
        backgroundColor:'red',
        borderRadius: normalize(20),
        marginRight: normalize(6),
        justifyContent:'center',
        alignItems: 'center'
    },
    moreContainer:{
        borderRadius: normalize(20),
        marginRight: normalize(6),
        justifyContent:'center',
        alignItems: 'center',
        paddingHorizontal: normalize(9),
        paddingVertical: normalize(8)
    }
})