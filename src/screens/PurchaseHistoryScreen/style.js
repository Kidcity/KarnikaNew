import { StyleSheet, Dimensions } from "react-native";
import colors from "../../utils/colors";
import { setWidth } from "../../utils/variable";

const width = Dimensions.get("screen").width

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.white
    },
    content:{
        flex: 1,
        marginHorizontal: setWidth(2)
    },
    row:{
        flexDirection: 'row'
    },
    subHeadingView:{
        flex: 0.5,
    },
    dropdownView:{
        flex: 0.5,
    },
    subHeading:{
        fontSize: setWidth(5),
        fontWeight: 'bold',
        color: colors.grey2
    },
    borderBottom:{
        borderBottomColor: colors.yellow2,
        borderBottomWidth: setWidth(2),
        width: setWidth(25)
    },
    cardBlock:{
        width: (width / 2) - setWidth(4),
        height: setWidth(20),
        justifyContent:'center',
        paddingLeft: setWidth(3),
        borderRadius: setWidth(2)
    },
    cardText1:{
        color: colors.white
    },
    cardText2:{
        color: colors.white,
        fontSize: setWidth(8),
        fontWeight: 'bold'
    },
    justifyContentBetween: {
        justifyContent: 'space-between'
    }
})