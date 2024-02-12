import { StyleSheet } from "react-native";
import { normalize } from "../../utils/variables";
import { colors } from "../../utils/colors";


export const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.6)',
        position: 'absolute',
        zIndex: 9999,
        justifyContent: 'flex-end'
    },
    backDrop: {
        flex: 1,
    },
    content: {
        height: normalize(400),
        backgroundColor: colors.lightgrey
    },
    buyBtn: {
        flex: 1,
        marginLeft: normalize(10),
        backgroundColor: colors.lightRed,
        borderRadius: normalize(10),
        justifyContent: 'center',
        paddingVertical: normalize(10)
    }

})