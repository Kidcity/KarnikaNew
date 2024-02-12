import { StyleSheet } from "react-native";
import { DEVICE_WIDTH, fonts, normalize } from "../../utils/variables";
import { colors } from "../../utils/colors";

export const styles = StyleSheet.create({
    productSizeView: {
        paddingVertical: normalize(10),
        paddingHorizontal: normalize(5),
        backgroundColor: colors.lightgrey4,
        borderBottomColor: colors.grey1,
        borderBottomWidth: normalize(2)
    },
    sizeBtn:{
        backgroundColor: colors.white,
        paddingVertical: normalize(10),
        width: normalize(80),        
        borderRadius: normalize(25),
        borderColor: colors.grey2,
        borderWidth: normalize(3)
    }
})