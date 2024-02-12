import { Dimensions, StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { fonts, setHeight, setWidth, shadow_css } from "../../utils/variable";

const {width, height} = Dimensions.get("screen")

export const styles = StyleSheet.create({
    container:{
        position: 'absolute',
        width:width,
        height: height,
        backgroundColor: 'rgba(0,0,0,0.89)',
        justifyContent: 'center',
        zIndex: 999
    },
    content:{         
        backgroundColor: colors.white,        
        marginHorizontal: setWidth(4),        
        borderRadius: setWidth(5),
        alignItems:'center',
        paddingVertical: setHeight(2),
        paddingBottom: setHeight(4)
    },
    profileImage:{
        width: setWidth(25),
        height: setWidth(25),
        borderRadius: setWidth(50)
    },
    welcomeText:{
        fontFamily: fonts.fontBold,
        color: colors.dark_charcoal,
        fontSize: setWidth(7),
        textAlign: 'center',
        marginTop: setHeight(2)
    },
    smallWelcomeText:{
        fontFamily: fonts.fontRegular,
        color: colors.grey2,
        fontSize: setWidth(4),
        textAlign: 'center',
        marginTop: setHeight(1)
    },
    featuresBox:{
        marginTop: setHeight(3)
    },
    boxContent:{
        flexDirection: 'row',   
        alignItems:'center',  
        marginTop: setHeight(1)    
    },
    iconView:{
        width: setWidth(13),
        height: setWidth(13),
        borderColor: colors.dark_charcoal,
        borderWidth: setWidth(0.3),
        borderRadius: setWidth(10),
        justifyContent:'center',
        alignItems:'center'
    },
    boxText:{
        fontFamily: fonts.fontRegular,
        color: colors.grey2,
        fontSize: setWidth(4),
        textAlign: 'center',
        marginLeft: setWidth(4)
    },
    btn:{
        backgroundColor: colors.blue2,
        paddingHorizontal: setWidth(10),
        paddingVertical: setHeight(2),
        marginTop: setHeight(3),
        ...shadow_css,
        elevation: 10
    },
    btnText:{
        fontFamily: fonts.fontRegular,
        color: colors.white,
        fontSize: setWidth(5),
        textAlign: 'center',
        marginLeft: setWidth(4)
    }
})