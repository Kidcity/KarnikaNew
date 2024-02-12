import { StyleSheet, Dimensions, Platform } from "react-native";
import colors from "../../utils/colors";
import { fonts, setHeight, setWidth } from "../../utils/variable";

const { width, height } = Dimensions.get("screen")

export const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 9999,
        backgroundColor: 'rgba(0,0,0,0.7)',
        // backgroundColor:'pink',
        justifyContent:'flex-end'        
    },
    content: {
        height: setHeight(80),
        backgroundColor: colors.white,
        paddingTop: setHeight(5),
        paddingBottom: Platform.OS === 'ios' ? setHeight(5) : null
    },
    row:{
        flexDirection: 'row'
    },
    margin_t_1:{
        marginTop: setHeight(1)
    },
    padding_h_4:{
        paddingHorizontal: setWidth(4)
    },
    padding_v_3:{
        paddingVertical: setWidth(3)
    },
    borderBottom:{
        borderBottomColor: colors.grey5,
        borderBottomWidth: setWidth(0.3)
    },
    headingView:{
        marginHorizontal: setWidth(4),
        paddingBottom: setHeight(2),
        borderBottomColor: colors.grey2,
        borderBottomWidth: setWidth(0.3)
    },
    heading: {
        fontFamily: fonts.fontBold,
        fontSize: setWidth(3.5),
        color: colors.black,
        textTransform: 'uppercase',        
    },
    redText:{
        color: colors.red
    },
    rocketView:{
        flex: 1,
        // backgroundColor: 'red'
    },
    btnGroupView:{
        marginTop: 'auto',
    },
    btn: {        
        padding: setWidth(4),
        backgroundColor: colors.green,
        borderRadius: setWidth(2),
    },
    btnText: {
        color: colors.white,
        fontFamily: fonts.fontBold,
        fontSize: setWidth(3.4),
        textAlign:'center'
    },
    whiteBtn:{
        backgroundColor: colors.white,
        borderColor: colors.red,
        borderWidth: setWidth(0.4)
    },
    lottiView: {
        // position: 'relative',
        height: '100%',
        alignSelf: 'center',
    },
})