import { NativeModules, Platform, StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { fonts, setHeight, setWidth } from "../../utils/variable";

let statusbarheight = 0
const { StatusBarManager } = NativeModules
if (Platform.OS === 'ios') {
    StatusBarManager.getHeight(response =>       
            statusbarheight = response.height      
    )
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,        
    },
    header:{
        height: Platform.OS === 'ios' ? statusbarheight + setHeight(8) : setHeight(6),     
        paddingHorizontal: setWidth(7),
        justifyContent:'center',
    },
    heading: {
        fontFamily: fonts.fontBold,
        fontSize: setWidth(4),
        color: colors.grey2
    },
    content: {
        flex: 1,
        backgroundColor: colors.grey6,
        // paddingHorizontal: setWidth(3)
    },
    row: {
        flexDirection: 'row'
    },
    subHeaderView:{
        marginTop: setHeight(2),
        // paddingHorizontal: setWidth(5)
    },
    subHeading:{
        fontFamily: fonts.fontRegular,
        fontSize: setWidth(3),
        color: colors.red
    },
    card: {
        paddingVertical: setHeight(1),
        paddingHorizontal: setWidth(4),
        backgroundColor: colors.white,
        borderRadius: setWidth(3),
        alignItems:'center',
        justifyContent:'space-between'
    },
    cardImageView:{
        width: setWidth(18),
        overflow:'hidden',
        justifyContent:'center'
    },
    cardImage:{
        width: '100%',
        height: undefined,
        aspectRatio:1
    },
    cardText:{
        fontFamily: fonts.fontBold,
        fontSize: setWidth(4),
        color: colors.grey2,
        marginLeft: setWidth(2)
    },
    statusView:{
        backgroundColor: 'red',
        paddingHorizontal: setWidth(2),
        paddingVertical: setHeight(0.5),
        borderRadius: setWidth(1),
        marginRight: setWidth(2)
    },
    statusText:{
        fontFamily: fonts.fontBold,
        fontSize: setWidth(3.5),
        color: colors.white
    },
    yellowBG:{
        backgroundColor: colors.primaryyellow,
    },
    redBG:{
        backgroundColor: colors.red,
    },
    greyBG:{
        backgroundColor: colors.grey5
    },
    darkGreyBG:{
        backgroundColor: colors.grey2
    },
    greenBG:{
        backgroundColor: colors.green1
    },
    blueBG:{
        backgroundColor: colors.blue2
    },
    
    mr_t_1:{
        marginTop: setHeight(1)
    },
    mr_t_2:{
        marginTop: setHeight(2)
    },
    
})