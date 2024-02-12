import { Platform, StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { fonts, normalize, setWidth } from "../../utils/variable";

export const styles = StyleSheet.create({
    container:{
        //padding: 10,
        borderBottomColor: colors.grey1,
        borderBottomWidth: setWidth(0.2),
        flexDirection: 'row',
        marginTop: Platform.OS === 'ios' ? setWidth(5) : setWidth(5),
        alignItems:'center',
        borderRadius: normalize(5),        
        // marginTop: setWidth(2)        
    },
    input:{
        flex: 1,
        paddingLeft: setWidth(3),
        fontFamily: fonts.fontBold,
        fontSize:setWidth(3.2),
        color: colors.grey3
    },
    pressableIcon:{
       // padding: setWidth(2)
    }
})