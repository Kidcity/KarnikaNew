import { Dimensions, Platform, StyleSheet } from "react-native";
import { responsiveHeight } from "../../helper/metrics";
import colors from "../../utils/colors";
import { fonts, setHeight, setWidth, shadow_css } from "../../utils/variable";

const { width, height } = Dimensions.get("screen")

export const styles = StyleSheet.create({
    container: {
        // height:  setHeight(60), 
        // height: 400,
        paddingHorizontal: setWidth(2),
        paddingVertical: setHeight(3)
    },
    heading: {
        textAlign: 'center',
        fontSize: setWidth(4.5),
        fontFamily: fonts.fontBold,
        color: colors.black,       
    },
    row: {
        flexDirection: 'row'
    },
    justifyCenter: {
        justifyContent: 'center',
    },
    cardView: {
        overflow:'visible',
        ...shadow_css
    },
    show_more:{
        backgroundColor:colors.primaryyellow,
        borderRadius: setWidth(4),
        justifyContent:'center',
        alignItems:'center',
        ...shadow_css
    },
    showmoreText:{
        textAlign: 'center',
        fontSize: setWidth(5),
        fontFamily: fonts.fontBold,
        color: colors.white,  
    },
    cardImageView: {
        flex: 1,
        overflow:'hidden',        
        borderTopRightRadius: setWidth(4),
        borderTopLeftRadius: setWidth(4),
        backgroundColor: colors.black,
        ...shadow_css
    },    
    cardImage: {
        flex:1,       
    },    
    cardTitleView: {       
        position:'absolute',
        bottom: -40,
        paddingHorizontal: setWidth(4),
        alignItems:'flex-end',    
    },
    cardTitle:{
        fontFamily: fonts.fontBold,
        fontSize: setWidth(3.5),
        marginTop: setHeight(1.4),
        marginLeft: setWidth(2),
        color: colors.dark_charcoal
    },
    logoView:{
        width: setWidth(16),
        height: setWidth(16),
        borderRadius: setWidth(3),
        borderColor: colors.grey5,
        borderWidth: setWidth(0.5),
        overflow:'hidden',
    },
    cardLogo:{
        width: '100%',
        height: undefined,
        aspectRatio: 1
    },
    dotView:{
        width: setWidth(2),
        height: setWidth(2),
        borderRadius: setWidth(5),        
        backgroundColor: colors.white
    },
    activeDot:{
        flex: 1,
        paddingHorizontal: 8,
        borderRadius: setWidth(5),  
        backgroundColor:colors.dark_charcoal
    },
    animatedPlayBtn:{
        
    }
})