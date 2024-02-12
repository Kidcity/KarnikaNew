import { Animated, Dimensions, ScrollView, Text, View } from 'react-native'
import React, { Component } from 'react'
import { styles } from './style'
import CartPaymentView from '../../CartPaymentView'

const {width, height} = Dimensions.get("screen")

export default class Step3 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      default_shipping_address: undefined,
      city_wallet_amount: 0,
      rupifi_credit_balance: 0,
      cod_percentage: 0,
      cod_amount_to_pay: 0,
      total_order_value: 0,
      onChoosePaymentMode: undefined
    }
    this.axisX = new Animated.Value(width)
  }

  static getDerivedStateFromProps(props, state) {
    return {
      default_shipping_address: props.default_shipping_address ? props.default_shipping_address : undefined,
      city_wallet_amount: props.city_wallet_amount ? props.city_wallet_amount : 0,
      rupifi_credit_balance: props.credit_balance ? props.credit_balance : 0,
      cod_percentage: props.cod_percentage ? props.cod_percentage : 0,
      cod_amount_to_pay: props.cod_amount_to_pay ? props.cod_amount_to_pay : 0,
      total_order_value: props.total_order_value ? props.total_order_value : 0,
      onChoosePaymentMode: props.onChoosePaymentMode ? props.onChoosePaymentMode : undefined
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
          <Text style={styles.headingText}>SELECT THE PAYMENT METHOD YOU WANT TO USE</Text>
        </View>
        <ScrollView style={styles.content}>
          <CartPaymentView
            address={this.state.default_shipping_address}
            city_wallet_amount={this.state.city_wallet_amount}
            credit_balance={this.state.rupifi_credit_balance}
            COD_percentage={this.state.cod_percentage}
            COD_amount_to_pay={this.state.cod_amount_to_pay}
            total_order_value={this.state.total_order_value}
            onChoosePaymentMode={(obj) => {
              // console.log(obj);
              if(this.state.onChoosePaymentMode){
                this.state.onChoosePaymentMode(obj)
              }
            }}
          />
        </ScrollView>
      </Animated.View>
    )
  }
}