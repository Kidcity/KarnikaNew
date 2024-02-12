import { StyleSheet } from "react-native";
import colors from '../../utils/colors'
import { fonts, setWidth } from "../../utils/variable";

export const styles = StyleSheet.create({
    contianer:{
        flex: 1,
        backgroundColor: colors.white
    },
    content:{
        flexGrow: 1,
        marginHorizontal: setWidth(4),
        paddingBottom: setWidth(20)
    },
    profileInfoContainer:{
        paddingHorizontal: setWidth(2),
        paddingVertical: setWidth(5),        
        borderRadius: setWidth(2),
        marginTop: setWidth(4)
    },
    row:{
        flexDirection: 'row'
    },
    imageContainer:{
        width: setWidth(23),
        height: setWidth(23),
        borderRadius: setWidth(30),
        overflow: 'hidden'
    },
    image:{
        flex:1,
        aspectRatio: 1,
    },
    nameContainer:{
        flex:1,
        justifyContent:'center',
        paddingLeft: setWidth(2)
    },
    name:{
        fontSize: setWidth(4.5),
        color: colors.white,
        fontFamily: fonts.fontRegular
    },
    name2:{
        fontSize: setWidth(3),
        color: colors.white,
        marginTop: setWidth(3),
        fontFamily: fonts.fontRegular
    },
    location:{
        flex:1,
        fontSize: setWidth(3),
        color: colors.white,
        paddingLeft: setWidth(2),
        fontFamily: fonts.fontRegular
    },
    walletAmountView:{
        backgroundColor: colors.green1,
        paddingHorizontal: setWidth(3),
        borderRadius: setWidth(1),
        // marginLeft: setWidth(3),        
        justifyContent:'center'
    },
    walletAmount:{
        color: colors.white,
        fontFamily: fonts.fontBold,
        fontSize: setWidth(3),
    },
})