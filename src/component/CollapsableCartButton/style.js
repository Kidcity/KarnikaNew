import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { fonts, setHeight, setWidth } from "../../utils/variable";


export const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.white,
        //paddingVertical: setWidth(4),
        //paddingHorizontal: setWidth(4),
        // marginTop: setWidth(5)
    },
    collapsableHeader:{
        // backgroundColor:'red',
        justifyContent: 'space-between',
        alignItems:'center',
        paddingHorizontal: setWidth(5), 
        borderBottomColor: colors.grey7,  
        borderBottomWidth: setWidth(0.3),
        paddingVertical: setHeight(2)
    },
    cityNameView:{
        borderBottomColor: colors.grey7,  
        borderBottomWidth: setWidth(0.3),
        paddingVertical: setHeight(2),
        flexDirection:'row',
        alignItems:'center',        
    },
    cityName:{
        fontSize: setWidth(4),
        color: colors.grey2,
        fontFamily: fonts.fontBold,
        paddingHorizontal: setWidth(5),
        textAlign:'center'
    },
    borderBottom:{
        borderBottomColor: colors.grey5,
        borderBottomWidth: setWidth(0.3)
    },
    borderTopBottom:{
        borderTopColor: colors.grey5,
        borderTopWidth: setWidth(0.4),
        borderBottomColor: colors.grey5,
        borderBottomWidth: setWidth(0.4)
    },
    row:{
        flexDirection:'row'
    },
    text:{
        fontSize: setWidth(3.5),
        color: colors.grey2,
        fontFamily: fonts.fontRegular
    },
    subHeading:{
        color: colors.grey2,
        fontFamily: fonts.fontRegular,
        fontSize: setWidth(3.5)
    },
    textBold: {
        fontFamily: fonts.fontBold
    },
    darkText:{
        color: colors.grey2
    },
    collasableItemsView:{
        paddingTop: setWidth(4)
    },
    productView:{
        flexDirection: 'row',
        paddingBottom: setWidth(4),
        //paddingVertical: setWidth(4),
        paddingHorizontal: setWidth(2),
        borderBottomColor: colors.grey1,
        borderBottomWidth: setWidth(0.3),
    },
    productImageView:{
        flex: 0.2,
        // backgroundColor: 'red'
    },
    productDetailsView:{
        flex: 0.5,
        justifyContent:'space-evenly'
    },
    buttonView:{
        flex: 0.3,
        // justifyContent:'flex-end',
        // alignItems:'flex-end'
    },
    productImage:{
        // width: '100%',
        // height: undefined,
        // flex: 1,
        aspectRatio:1
    },
    removeBtn:{
        width: setWidth(10),
        borderRadius: setWidth(2),
        alignItems:'center',
        alignSelf:'flex-end'
        //marginTop: setWidth(3)
    },
    priceDetailsview:{
        borderBottomColor: colors.grey5,
        borderBottomWidth: setWidth(0.3),
        paddingVertical: setWidth(7),
        paddingHorizontal: setWidth(5),
        paddingRight: setWidth(6)
    },
    textGap:{
        marginTop: setWidth(3)
    },
    btn:{
        paddingVertical: setHeight(1.8),
        paddingHorizontal: setWidth(2),
        backgroundColor: colors.curiousBlue,
        borderRadius: setWidth(1),
        justifyContent:'center',
        alignItems:'center'
    },
    btnText:{
        color: colors.white,
        fontFamily: fonts.fontBold,
        fontSize: setWidth(3.3)
    },
    cartText:{        
        color: colors.dark_charcoal,
        fontSize: setWidth(3.5),
        textAlign: 'center'
      },
})