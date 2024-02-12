import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { DEVICE_WIDTH, fonts, normalize } from "../../utils/variable";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        paddingBottom: normalize(15)
    },
    heading: {
        paddingTop: normalize(10)
    },
    title: {
        fontFamily: fonts.bold,
        color: colors.black,
        fontSize: normalize(12),
        textTransform: 'uppercase',
        letterSpacing: 0.8,
        textAlign: 'center'
    },
    subtitle: {
        fontFamily: fonts.regular,
        color: colors.black,
        fontSize: normalize(9.5),
        textTransform: 'uppercase',
        letterSpacing: 0.8,
        textAlign: 'center',
        marginTop: normalize(5)
    },

    separator: {
        marginRight: normalize(8)
    },
    brandLogoView:{
        width: (DEVICE_WIDTH/5),
        height: (DEVICE_WIDTH/5),
        // backgroundColor:'red'
    },
    brandLogoContainer: {
        width: '100%',
        height: '100%',
        borderRadius: normalize(80),
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white
    },
    brandlogo: {
        // width: '90%',
        // height: '90%',
        flex:1,
        aspectRatio:1,
        borderRadius: normalize(80),
    },
    lottieContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    productContainer: {

    },
    smallbrandLogoContainer: {
        width: normalize(50),
        height: normalize(50),
        borderRadius: normalize(80),
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white
    },
    productCard: {
        width: (DEVICE_WIDTH / 3.5) - 8,
        height: normalize(130),
        borderRadius: normalize(9),
        overflow:'hidden',
        // marginLeft: normalize(10),
        borderColor: colors.grey5, 
        borderWidth: normalize(0.5),
        backgroundColor: colors.white

    },
    productimage:{
        flex:1
    }
    // product:{
    //     width: (DEVICE_WIDTH / 3.5) - 10,
    //     height: normalize(100),
    //     borderRadius: normalize(10),
    //     overflow:'hidden',
    //     alignItems:'center',
    //     justifyContent:'center',
    //     backgroundColor: colors.white
    // },
    // image:{
    //     width:'90%',
    //     height: '90%',        
    // },
    // logoimage:{
    //     width: '100%',
    //     height: '100%'
    // },
    // brand:{
    //     paddingHorizontal: normalize(10),
    // },

    // lottieContainer:{
    //     height: normalize(100),
    //     width: normalize(100),
    //     justifyContent:'center',
    //     alignItems:'center',
    // },
    // logo:{
    //     position: 'absolute',
    //     justifyContent:'center',
    //     alignSelf:'center',
    //     width: normalize(50),
    //     height: normalize(50),
    //     borderRadius: normalize(60),
    //     overflow:'hidden',   
    //     borderColor: colors.grey3,
    //     borderWidth: normalize(1)     
    // },
    // brandname:{
    //     fontFamily: fonts.bold,
    //     color: colors.charcoal,
    //     fontSize: normalize(13),
    //     textTransform:'uppercase',
    //     top: -10
    // }
})