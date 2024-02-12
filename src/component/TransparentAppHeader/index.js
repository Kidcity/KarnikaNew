import { Text, TouchableOpacity, View } from 'react-native'
import React, { Component, PureComponent } from 'react'
import { styles } from './style'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { images, setWidth } from '../../utils/variables'
import { colors } from '../../utils/colors'
import CustomImage from '../FastImage'

const ICON_SIZE = setWidth(6)

export default class TransparentAppHeader extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showMenu: false,
      showBackBtn: false,
      showSearch: false,
      showWishList: false,
      showCart: false,
      showBell: false,
      showLogo: false,
      navigation: null,
      iconColor: null
    }
  }

  static getDerivedStateFromProps(props, state) {
    return {
      showMenu: props.hasOwnProperty("showMenu") ? props.showMenu : false,
      showBackBtn: props.hasOwnProperty("showBackBtn") ? props.showBackBtn : false,
      showSearch: props.hasOwnProperty("showSearch") ? props.showSearch : false,
      showWishList: props.hasOwnProperty("showWishList") ? props.showWishList : false,
      showCart: props.hasOwnProperty("showCart") ? props.showCart : false,
      showBell: props.hasOwnProperty("showBell") ? props.showBell : false,
      showLogo: props.hasOwnProperty("showLogo") ? props.showLogo : false,
      navigation: props.hasOwnProperty("navigation") ? props.navigation : null,
      iconColor: props.hasOwnProperty("iconColor") ? props.iconColor : null
    }
  }


  onPressMenu = () => {
    this.state.navigation.openDrawer()
  }

  onPressBack = () => {
    this.state.navigation.goBack()
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.leftMenu}>
          {
            this.state.showMenu &&
            <TouchableOpacity style={styles.menu} onPress={this.onPressMenu}>
              <Feather name="menu" size={ICON_SIZE} color={this.state.iconColor || colors.black} />
            </TouchableOpacity>
          }
          {
            this.state.showBackBtn &&
            <TouchableOpacity style={styles.menu} onPress={this.onPressBack}>
              <Ionicons name="arrow-back" size={ICON_SIZE} color={this.state.iconColor || colors.black} />
            </TouchableOpacity>
          }
          {
            this.state.showLogo &&
            <View style={styles.logoContainer}>
              <CustomImage
                source={images.header_logo}
                style={styles.logo}
                resizeMode="cover"
              />
            </View>
          }

        </View>
        <View style={styles.rightMenu}>
          {
            this.state.showSearch &&
            <TouchableOpacity style={styles.icon}>
              <Feather name="search" size={ICON_SIZE} color={this.state.iconColor || colors.black} />
            </TouchableOpacity>
          }
          {
            this.state.showWishList &&
            <TouchableOpacity style={styles.icon}>
              <Feather name="heart" size={ICON_SIZE} color={this.state.iconColor || colors.black} />
              <View style={styles.labelView}>
                <Text style={styles.label}>99+</Text>
              </View>
            </TouchableOpacity>
          }
          {
            this.state.showCart &&
            <TouchableOpacity style={styles.icon}>
              <Feather name="shopping-cart" size={ICON_SIZE} color={this.state.iconColor || colors.black} />
              <View style={styles.labelView}>
                <Text style={styles.label}>99</Text>
              </View>
            </TouchableOpacity>
          }
          {
            this.state.showBell &&
            <TouchableOpacity style={styles.icon}>
              <Feather name="bell" size={ICON_SIZE} color={this.state.iconColor || colors.black} />
              <View style={styles.labelView}>
                <Text style={styles.label}>99+</Text>
              </View>
            </TouchableOpacity>
          }
        </View>
      </View>
    )
  }
}