import { StyleSheet } from "react-native";
import { colors } from "../../utils/colors";
import { normalize } from "../../utils/variables";


export const styles = StyleSheet.create({
    container:{
        // paddingHorizontal: normalize(10)
    },
    result:{
        paddingVertical: normalize(10),
        borderBottomColor: colors.grey1,
        borderBottomWidth: normalize(2),
        borderTopColor: colors.grey1,
        borderTopWidth: normalize(2),   
        paddingHorizontal: normalize(10) 
    },
    paddingHorizontal10:{
        paddingHorizontal: normalize(10) 
    }
})