import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { normalize } from "../../utils/variable";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flexGrow: 1,
        backgroundColor: colors.grey5,
        paddingBottom: normalize(40)
    },
    feed: {
        // height: normalize(125),
        backgroundColor: colors.white
    },
    purchasehistory: {
        height: normalize(120),        
        marginTop: normalize(10),
    },
    thankyouImage:{
        height: normalize(120),   
        marginTop: normalize(10), 
    },
    image: {
        flex: 1,
    }
})