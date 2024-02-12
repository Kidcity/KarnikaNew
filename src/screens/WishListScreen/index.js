import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Alert, BackHandler } from 'react-native';
import CustomHeader from '../../component/CustomHeader';
import { images, setWidth } from '../../utils/variable';
import { styles } from './style';
import AntDesign from 'react-native-vector-icons/AntDesign'
import colors from '../../utils/colors';
import WishlistService from '../../services/WishlistService';
import { errorAlert, retryAlert } from '../../helper/ToastHelper';
import FullScreenLoader from '../../component/FullScreenLoader';
import { connect } from 'react-redux';
import { clearProductFilterAction, setProductFilterAction } from '../../redux/actions/commonAction';
import { clearProductListData } from '../../redux/actions/productListAction';
import { setWishListCount } from '../../redux/actions/wishListAction';
import EmptyCartModal from '../../component/EmptyCartModal';
import FastImageComponent from '../../component/FastImageComponent';
import FastImage from 'react-native-fast-image';
import { setScreenActivity } from '../../helper/AppActivityTrackingHelper';
import AppHeader from '../../component/AppHeader';
import NearByWholeSalerModal from '../../component/NearByWholeSalerModal';
import { commonStyle } from '../../helper/commonStyle';

class WishListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wishlist: [],
            showLoader: false,
            selected_item_to_delete: '',
            showEmptyCartModal: false,
            showWholeSalerModal: false,
            wholesaler: [
                {
                    name: "Sagar Ghosh",
                    address: "Hooghly",
                    state: "WB",
                    pin: "712708",
                    email: "sagarghosh.ofc@gmail.com",
                    mobile: "9163029201",
                    country: "India"
                },
                {
                    name: "Sagar Ghosh",
                    address: "Hooghly",
                    state: "WB",
                    pin: "712708",
                    email: "sagarghosh.ofc@gmail.com",
                    mobile: "9163029201",
                    country: "India"
                },
                {
                    name: "Sagar Ghosh",
                    address: "Hooghly",
                    state: "WB",
                    pin: "712708",
                    email: "sagarghosh.ofc@gmail.com",
                    mobile: "9163029201",
                    country: "India"
                }
            ]
        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={styles.productCard} onPress={() => {
                this.props.navigation.navigate("ProductDetails", { product_id: item.id })
            }}>
                <View style={styles.leftBlock}>
                    <FastImageComponent
                        source={{
                            uri: item.image,
                            priority: FastImage.priority.high,
                        }}
                        style={[styles.productImage]}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                </View>
                <View style={styles.rightBlock}>
                    <View style={[styles.detailsBlock]}>
                        <View style={[styles.row, styles.justifyBetween]}>
                            <Text style={[styles.text,]}>{item.brand_name}</Text>
                            <Text style={[styles.text, { color: colors.red },  commonStyle.bluredText]}> ₹ {item.price}</Text>
                        </View>
                        <View style={[styles.row, styles.justifyBetween, { marginTop: setWidth(2) }]}>
                            <Text style={[styles.text]}>{item.category}</Text>
                            <Text style={[styles.text, { color: colors.green }, commonStyle.bluredText]}>{item.offer}% OFF</Text>
                        </View>
                    </View>
                    <View style={styles.bottomborder} />
                    <View style={[styles.row, styles.justifyBetween, styles.detailsBlock, { alignItems: 'center' }]}>
                        <View>
                            <Text style={[styles.text]}>Colors: {item.color}</Text>
                            <Text style={[styles.text]}>(Each {item.each_set_color} Set)</Text>
                        </View>
                        <Text style={[styles.text]}>Size: {item.size}</Text>
                    </View>
                    <View style={styles.bottomborder} />
                    <View style={[styles.row, styles.justifyBetween, styles.detailsBlock, { alignItems: 'center' }]}>
                        <Text style={[styles.text]}>Margin:
                            <Text style={[commonStyle.bluredText]} >
                                {item.margin}{(item.margin != "N/A") && "%"}
                            </Text>
                        </Text>
                        <Text style={[styles.text]}>MRP: 
                            <Text style={[commonStyle.bluredText]} >
                                {(item.margin == "N/A") ? "N/A" : item.mrp}
                            </Text>
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.removeButton} onPress={() => this._confirmationTodelete(item.id)}>
                        <Text style={styles.removeButtonText} >REMOVE FROM WISHLIST</Text>
                        <AntDesign name='delete' size={setWidth(4)} color={colors.white} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }

    _confirmationTodelete(id) {
        this.setState({
            selected_item_to_delete: id,
            showEmptyCartModal: true
        })
    }

    _removeFromWishlist() {

        const param = {
            liked_products_id: this.state.selected_item_to_delete,
            liked_retailers_id: this.props.loginReducer.data.cust_manu_id,
            status: false
        }
        this.setState({ showLoader: true })
        WishlistService._productLikeUnlikeService(param).then(response => {
            this.setState({ showLoader: false })
            const total_wishlist_count = this.props.total_wishlist_count
            this.props.setWishListCount(parseInt(total_wishlist_count) - 1)
            this._getData()
        }, error => {
            this.setState({ showLoader: false })
            if (error.message == "server_error") {
                retryAlert(() => this._removeFromWishlist())
            } else {
                errorAlert("Error", error.message)
            }
        })
    }

    async _getData() {
        const param = {
            language_id: 1,
            retailer_id: this.props.loginReducer.data.cust_manu_id
        }
        this.setState({ showLoader: true })
        await WishlistService._getWishListService(param).then(response => {
            this.setState({
                wishlist: response,
                showLoader: false
            })
        }, error => {
            this.setState({ showLoader: false })
            if (error.message == "server_error") {
                retryAlert(() => this._getData())
            } else {
                errorAlert("Error", error.message)
            }
        })
    }

    componentDidMount() {
        this._getData()
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {

        setScreenActivity({ action_type: "going_back", action_id: '', city_id: "" })

        if (!this.props.navigation.canGoBack()) {
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            })
        } else {
            this.props.navigation.goBack();
        }
        return true;
    }

    async _navigateToProductList(searchText = '') {
        await this.props.clearProductListData()
        await this.props.clearProductFilterAction()

        let param = this.props.filter
        param = {
            ...param,
            searchValue: searchText
        }

        await this.props.setProductFilterAction(param)
        //return
        this.props.navigation.navigate("ProductListing")
    }

    getNearByWholesaler = () => {
        this.setState({
            showWholeSalerModal: true
        })
    }

    render() {
        return (
            <View style={styles.container}>
                {/* <CustomHeader
                    heading="WISHLIST"
                    headingStyle={{
                        textAlign: "center"
                    }}
                    showBackButton={true}
                    onPressBack={() => {
                        this.handleBackButtonClick()
                    }}
                    onSearch={(searchText) => {
                        this._navigateToProductList(searchText)
                    }}
                    navigation={this.props.navigation}
                    showNotificationIcon={true}
                    showSearchIcon={true}
                //onPressBellIcon={() => this.props.navigation.navigate("Notification")}
                /> */}
                <AppHeader
                    showBackBtn
                    showBtn={this.props.is_ws_not === 0 ? false : false}
                    btnLabel="Next"
                    onClick={this.getNearByWholesaler}
                    showLogo
                    navigation={this.props.navigation}
                />
                <View style={styles.content}>
                    <FlatList
                        data={this.state.wishlist}
                        keyExtractor={(item, index) => index}
                        renderItem={this.renderItem}
                        contentContainerStyle={{
                            paddingBottom: setWidth(10)
                        }}
                    />
                </View>
                {
                    this.state.showLoader &&
                    <FullScreenLoader
                        isOpen={this.state.showLoader}
                    />
                }
                {
                    this.state.showEmptyCartModal &&
                    <EmptyCartModal
                        title="Do you want to delete the item?"
                        leftBtnTitle="No"
                        rightBtnTitle="Yes"
                        onPressContinueShopping={() => {
                            this.setState({ showEmptyCartModal: false })
                            // this.props.navigation.navigate("Home")
                            this._removeFromWishlist()
                        }}
                        onPressClose={() => this.setState({ showEmptyCartModal: false })}
                    />
                }
                {
                    this.state.showWholeSalerModal &&
                    <NearByWholeSalerModal
                        data={this.state.wholesaler}
                        onClose={() => this.setState({ showWholeSalerModal: false })}
                    />
                }
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        loginReducer: state.loginReducer,
        filter: state.commonReducer.filter,
        total_wishlist_count: state.wishListReducer.total_wishlist_count,
        is_ws_not: state.loginReducer.data.is_ws_not
    }
}

const mapDispatchToProps = dispatch => ({
    //clearLoginData: () => dispatch(clearLoginData())
    clearProductFilterAction: () => dispatch(clearProductFilterAction()),
    setProductFilterAction: (data) => dispatch(setProductFilterAction(data)),
    clearProductListData: () => dispatch(clearProductListData()),
    setWishListCount: (data) => dispatch(setWishListCount(data))
})

const connectComponent = connect(mapStateToProps, mapDispatchToProps)
export default connectComponent(WishListScreen)
