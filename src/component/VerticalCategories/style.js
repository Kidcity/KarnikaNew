import { StyleSheet } from "react-native";
import { fonts, setHeight, setWidth } from "../../utils/variable";
import colors from "../../utils/colors";

export const styles = StyleSheet.create({
    container: {
        marginVertical: setHeight(3),
        marginTop: setHeight(3)
    },
    categoriesView:{  
        width: setWidth(45),        
        // paddingBottom: setHeight(2)
    },
    imageView:{
        width: '100%',
        height: setWidth(50),
        justifyContent:'center',
        alignItems:'center',
        overflow: 'hidden',
    },
    image:{
       flex: 1,
       aspectRatio: 1
    },
    heading:{
        flexShrink: 1,
        fontFamily: fonts.fontBold,
        fontSize: setWidth(4.5),
        textAlign: 'center',
        color: colors.dark_charcoal,
    },
    title: {
        flexShrink: 1,
        fontFamily: fonts.fontBold,
        fontSize: setWidth(4),
        textAlign: 'center',
        color: colors.dark_charcoal,
        paddingVertical: setHeight(0.60),
    }
})