import { StyleSheet } from "react-native";
import { DEVICE_WIDTH, normalize } from "../../utils/variables";
import { colors } from "../../utils/colors";

export const styles = StyleSheet.create({
    collasableBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: normalize(14),
        paddingVertical: normalize(10),
        backgroundColor: colors.white,
        alignItems: 'center',
        marginTop: normalize(14),
        borderBottomColor: colors.lightgrey4,
        borderTopColor: colors.lightgrey4,
        borderBottomWidth: normalize(2),
        borderTopWidth: normalize(2),
    },
    coloum:{
        width: DEVICE_WIDTH / 3,
        paddingVertical: normalize(10)
    }

})