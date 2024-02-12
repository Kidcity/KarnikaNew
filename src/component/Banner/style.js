import { StyleSheet } from "react-native";

import  colors  from "../../utils/colors";
import { DEVICE_WIDTH, normalize } from "../../utils/variable";

export const styles = StyleSheet.create({
    container: {
        height: normalize(100),
        // backgroundColor:'red'
    },
    bannerImageContainer: {
        width: DEVICE_WIDTH - 20,
        backgroundColor: colors.white,
        margin: 10,
        borderRadius: 10,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    paginationContainer: {
        position: 'absolute',
        flexDirection: 'row',
        bottom: 15,
        paddingHorizontal: normalize(8),
        paddingVertical: normalize(3),
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
        borderRadius: normalize(10)
    },
    dots: {
        height: normalize(5),
        width: normalize(5),
        backgroundColor: colors.red,
        marginHorizontal: normalize(4),
        borderRadius: normalize(8),
    }
})