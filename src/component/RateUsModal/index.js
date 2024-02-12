import { Animated, Dimensions, Platform, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import { styles } from './style'
import CustomButton from '../CustomButton';
import colors from '../../utils/colors';
import { setHeight, setWidth } from '../../utils/variable';
import Lottie from 'lottie-react-native'
import Entypo from 'react-native-vector-icons/Entypo'
const { width, height } = Dimensions.get("screen")

export default class RateUsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.animHeight = new Animated.Value(height)
  }
  animUp() {
    Animated.timing(this.animHeight, {
      useNativeDriver: false,
      toValue: 0,
      duration: 1000
    }).start()
  }

  componentDidMount() {
    this.animUp()
  }

  render() {
    return (
      <View style={styles.container}>

        <Animated.View style={[styles.content, { transform: [{ translateY: this.animHeight }] }]}>
          <TouchableOpacity style={styles.crossView} onPress={this.props.onClose}>
            <Entypo name='cross' size={setWidth(8)} color={colors.black} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Lottie
              autoPlay
              loop
              style={styles.lottiView}
              source={require("../../utils/rateus.json")}
            />
            <Text style={styles.heading}>Rate Us</Text>
            {/* <Text style={styles.subHeading}>How was Your Experience With Us?</Text> */}
            <Text style={styles.subHeading} adjustsFontSizeToFit numberOfLines={1}>Let Us Know How we're doing!</Text>
            <Text style={styles.text} adjustsFontSizeToFit numberOfLines={2} >We are always trying yo improve what we do and your feedback is invaluable!</Text>
            <CustomButton
              container={{
                marginTop: "auto",
                backgroundColor: colors.primaryyellow,
                paddingHorizontal: setWidth(7),
                paddingRight: setWidth(9),
                width: setWidth(58),
                alignSelf: "center"
              }}
              label={`Rate Us On ${Platform.OS === 'android' ? "PlayStore" : "App Store"}`}
              labelStyle={{ color: colors.white }}
              iconColor={colors.white}
              onPress={this.props.onPressRateBtn}
              leftIcon
            />
          </View>

        </Animated.View>
      </View>
    )
  }
}