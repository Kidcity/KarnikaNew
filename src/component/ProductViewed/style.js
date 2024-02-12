import { StyleSheet } from "react-native";
import { DEVICE_WIDTH, fonts, normalize } from "../../utils/variables";
import { colors } from "../../utils/colors";

export const styles = StyleSheet.create({
    container:{
        
    },
    heading:{
        paddingVertical: normalize(10),
        paddingHorizontal: normalize(10), 
    },
    title:{
        fontFamily: fonts.bold,
        color: colors.black,
        fontSize: normalize(13),
        textTransform:'uppercase'
    },
    separator:{
        marginRight: normalize(10)
    },
    product:{
        backgroundColor: colors.white,
        width: (DEVICE_WIDTH / 2.5),
    },
    imageContainer:{
        height: normalize(150),
        width: '100%',        
        backgroundColor: colors.white
    },
    image:{
        flex:1
    },
    productDetails:{
        backgroundColor: colors.white,
        paddingTop: normalize(18),
        paddingBottom: normalize(5),
        // paddingHorizontal: normalize(7)
    },
    heartBtn:{
        position: 'absolute',
        top: -30,
        right: 0,
        zIndex: 9,

    },
    price:{
        fontFamily: fonts.bold,
        color: colors.black,
        fontSize: normalize(13),
    },
    crossedText:{
        fontFamily: fonts.regular,
        color: colors.grey1,
        fontSize: normalize(12),
        textDecorationLine:'line-through'
    },
    offerText:{
        fontFamily: fonts.regular,
        color: colors.green1,
        fontSize: normalize(12),
    },
    productTitle:{
        fontFamily: fonts.regular,
        color: colors.grey1,
        fontSize: normalize(12),
        letterSpacing: 1,  
    },
    productBrand:{
        fontFamily: fonts.regular,
        color: colors.grey1,
        fontSize: normalize(12),
        letterSpacing: 1,  
        textTransform:'uppercase',
        marginTop: normalize(5)
    }
})