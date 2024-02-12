import React, { Component } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image } from 'react-native';
import colors from '../../utils/colors';
import { images, setWidth } from '../../utils/variable';
import { styles } from './style';
import FastImage from 'react-native-fast-image'

export default class ShopByBudget extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <ImageBackground source={images.shop_by_budget_bg} resizeMode="cover" style={styles.shopByBudgetContainer}>
        <Text style={[styles.heading, { color: colors.dark_charcoal }]}>SHOP BY BUDGET</Text>
        <View style={[styles.row, styles.justifyCenter,{marginTop: setWidth(2)}]}>
          <TouchableOpacity style={styles.budgetImageView} activeOpacity={0.8} onPress={() => this.props.onPress('0-99')}>
            <FastImage
              style={[styles.budgetImage]}
              source={images.under99}
              resizeMode={FastImage.resizeMode.contain}
            />
            {/* <Image source={images.under99} resizeMode="contain" style={styles.budgetImage} /> */}
          </TouchableOpacity>
          <TouchableOpacity style={styles.budgetImageView} activeOpacity={0.8} onPress={() => this.props.onPress('149-199')}>
            <FastImage
              style={[styles.budgetImage]}
              source={images.under199}
              resizeMode={FastImage.resizeMode.contain}
            />
            {/* <Image source={images.under199} resizeMode="contain" style={styles.budgetImage} /> */}
          </TouchableOpacity>
        </View>
        <View style={[styles.row, styles.justifyCenter]} >
          <TouchableOpacity style={styles.budgetImageView} activeOpacity={0.8} onPress={() => this.props.onPress('150-299')}>
            <FastImage
              style={[styles.budgetImage]}
              source={images.under299}
              resizeMode={FastImage.resizeMode.contain}
            />
            {/* <Image source={images.under299} resizeMode="contain" style={styles.budgetImage} /> */}
          </TouchableOpacity>
          <TouchableOpacity style={styles.budgetImageView} activeOpacity={0.8} onPress={() => this.props.onPress('300-499')}>
            <FastImage
              style={[styles.budgetImage]}
              source={images.under499}
              resizeMode={FastImage.resizeMode.contain}
            />
            {/* <Image source={images.under499} resizeMode="contain" style={styles.budgetImage} /> */}
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}
