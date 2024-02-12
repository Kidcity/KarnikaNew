import { StyleSheet, Dimensions } from "react-native";
import colors from "../../utils/colors";
import { setWidth } from "../../utils/variable";

const width = Dimensions.get("screen").width

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.white
    },
    content:{
        flex: 1,
        marginHorizontal: setWidth(2)
    },
    item:{
        width: (width / 3) - setWidth(3),
        height: setWidth(45),
        borderRadius: setWidth(2),
        overflow: 'hidden',
        borderColor: colors.grey1,
        borderWidth: setWidth(0.3),
        justifyContent:'space-between'
    },
    itemImage:{
        width: '100%',
        height: undefined,
        aspectRatio: 1
    },
    itemText1:{
        color: colors.grey3,
        textAlign:'center',
        fontWeight: 'bold',
    },
    itemText2:{
        color: colors.black,
        textAlign:'center',
        fontWeight: 'bold',
        marginBottom: setWidth(2)
    },
    footerBtnView:{
        paddingVertical: setWidth(5)
    }
})