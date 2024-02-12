import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { fonts, setHeight, setWidth } from "../../utils/variable";

export const styles = StyleSheet.create({
    container:{
        paddingVertical: setHeight(1.5),
        marginTop: setWidth(2),
        borderBottomColor: colors.grey5,
        borderBottomWidth: setWidth(0.4)
    },
    content:{
        flex:1,
        justifyContent:'space-between'        
    },
    row:{
        flexDirection: 'row'
    },
    image:{
        height: setWidth(6),
        width: setWidth(6)
    },
    title:{
        fontSize: setWidth(3.5),
        fontFamily: fonts.fontRegular,
        color: colors.grey2,
        marginLeft: setWidth(2),
        flexShrink: 1
    },
    rightIcon:{
        
    }
})