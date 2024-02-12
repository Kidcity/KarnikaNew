import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styles } from './style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { setWidth } from '../../utils/variable';
import moment from 'moment'
import colors from '../../utils/colors';
import { commonStyle } from '../../helper/commonStyle';

export default class OrderBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    console.log( this.props.item)

    const bgcolor = (this.props.item.order_status == "Pending") ? styles.status_blue :
      (this.props.item.order_status == "Return Rejected" || this.props.item.order_status == "Return Requested") ? styles.status_red :
        styles.status_green


    return (
      <TouchableOpacity style={[styles.contianer, styles.row]} onPress={this.props.onPress}>
        <View style={styles.leftBlock}>
          <Image source={{ uri: this.props.item.image }} style={styles.image} resizeMode="cover" />
          <View style={[styles.orderstatusView, bgcolor]}>
            <Text style={styles.orderstatusText} adjustsFontSizeToFit numberOfLines={1}>{this.props.item.order_status}</Text>
          </View>
        </View>
        <View style={[styles.rightBlock, this.props.is_ws_not === 0 && { justifyContent: 'space-around' }]}>
          <View style={[styles.row, { alignItems: 'center', justifyContent: 'space-between', }]}>
            <View style={[styles.row]}>
              <Text style={styles.subHeading}>{this.props.is_ws_not === 0 ? "Request" : "Order"} No.:</Text>
              <Text style={styles.text}> {this.props.item.order_no}</Text>
            </View>
            <MaterialCommunityIcons name='arrow-right' size={setWidth(5)} color={colors.grey2} />
          </View>
          {/* <View style={[styles.row, { justifyContent: 'space-between', alignItems: 'center', marginTop: setWidth(2) }]}>
            <Text style={styles.text}>{this.props.item.sets}</Text>
            <MaterialCommunityIcons name='arrow-right' size={setWidth(5)} color={colors.grey2} />
          </View> */}
          <View style={[styles.row, { alignItems: 'center', marginTop: setWidth(2) }]}>
            <Text style={styles.subHeading}>Order Placed On </Text>
            <Text style={[styles.text, styles.fontRed]}>{this.props.item.order_placed_on}</Text>
          </View>
          {
            this.props.item.order_status == "Delivered" ?
              <View style={[styles.row, { alignItems: 'center', marginTop: setWidth(3) }]}>
                <Text style={styles.subHeading}>Delivered On </Text>
                <Text style={[styles.text, styles.fontRed]}>{this.props.item?.delivery_date}</Text>
              </View>
              :
              <View style={[styles.row, { alignItems: 'center', marginTop: setWidth(3) }]}>
                <Text style={styles.subHeading}>Expected Delivery On </Text>
                <Text style={[styles.text, styles.fontRed]}>{this.props.item?.expected_delivery}</Text>
              </View>
          }
          {
            (this.props.item?.order_status == "Delivered") &&
            <View style={[styles.row, { alignItems: 'center', marginTop: setWidth(3) }]}>
              <Text style={styles.subHeading}>
                Return Policy
                {
                  this.props.item?.isReturnApplicable ?
                    " Will End On"
                    :
                    " Ended On"
                }
              </Text>
              <Text style={[styles.text, styles.fontRed]}> {this.props.item?.return_expire_date}</Text>
            </View>
          }

          {
            (this.props.item?.return_request_reference_id !== '') &&
            <>
              <View style={[styles.row, { alignItems: 'center', marginTop: setWidth(3) }]}>
                <Text style={styles.subHeading}>
                  Return Requested On
                </Text>
                <Text style={[styles.text, styles.fontRed]}> {this.props.item?.return_requested_date}</Text>
              </View>
              <View style={[styles.row, { alignItems: 'center', marginTop: setWidth(3) }]}>
                <Text style={styles.subHeading}>
                  Return Reference Number
                </Text>
                <Text style={[styles.text, styles.fontRed]}> {this.props.item?.return_request_reference_id}</Text>
              </View>
            </>
          }

          {
            // this.props.is_ws_not === 1 &&
            <View style={[styles.row, { alignItems: 'center', marginTop: setWidth(3) }]}>
              <Text style={styles.subHeading}>Total : </Text>
              <Text style={[styles.text, styles.fontRed, commonStyle.bluredText]}>₹ {this.props.item.total}</Text>
            </View>
          }
          {
            (this.props.item.order_status == "Delivered" && this.props.item.isReturnApplicable) &&
            <TouchableOpacity style={styles.returnBtn} onPress={this.props.onPressReturn}>
              <Text style={styles.returnBtnText}>Return Order</Text>
            </TouchableOpacity>
          }
        </View>
      </TouchableOpacity>
    );
  }
}
