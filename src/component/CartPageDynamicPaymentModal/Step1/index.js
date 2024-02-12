import { Animated, Dimensions, FlatList, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import { styles } from './style'
import Feather from 'react-native-vector-icons/Feather'
import colors from '../../../utils/colors';
import { fonts, setHeight, setWidth } from '../../../utils/variable';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { commonStyle } from '../../../helper/commonStyle';

const { width, height } = Dimensions.get("screen")

export default class Step1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart_items: [],
      selected_cart_item_index: [],
      onPressCartItem: undefined
    };
    this.axisX = new Animated.Value(width)
  }

  static getDerivedStateFromProps(props, state) {
    return {
      cart_items: props.cart_items ? props.cart_items : [],
      onPressCartItem: props.onPressCartItem ? props.onPressCartItem : undefined
    }
  }

  onPressCartItem = (index) => {
    const cart_items = this.state.cart_items
  
    let selected_cart_item_index = this.state.selected_cart_item_index

    if (selected_cart_item_index.includes(index)) {
       
      const _index = selected_cart_item_index.indexOf(index);
      if (_index > -1) { // only splice array when item is found
        selected_cart_item_index.splice(_index, 1); // 2nd parameter means remove one item only
      }

      this.state.onPressCartItem(cart_items[index], 1)

    } else {
      
      selected_cart_item_index.push(index)
      if (this.state.onPressCartItem) {
        this.state.onPressCartItem(cart_items[index] , 0)
      }

    }

    this.setState({
      selected_cart_item_index: selected_cart_item_index
    })
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
      <View style={[styles.cartItemsContainer]}>
        <View style={[styles.row, styles.alignCenter, (!item.is_minimum_order_amount_met) && { paddingBottom: 10 }]}>
          <View style={[{ justifyContent: 'center', flex: 0.5, }]}>
            <View style={[styles.row, { alignItems: 'center' }]}>
              <Feather name='check' color={colors.grey3} size={setWidth(4)} />
              <Text style={[styles.cartText, styles.margin_L_2, styles.textBold, { textTransform: 'uppercase' }]}>
                {
                  (item?.shop_in_shop === "1") ? item?.brand_name : item.facility_name
                }
              </Text>
            </View>
            {
              (item?.shop_in_shop === "1") &&
              <Text style={[styles.cartText, { marginLeft: setWidth(6) }]}>( {item.facility_name} )</Text>
            }
          </View>
          <View style={[styles.row, styles.alignCenter, { flex: 0.3 }]}>
            <Text style={[styles.cartText]}>Total Value</Text>
            <Text style={[styles.cartText, styles.textBold, { color: colors.grey2 },commonStyle.bluredText
            //  this.props.is_ws_not == 0 && commonStyle.bluredText
            ]}>  ₹ {parseFloat(item.gross_total_price).toFixed(2)}</Text>
          </View>
          <View style={[{ flex: 0.2 }]}>
            <TouchableOpacity style={[styles.checkBox, (this.state.selected_cart_item_index.includes(index)) && { backgroundColor: colors.red }]} onPress={() => this.onPressCartItem(index)}>
            </TouchableOpacity>
          </View>
        </View>
        {
          !item.is_minimum_order_amount_met &&
          <View style={[styles.row, styles.warningView]}>
            <FontAwesome name='warning' color={colors.primaryyellow} size={setWidth(5)} style={{ flex: 0.1 }} />
            <Text style={[styles.minimun_order_warning_text, { flex: 0.9 }]}>
              Add Items worth
              <Text style={{ fontFamily: fonts.fontBold }}> ₹
                {
                  parseFloat(+item.minimum_order_amount - +item.gross_total_price).toFixed(2)
                }
              </Text>
              {" "}from{" "}
              {
                (item?.shop_in_shop === "1") ? item?.brand_name : item.facility_name
              }
              {" "}to complete{" "}
              <Text style={[styles.minimun_order_warning_text, { fontFamily: fonts.fontBold }]}>
                Minimum Order Amount <Text style={[commonStyle.bluredText,]}>₹{item.minimum_order_amount}</Text>
              </Text>
            </Text>
          </View>
        }
      </View>
    )
  }

  render() {
    return (
      <Animated.View style={[styles.container, { transform: [{ translateX: this.axisX }] }]}>
        <View style={styles.heading}>
          <Text style={styles.headingText}>SELECT THE ORDER YOU WANT TO PAY FOR</Text>
        </View>

        <FlatList
          data={this.state.cart_items}
          keyExtractor={(item, index) => index}
          renderItem={this.renderItem}
          style={styles.listContainer}
          contentContainerStyle={styles.listContentContainer}
          ItemSeparatorComponent={() => <View style={{ marginTop: setHeight(2) }} />}
        />

      </Animated.View>
    )
  }
}