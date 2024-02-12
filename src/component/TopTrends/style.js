import { StyleSheet } from "react-native";

import  colors  from "../../utils/colors";
import { fonts, normalize } from "../../utils/variable";

export const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.white,
        // paddingHorizontal: normalize(10)
    },
    heading:{
        paddingVertical: normalize(10),
        paddingHorizontal: normalize(10), 
    },
    title:{
        fontFamily: fonts.bold,
        color: colors.black,
        fontSize: normalize(12),
        textTransform:'uppercase',
        letterSpacing: 0.8
    },
    imageContainer:{
        height: normalize(290),
        width: '100%'
    },
    primaryImage: {
       width:'100%',
       height: '100%'
    },
    
})