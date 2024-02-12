import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { DEVICE_WIDTH, fonts, normalize } from "../../utils/variable";



export const styles = StyleSheet.create({
    container:{        
       flex:1,
        backgroundColor: colors.white,       
    },
    header:{        
        backgroundColor:'white',
        paddingHorizontal: normalize(10),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',        
        borderBottomColor: colors.grey1,
        borderBottomWidth: normalize(1),  
    },
    heading: {
        fontFamily: fonts.bold,
        color: colors.dark_charcoal,
        fontSize: normalize(15),
    },
    headerBtn:{
        paddingVertical: normalize(15),
    },
    headerBtnText:{
        fontFamily: fonts.bold,
        color: colors.red,
        fontSize: normalize(15)
    },
    content:{
        flex:1
    },
    left:{
        flex:0.3,
        backgroundColor: colors.grey5
    },
    right:{
        flex: 0.7,
        // paddingTop: normalize(10)
        // paddingHorizontal: normalize(10),
        // backgroundColor:'pink',
        // alignItems:'center'
    },
    borderBottom:{
        borderBottomColor: colors.yellow3,
        borderBottomWidth: normalize(2)
    },
    borderLeft:{
        borderLeftColor: colors.themeColor,
        borderLeftWidth: normalize(5)
    },
    active:{
        backgroundColor: colors.grey1
    },
    selectedBorder:{
        borderColor: colors.themeColor,
        borderWidth: normalize(5),
        borderRadius: normalize(10)        
    },

    //gender
    genderContentContainerStyle:{
        flexDirection:'row',
        borderBottomColor: colors.grey3,
        borderBottomWidth: normalize(1),  
    },
    genderListStyle:{
        borderBottomColor: colors.grey3,
        borderBottomWidth: normalize(1),        
    },
    gender:{
        paddingVertical: normalize(10),
        paddingHorizontal: normalize(8),             
    },
    genderTitle:{
        fontFamily: fonts.regular,
        fontSize: normalize(12),
        textTransform:'uppercase',
        color: colors.grey2,        
    },

    // left items
    leftFilters:{
        paddingVertical: normalize(15),
        paddingHorizontal: normalize(10)
    },
    leftFiltersTitle:{
        fontFamily: fonts.regular,
        fontSize: normalize(12),
        textTransform:'capitalize',
        color: colors.grey2,    
    },

    //right items
    seasonImageContainer:{
        width: '100%',
        height: normalize(102),
        overflow:'hidden',
        justifyContent:'center',
        alignItems:'center'
    },
    ageImageContainer:{
        width: normalize(100),
        height: normalize(100),
        overflow:'hidden',
        justifyContent:'center',
        alignItems:'center'
    },
    brandsContainer:{
        alignItems:'center' ,
        backgroundColor: colors.white,      
    },
    brandImageContainer:{
        width: normalize(50),
        height: normalize(50),                
        borderRadius: normalize(60),
        borderColor: colors.grey2,
        overflow: 'hidden',
        backgroundColor: colors.white,
        alignItems:'center',
        justifyContent:'center'
    },
    image:{
        width:'80%',
        height:'80%'
    },
    priceRangeContainer:{
        paddingVertical: normalize(15),
        borderBottomColor: 'red',
        borderBottomWidth: normalize(1),
        paddingLeft: normalize(15)
    },


    // footer btn
    footerBtnContainer:{
        flexDirection:'row',
        justifyContent:'space-evenly'
    },
    footerBtn:{
        flex:1,
        paddingVertical: normalize(15),
        backgroundColor: colors.themeColor
    }
})