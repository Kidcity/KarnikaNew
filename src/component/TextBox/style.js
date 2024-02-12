import { StyleSheet } from "react-native";
import { DEVICE_WIDTH, fonts, normalize } from "../../utils/variables";
import { colors } from "../../utils/colors";


export const styles = StyleSheet.create({
   container:{
    borderColor: colors.grey2,
    borderWidth: normalize(2),    
    borderRadius: normalize(40),
    overflow:'hidden'
   },
   input:{
    flex:1,
    color: colors.charcoal,
    fontFamily: fonts.regular,
    fontSize: normalize(12)
   }
})