import { Text, TouchableOpacity, View } from 'react-native'
import React, { Component, PureComponent } from 'react'
import { styles } from './style'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { commonStyle } from '../../helper/commonStyle'
import CustomImage from '../FastImage'
import colors from '../../utils/colors'
import { images, setWidth } from '../../utils/variable'
import { connect } from 'react-redux'

const ICON_SIZE = setWidth(6)

class AppHeader extends PureComponent {
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
      showLabel: false,
      navigation: null,
      noRightIcons: false,
      showBtn: false,
      btnLabel: "",
      onClick: () => {},
      label: "",
      is_ws_not: 0
    }
  }

  static getDerivedStateFromProps(props, state) {
    return {
      total_cart_items: props.total_cart_items ? props.total_cart_items : 0,
      total_wishlist_count: props.total_wishlist_count ? props.total_wishlist_count : 0,
      total_unread_notification: props.total_unread_notification ? props.total_unread_notification : 0,
      showMenu: props.hasOwnProperty("showMenu") ? props.showMenu : false,
      showBackBtn: props.hasOwnProperty("showBackBtn") ? props.showBackBtn : false,
      showSearch: props.hasOwnProperty("showSearch") ? props.showSearch : false,
      showWishList: props.hasOwnProperty("showWishList") ? props.showWishList : false,
      showCart: props.hasOwnProperty("showCart") ? props.showCart : false,
      showBell: props.hasOwnProperty("showBell") ? props.showBell : false,
      showLogo: props.hasOwnProperty("showLogo") ? props.showLogo : false,
      noRightIcons: props.hasOwnProperty("noRightIcons") ? props.noRightIcons : false,
      showLabel: props.hasOwnProperty("showLabel") ? props.showLabel : false,
      navigation: props.hasOwnProperty("navigation") ? props.navigation : null,
      label: props.hasOwnProperty("label") ? props.label : "",
      is_ws_not: props.hasOwnProperty("is_ws_not") ? props.is_ws_not : 0,
      showBtn: props.hasOwnProperty("showBtn") ? props.showBtn : false,
      btnLabel: props.hasOwnProperty("btnLabel") ? props.btnLabel : "",
      onClick: props.hasOwnProperty("onClick") ? props.onClick : () => {}
    }
  }


  onPressMenu = () => {
    this.state.navigation.openDrawer()
  }

  onPressBack = () => {
    this.state.navigation.goBack()
  }

  render() {
    // console.log('this.props.applogo  ',this.props.applogo);
    return (
      <View style={styles.container}>
        <View style={[styles.leftMenu]}>
          {
            this.state.showMenu &&
            <TouchableOpacity style={styles.menu} onPress={this.onPressMenu}>
              <Feather name="menu" size={ICON_SIZE} color={colors.black} />
            </TouchableOpacity>
          }
          {
            this.state.showBackBtn &&
            <TouchableOpacity style={[styles.menu, this.state.noRightIcons && { flex: 0.2 }]} onPress={this.onPressBack} >
              <Ionicons name="arrow-back" size={ICON_SIZE} color={colors.black} />
            </TouchableOpacity>
          }
          {
            this.state.showLabel &&
            <View style={[{ flex: 0.7 }, commonStyle.justifyContentCenter]}>
              <Text style={[commonStyle.text14, commonStyle.textCharcoal]}>{this.state.label}</Text>
            </View>
          }
          {
            this.state.showLogo &&
            <View style={[styles.logoContainer]}>
              <CustomImage
                source={this.props.applogo ? { uri: this.props.applogo } : images.header_logo2}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
          }

        </View>
        {
          !this.state.noRightIcons &&

          <View style={styles.rightMenu}>
            {
              this.state.showSearch &&
              <TouchableOpacity style={styles.icon} onPress={() => this.state.navigation.navigate("Search")}>
                <Feather name="search" size={ICON_SIZE} color={colors.black} />
              </TouchableOpacity>
            }
            {
              this.state.showBtn &&
              <TouchableOpacity style={styles.btn} onPress={this.state.onClick}>
                <Text style={styles.label}>{this.state.btnLabel}</Text>
              </TouchableOpacity>
            }
            {
              this.state.showWishList &&
              <TouchableOpacity style={[styles.icon]} onPress={() => this.state.navigation.navigate("WishList")}>
                <Feather name="heart" size={ICON_SIZE} color={colors.black} />
                {
                  this.state.total_wishlist_count !== 0 &&
                  <View style={styles.labelView}>
                    <Text style={styles.label}>{this.state.total_wishlist_count}</Text>
                  </View>
                }
              </TouchableOpacity>
            }
            {
              (this.state.showCart) &&
              <TouchableOpacity style={styles.icon} onPress={() => this.state.navigation.navigate("Cart")}>
                <Feather name="shopping-cart" size={ICON_SIZE} color={colors.black} />
                {
                  this.state.total_cart_items !== 0 &&
                  <View style={styles.labelView}>
                    <Text style={styles.label}>{this.state.total_cart_items}</Text>
                  </View>
                }
              </TouchableOpacity>
            }
            {
              this.state.showBell &&
              <TouchableOpacity style={styles.icon} onPress={() => this.state.navigation.navigate("Notification")}>
                <Feather name="bell" size={ICON_SIZE} color={colors.black} />
                {
                  this.state.total_unread_notification !== 0 &&
                  <View style={styles.labelView}>
                    <Text style={styles.label}>{this.state.total_unread_notification}</Text>
                  </View>
                }
              </TouchableOpacity>
            }
          </View>
        }
      </View>
    )
  }
}


const mapStateToProps = state => {
  return {
    applogo: state.commonReducer?.appLogo,
    filter: state.commonReducer.filter,
    total_cart_items: state.cartReducer.total_cart_items,
    total_wishlist_count: state.wishListReducer.total_wishlist_count,
    total_unread_notification: state.notificationReducer.total_unread_notification,
    is_ws_not: state.loginReducer.data.is_ws_not
  }
}

const mapDispatchToProps = dispatch => ({
  setProductFilterAction: (param) => dispatch(setProductFilterAction(param)),
  clearProductFilterAction: () => dispatch(clearProductFilterAction())
})

const connectComponent = connect(mapStateToProps, mapDispatchToProps)
export default connectComponent(AppHeader)
