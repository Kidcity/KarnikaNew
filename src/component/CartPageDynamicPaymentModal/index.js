import { Animated, Dimensions, Text, View, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { styles } from './style'
import CartPageMapping from '../CartPageMapping';
import Step1 from './Step1';
import colors from '../../utils/colors';
import { errorAlert } from '../../helper/ToastHelper';
import Step2 from './Step2';
import Step3 from './Step3';
import EmptyCartModal from '../EmptyCartModal';
import { commonStyle } from '../../helper/commonStyle';

const { width, height } = Dimensions.get("screen")

export default class CartPageDynamicPaymentModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart_map_pointer: [
        {
          id: 1,
          title: "Step1",
          isDone: true,
          showRedDash: false
        },
        {
          id: 2,
          title: "Step2",
          isDone: false,
          showRedDash: false
        },
        // {
        //   id: 3,
        //   title: "Step3",
        //   isDone: false,
        //   showRedDash: false
        // }
      ],
      currentMapIndex: 0,
      total_price_to_pay: 0,
      cart_items: [],
      brand_id: '',
      city_name: '',
      selected_item: [],
      emptyCartModalTitle: '',
      showEmptyCartModal: false,

      onPressAddNewAddress: undefined,
      onPressChangeAddress: undefined,
      total_price_details: undefined,
      default_shipping_address: undefined,
      onCityWiseBuy: undefined,
      checkMinimumOrderPrice: undefined,
      onPressContinueShopping: undefined,
      onChoosePaymentMode: undefined,
      showPaymentBreakUpModal: undefined,
      onClosePaymentProcessModal: undefined,
      notDeliverable: false,
      cod_percentage: 0,
      cod_amount_to_pay: 0,
      total_order_value: 0,
      city_wallet_amount: 0,
      credit_balance: 0,
      is_ws_not: 0
    };
    this.yAxis = new Animated.Value(height)
  }

  static getDerivedStateFromProps(props, state) {

    return {
      cart_items: props.cart_items ? props.cart_items : [],
      onPressAddNewAddress: props.onPressAddNewAddress ? props.onPressAddNewAddress : undefined,
      onPressChangeAddress: props.onPressChangeAddress ? props.onPressChangeAddress : undefined,
      // total_price_details: props.total_price_details ? props.total_price_details : undefined,
      onCityWiseBuy: props.onCityWiseBuy ? props.onCityWiseBuy : undefined,
      default_shipping_address: props.default_shipping_address ? props.default_shipping_address : undefined,
      checkMinimumOrderPrice: props.checkMinimumOrderPrice ? props.checkMinimumOrderPrice : undefined,
      onPressContinueShopping: props.onPressContinueShopping ? props.onPressContinueShopping : undefined,
      onChoosePaymentMode: props.onChoosePaymentMode ? props.onChoosePaymentMode : undefined,
      showPaymentBreakUpModal: props.showPaymentBreakUpModal ? props.showPaymentBreakUpModal : undefined,
      onClosePaymentProcessModal: props.onClosePaymentProcessModal ? props.onClosePaymentProcessModal : undefined,
      notDeliverable: props.hasOwnProperty("notDeliverable") ? props.notDeliverable : false,
      cod_percentage: props.cod_percentage ? props.cod_percentage : 0,
      cod_amount_to_pay: props.cod_amount_to_pay ? props.cod_amount_to_pay : 0,
      total_order_value: props.total_order_value ? props.total_order_value : 0,
      city_wallet_amount: props.city_wallet_amount ? props.city_wallet_amount : 0,
      credit_balance: props.credit_balance ? props.credit_balance : 0,
      is_ws_not: props.hasOwnProperty("is_ws_not") ? props.is_ws_not : 0
    }
  }

  onPressCartItem = (item, is_del = 1) => {

    if (item && is_del === 0) {
      let selected_item = this.state.selected_item
      selected_item.push(item)
      this.setState({
        total_price_to_pay: this.state.total_price_to_pay + item.gross_total_price,
        city_name: item.city_name,
        selected_item: selected_item
      })

      if (this.state.onCityWiseBuy) {
        // this.state.onCityWiseBuy(item)
      }
    } else {

      let selected_item = this.state.selected_item
      let total_price = 0

      if (selected_item.includes(item)) {
        const _index = selected_item.indexOf(item)    
        selected_item.splice(_index, 1)
      }
    
      for (let index = 0; index < selected_item.length; index++) {
        const element = selected_item[index];
        total_price += element.gross_total_price
      }
      this.setState({ total_price_to_pay: total_price, city_name: '', selected_item: selected_item })
    }
  }


  async checkMinimumOrderPrice() {

    const item_data = this.state.selected_item
    let count = 0

    for (let index = 0; index < item_data.length; index++) {
      const item = item_data[index];
      if (+item.gross_total_price < +item.minimum_order_amount) {
        const remain = (+item.minimum_order_amount - +item.gross_total_price)
        this.setState({
          showEmptyCartModal: true,
          emptyCartModalTitle: "ADD PRODUCT FOR RS " + parseFloat(remain).toFixed(2) + " TO REACH MINIMUM ORDER VALUE OF RS. " + parseFloat(item.minimum_order_amount).toFixed(2)
        })
        break
      } else {
        count += 1
      }
    }

    if (count === item_data.length) {
      return true
    }
  }


  onPressFooterBtn = async () => {
    const currentMapIndex = this.state.currentMapIndex
    const cart_map_pointer = this.state.cart_map_pointer

    const total_price_details = this.props.total_price_details
    const selected_item = this.state.selected_item

    if (this.state.total_price_to_pay == 0) {
      errorAlert("Oops!", "Please Choose Items To Proceed.")
      return
    }

    if (this.state.notDeliverable && currentMapIndex == 1) {
      errorAlert("Sorry!", "Order cannot be deliver in your address.\nPlease change your address.")
      return
    }

    let filter_price = []
    

    selected_item.map((item, index) => {
      if (item?.shop_in_shop == "1") {
        filter_price.push(total_price_details.filter(itm => itm.brand_id == item.brand_id)[0])
      } else {
        filter_price.push(total_price_details.filter(itm => itm.city_id == item.city_id)[0])
      }
    })
  
    this.setState({
      total_price_details: filter_price
    })
    
    if (+currentMapIndex === 1) {
      if (this.state.showPaymentBreakUpModal) {
        this.state.showPaymentBreakUpModal(selected_item)
      }
      return
    }

    const result = await this.checkMinimumOrderPrice()
    if (result) {
      cart_map_pointer[(+currentMapIndex + 1)].isDone = true
      cart_map_pointer[(+currentMapIndex + 1)].showRedDash = true

      this.setState({
        currentMapIndex: (+currentMapIndex + 1),
        cart_map_pointer: cart_map_pointer
      })
    }
  }

  onChoosePaymentMode = (payment_obj) => {
    if (this.state.onChoosePaymentMode) {
      //console.log(payment_obj);
      this.setState({
        total_price_to_pay: payment_obj.amount
      })
      this.state.onChoosePaymentMode(payment_obj)
    }
  }

  animUp() {
    Animated.timing(this.yAxis, {
      useNativeDriver: false,
      toValue: 0,
      duration: 500
    }).start()
  }

  animDown() {
    Animated.timing(this.yAxis, {
      useNativeDriver: false,
      toValue: height,
      duration: 500
    }).start(() => {
      if (this.state.onClosePaymentProcessModal) {
        this.state.onClosePaymentProcessModal()
      }
    })
  }

  componentDidMount() {
    this.animUp()
    // if (this.state.is_ws_not == 1) {
    //   const cart_map_pointer = this.state.cart_map_pointer
    //   cart_map_pointer.splice(2, 1)
    //   this.setState({
    //     cart_map_pointer
    //   })
    // }
  }

  render() {

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backDrop} onPress={() => this.state.onClosePaymentProcessModal()}>

        </TouchableOpacity>
        <Animated.View style={[styles.content, { transform: [{ translateY: this.yAxis }] }]}>
          <CartPageMapping
            cart_map_pointer={this.state.cart_map_pointer}
            is_ws_not={this.state.is_ws_not}
          />

          {
            this.state.currentMapIndex == 0 ?
              <Step1
                cart_items={this.state.cart_items}
                is_ws_not={this.state.is_ws_not}
                onPressCartItem={(item, is_del) => this.onPressCartItem(item, is_del)}
              />
              :
              this.state.currentMapIndex == 1 ?
                <Step2
                  city_name={this.state.city_name}
                  onPressChangeAddress={this.state.onPressChangeAddress}
                  onPressAddNewAddress={this.state.onPressAddNewAddress}
                  total_price_details={this.state.total_price_details}
                  default_shipping_address={this.state.default_shipping_address}
                  notDeliverable={this.state.notDeliverable}
                />
                :
                <Step3
                  default_shipping_address={this.state.default_shipping_address}
                  city_wallet_amount={this.state.city_wallet_amount}
                  credit_balance={this.state.credit_balance}
                  cod_percentage={this.state.cod_percentage}
                  cod_amount_to_pay={this.state.cod_amount_to_pay}
                  total_order_value={this.state.total_order_value}
                  onChoosePaymentMode={(payment_obj) => this.onChoosePaymentMode(payment_obj)}
                />
          }

          {
            this.state.showEmptyCartModal &&
            <EmptyCartModal
              title={this.state.emptyCartModalTitle}
              onPressContinueShopping={() => {
                this.setState({ showEmptyCartModal: false })
                if (this.state.onPressContinueShopping) {
                  this.state.onPressContinueShopping()
                }
              }}
              onPressClose={() => {
                this.setState({ showEmptyCartModal: false })
                this.animDown()
              }}
            />
          }
          <View style={styles.footerBtnView}>
            <View style={styles.row}>
              <Text style={[styles.footerText, styles.textBold]}>Total </Text>
              <Text style={[styles.footerText, styles.textBold, { color: colors.grey2 },commonStyle.bluredText ]}> ₹ {parseFloat(this.state.total_price_to_pay).toFixed(2)}</Text>
            </View>

            <TouchableOpacity style={styles.footerBtn} onPress={this.onPressFooterBtn}>
              <Text style={styles.footerBtnText} adjustsFontSizeToFit numberOfLines={1}>
                {
                  this.state.currentMapIndex == 0 ?
                    "PROCEED TO SELECT ADDRESS"
                    :
                    this.state.currentMapIndex == 1 ?
                      this.state.is_ws_not === 0 ? "CONFIRM ADDRESS & REQUEST" : "CONFIRM ADDRESS & ORDER"
                      :
                      "PROCEED TO BUY"
                }
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

      </View>
    )
  }
}