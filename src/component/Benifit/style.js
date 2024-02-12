import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { DEVICE_WIDTH, fonts, normalize } from "../../utils/variable";

export const styles = StyleSheet.create({
    container: {
        height: normalize(190),
        width: DEVICE_WIDTH,
        // backgroundColor:'red'
    },
    benefitImageView: {
        height: normalize(120),
        marginTop: normalize(20)
    },
    image: {
        //flex:1,
        width: '100%',
        height: '100%',
    },
    image1: {
        //flex:1,
        width: '100%',
        height: '100%',
    },
    image2: {
        //flex:1,
        width: '100%',
        height: '80%',
        position: 'absolute',
        bottom: 50
    },
})