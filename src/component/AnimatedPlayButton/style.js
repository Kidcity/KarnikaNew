import { Dimensions, StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { normalize, setWidth } from "../../utils/variable";

const { width, height } = Dimensions.get("screen")

export const styles = StyleSheet.create({
    btnContainer: {
        position: 'absolute',
        zIndex: 99,
        backgroundColor: 'rgba(255,255,255,0.6)',
        width: setWidth(21),
        height: setWidth(21),
        borderRadius: setWidth(8),
        alignItems: 'center',
        overflow: 'hidden',
    }
})
