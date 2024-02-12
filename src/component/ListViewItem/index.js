import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import { styles } from './style';
import AntDesign from 'react-native-vector-icons/AntDesign'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { normalize, setHeight, setWidth } from '../../utils/variable';
import colors from '../../utils/colors';
import FastImage from 'react-native-fast-image';
import BlinkText from '../BlinkText';
import { commonStyle } from '../../helper/commonStyle';

export default class ListViewItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.fadein = new Animated.Value(0)
  }

  componentDidMount() {
    Animated.timing(
      this.fadein,
      {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }
    ).start()
  }

  render() {
    return (
      <Animated.View style={[styles.container,
      {
        opacity: this.fadein
      }
      ]}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.left} onPress={this.props.onPressProduct}>
            <FastImage
              style={[styles.productImage]}
              source={{
                uri: this.props.item.image,
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.stretch}
            />
            <TouchableOpacity style={styles.favBtn} onPress={() => this.props.onPressFavBtn(!this.props.item.isFavourite)}>
              <AntDesign name={this.props.item.isFavourite ? 'heart' : 'hearto'} size={setWidth(4)} color={this.props.item.isFavourite ? colors.lightRed : colors.grey2} />
            </TouchableOpacity>
            {
              (this.props.item.item_left != '') &&
              <View style={styles.itemsLeftContainer}>
                <Text style={[styles.text, { color: colors.white }]} >{this.props.item.item_left}</Text>
              </View>
            }
          </TouchableOpacity>
          <TouchableOpacity style={[styles.right, { borderLeftColor: colors.grey5, borderLeftWidth: setWidth(0.3) }]} onPress={this.props.onPressProduct}>

            <View style={[styles.block, { borderRightWidth: 0, borderTopWidth: 0, borderLeftWidth: 0, paddingVertical: 15 }]}>
              <View style={[styles.row,]}>
                <View style={[{ flex: 2 }]}>
                  <Text style={[styles.text, styles.largeBoldFont]} adjustsFontSizeToFit numberOfLines={2}>{this.props.item.brand_name}</Text>
                </View>
                <View style={[{ flex: 1 }, styles.alignItemEnd]}>
                  <Text style={[styles.text, styles.largeBoldFont, commonStyle.bluredText]}>₹{this.props.item.price}</Text>
                </View>
              </View>
              <View style={[styles.row, styles.justifyBetween, { marginTop: setWidth(2) }]}>
                <Text style={[styles.text, { color: colors.green1 }, commonStyle.bluredText]}>{this.props.item.off}% OFF</Text>
                <Text style={[styles.text, styles.strikThroughFont, commonStyle.bluredText]}>₹{this.props.item.prev_price}</Text>
              </View>
            </View>

            <View style={[styles.block, { borderRightWidth: 0, borderLeftWidth: 0, height: setWidth(11), }]}>
              <View style={styles.row}>
                <Text style={[styles.text, styles.subHeading]}>Size:</Text>
                <Text style={[styles.text]} adjustsFontSizeToFit numberOfLines={1}> {this.props.item.size}</Text>
                <Text style={[styles.text]} adjustsFontSizeToFit numberOfLines={1}> {this.props.item.otherSizes}</Text>
              </View>
            </View>

            <View style={[styles.row, { height: setWidth(12) }]}>
              <View style={[styles.block, { flex: 1, borderLeftWidth: 0 }]}>
                <View style={styles.row}>
                  <Text style={[styles.text, styles.subHeading]} adjustsFontSizeToFit numberOfLines={1}>Color:</Text>
                  <Text style={[styles.text]} adjustsFontSizeToFit numberOfLines={1}> {this.props.item.color}</Text>
                </View>
                <Text style={[styles.text]} adjustsFontSizeToFit numberOfLines={1}>{this.props.item.each_set_color}</Text>
              </View>
              <View style={[styles.block, { flex: 1, borderRightWidth: 0, borderLeftWidth: 0 }]}>
                <View style={[styles.row, {justifyContent:'space-between'}]}>
                  <Text style={[styles.text, styles.subHeading]} adjustsFontSizeToFit >Set Qty:</Text>
                  <Text style={[styles.text]} adjustsFontSizeToFit> {this.props.item.quantity} Pcs</Text>
                </View>
              </View>
            </View>

            <View style={[styles.row, { height: setWidth(12), }]}>
              <View style={[styles.block, styles.row, { flex: 1, alignItems: 'center', justifyContent: 'flex-start', borderLeftWidth: 0 }]}>
                <Text style={[styles.text, styles.subHeading]} adjustsFontSizeToFit numberOfLines={1} >MRP: </Text>
                <Text style={[styles.text, commonStyle.bluredText]} adjustsFontSizeToFit numberOfLines={1} >{(this.props.item.mrp != "N/A") && "₹"} {this.props.item.mrp}</Text>
              </View>
              <View style={[styles.block, styles.row, { flex: 1, borderLeftWidth: 0, borderRightWidth: 0, alignItems: 'center', }]}>
                <Text style={[styles.text, styles.subHeading]} adjustsFontSizeToFit numberOfLines={1}>Margin:</Text>
                <Text style={[styles.text, { color: colors.red }, commonStyle.bluredText]} adjustsFontSizeToFit numberOfLines={1}> {this.props.item.margin}</Text>
              </View>
            </View>

            <View style={[styles.block, { height: setWidth(11), borderBottomWidth: 0, borderRightWidth: 0, borderLeftWidth: 0 }]}>
              <View style={[styles.row, { alignItems: 'center' }]}>
                <EvilIcons name='location' size={setWidth(5)} color={colors.dark_charcoal} />
                <Text style={[styles.text]}> {this.props.item.city_name}</Text>
              </View>
            </View>

          </TouchableOpacity>

        </View>
        {/*
          this.props.item.brand_mov !== 0 &&
          <BlinkText
            text="Shop In Shop"
            duration={700}
            style={styles.movView}
          />
          */  }
      </Animated.View >
    );
  }
}
