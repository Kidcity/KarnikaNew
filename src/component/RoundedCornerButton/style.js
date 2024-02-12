import { StyleSheet } from "react-native";
import { normalize } from "../../utils/variables";
import { colors } from "../../utils/colors";

export const styles = StyleSheet.create({
    container:{
        // flex: 1,
        backgroundColor: colors.lightRed,
        borderRadius: normalize(10),
        justifyContent: 'center',
        paddingVertical: normalize(10)
    }
})