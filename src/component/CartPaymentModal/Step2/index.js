import { Animated, Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import { styles } from './style'
import { colors } from '../../../utils/colors'
import { DEVICE_WIDTH, normalize } from '../../../utils/variables'
import { commonStyle } from '../../../helper/commonStyle'
import AddressCard from '../../AddressCard'
import Feather from 'react-native-vector-icons/Feather'
import RoundedCornerButton from '../../RoundedCornerButton'
import moment from 'moment'
import EachOrderPriceBreakUp from '../../EachOrderPriceBreakUp'
import PriceBreakUp from '../../PriceBreakUp'

// import CartAddressView from '../../CartAddressView'


export default class Step2 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedCartItem: null,
      notDeliverable: false,
      est_date: ""
    }
    this.axisX = new Animated.Value(DEVICE_WIDTH)
  }

  static getDerivedStateFromProps(props, state) {
    return {
      selectedCartItem: props.hasOwnProperty("selectedCartItem") ? props.selectedCartItem : null,
      notDeliverable: props.hasOwnProperty("notDeliverable") ? props.notDeliverable : false
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
    var startdate = moment()
    startdate = startdate.format("DD-MM-YYYY");
    var new_date = moment(startdate, "DD-MM-YYYY").add(10, 'days');

    this.setState({
      est_date: moment(new_date).format("Do MMM YYYY")
    })
  }

  render() {
    return (
      <Animated.View style={[styles.container, { transform: [{ translateX: this.axisX }] }]}>
        <View style={[styles.heading]}>
          <Text style={[commonStyle.fontBold, commonStyle.text14, commonStyle.textCharcoal, commonStyle.textUpperCase]}>SELECT THE ADDRESS YOU WANT YOUR <Text style={{ color: colors.lightRed }}>{this.state.selectedCartItem?.city_name}</Text> ORDER TO BE DELIVERED</Text>
        </View>
        {/* <ScrollView contentContainerStyle={[styles.content, commonStyle.padding_H_15]} style={[commonStyle.gapTop10]}> */}

          <AddressCard />

          <View style={[commonStyle.row, commonStyle.gapTop20]}>
            <RoundedCornerButton
              label="CHANGE / EDIT"
              containerStyle={[ commonStyle.flex1]}
            />
            <RoundedCornerButton
              label="ADD NEW ADDRESS"
              containerStyle={[ commonStyle.flex1, commonStyle.gapLeft6]}
            />
          </View>

          <View style={[commonStyle.row, commonStyle.gapTop20, commonStyle.justifyContentCenter, commonStyle.alignItemsCenter, { backgroundColor: colors.yellow, paddingVertical: normalize(5)}]}>
            <Feather name='truck' size={normalize(20)} color={colors.charcoal} />
            <Text style={[commonStyle.fontBold, commonStyle.text14, commonStyle.textCharcoal, commonStyle.gapLeft6]}>Estimated Delivey By {this.state.est_date}</Text>
          </View>

          <PriceBreakUp
            cart_items={[this.state.selectedCartItem]}
          />

        {/* </ScrollView> */}
      </Animated.View>
    )
  }
}