import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { fonts, setHeight, setWidth } from "../../utils/variable";

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.white
    },
    content:{        
        flex: 1,
        paddingTop: setHeight(2)
    },
    justifyEvenly:{
        // alignItems: 'center',
        justifyContent:'space-evenly'
    },
    card:{
        flexDirection: 'row',
        paddingHorizontal: setWidth(2),
        paddingVertical: setHeight(1.3),
        borderBottomColor: colors.grey2,
        borderBottomWidth: setWidth(0.1)
    },
    cardContent:{
        flex: 1,
        justifyContent: 'space-evenly',
        paddingHorizontal: setWidth(1.8)
    },
    cardImage:{
        width: setWidth(15),
        height: setWidth(15),
        borderRadius: setWidth(30),
        borderColor: colors.grey1,
        borderWidth: setWidth(0.2),
    },
    timeView:{
        alignItems:'center',
        justifyContent:'space-evenly',
    },
    cardtitle:{
        fontFamily: fonts.fontBold,
        fontSize: setWidth(3.5),
        color: colors.dark_charcoal
    },
    textBold:{
        fontFamily: fonts.fontBold,
    },
    cardbody:{
        fontFamily: fonts.fontRegular,
        fontSize: setWidth(3),
        color: colors.dark_charcoal,
        marginTop: setHeight(0.4)
    },
    time:{
        fontFamily: fonts.fontRegular,
        fontSize: setWidth(2.5),
        color: colors.dark_charcoal
    },
    listFooterComponentText:{
        fontFamily: fonts.fontRegular,
        fontSize: setWidth(2.5),
        color: colors.dark_charcoal,
        textAlign: 'center'
    },
    listEmptyComponentText:{
        fontFamily: fonts.fontRegular,
        fontSize: setWidth(3.5),
        color: colors.dark_charcoal,
        textAlign: 'center'
    },
    dotView:{
        width: 10,
        height: 10,
        borderRadius: 20,
        backgroundColor: colors.blue2
    }
})