import { Animated, Dimensions, ScrollView, Text, View } from 'react-native'
import React, { Component } from 'react'
import { styles } from './style'
import colors from '../../../utils/colors'
import CartAddressView from '../../CartAddressView'

const {width, height} = Dimensions.get("screen")

export default class Step2 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      city_name: '',
      onPressAddNewAddress: undefined,
      onPressChangeAddress: undefined,
      total_price_details: undefined,
      default_shipping_address: undefined,
      notDeliverable: false
    }
    this.axisX = new Animated.Value(width)
  }

  static getDerivedStateFromProps(props, state) {
    return {
      city_name: props.city_name ? props.city_name : '',
      onPressAddNewAddress: props.onPressAddNewAddress ? props.onPressAddNewAddress : undefined,
      onPressChangeAddress: props.onPressChangeAddress ? props.onPressChangeAddress : undefined,
      total_price_details: props.total_price_details ? props.total_price_details : undefined,
      default_shipping_address: props.default_shipping_address ? props.default_shipping_address : undefined,
      notDeliverable: props.hasOwnProperty("notDeliverable") ? props.notDeliverable : false
    }
  }

  animFromRight (){
    Animated.spring(this.axisX,{
      toValue: 0,
      useNativeDriver: true,
      // delay: 1000,
      friction: 4,
    }).start() 
  }

  componentDidMount(){
    this.animFromRight()
  }

  render() {
    return (
      <Animated.View style={[styles.container,{transform: [{translateX: this.axisX}]}]}>
        <View style={styles.heading}>
          <Text style={styles.headingText}>SELECT THE ADDRESS YOU WANT YOUR <Text style={{ color: colors.red }}>{this.state.city_name}</Text> ORDER TO BE DELIVERED</Text>
        </View>
        <ScrollView style={styles.content}>
          <CartAddressView
            address={this.state.default_shipping_address}
            total_price_details={this.state.total_price_details}
            onPressChangeAddress={this.state.onPressChangeAddress}
            onPressAddNewAddress={this.state.onPressAddNewAddress}
            not_deliverable={this.state.notDeliverable}
          />
        </ScrollView>
      </Animated.View>
    )
  }
}