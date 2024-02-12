import { Dimensions, StyleSheet } from "react-native";
import colors from "../../../utils/colors";
import { fonts, setHeight, setWidth } from "../../../utils/variable";

const width = Dimensions.get("screen").width

export const styles = StyleSheet.create({
    container:{
        marginTop: setHeight(5)
    },
    categoryItems:{
        width: width / 3 - setWidth(2),
        height: setWidth(30),
        marginBottom: setWidth(2),
        alignItems:'center',
    },
    categoryImage:{
        flex:1,
        aspectRatio: 1,        
        borderColor: colors.grey5,
        borderWidth: setWidth(0.3),
        borderRadius: setWidth(2)
    },
    categoryText:{
        textAlign:'center',
        fontFamily: fonts.fontRegular,
        color: colors.grey2,
        fontSize: setWidth(3),
        marginTop: setWidth(1)
    },
    row:{
        flexDirection: 'row'
    },
    buttonContainer:{
        height: setHeight(7),
        borderColor: colors.red,
        borderWidth: setWidth(0.3),  
        justifyContent: 'space-around'    
    },
    buttonLabelStyle:{
        color: colors.red
    },
})