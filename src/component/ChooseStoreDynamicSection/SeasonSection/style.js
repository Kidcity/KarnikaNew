import { StyleSheet } from "react-native";
import colors from "../../../utils/colors";
import { setHeight, setWidth } from "../../../utils/variable";

export const styles = StyleSheet.create({
    container:{
        marginTop: setHeight(5)
    },
    image: {
        // width: setWidth(90),
        height: setHeight(11),
    },
    seasonBtn: {        
        marginBottom:setWidth(2),
        overflow: 'hidden',
        borderRadius: setWidth(4)
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