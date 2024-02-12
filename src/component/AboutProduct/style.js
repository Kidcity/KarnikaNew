import { StyleSheet, Dimensions } from "react-native";
import colors  from "../../utils/colors";
import { fonts, normalize } from "../../utils/variable";


export const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.white,
        paddingTop: normalize(25),
        paddingBottom: normalize(10),
        paddingHorizontal: normalize(7)
    },
    heartBtn:{
        position: 'absolute',
        top: -30,
        right: 0,
        zIndex: 9,
    },
    itemsLeftContainer:{
        position: 'absolute',
        top: -70,
        right: 0,
        backgroundColor: 'rgba(255,0,0,0.7)',
        paddingHorizontal: normalize(15),
        paddingVertical: normalize(5),
        borderTopLeftRadius: normalize(10),
        borderBottomLeftRadius: normalize(10)
    },
    price:{
        fontFamily: fonts.bold,
        color: colors.black,
        fontSize: normalize(13),
    },
    crossedText:{
        fontFamily: fonts.regular,
        color: colors.grey3,
        fontSize: normalize(13),
        textDecorationLine:'line-through'
    },
    offerText:{
        fontFamily: fonts.regular,
        color: colors.green1,
        fontSize: normalize(13),
    },
    block: { 
        marginTop: normalize(10), 
        flex: 1 
    },
    productTitle:{
        fontFamily: fonts.regular,
        color: colors.charcoal,
        fontSize: normalize(12),
        letterSpacing: 0.8,  
    },
    productBrand:{
        fontFamily: fonts.regular,
        color: colors.grey2,
        fontSize: normalize(12),
        letterSpacing: 1,  
        textTransform:'uppercase',
        // marginTop: normalize(2)
    },
    movView:{
        backgroundColor: colors.primaryyellow,
        paddingVertical: normalize(5)
    },
})