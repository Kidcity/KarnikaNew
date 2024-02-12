import { Dimensions, Platform, StyleSheet } from "react-native";
import { fonts, setHeight, setWidth, shadow_css } from "../../utils/variable";
import colors from "../../utils/colors";

const {width, height} = Dimensions.get("screen")

export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: colors.white,
        justifyContent:'center',
        // marginBottom: 100
        zIndex: 1,
        paddingLeft: setWidth(2)        
    },
    baseImageContainer:{
        borderRadius: setWidth(10),
        overflow: 'hidden',
        width: setWidth(13),
        height: setWidth(13),
        backgroundColor: colors.white
    },
    baseImage:{
        flex: 1,
        aspectRatio: 1,    
        borderRadius: setWidth(10),    
    },
    row:{
        flexDirection: 'row'
    },
    headingContainer:{
        paddingLeft: setWidth(3),
        justifyContent: 'center'
    },
    heading:{        
        fontFamily: fonts.fontBold,
        color: colors.black,
        fontSize: setWidth(5),
        textAlign:'center'
    },
    subHeading:{
        fontFamily: fonts.fontRegular,
        color: colors.black,
        fontSize: setWidth(3.5)
    },
    downArrowContainer:{
        paddingHorizontal: setWidth(3),
    },
    selectedAgeNameView:{
        alignSelf:'center',
        backgroundColor: colors.curiousBlue,
        paddingHorizontal: setWidth(4),
        borderRadius: setWidth(10),
        marginLeft: setWidth(5)
    },
    selectedAge:{
        fontFamily: fonts.fontRegular,
        color: colors.white,
        fontSize: setWidth(3.7),
        textTransform: 'capitalize'
    },
    modal:{
        width: width,
        // height: setHeight(25),
        position:'absolute',
        backgroundColor: colors.white,
        bottom: -150,
        // bottom: Platform.OS === 'android' ?  setHeight(-23) : setHeight(-18),
        ...shadow_css,
        elevation: 20,
        justifyContent:'space-evenly',
        zIndex: 999,
        paddingBottom: 8
    },
    backButton:{
        // flex:1,
        // backgroundColor:'green',
        // position: 'absolute',        
        // left: 10,
        // top: 0,
        padding: setWidth(2),
        // zIndex: 99
    },
    crossButton:{
        
        // backgroundColor:'red',
        // alignSelf:'flex-end',
        // position: 'absolute',
        // right: -2,
        // top: -5,
        padding: setWidth(2),
        // zIndex: 99
    },
    listContainer:{
        paddingVertical: 2
        // height: height / 4,
        // backgroundColor:'red'
    },
    genderImageContainer:{
        width: width / 5.7,
        height: width / 5.7,
        borderRadius: setWidth(30),
        overflow: 'hidden',
        marginBottom: 4,
    },
    genderImage:{
        flex: 1,
        aspectRatio: 1,
        borderRadius: setWidth(30),
    },
    ageImageContainer:{
        width: width / 5.7,
        height: width / 5.7,
        overflow: 'hidden',
        marginBottom: 4,
        borderRadius: setWidth(40),
        // backgroundColor: 'red'
        // borderRadius: setWidth(30),
    },
    ageImage:{
        flex: 1,
        aspectRatio: 1,
        borderRadius: setWidth(40),
    },
    selectedOption:{
        padding: 10, 
        borderColor: colors.primaryyellow, 
        borderWidth: setWidth(1.5)
    },
    title: {
        fontFamily: fonts.fontBold,
        fontSize: setWidth(3.8),
        textAlign: 'center',
        color: colors.dark_charcoal
    },
    button:{
        backgroundColor: colors.primaryyellow,
        height: setHeight(7),
        width: setWidth(40),
        justifyContent:'space-evenly',
        borderRadius: setWidth(20),
        flexDirection: 'row',
        alignItems:'center'
    },
    buttonText:{
        fontFamily: fonts.fontBold,
        fontSize: setWidth(4.5),
        textAlign: 'center',
        color: colors.white,
        letterSpacing: 3
    }
})