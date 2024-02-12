import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StatusBar, TextInput, Image, Keyboard, FlatList, NativeModules, Platform, Animated, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import { styles } from './style';
import { fonts, icons, images, setHeight, setWidth } from '../../utils/variable';
import colors from '../../utils/colors';
import { connect } from 'react-redux';
import { clearProductFilterAction, setProductFilterAction } from '../../redux/actions/commonAction';
import CommonService from '../../services/CommonService';
import { Easing } from 'react-native-reanimated';
import SearchTextBox from '../SearchTextBox';
import { clearScreenActivity, setScreenActivity } from '../../helper/AppActivityTrackingHelper';
import ShopForModal from '../ShopForModal';
import FastImageComponent from '../FastImageComponent';
import FastImage from 'react-native-fast-image';


const { StatusBarManager } = NativeModules
const { width, height } = Dimensions.get("screen")


class CustomHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            header_height: 0,
            showSearchBox: false,
            searchText: '',
            total_cart_items: 0,
            total_wishlist_count: 0,
            suggestions: [],
            statusbarheight: 0,
            total_unread_notification: 0,
            onSearch: undefined,
            shouldRedirectToSelfScreen: false,
            shouldShowSuggesstionDropdown: true,
            placeHolderText: '',


            shouldShowUpperPaddingForIOS: true,
            shouldFilterOnSamePage: false,

            // new states 
            statusBarColor: colors.white,
            showBackButton: false,
            containerStyle: null,
            heading: "",
            headingContainerStyle: null,
            headingStyle: null,
            headingContainer: new Animated.Value(-width),
            showAnimation: false,
            showSearchIcon: false,
            showFavouriteIcon: false,
            showCartIcon: false,
            showingOneIcon: false,
            showBuyFor: false,
            genders: null,
            initialSelecteGender: null,
            onApplyGender: undefined,
            showingThreeIcon: false,
            headingLogoStyle: null,
            is_ws_not: 0
        };
    }

    static getDerivedStateFromProps(props, state) {
        console.log(props.is_ws_not);
        return {
            total_cart_items: props.total_cart_items ? props.total_cart_items : 0,
            total_wishlist_count: props.total_wishlist_count ? props.total_wishlist_count : 0,
            onSearch: props.onSearch ? props.onSearch : undefined,
            shouldRedirectToSelfScreen: props.hasOwnProperty("shouldRedirectToSelfScreen") ? props.shouldRedirectToSelfScreen : false,
            shouldShowSuggesstionDropdown: props.hasOwnProperty("shouldShowSuggesstionDropdown") ? props.shouldShowSuggesstionDropdown : true,
            placeHolderText: props.placeHolderText ? props.placeHolderText : '',
            showIcons: props.hasOwnProperty("showIcons") ? props.showIcons : true,

            shouldShowUpperPaddingForIOS: props.hasOwnProperty("shouldShowUpperPaddingForIOS") ? props.shouldShowUpperPaddingForIOS : true,
            shouldFilterOnSamePage: props.hasOwnProperty("shouldFilterOnSamePage") ? props.shouldFilterOnSamePage : false,
            total_unread_notification: props.total_unread_notification ? props.total_unread_notification : 0,

            statusBarColor: props.hasOwnProperty("statusBarColor") ? props.statusBarColor : colors.white,
            containerStyle: props.hasOwnProperty("containerStyle") ? props.containerStyle : null,
            showBackButton: props.hasOwnProperty("showBackButton") ? props.showBackButton : false,
            heading: props.hasOwnProperty("heading") ? props.heading : false,
            headingContainerStyle: props.hasOwnProperty("headingContainerStyle") ? props.headingContainerStyle : null,
            headingStyle: props.hasOwnProperty("headingStyle") ? props.headingStyle : null,
            showAnimation: props.hasOwnProperty("showAnimation") ? props.showAnimation : false,
            showSearchIcon: props.hasOwnProperty("showSearchIcon") ? props.showSearchIcon : false,
            showFavouriteIcon: props.hasOwnProperty("showFavouriteIcon") ? props.showFavouriteIcon : false,
            showCartIcon: props.hasOwnProperty("showCartIcon") ? props.showCartIcon : false,
            showingOneIcon: props.hasOwnProperty("showingOneIcon") ? props.showingOneIcon : false,
            showBuyFor: props.hasOwnProperty("showBuyFor") ? props.showBuyFor : false,
            genders: props.hasOwnProperty("genders") ? props.genders : null,
            initialSelecteGender: props.hasOwnProperty("initialSelecteGender") ? props.initialSelecteGender : null,
            onApplyGender: props.hasOwnProperty("onApplyGender") ? props.onApplyGender : undefined,
            showingThreeIcon: props.hasOwnProperty("showingThreeIcon") ? props.showingThreeIcon : false,
            headingLogoStyle: props.hasOwnProperty("headingLogoStyle") ? props.headingLogoStyle : null,
            is_ws_not: props.hasOwnProperty("is_ws_not") ? props.is_ws_not : 0
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
    }

    moveToLeft() {
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

        return (
            <View style={{ zIndex: 9999 }} onLayout={(e) => {
                this.setState({
                    header_height: e.nativeEvent.layout.height
                })
            }}>
                <StatusBar backgroundColor={this.state.statusBarColor} />
                {
                    Platform.OS === "ios" &&
                    <View style={{ height: this.state.statusbarheight, backgroundColor: colors.white }} />
                }

                <View style={[styles.container, styles.row, styles.justifyBetween, this.state.containerStyle]}>

                    {
                        this.state.showBackButton &&
                        <View style={{ flex: 0.5 }}>

                            <TouchableOpacity style={[styles.icon, { alignItems: 'flex-start', paddingLeft: setWidth(2) }]} onPress={() => { this.props.onPressBack() }}>
                                <Image source={icons.arrow_left} style={[{ width: setWidth(7), height: setWidth(7) }]} />
                            </TouchableOpacity>
                        </View>
                    }

                    {
                        (!this.state.showBackButton && !this.state.showBuyFor) &&
                        <View style={{ flex: 0.5 }}></View>
                    }


                    <Animated.View style={[this.state.headingContainerStyle, this.state.showAnimation && { right: this.state.headingContainer }, { flex: 1, justifyContent: 'center' }, (!this.state.showBuyFor) && { justifyContent: 'center' }]}>

                        {
                            (this.state.showBuyFor && this.state.header_height > 0) ?
                                <ShopForModal
                                    genders={this.state.genders}
                                    initialSelecteGender={this.state.genders[0] ?? null}
                                    onApply={this.state.onApplyGender}
                                    modalBottomPosition={this.state.header_height}
                                />
                                :
                                <>
                                    <FastImageComponent
                                        source={images.heading_logo}
                                        style={[styles.heading_image, this.state.headingLogoStyle]}
                                        resizeMode={FastImage.resizeMode.stretch}
                                    />
                                </>
                        }
                    </Animated.View>

                    <View style={[styles.row, { flex: (this.state.showingThreeIcon) ? 0.7 : 0.5, paddingRight: 10 }]}>
                        {
                            (this.state.showFavouriteIcon) &&
                            <TouchableOpacity style={[styles.icon]} onPress={() => {
                                setScreenActivity({ action_type: "", action_id: '', city_id: "" })
                                this.props.navigation.navigate("WishList")
                            }}>
                                <View>
                                    {
                                        (this.state.total_wishlist_count > 0) &&
                                        <View style={styles.notificationView}>
                                            <Text style={styles.notificationNumber} adjustsFontSizeToFit numberOfLines={1}>{this.state.total_wishlist_count}</Text>
                                        </View>
                                    }
                                    <Image source={icons.heart} style={{ width: setWidth(6), height: setWidth(6) }} />
                                </View>
                            </TouchableOpacity>
                        }
                        {
                            this.state.showSearchIcon &&
                            <TouchableOpacity style={[styles.icon, (this.state.showingOneIcon) && { alignItems: 'flex-end' }]} onPress={() => this.props.navigation.navigate("Search")}>
                                <Ionicons name='md-search-outline' size={setWidth(7)} color={colors.dark_charcoal} />
                            </TouchableOpacity>
                        }
                        {
                            (this.state.showCartIcon && this.state.is_ws_not === 4) &&
                            <TouchableOpacity style={styles.icon} onPress={() => {
                                setScreenActivity({ action_type: "", action_id: '', city_id: "" })
                                this.props.navigation.navigate("Cart")
                            }}>
                                <View>
                                    {
                                        (this.state.total_cart_items > 0) &&
                                        <View style={styles.notificationView}>
                                            <Text style={styles.notificationNumber} adjustsFontSizeToFit numberOfLines={1}>{this.state.total_cart_items}</Text>
                                        </View>
                                    }
                                    <Image source={icons.shopping_cart} style={[styles.image, { width: setWidth(6), height: setWidth(6) }]} />
                                </View>
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
        is_ws_not: state.loginReducer.data.is_ws_not
    }
}

const mapDispatchToProps = dispatch => ({
    setProductFilterAction: (param) => dispatch(setProductFilterAction(param)),
    clearProductFilterAction: () => dispatch(clearProductFilterAction())
})

const connectComponent = connect(mapStateToProps, mapDispatchToProps)
export default connectComponent(CustomHeader)
