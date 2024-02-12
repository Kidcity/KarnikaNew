import { StyleSheet } from "react-native";

import { normalize} from "../../../utils/variables";
import { colors } from "../../../utils/colors";



export const styles = StyleSheet.create({
  container: {
    flex: 1,
  }, 
  heading: {
    marginHorizontal: normalize(15),
    borderBottomColor: colors.grey2,
    borderBottomWidth: normalize(2),
    paddingBottom: normalize(10),    
  },
 
  cartItemsContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: normalize(14),
    paddingVertical: normalize(12),
  },
  cityName: {
    color: colors.grey3,
    // textAlign:'center'
  },
  checkBox: {
    alignSelf: 'flex-end',
    width: normalize(20),
    height: normalize(20),
    borderColor: colors.red,
    borderWidth: normalize(2),
    borderRadius: normalize(5)
  },
    warningView: {
    paddingTop: normalize(10),
    borderTopColor: colors.grey1,
    borderTopWidth: normalize(2),
  },
})