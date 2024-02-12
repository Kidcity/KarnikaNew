import { StyleSheet, Dimensions } from "react-native";
import colors from "../../utils/colors";
import { setHeight, setWidth } from "../../utils/variable";
const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  cardView: {
    flex: 1,
    width: width - 20,
    height: height / 3,
    backgroundColor: colors.white,
    margin: 10,
    borderRadius: 10,
    // shadowColor: "#000",
    // shadowOffset: { width: 0.5, height: 0.5 },
    // shadowOpacity: 0.5,
    // shadowRadius: 3,
    // elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  textView: {
    position: "absolute",
    bottom: 10,
    margin: 10,
    left: 5,
  },
  image: {
    width: width - 20,
    height: height / 3,
    borderRadius: 10,
    // resizeMode:'cover'

  },
  itemTitle: {
    color: "white",
    fontSize: 22,
    shadowColor: "#000",
    shadowOffset: { width: 0.8, height: 0.8 },
    shadowOpacity: 1,
    shadowRadius: 3,
    marginBottom: 5,
    fontWeight: "bold",
    elevation: 5,
  },
  itemDescription: {
    color: "white",
    fontSize: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0.8, height: 0.8 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
  },
  dotView: {
    flexDirection: "row",   
    backgroundColor: 'transparent',
    justifyContent: "center",
    // backgroundColor:'pink',
    // paddingVertical: 5,
    // paddingVertical: setHeight(1.5),
  },
  playBtnContainer: {
    position: 'absolute',
    top: '50%',
    zIndex: 99,
    transform: [
      {
        translateY: -50
      }
    ]
  },
  circle1: {
    borderColor: colors.white,
    borderWidth: 3,
    paddingVertical: setWidth(1.9),
    borderRadius: setWidth(30),
  }
})