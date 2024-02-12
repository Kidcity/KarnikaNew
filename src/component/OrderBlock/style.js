import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { fonts, setHeight, setWidth } from "../../utils/variable";

export const styles = StyleSheet.create({
    contianer:{
        //padding: setWidth(5)
        marginTop: setWidth(3),
        borderBottomColor: colors.grey5,
        borderBottomWidth: setWidth(0.3),
        paddingBottom: setWidth(2)
    },
    row:{
        flexDirection:'row',        
    },
    leftBlock:{
        flex: 0.2,
    }, 
    rightBlock:{
        flex: 0.8,
        justifyContent:'space-between',
        paddingLeft: setWidth(3)
    },
    fontRed:{
        color: colors.red
    },
    image:{
        flex:1,
        aspectRatio: 0.9,
        // width: '100%',
        // height: '100%',
        maxHeight: setHeight(11)
    },
    orderstatusView:{
        height: setHeight(2.2),
        justifyContent:'center'
    },
    orderstatusText:{
        color: colors.white,
        textAlign:'center',
        textTransform:'capitalize',
        fontSize: setWidth(2.3)
    },
    subHeading:{
        fontFamily: fonts.fontRegular,
        color: colors.grey2,
        fontSize: setWidth(3.2)
    },
    text:{
        fontSize: setWidth(3.3),
        fontFamily: fonts.fontRegular,
        color: colors.grey2,
    },
    status_blue:{
        backgroundColor: colors.blue2
    },
    status_green: {
        backgroundColor: colors.green1
    },
    status_red: {
        backgroundColor: colors.red
    },
    returnBtn:{
        backgroundColor: colors.lightRed,
        padding: setWidth(2),
        width: setWidth(30),
        borderRadius: setWidth(2),
        marginTop: setWidth(3)    
    },
    returnBtnText:{
        color: colors.white,
        textAlign:'center',
        fontSize: setWidth(3)                       
    }
})