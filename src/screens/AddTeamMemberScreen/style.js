import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { setWidth } from "../../utils/variable";

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.white
    },
    content:{
        flexGrow: 1,
        marginHorizontal: setWidth(2)
    },
    inputStyle:{
        paddingLeft: 0
    },
    footerView:{
        padding: setWidth(4),
        backgroundColor: colors.white,
        flexDirection:'row'
    },
    footerBtn:{
        flex: 1,
        backgroundColor: colors.lightRed,
        paddingVertical: setWidth(3),
        borderRadius: setWidth(2),
        borderColor: colors.lightRed,
        borderWidth: setWidth(0.5)
    },
    footerBtnText:{
        color: colors.white,
        textAlign: 'center',
        fontSize: setWidth(4)
    }
})