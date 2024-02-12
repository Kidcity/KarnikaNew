import { StyleSheet } from "react-native";
import { DEVICE_WIDTH, fonts, setHeight, setWidth } from "../../utils/variables";
import { colors } from "../../utils/colors";

export const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        width: DEVICE_WIDTH,
        backgroundColor: 'rgba(0,0,0,0.2)',
        height: setHeight(8),
        flexDirection: 'row',
        zIndex: 99,
    },
    leftMenu: {
        flex: 1,
        flexDirection: 'row',
        overflow: 'hidden'
    },
    rightMenu: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    menu: {
        flex: 0.3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoContainer: {
        flex: 0.7,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'pink'
    },
    logo: {
        height: '100%',
        width: '100%',
    },
    icon: {
        // flex:1,
        flexDirection: 'row',
    },
    labelView: {
        top: -10,
        right: 15,
        paddingHorizontal: 5,
        justifyContent: 'center',
        borderRadius: setWidth(3),
        backgroundColor: colors.red
    },
    label: {
        fontFamily: fonts.regular,
        color: colors.white,
        fontSize: setWidth(3)
    }
})