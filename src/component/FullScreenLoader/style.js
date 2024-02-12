import { StyleSheet, Dimensions } from "react-native";
import colors from "../../utils/colors";
import { setHeight, setWidth } from "../../utils/variable";

const {width, height} = Dimensions.get("screen")

export const styles = StyleSheet.create({
    container:{
        position: 'absolute',
        width: width,
        height: height,
        backgroundColor: 'rgba(0,0,0,0.9)',
        zIndex: 9999,
        // justifyContent:'center',
    },  
    lottiView: {
        // position: 'relative',
        height: setHeight(100),
        width: setWidth(50),
        alignSelf: 'center',
        // backgroundColor: 'red',
    },
})