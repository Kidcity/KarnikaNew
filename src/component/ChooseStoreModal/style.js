import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { setWidth } from "../../utils/variable";

export const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    seasonBtn: {        
        marginBottom:setWidth(2)
    },
    image: {
        width: setWidth(90),
        height: setWidth(40),
    }
})