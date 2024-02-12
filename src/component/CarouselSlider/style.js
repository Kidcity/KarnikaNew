import { StyleSheet } from "react-native";
import { DEVICE_WIDTH, normalize } from "../../utils/variables";
import { colors } from "../../utils/colors";

export const styles = StyleSheet.create({   
    paginationContainerStyle:{
        paddingVertical: normalize(10),
    },
    dotStyle:{
        width: normalize(15),
        height: normalize(6),
        borderRadius: normalize(20),
        backgroundColor: colors.themeColor
    }
})