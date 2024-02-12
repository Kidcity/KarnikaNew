import { Animated, Dimensions, ScrollView, Text, View } from 'react-native'
import React, { Component } from 'react'
import { styles } from './style'
import { DEVICE_WIDTH } from '../../../utils/variables'
import FullWidthButton from '../../FullScreenCollapsableButton'
import Checkbox from '../../Checkbox'
import { commonStyle } from '../../../helper/commonStyle'
import AddressCard from '../../AddressCard'
// import CartPaymentView from '../../CartPaymentView'


export default class Step3 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedCartItem: null,
      cod_isChecked: false,
      online_isChecked: false,

    }
    this.axisX = new Animated.Value(DEVICE_WIDTH)
  }

  static getDerivedStateFromProps(props, state) {
    
    return {
      selectedCartItem: props.hasOwnProperty("selectedCartItem") ? props.selectedCartItem : null,
      // default_shipping_address: props.hasOwnProperty("default_shipping_address") ? props.default_shipping_address : undefined,
      // city_wallet_amount: props.hasOwnProperty("city_wallet_amount") ? props.city_wallet_amount : 0,
      // rupifi_credit_balance: props.hasOwnProperty("credit_balance") ? props.credit_balance : 0,
      // cod_percentage: props.hasOwnProperty("cod_percentage") ? props.cod_percentage : 0,
      // cod_amount_to_pay: props.hasOwnProperty("cod_amount_to_pay") ? props.cod_amount_to_pay : 0,
      // total_order_value: props.hasOwnProperty("total_order_value") ? props.total_order_value : 0,
      // onChoosePaymentMode: props.hasOwnProperty("onChoosePaymentMode") ? props.onChoosePaymentMode : undefined
    }
  }

  animFromRight() {
    Animated.spring(this.axisX, {
      toValue: 0,
      useNativeDriver: true,
      // delay: 1000,
      friction: 4,
    }).start()
  }

  componentDidMount() {
    this.animFromRight()
  }

  CustomeExpandBlock = ({ type = "COD" }) => {
    return (
      <View style={[styles.expandBox]}>

        {
          type === "COD" &&
          <Text style={[commonStyle.textCharcoal, commonStyle.text12, commonStyle.fontBold]}>
            {`For Cash On Delivery , Please Pay ₹${this.state.cod_percentage}% Advance, Balance on Delivery.`}
          </Text>
        }

        <View style={[commonStyle.row, commonStyle.alignItemsCenter, commonStyle.justifyContentBetween, (type !== "ONLINE") && commonStyle.gapTop10]}>

          <Text style={[commonStyle.textCharcoal, commonStyle.text12, commonStyle.fontBold]}>
            {
              type === "ONLINE" ?
                `Pay: ₹${this.state.actual_order_amount}`
                :
                type === "COD" &&
                `Pay: ₹${this.state.actual_order_amount} Online`
            }
          </Text>


          <Checkbox
            isChecked={
              type === "ONLINE" ?
                this.state.online_isChecked
                :
                type === 'COD' &&
                this.state.cod_isChecked
            }
            onPressCheckBox={(v) => this.props.onPressCheckBox(v)}
          />
        </View>
      </View>
    )
  }

  render() {
    return (
      <Animated.View style={[styles.container, { transform: [{ translateX: this.axisX }] }]}>
        <View style={styles.heading}>
          <Text style={styles.headingText}>SELECT THE PAYMENT METHOD YOU WANT TO USE</Text>
        </View>
        {/* <ScrollView style={styles.content}> */}

        <FullWidthButton
          collapsableButton
          label="Cash on delivery"
          customeComponent={<this.CustomeExpandBlock type="COD" amount={1000} />}
        />

        <FullWidthButton
          collapsableButton
          label="Online Payment"
          customeComponent={<this.CustomeExpandBlock type="ONLINE" amount={1000} />}
        />

        <FullWidthButton
          label="City Wallet"
          middleTextComponent={<Text style={[commonStyle.text12, commonStyle.fontBold, commonStyle.textRed, commonStyle.flex1, commonStyle.textAlignCenter, { paddingHorizontal: 5 }]} numberOfLines={1}>Available Balance: ₹1000</Text>}
          showCheckBox
          isChecked={false}
          onPressCheckBox={() => { }}
        />

        <FullWidthButton
          label="CREDIT BUY"
          middleTextComponent={<Text style={[commonStyle.text12, commonStyle.fontBold, commonStyle.textRed, commonStyle.flex1, commonStyle.textAlignCenter, { paddingHorizontal: 5 }]} numberOfLines={1}>Available Balance: ₹1000</Text>}
          showCheckBox
          isChecked={false}
          onPressCheckBox={() => { }}
        />

        <AddressCard
          containerStyle={commonStyle.gapTop20}
        />
        {/* <CartPaymentView
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
          /> */}
        {/* </ScrollView> */}
      </Animated.View>
    )
  }
}