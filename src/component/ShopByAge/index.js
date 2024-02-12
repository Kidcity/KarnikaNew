import React, { Component } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image } from 'react-native';
import colors from '../../utils/colors';
import { icons, images, setWidth } from '../../utils/variable';
import { styles } from './style';
import FastImage from 'react-native-fast-image'

export default class ShopByAge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: null,
      counter: 0
    };
  }

  componentDidMount(){
    let timer = setInterval(this.tick, 1000);
    this.setState({timer})
  }

  componentWillUnmount(){
    clearInterval(this.state.timer)
  }

  tick =() => {
    this.setState({
      counter: this.state.counter + 1
    });
  }

  
  render() {
    return (
      <ImageBackground source={this.state.counter % 2 == 0 ? images.shop_by_age_bg_left: images.shop_by_age_bg_right} style={[styles.shopByAgeContianer, this.props.containerStyle && this.props.containerStyle,]}>
        <Text style={[styles.heading, { color: colors.dark_charcoal }]}>SHOP BY AGE</Text>
        <View style={[styles.row, {marginTop: setWidth(-1)}]}>
          <FastImage
            style={[styles.sunImage, { left: 15, top: -10 }]}
            source={icons.sunny}
            resizeMode={FastImage.resizeMode.contain}
          />
          {/* <Image source={icons.sunny} resizeMode="contain" style={[styles.sunImage, { left: 15, top: -10 }]} /> */}
          <TouchableOpacity style={styles.shopByAgeImageView} activeOpacity={0.7} onPress={() => this.props.onPress("infant")}>
            <FastImage
              style={[styles.shopAgeImage]}
              source={images.age_0_24_month}
              resizeMode={FastImage.resizeMode.cover}
            />
            {/* <Image source={images.age_0_24_month} style={styles.shopAgeImage} resizeMode="contain" /> */}
          </TouchableOpacity>
          <TouchableOpacity style={styles.shopByAgeImageView} activeOpacity={0.7} onPress={() => this.props.onPress("toddler")}>
            <FastImage
              style={[styles.shopAgeImage]}
              source={images.age_2_4_month}
              resizeMode={FastImage.resizeMode.cover}
            />
            {/* <Image source={images.age_2_4_month} style={styles.shopAgeImage} resizeMode="contain" /> */}
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.shopByAgeImageView} activeOpacity={0.7} onPress={() => this.props.onPress("junior")}>
            <FastImage
              style={[styles.shopAgeImage]}
              source={images.age_4_10_month}
              resizeMode={FastImage.resizeMode.cover}
            />
            {/* <Image source={images.age_4_10_month} style={styles.shopAgeImage} resizeMode="contain" /> */}
          </TouchableOpacity>
          <TouchableOpacity style={styles.shopByAgeImageView} activeOpacity={0.7} onPress={() => this.props.onPress("senior")}>
            <FastImage
              style={[styles.shopAgeImage]}
              source={images.age_10_16_month}
              resizeMode={FastImage.resizeMode.cover}
            />
            {/* <Image source={images.age_10_16_month} style={styles.shopAgeImage} resizeMode="contain" /> */}
          </TouchableOpacity>
          <FastImage
              style={[styles.sunImage, { right: 20, bottom: 0 }]}
              source={icons.sunny}
              resizeMode={FastImage.resizeMode.contain}
            />
          {/* <Image source={icons.sunny} resizeMode="contain" style={[styles.sunImage, { right: 20, bottom: 0 }]} /> */}
        </View>
      </ImageBackground>
    );
  }
}
