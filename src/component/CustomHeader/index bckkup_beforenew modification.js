import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StatusBar, TextInput, Image, Keyboard, FlatList, NativeModules, Platform, Animated, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import { styles } from './style';
import { icons, setHeight, setWidth } from '../../utils/variable';
import colors from '../../utils/colors';
import { connect } from 'react-redux';
import { clearProductFilterAction, setProductFilterAction } from '../../redux/actions/commonAction';
import CommonService from '../../services/CommonService';
import { Easing } from 'react-native-reanimated';
import SearchTextBox from '../SearchTextBox';
import { clearScreenActivity, setScreenActivity } from '../../helper/AppActivityTrackingHelper';


const { StatusBarManager } = NativeModules
const { width, height } = Dimensions.get("screen")


class CustomHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSearchBox: false,
            searchText: '',
            userSearchText: "",
            total_cart_items: 0,
            total_wishlist_count: 0,
            suggestions: [],
            statusbarheight: 0,
            total_unread_notification: 0,
            headingContainer: new Animated.Value(-width),
            onSearch: undefined,
            shouldRedirectToSelfScreen: false,
            shouldShowSuggesstionDropdown: true,
            placeHolderText: '',
            showIcons: true,
            showingThreeIcon: false,
            shouldShowUpperPaddingForIOS: true,
            shouldFilterOnSamePage: false
        };
    }

    static getDerivedStateFromProps(props, state) {

        return {
            total_cart_items: props.total_cart_items ? props.total_cart_items : 0,
            total_wishlist_count: props.total_wishlist_count ? props.total_wishlist_count : 0,
            onSearch: props.onSearch ? props.onSearch : undefined,
            shouldRedirectToSelfScreen: props.hasOwnProperty("shouldRedirectToSelfScreen") ? props.shouldRedirectToSelfScreen : false,
            userSearchText: props.userSearchText ? props.userSearchText : "",
            shouldShowSuggesstionDropdown: props.hasOwnProperty("shouldShowSuggesstionDropdown") ? props.shouldShowSuggesstionDropdown : true,
            placeHolderText: props.placeHolderText ? props.placeHolderText : '',
            showIcons: props.hasOwnProperty("showIcons") ? props.showIcons : true,
            showingThreeIcon: props.hasOwnProperty("showingThreeIcon") ? props.showingThreeIcon : false,
            shouldShowUpperPaddingForIOS: props.hasOwnProperty("shouldShowUpperPaddingForIOS") ? props.shouldShowUpperPaddingForIOS : true,
            shouldFilterOnSamePage: props.hasOwnProperty("shouldFilterOnSamePage") ? props.shouldFilterOnSamePage : false,
            total_unread_notification: props.total_unread_notification ? props.total_unread_notification : 0
        }
    }

    _onSearch = async (searchText) => {
        //await this.props.clearProductFilterAction()
        // let filter = this.props.filter
        // filter = await { ...filter, searchValue: searchText }
        // await this.props.setProductFilterAction(filter)
        // Keyboard.dismiss()
        this.props.onSearch(searchText)
    }

    _onPressCross = () => {
        this.setState({ showSearchBox: false })
        if (this.props.onCancel) {
            this.props.onCancel()
        }
    }

    componentDidMount() {
        if (Platform.OS === 'ios') {
            StatusBarManager.getHeight(response =>
                this.setState({
                    statusbarheight: response.height
                })
            )
        }
        if (this.props.navigation) {
            this.props.navigation.addListener('blur', () => {
                this._onPressCross()
            })
        }
    }

    moveToLeft() {
        // alert(1)
        Animated.timing(
            this.state.headingContainer,
            {
                toValue: 0,
                duration: 900,
                easing: Easing.linear(),
                useNativeDriver: false
            },
        ).start()
    }


    shouldComponentUpdate(props, state) {
        if (props.showAnimation) {
            this.moveToLeft()
        }
        return true
    }

    render() {

        if (this.state.showSearchBox) {
            return (
                <SearchTextBox
                    userSearchText={this.state.userSearchText}
                    shouldFilterOnSamePage={this.state.shouldFilterOnSamePage}
                    shouldShowUpperPaddingForIOS={this.state.shouldShowUpperPaddingForIOS}
                    city_id={(this.props.city_id) ? this.props.city_id : ''}
                    navigation={(this.props.navigation) ? this.props.navigation : null}
                    placeholder={this.state.placeHolderText ? this.state.placeHolderText : "Search For Brands, Items or More ........."}
                    searchIconColor={colors.grey3}
                    showCrossBtn={true}
                    shouldShowSuggesstionDropdown={(this.state.shouldShowSuggesstionDropdown) ? true : false}
                    shouldRedirectToSelfScreen={this.state.shouldRedirectToSelfScreen}
                    onSearch={(text) => this._onSearch(text)}
                    onPressCrossBtn={this._onPressCross}
                    searchboxContainer={{
                        height: setWidth(15)
                    }}
                />
            )
        }
        // console.log('-', this.state.statusbarheight);
        return (
            <View>
                <StatusBar backgroundColor={this.props.statusBarColor ? this.props.statusBarColor : colors.white} />
                {
                    Platform.OS === "ios" &&
                    <View style={{ height: this.state.statusbarheight, backgroundColor: colors.white }}>

                    </View>
                }

                <View style={[styles.container, styles.row, styles.justifyBetween, this.props.containerStyle]}>
                    <View style={[{ flex: 1, }]}>
                        {
                            this.props.showMenu ?
                                <TouchableOpacity style={[styles.icon,]} onPress={() => this.props.navigation.openDrawer()} >
                                    <View style={[styles.menuView, styles.row, styles.alignItemsCenter]}>
                                        <Ionicons name='ios-menu-outline' size={setWidth(6)} color={colors.grey3} />
                                        <Text style={[styles.menuText]}>VIEW MENU</Text>
                                    </View>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={[styles.icon, { alignItems: 'flex-start', paddingLeft: setWidth(2) }]} onPress={() => { this.props.onPressBack() }}>
                                    <Image source={icons.arrow_left} style={[{ width: setWidth(7), height: setWidth(7) }]} />
                                </TouchableOpacity>
                        }
                    </View>

                    <Animated.View style={[styles.justifyCenter, this.props.headingContainerStyle, this.props.showAnimation && { right: this.state.headingContainer }, { flex: 1 }]}>
                        <Text style={[styles.heading, this.props.headingStyle]} adjustsFontSizeToFit numberOfLines={1}>{this.props.heading}</Text>
                    </Animated.View>

                    {
                        (!this.state.showingThreeIcon) &&
                        <View style={{ flex: 0.3, }} />
                    }


                    <View style={[styles.row, { flex: (this.state.showingThreeIcon) ? 1 : 0.7 }]}>
                        {
                            this.props.showSearchIcon &&
                            <TouchableOpacity style={[styles.icon, (this.props.showingOneIcon) && { alignItems: 'flex-end' }]} onPress={() => this.setState({ showSearchBox: true })}>
                                <EvilIcons name='search' size={setWidth(8)} color={colors.dark_charcoal} />
                            </TouchableOpacity>
                        }
                        {
                            (this.props.showFavouriteIcon) &&
                            <TouchableOpacity style={[styles.icon]} onPress={() => {
                                setScreenActivity({ action_type: "", action_id: '', city_id: "" })
                                this.props.navigation.navigate("WishList")
                            }}>
                                {
                                    (this.state.total_wishlist_count > 0) &&
                                    <View style={styles.notificationView}>
                                        <Text style={styles.notificationNumber}>{this.state.total_wishlist_count}</Text>
                                    </View>
                                }
                                <Image source={icons.heart} style={{ width: setWidth(6), height: setWidth(6) }} />
                            </TouchableOpacity>
                        }
                        {
                            (this.props.showNotificationIcon) &&
                            <TouchableOpacity style={[styles.icon, (this.props.showingOneIcon) && { alignItems: 'flex-end' }]} onPress={this.props.onPressBellIcon}>
                                {
                                    this.state.total_unread_notification > 0 &&
                                    <View style={styles.notificationView}>
                                        <Text style={styles.notificationNumber}>{this.state.total_unread_notification}</Text>
                                    </View>
                                }
                                <Image source={icons.bell} style={{ width: setWidth(7), height: setWidth(7) }} />
                                {/* <Ionicons name='ios-notifications-outline' color={colors.dark_charcoal} size={setWidth(7)} /> */}
                            </TouchableOpacity>
                        }
                        {
                            this.props.showCartIcon &&
                            <TouchableOpacity style={styles.icon} onPress={() => this.props.onPressCartIcon()}>
                                {
                                    (this.state.total_cart_items > 0) &&
                                    <View style={styles.notificationView}>
                                        <Text style={styles.notificationNumber}>{this.state.total_cart_items}</Text>
                                    </View>
                                }
                                <Image source={icons.shopping_cart} style={[styles.image, { width: setWidth(6), height: setWidth(6) }]} />
                            </TouchableOpacity>
                        }
                    </View>

                </View>
            </View>
        );
    }
}
const mapStateToProps = state => {
    return {
        filter: state.commonReducer.filter,
        total_cart_items: state.cartReducer.total_cart_items,
        total_wishlist_count: state.wishListReducer.total_wishlist_count,
        total_unread_notification: state.notificationReducer.total_unread_notification,
    }
}

const mapDispatchToProps = dispatch => ({
    setProductFilterAction: (param) => dispatch(setProductFilterAction(param)),
    clearProductFilterAction: () => dispatch(clearProductFilterAction())
})

const connectComponent = connect(mapStateToProps, mapDispatchToProps)
export default connectComponent(CustomHeader)
