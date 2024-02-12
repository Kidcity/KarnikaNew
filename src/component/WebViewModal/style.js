import { Dimensions, StyleSheet } from "react-native";
import colors from "../../utils/colors";
const {width, height} = Dimensions.get("screen")

export const styles = StyleSheet.create({
    container:{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: width,
        backgroundColor: colors.white
    }
})