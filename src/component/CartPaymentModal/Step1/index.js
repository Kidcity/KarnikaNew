import { Animated, Dimensions, FlatList, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import { styles } from './style'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { DEVICE_WIDTH, normalize } from '../../../utils/variables'
import { commonStyle } from '../../../helper/commonStyle'
import FlatListContainer from '../../FlatListContainer'
import { colors } from '../../../utils/colors'


export default class Step1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart_items: null,
      selected_cart_item_index: '',
      onPressCartItem: undefined
    };
    this.axisX = new Animated.Value(DEVICE_WIDTH)
  }

  static getDerivedStateFromProps(props, state) {
    return {
      cart_items: props.hasOwnProperty("cart_items") ? props.cart_items : null,
      onPressCartItem: props.hasOwnProperty("onPressCartItem") ? props.onPressCartItem : undefined
    }
  }

  onPressCheckBox = (index) => {
    
    const cart_items = this.state.cart_items

    this.setState({
      selected_cart_item_index: (this.state.selected_cart_item_index === index) ? '' : index
    })

    if (this.state.onPressCartItem) {
      this.state.onPressCartItem((this.state.selected_cart_item_index === index) ? undefined : cart_items[index])
    }
  }

  animFromRight() {
    Animated.spring(this.axisX, {
      toValue: 0,
      useNativeDriver: true,
      delay: 800,
      friction: 4,
    }).start()
  }

  componentDidMount() {
    this.animFromRight()
  }

  renderItem = ({ item, index }) => {   
    return (
      <View style={[styles.cartItemsContainer, commonStyle.shadow]}>
        <View style={[commonStyle.alignItemsCenter, commonStyle.row]}>
          <View style={[{ flex: 0.5 }, commonStyle.justifyContentCenter]}>
            <View style={[commonStyle.row, commonStyle.alignItemsCenter]}>
              <Feather name='check' color={colors.grey3} size={normalize(14)} />
              <Text style={[commonStyle.textgrey, commonStyle.fontBold, commonStyle.gapLeft6, commonStyle.textUpperCase, commonStyle.text12]}>
                {
                  (item?.shop_in_shop === 1) ? item?.brand_name : item.city_name
                }
              </Text>
            </View>
            {
              (item?.shop_in_shop === 1) &&
              <Text style={[styles.cityName, commonStyle.text12, { marginLeft: normalize(16) }]}>( {item.city_name} )</Text>
            }
          </View>
          <View style={[commonStyle.row, commonStyle.alignItemsCenter, { flex: 0.3 }]}>
            <Text style={[commonStyle.textgrey, commonStyle.fontRegular, commonStyle.text12]}>Total Value</Text>
            <Text style={[commonStyle.textgrey, commonStyle.text12, commonStyle.fontBold, { color: colors.grey2 }]}>  ₹{item.price_breakup.gross_total()}</Text>
          </View>
          <View style={[{ flex: 0.2 }]}>
            <TouchableOpacity style={[styles.checkBox, this.state.selected_cart_item_index === index && { backgroundColor: colors.lightRed }]} onPress={() => this.onPressCheckBox(index)}  >
            </TouchableOpacity>
          </View>
        </View>
        {
          (!item.is_minimum_order_amount_met()?.status) &&
          <View style={[commonStyle.row, styles.warningView, commonStyle.gapTop10, commonStyle.alignItemsCenter]}>
            <FontAwesome name='warning' color={colors.yellow} size={normalize(15)} style={{ flex: 0.1 }} />
            <Text style={[commonStyle.fontRegular,commonStyle.textBlack, { flex: 0.9 }]}>
              Add Items worth
              <Text style={[commonStyle.fontBold]}> ₹
                {
                 item.is_minimum_order_amount_met()?.remaining_amount
                }
              </Text>
              {" "}from{" "}
              {
                (item?.shop_in_shop === "1") ? item?.brand_name : item.city_name
              }
              {" "}to complete{" "}
              <Text style={[commonStyle.fontRegular,commonStyle.textBlack, ]}>
                Minimum Order Amount 
                <Text style={[commonStyle.fontBold]}> ₹{item.minimum_order_amount}</Text>
              </Text>
            </Text>
          </View>
        }
      </View>
    )
  }

  render() {
    return (
      <Animated.View style={[styles.container,]}>
        <View style={styles.heading}>
          <Text style={[commonStyle.fontBold, commonStyle.text14, commonStyle.textCharcoal]}>SELECT THE ORDER YOU WANT TO PAY FOR</Text>
        </View>

        <FlatListContainer
          data={this.state.cart_items}
          renderItem={this.renderItem}
          itemSeparatorComponent={<View style={{ marginTop: normalize(15) }} />}
          // style={{ marginTop: normalize(10) }}
          contentContainerStyle={{ paddingVertical: normalize(20) }}
        />

      </Animated.View>
    )
  }
}