import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { setWidth } from "../../utils/variable";

export const styles = StyleSheet.create({
    modalContainer:{
        backgroundColor:'rgba(0,0,0,0.5)', 
        position:'absolute', 
        top: 0,
        bottom: 0, 
        right:0, 
        left: 0,  
        flex:1, 
        justifyContent:'center', 
        alignItems:'center'
    },
    content:{
        backgroundColor: colors.white,
        width: setWidth(80),
        borderRadius: setWidth(3),
        paddingTop: setWidth(5)
    },
    heading:{
        fontWeight: 'bold',
        fontSize: setWidth(4),
        color: colors.grey2,
        textAlign:'center',
        textDecorationLine:'underline'
    },
    infoText:{
        color: colors.grey2,
        textAlign:'center'
    },
    btn:{
        borderTopColor: colors.grey5,
        borderTopWidth: setWidth(0.2),
        paddingVertical: setWidth(4),        
    },
    btnText:{
        textAlign:'center',
        color: colors.lightRed,
        fontWeight:'bold'
    }
})