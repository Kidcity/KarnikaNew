import { StyleSheet } from "react-native";
import { fonts, normalize, setHeight, setWidth } from "../../utils/variable";
import colors from "../../utils/colors";



export const styles = StyleSheet.create({
    container:{
        height: setHeight(8),
        flexDirection:'row',
        backgroundColor: colors.white,
        zIndex: 9999,
    },
    leftMenu:{
        flex:1,
        flexDirection:'row',
        overflow:'hidden'
    },
    rightMenu:{
        flex: 1,
        flexDirection:'row',        
        alignItems:'center',
        justifyContent: 'flex-end',      
    },
    menu:{
        flex:0.3,
        alignItems:'center',
        justifyContent:'center',
    },
    logoContainer:{
        flex:0.7,
        alignItems:'center',
        justifyContent:'center',
    },
    logo:{        
        height: '100%',
        width: '100%',
    },
    icon:{
        // flex:1,
        flexDirection:'row',
        width: normalize(40),
    },
    labelView:{
        position: 'absolute',
        top:-10,
        right: 15,        
        paddingHorizontal: 8,  
        paddingVertical: 1,      
        justifyContent:'center',
        borderRadius: setWidth(3),
        backgroundColor: colors.red
    },
    label:{
        fontFamily: fonts.bold,
        color: colors.white,
        fontSize: setWidth(3)
    },
    btn:{
        backgroundColor: colors.themeColor,
        paddingVertical: normalize(7),
        paddingHorizontal: normalize(15),
        marginRight: normalize(10)
    }
})