import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import colors from '../../utils/colors';
import { styles } from './style';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { images, setHeight, setWidth } from '../../utils/variable';
import IncrementDecrementButton from '../IncrementDecrementButton'
import FastImage from 'react-native-fast-image';
import { Strings } from '../../utils/strings';
import { commonStyle } from '../../helper/commonStyle';

export default class CollapsableProductCartButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: true
    };
  }

  renderProductItem = ({ item, index }) => {
    return (
      <View style={[styles.productView, (index != 0) && { paddingTop: setWidth(4) }]}>
        <TouchableOpacity style={[styles.productImageView, {}]} onPress={() => this.props.onPressItem(item.product_id)} >
          <FastImage
            style={[styles.productImage]}
            source={{
              uri: item.image,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.productDetailsView} onPress={() => this.props.onPressItem(item.product_id)}>
          <Text style={[styles.subHeading, styles.textBold, styles.darkText,]}>{item.brand_name}</Text>
          <View style={[styles.row,]}>
            <Text style={styles.subHeading}>{Strings.cartScreenStrings.setqtyText}</Text>
            <Text style={[styles.text, styles.textBold, styles.darkText]}> {item.set_qty} Pcs</Text>
          </View>
          <View style={[styles.row, { alignItems: 'center' }]}>
            <Text style={styles.subHeading}>{Strings.cartScreenStrings.sizeText}</Text>
            <Text style={[styles.text, styles.textBold, styles.darkText]}>{item.size}</Text>
          </View>
          <View style={[styles.row, { alignItems: 'center' }]}>
            <Text style={styles.subHeading}>{Strings.cartScreenStrings.colorText}</Text>
            <Text style={[styles.text, styles.textBold, styles.darkText]}>{item.no_of_color}</Text>
          </View>
          <View style={[styles.row]}>
            <Text style={styles.subHeading}>{Strings.cartScreenStrings.priceText}</Text>
            <Text style={[styles.text, styles.textBold, styles.darkText, commonStyle.bluredText]}> ₹ {item.per_piece_price} / {Strings.cartScreenStrings.pieceText}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.buttonView}>
          <Text style={[styles.text, styles.darkText, styles.textBold, { textAlign: 'center', marginTop: setWidth(2), fontSize: setWidth(3) }]}>{Strings.cartScreenStrings.quantitysetText}</Text>
          <IncrementDecrementButton
            container={{
              backgroundColor: colors.blue,
              marginTop: setWidth(1),
              width: setWidth(25),
              height: setHeight(5)
            }}
            btnTextColor={colors.white}
            iconSize={setWidth(4)}
            label={item.qty_ordered}
            onDecrease={() => this.props.onDecrease(item.qty_ordered - 1, index)}
            onIncrease={() => this.props.onIncrease(item.qty_ordered + 1, index)}
          />
          <Text style={[styles.text, styles.textBold, styles.darkText, commonStyle.bluredText, { marginTop: setWidth(2), textAlign: 'center', }]}>₹ {parseFloat(item.order_price).toFixed(2)}</Text>
        </View>
      </View>
    )
  }

  render() {
    // console.log(this.props.item.shipping_details);
    return (
      <View style={[styles.container]}>
        {
          this.state.isCollapsed &&
          <View style={styles.cityNameView}>
            {
              (this.props.item?.shop_in_shop === "1") &&
              <View style={[{ flex: 0.3 }]}>

              </View>
            }
            <Text style={[styles.cityName, { flex: 1 }]}>
              {
                (this.props.item?.shop_in_shop === "1") ? this.props.item?.brand_name : this.props.item?.facility_name
              }
            </Text>
            {
              (this.props.item?.shop_in_shop === "1") &&
              <Text style={[styles.cartText, { flex: 0.3, }]} adjustsFontSizeToFit>{this.props.item?.facility_name}</Text>
            }
          </View>
        }

        <View style={[styles.row, styles.collapsableHeader]}>
          <Text style={[styles.text, styles.textBold, { color: colors.dark_charcoal }]}>
            {
              this.state.isCollapsed ?
                (this.props.item.total_items == 1) ? this.props.item.total_items + " Item" : this.props.item.total_items + ' Items'
                :
                "Items For " + (this.props.item?.shop_in_shop === "1" ? this.props.item?.brand_name : this.props.item?.city_name)
            }
          </Text>

          {
            this.state.isCollapsed &&
            <View style={[styles.row, { alignItems: 'center' }]}>
              <Text style={styles.text}>{Strings.cartScreenStrings.totalValueText}</Text>
              <Text style={[styles.text, styles.textBold, { color: colors.dark_charcoal }, commonStyle.bluredText]}> ₹ {this.props.item.gross_total_price}</Text>
            </View>
          }

          <View style={[styles.row, { alignItems: 'center' }]}>
            <TouchableOpacity style={styles.btn} onPress={() => this.setState({ isCollapsed: !this.state.isCollapsed })}>
              <Text style={styles.btnText}>{this.state.isCollapsed ? "View" : "Hide"} Cart</Text>
            </TouchableOpacity>
          </View>

        </View>

        {
          !this.state.isCollapsed &&
          <View style={styles.collasableItemsView}>
            <FlatList
              data={this.props.item.items}
              keyExtractor={(item, index) => index}
              renderItem={this.renderProductItem}
            />
            {
              this.props.is_ws_not === 1 &&
              <View style={styles.priceDetailsview}>
                <View style={[styles.row, { justifyContent: 'space-between', }]}>
                  <Text style={[styles.darkText, styles.text]}>{Strings.cartScreenStrings.totalValueText}</Text>
                  <Text style={[styles.darkText, styles.text, commonStyle.bluredText]}>₹ {parseFloat(this.props.item.shipping_details.total_order_price).toFixed(2)}</Text>
                </View>
                {
                  (this.props.item.oda_charges != 0) &&
                  <View style={[styles.row, styles.textGap, { justifyContent: 'space-between' }]}>
                    <Text style={[styles.darkText, styles.text]}>{Strings.cartScreenStrings.odaChargeText}</Text>
                    <Text style={[styles.darkText, styles.text, commonStyle.bluredText]}>₹ {parseFloat(this.props.item.shipping_details.oda_charges).toFixed(2)}</Text>
                  </View>
                }
                {
                  (this.props.item.shipping_details.special_discount != 0) ?
                    <View style={[styles.row, styles.textGap, { justifyContent: 'space-between' }]}>
                      <Text style={[styles.darkText, styles.text, { color: colors.lightRed }]}>{Strings.cartScreenStrings.specialDiscountText}</Text>
                      <Text style={[styles.darkText, styles.text, commonStyle.bluredText, { color: colors.lightRed }]}>- ₹ {parseFloat(this.props.item.shipping_details.special_discount).toFixed(2)}</Text>
                    </View>
                    :
                    null
                }

                <View style={[styles.row, styles.textGap, { justifyContent: 'space-between' }]}>
                  <Text style={[styles.darkText, styles.text]}>{Strings.cartScreenStrings.shippingchargeText}</Text>
                  <Text style={[styles.darkText, styles.text, commonStyle.bluredText]}>₹ {parseFloat(this.props.item.shipping_details.shipping_charge).toFixed(2)}</Text>
                </View>
                <View style={[styles.row, styles.textGap, { justifyContent: 'space-between' }]}>
                  <Text style={[styles.darkText, styles.text]}>{Strings.cartScreenStrings.platformfeeText}</Text>
                  <Text style={[styles.darkText, styles.text, commonStyle.bluredText]}>₹ {parseFloat(this.props.item.shipping_details.platform_fees).toFixed(2)}</Text>
                </View>
                {
                  (+this.props.item.shipping_details?.gst_cal_5 > 0) &&
                  <View style={[styles.row, styles.textGap, { justifyContent: 'space-between' }]}>
                    <Text style={[styles.darkText, styles.text]}>{Strings.cartScreenStrings.gst5Text}</Text>
                    <Text style={[styles.darkText, styles.text, commonStyle.bluredText]}>₹ {parseFloat(this.props.item.shipping_details.gst_cal_5).toFixed(2)}</Text>
                  </View>
                }
                {
                  (+this.props.item.shipping_details.gst_cal_12 > 0) &&
                  <View style={[styles.row, styles.textGap, { justifyContent: 'space-between' }]}>
                    <Text style={[styles.darkText, styles.text]}>{Strings.cartScreenStrings.gst12Text}</Text>
                    <Text style={[styles.darkText, styles.text, commonStyle.bluredText,]}>₹ {parseFloat(this.props.item.shipping_details.gst_cal_12).toFixed(2)} </Text>
                  </View>
                }
              </View>
            }
            {
              this.props.is_ws_not === 1 &&
              <View style={[styles.row, styles.borderBottom, { justifyContent: 'space-between', paddingHorizontal: setWidth(5), paddingVertical: setWidth(2) }]}>
                <Text style={[styles.darkText, styles.text, styles.textBold, { color: colors.dark_charcoal }]}>{Strings.cartScreenStrings.grosstotalText}</Text>
                <Text style={[styles.darkText, styles.text, styles.textBold, { color: colors.dark_charcoal }, commonStyle.bluredText,]}>₹ {parseFloat(this.props.item.shipping_details.gross_total_price).toFixed(2)}</Text>
              </View>
            }
          </View>
        }
      </View>
    );
  }
}
