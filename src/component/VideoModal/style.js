import { Dimensions, StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { setHeight, setWidth } from "../../utils/variable";

const {width, height} = Dimensions.get("screen")

export const styles = StyleSheet.create({
    container:{
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: width,
        height: height,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent:'center',
        alignItems:'center'
    },
    videoContainer:{
        height: setHeight(50),
        width: setWidth(100),
        backgroundColor: colors.black
    },
    playBtn:{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [
            {
                translateX: -30
            },
            {
                translateY: -30
            }
        ],
        zIndex: 99,        
    },
    closeBtnView:{
        padding: setWidth(3),
        borderColor: colors.white,
        borderWidth: setWidth(0.3),
        borderRadius: setWidth(15),
        marginTop: setHeight(5)
    }
})