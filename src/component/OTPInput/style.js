import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { setWidth } from "../../utils/variable";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: setWidth(8),
        justifyContent: 'center',
        marginBottom: setWidth(10),
    },
    input: {
        width: setWidth(9),
        height: setWidth(10),
        borderColor: colors.grey1,
        borderWidth: setWidth(0.3),
        marginHorizontal: 8,
        textAlign: 'center',
        color: colors.grey3
      }
})