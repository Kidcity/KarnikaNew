import { Platform, StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { setHeight, setWidth } from "../../utils/variable";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    content: {
        flex: 1,

    },
    imageBlock: {
        flex: 0.6,
        backgroundColor: 'pink',
        borderBottomEndRadius: setWidth(10),
        borderBottomStartRadius: setWidth(10),
        overflow: 'hidden'
    },
    image: {
        width: '110%',
        height: '100%',
    },
    footerBlock: {
        flex: 0.4,
        justifyContent: 'space-between',
        paddingBottom: Platform.OS === 'ios'? setHeight(6) : setHeight(4),
        marginHorizontal: setWidth(2),
    },
    priceView: {
        padding: setWidth(5),
        borderColor: colors.grey5,
        borderWidth: setWidth(0.6),
        marginTop: setWidth(5),
        borderRadius: setWidth(2)
    },
    subHeading: {
        fontSize: setWidth(4),
        textAlign: 'center',
        color: colors.blue
    },
    heading: {
        fontSize: setWidth(10),
        textAlign: 'center',
        color: colors.lightRed,
        fontWeight: 'bold',
        marginTop: setWidth(3)
    }
})