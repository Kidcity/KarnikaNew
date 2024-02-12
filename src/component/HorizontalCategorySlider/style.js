import { StyleSheet } from "react-native";
import  colors  from "../../utils/colors";
import { fonts, normalize, setWidth } from "../../utils/variable";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gender: {
        paddingVertical: normalize(5),
        paddingTop: normalize(10)
    },
    isActiveGender: {
        borderBottomColor: colors.themeColor,
        borderBottomWidth: normalize(2)
    },
    genderTitle: {
        fontFamily: fonts.regular,
        fontSize: normalize(10),
        color: colors.grey3,
        textTransform: 'uppercase',
        textAlign: 'center',
    },
    listSeparator: {
        marginRight: normalize(10)
    },

    categoriesListContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
    },

    category:{        
        alignItems: 'center',
        width: normalize(60),
        // backgroundColor:'red'
    },
    imageView: {
        width: normalize(60),
        height: normalize(60),
        overflow: 'hidden',
        borderRadius: normalize(60),
    },
    image: {
        flex: 1
    },
    catTitle: {
        fontFamily: fonts.bold,
        fontSize: setWidth(2.8),
        color: colors.grey2,
        textTransform: 'uppercase',
        textAlign: 'center',
        // letterSpacing: 0.8,
        marginTop: normalize(8)
    },
    stick: {
        height: normalize(30),
        width: normalize(2),
        backgroundColor: colors.themeColor,
        bottom: 20,
        marginRight: normalize(15),
    },
   
})
