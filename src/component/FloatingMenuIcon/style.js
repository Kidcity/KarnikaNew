import { StyleSheet, Dimensions } from "react-native";
import colors from "../../utils/colors";
import { setHeight, setWidth } from "../../utils/variable";

const {width, height} = Dimensions.get("screen")

export const styles = StyleSheet.create({
    bottomIconContainer:{
        width: setWidth(15),
        height: setWidth(15),
        backgroundColor: colors.themeColor,
        borderRadius: setWidth(15),
        justifyContent:'center',
        alignItems:'center',
        position: 'absolute',
        bottom: setHeight(13),
        right: setWidth(6)
    },
    itemsContainer:{
        backgroundColor:'rgba(0,0,0,0.7)', 
        position:'absolute', 
        top: 0,
        bottom: 0, 
        right:0, 
        left: 0,  
    },
    itemsView:{
        position: 'absolute',
        bottom: setHeight(12),
        right: setWidth(3),
    },
    item:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom: setWidth(2)
    },
    itemText:{
        fontSize: setWidth(4),
        color: colors.white,
        width: setWidth(30),
        paddingVertical: setWidth(2),
        paddingLeft: setWidth(2)
    },
    iconView:{
        width:setWidth(15),
        height: setWidth(15),
        borderRadius: setWidth(10),
        justifyContent:'center',
        alignItems:'center',
        position: 'relative',
        right: 10,
        elevation: 5
    },
    closeBtnView:{
        marginBottom: setWidth(4),
        alignItems:'flex-end',
        paddingRight: setWidth(6)
    },
    closeBtn:{
        width: setWidth(8),
        height: setWidth(8)
    }
})