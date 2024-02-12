import { StyleSheet, Dimensions } from "react-native";

import { DEVICE_WIDTH, fonts, normalize, setHeight, setWidth } from "../../utils/variables";
import { colors } from "../../utils/colors";


export const styles = StyleSheet.create({
    container: {
        borderRadius: normalize(2),
        overflow: 'hidden',
        width: (DEVICE_WIDTH / 2.17),
        backgroundColor: colors.white
        // borderColor: colors.grey5,
        // borderWidth: setWidth(0.3)
    },
    imageContainer:{
        width: '100%',
        height: normalize(200),
        backgroundColor: colors.white
    },
    image:{
       flex:1
    },
    itemsLeftContainer:{
        position: 'absolute',
        bottom: 10,
        right: 0,
        backgroundColor: 'rgba(255,0,0,0.7)',
        paddingHorizontal: normalize(15),
        paddingVertical: normalize(5),
        borderTopLeftRadius: normalize(10),
        borderBottomLeftRadius: normalize(10)
    },
    
})