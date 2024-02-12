import { Text, View } from 'react-native'
import React, { PureComponent } from 'react'
import { styles } from './style';
import { commonStyle } from '../../helper/commonStyle';

export class PriceBreakUp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      cart_items: null,
      total_payable_amount: 0
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {
      cart_items: props.hasOwnProperty("cart_items") ? props.cart_items : null,
    }
  }

  componentDidMount() {
   
    const total = this.state.cart_items.reduce((accum, curr) => {
      accum += curr?.price_breakup?.gross_total()
      return accum
    }, 0)
    this.setState({
      total_payable_amount: total
    })
  }


  render() {
    if (!this.state.cart_items) {
      return null
    }
    return (
      <View style={styles.container}>
        <Text style={[commonStyle.text14, commonStyle.fontBold, commonStyle.textBlack]}>Total Price Details</Text>
        <View style={[styles.priceBreakUp]}>
          {
            this.state.cart_items.map((item, index) =>
              <View key={index} style={[commonStyle.row, commonStyle.gapTop6]}>
                <Text style={[commonStyle.fontBold, commonStyle.textgrey, commonStyle.text14, commonStyle.flex1]} numberOfLines={1}>
                  {
                    item?.shop_in_shop === 1 ?
                      item?.brand_name
                      :
                      item?.city_name
                  } Order Value
                </Text>
                <Text style={[commonStyle.fontBold, commonStyle.textgrey, commonStyle.text14]}>
                  {
                    item?.price_breakup?.gross_total()
                  }
                </Text>
              </View>
            )
          }
          <View style={[commonStyle.row, commonStyle.justifyContentBetween, commonStyle.gapTop10]}>
            <Text style={[commonStyle.fontBold, commonStyle.textBlack, commonStyle.text14]}>
              You Pay
            </Text>
            <Text style={[commonStyle.fontBold, commonStyle.textBlack, commonStyle.text14]}>
              {
                this.state.total_payable_amount
              }
            </Text>
          </View>
        </View>
      </View>
    )
  }
}

export default PriceBreakUp