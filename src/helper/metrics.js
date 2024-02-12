import { Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;


export const responsiveWidth = width => {
  return (Dimensions.get("window").width * width ) / guidelineBaseWidth
}
export const responsiveHeight = height => {
  return (Dimensions.get("window").height * height ) / guidelineBaseHeight
}

export const moderateScale = (size, factor = 0.5) => size + (responsiveWidth(size) - size) * factor;

export const pixelRatio = (size) => PixelRatio.roundToNearestPixel(size)

