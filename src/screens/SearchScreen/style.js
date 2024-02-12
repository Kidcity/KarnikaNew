import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { fonts, setHeight, setWidth, shadow_css } from "../../utils/variable";

export const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    searchBar:{
        // position: 'absolute',
        width: setWidth(100),
        flexDirection:'row',
        height: setHeight(9),  
        backgroundColor: colors.white,     
        borderBottomColor: colors.grey1,
        borderBottomWidth: setWidth(0.3),
        zIndex: 999,
        alignItems: 'center',  
        ...shadow_css
    },
    icon:{
        flex: 0.19,
        paddingVertical: setHeight(2),
        alignItems:'center',
        justifyContent:'center'
    },
    inputView:{
        flex:1,
    },
    searchInput:{
        borderColor: colors.grey3,
        borderWidth: setWidth(0.3),
        borderRadius: setWidth(10),
        paddingHorizontal: setWidth(3),
        color: colors.dark_charcoal
    },
    content:{
        flex:1,
    },
    suggestionTextView:{
        paddingVertical: setHeight(4),
        backgroundColor: colors.white,
        paddingHorizontal: setWidth(3),
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    suggestionText:{
        fontFamily: fonts.fontBold,
        fontSize: setWidth(4.5),
        color: colors.dark_charcoal,
        textTransform: 'capitalize'
    },
    emptyComponentView: { 
        flex:1, 
        justifyContent: 'center', 
        alignItems:'center'
    },
    emptyText:{
        fontFamily: fonts.fontBold,
        fontSize: setWidth(4.5),
        color: colors.dark_charcoal,
        textTransform: 'capitalize'
    }
})