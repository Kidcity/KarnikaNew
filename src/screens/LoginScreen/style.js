import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { fonts, setHeight, setWidth } from '../../utils/variable'

export const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: colors.white
    },
    header: {
        height: setWidth(60),
    },
    logo: {
        height: setWidth(50),
        width: setWidth(50),
        marginTop: setHeight(-4),
    },
    row:{
        flexDirection:'row'
    },
    lottiView: {
        position: 'relative',
        height: setWidth(25),
        alignSelf: 'center',        
    },
    title: {
        color: colors.black,
        fontSize: setWidth(7),
        fontFamily: fonts.fontRegular,
        marginLeft: setWidth(7)
    },
    content: {
        flex: 1,
        marginHorizontal: setWidth(4),
    },
    inputContainer: {
        height: setWidth(10),
        fontFamily: fonts.fontRegular,
    },
    pressableTextBtn: {

    },
    link:{
        color: colors.red
    },
    perssableText: {
        color: colors.grey2,
        fontFamily: fonts.fontBold,
        textDecorationLine:'underline'
    },
    connectingbrandText: {
        fontSize: setWidth(4),
        color: colors.primaryyellow,
        fontFamily: fonts.fontBold,
        textAlign: 'center',
    },
    footer: {
        //width: setWidth(100),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
       // paddingHorizontal: setWidth(2),
        marginBottom: setWidth(6)
    },
    footerText: {
        flexShrink: 1,
        color: colors.black,
        fontSize: setWidth(2),
        fontFamily: fonts.fontRegular
    }
})