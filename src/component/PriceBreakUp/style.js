import { StyleSheet } from "react-native";
import { colors } from "../../utils/colors";
import { fonts, normalize } from "../../utils/variables";

export const styles = StyleSheet.create({
    container: {
        marginHorizontal: normalize(10),
        marginTop: normalize(20),
    },
    priceBreakUp: {
        marginTop: normalize(10),
        backgroundColor: colors.white,
        paddingHorizontal: normalize(15),
        paddingVertical: normalize(10),

        borderColor: colors.grey1,
        borderWidth: normalize(2),
        borderRadius: normalize(10)
    }
})