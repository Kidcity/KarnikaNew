import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, BackHandler, Alert, Animated, Dimensions } from 'react-native';
import CustomHeader from '../../component/CustomHeader';
import FilterButton from '../../component/FilterButton';
import SortByButton from '../../component/SortByButton';
import { styles } from './style';
import Feather from 'react-native-vector-icons/Feather'
import { images, normalize, setWidth } from '../../utils/variable';
import GridViewItem from '../../component/GridViewItem';
import ListViewItem from '../../component/ListViewItem';
import FilterModal from '../../component/FilterModal'
import colors from '../../utils/colors';
import ProductListingService from '../../services/ProductListingService';
import { errorAlert, retryAlert, successToast } from '../../helper/ToastHelper';
import FullScreenLoader from '../../component/FullScreenLoader';
import { connect } from 'react-redux';
import { setLastScreenOffset, setProductLastFilterAction, setProductListViewType } from '../../redux/actions/productListAction';
import { clearProductFilterAction, setProductFilterAction } from '../../redux/actions/commonAction';
import { setWishListCount } from '../../redux/actions/wishListAction';
import { Easing } from 'react-native-reanimated';
import { setScreenActivity } from '../../helper/AppActivityTrackingHelper'
import AppHeader from '../../component/AppHeader';
import { commonStyle } from '../../helper/commonStyle';


const { width, height } = Dimensions.get("screen")

class ProductListingScreen extends Component {
    constructor(props) {
        super(props);
        this.param = this.props.route.params
        this.state = {
            filter: null,
            lastproductfilter: null,
            cust_manu_id: "",
            city_id: '',
            deeplinkparam: undefined,
            page: 1,
            list: [],
            showLoader: false,
            showBottomLoader: true,
            isGridView: true,
            noData: false,
            showFilter: false,
            is_ws_not : 0
        }
        this.flatListRef = React.createRef()
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        return {
            filter: props.hasOwnProperty("filter") ? props.filter : null,
            cust_manu_id: props.hasOwnProperty("cust_manu_id") ? props.cust_manu_id : "",
            city_id: props.hasOwnProperty("filter") ?
                props.filter.hasOwnProperty("city") ?
                    props.filter.city
                    :
                    props.route.params ?
                        props.route.params.city :
                        "" :
                "",
            deeplinkparam: props.route.params ?? undefined,
            lastproductfilter: props.hasOwnProperty("lastproductfilter") ? props.lastproductfilter : null,
            is_ws_not: props.hasOwnProperty("is_ws_not") ? props.is_ws_not : 0
        }
    }

    async componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        this.willFocusSubscription = this.props.navigation.addListener(
            'focus',
            async () => {

                if ( this.state.deeplinkparam && !this.state.deeplinkparam?.totalFilterApplied) {
                    // alert(1)
                    const deeplinkparam = this.state.deeplinkparam
                    const filter = {
                        ...this.state.filter,
                        brand: (deeplinkparam.brand && deeplinkparam.brand != 0) ? deeplinkparam.brand : '',
                        category: (deeplinkparam?.category && deeplinkparam.category != 0) ? deeplinkparam.category : "",
                        subCategory: (deeplinkparam?.subCategory && deeplinkparam.subCategory != 0) ? deeplinkparam.subCategory : '',
                        city: (deeplinkparam.city && deeplinkparam.city != 0) ? deeplinkparam.city : ""
                    }

                    if (deeplinkparam.city && deeplinkparam.city != 0) {
                        this.setState({
                            city_id: deeplinkparam.city
                        })
                    }

                    if (JSON.stringify(filter) !== JSON.stringify(this.state.lastproductfilter)) {
                        this.setState({
                            list: []
                        })
                        await this.props.setProductFilterAction(filter)
                        this._getProductList()
                        this.totalFilterApplied()
                    } else {
                        // console.log('here ');
                        // console.log(JSON.stringify(filter));
                        // console.log(JSON.stringify(this.state.lastproductfilter));
                        // this._getProductList()
                        // this.totalFilterApplied()
                    }

                } else {

                    if (this.state.list.length == 0) {
                        // alert(2)
                        this._getProductList()
                        this.totalFilterApplied()
                    } else {
                        if (JSON.stringify(this.state.filter) !== JSON.stringify(this.state.lastproductfilter)) {
                            // alert(3)
                            this.setState({
                                list: []
                            })
                            this._getProductList()
                            this.totalFilterApplied()
                        }
                    }


                }

            }
        );
        this.willBlurSubscription = this.props.navigation.addListener('blur', () => {

            this.props.setProductLastFilterAction(this.state.filter)
        })
    }

    componentWillUnmount() {
        this.willFocusSubscription()
        this.willBlurSubscription()
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    totalFilterApplied() {
        const filter = this.state.filter
        let total = 0
        let i = 0

        if (this.props.route.params?.totalFilterApplied) {
            this.setState({
                totalFilterApplied: this.props.route.params?.totalFilterApplied
            })

            return
        }

        if (filter?.ageGroup && filter.ageGroup != '') {
            total += 1
        }
        if (filter?.brand && filter.brand != '') {
            total += 1
        }
        if (filter?.category && filter.category != '') {
            total += 1
        }
        if (filter?.priceRange && filter.priceRange != '') {
            total += 1
        }
        if (filter?.season && filter.season != '') {
            total += 1
        }
        if (filter?.subCategory && filter.subCategory != '') {
            total += 1

        }
        console.log("totalFilterApplied ==> ", total);
        this.setState({
            totalFilterApplied: total
        })
    }

    async _getProductList() {

        let param = this.state.filter

        param = { ...param, page: this.state.page, retailer_id: this.state.cust_manu_id }

        console.log('_getProductList param - >', param);

        if (this.state.page == 1) {
            this.setState({ showLoader: true, showFilter: false })
        }
        else {
            this.setState({ showBottomLoader: true, showFilter: false })
        }

        ProductListingService._getProductListService(param).then(response => {

            let products = response.products

            if (!this.state.isFiltered) {
                products = [...this.state.list, ...products]
            } else if (this.state.isFiltered && this.state.page > 1) {
                products = [...this.state.list, ...products]
            }
            else if (this.state.page > 1) {

                products = [...this.state.list, ...products]
            }
            else {

                products = products
            }

            this.setState({
                list: products,
                showLoader: false,
                // showBottomLoader: false,
                isFiltered: false,
                noData: (response.products.length === 0) ? true : false,
                page: (response.products.length === 0) ? 1 : this.state.page
            }, () => {
                // this.moveToUp()
                // console.log("noData stateus - > ",this.state.noData);
            })

        }, error => {
            this.setState({ showLoader: false, showBottomLoader: false, isFiltered: false })
            if (error.message == "server_error") {
                retryAlert(() => this._getProductList())
            } else {
                errorAlert("Error", error.message)
            }
        })

    }

    _changeListView() {
        this.props.setProductListViewType(!this.state.isGridView)
        this.setState({ isGridView: !this.state.isGridView })
    }

    _addToFavourite(flag, product_id, productIndex) {
        const param = {
            liked_products_id: product_id,
            liked_retailers_id: this.state.cust_manu_id,
            status: flag
        }

        ProductListingService._productLikeUnlikeService(param).then(response => {

            const product = this.state.list
            const total_wishlist_count = this.props.total_wishlist_count
            product[productIndex].isFavourite = flag

            this.setState({
                list: product
            })

            if (flag) {
                successToast("Added!", "Product added to wishlist")
                this.props.setWishListCount(parseInt(total_wishlist_count) + 1)
            } else {
                successToast("Removed!", "Product removed to wishlist")
                this.props.setWishListCount(parseInt(total_wishlist_count) - 1)
            }
        }, error => {
            errorAlert("Error", error.message)
        })
    }

    handleBackButtonClick() {
        // console.log(this.state.city_id);
        setScreenActivity({ action_type: "going_back", action_id: '', city_id: this.state.city_id ?? "" })

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

    renderGridViewItem = ({ item, index }) => {
        return (
            <GridViewItem
                item={item}
                onPressProduct={() => {
                    setScreenActivity({ action_type: "product_details", action_id: item.id, city_id: this.state.city_id ?? "" })
                    this.props.navigation.navigate("ProductDetails", { product_id: item.id, items_left: item?.item_left })
                }}
                is_ws_not={this.state.is_ws_not}
                onPressFavBtn={(value) => this._addToFavourite(value, item.id, index)}
            />
        )
    }

    renderListViewItem = ({ item, index }) => {
        return (
            <ListViewItem
                item={item}
                onPressProduct={() => {
                    setScreenActivity({ action_type: "product_details", action_id: item.id, city_id: this.state.city_id ?? "" })
                    this.props.navigation.navigate("ProductDetails", { product_id: item.id })
                }}
                is_ws_not={this.state.is_ws_not}
                onPressFavBtn={(value) => this._addToFavourite(value, item.id, index)}
            />
        )
    }

    handleScroll = (event) => {
        this.last_screen_offset = event.nativeEvent.contentOffset.y
    }

    render() {
        return (
            <View style={[styles.container]}>
                {/* <CustomHeader
                    city_id={this.state.city_id}
                    showingThreeIcon={true}
                    showSearchIcon={true}
                    showCartIcon={true}
                    showFavouriteIcon={true}
                    showBackButton={true}
                    headingLogoStyle={{
                        marginLeft: setWidth(6)
                    }}
                    navigation={this.props.navigation}
                    shouldRedirectToSelfScreen={true}
                    onSearch={this._searchProduct}
                    onPressBack={() => this.handleBackButtonClick()}
                    onPressCartIcon={() => this.props.navigation.navigate("Cart")}
                /> */}
                <AppHeader
                    showBackBtn
                    showSearch
                    showWishList
                    showLogo
                    navigation={this.props.navigation}
                />
                <View style={[styles.row, styles.filterContainer]}>
                    <View style={styles.row}>
                        <FilterButton
                            onPress={() => this.setState({ showFilter: true })}
                            totalFilterApplied={this.state.totalFilterApplied}
                        />
                        <SortByButton
                            onSelectSortItem={(isCancel) => {
                                if (!isCancel) {
                                    this.setState({
                                        list: []
                                    })
                                    this._getProductList()
                                }
                            }}
                        />
                    </View>
                    <TouchableOpacity style={styles.gridbtn} onPress={() => this._changeListView()}>
                        <Feather name={this.state.isGridView ? 'grid' : 'list'} size={setWidth(6)} color={colors.dark_charcoal} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, paddingHorizontal: setWidth(2) }}>
                    {
                        this.state.isGridView ?
                            <FlatList
                                ref={this.flatListRef}
                                key={'#'}
                                data={this.state.list}
                                keyExtractor={(item, index) => '#' + index}
                                renderItem={this.renderGridViewItem}
                                numColumns={2}
                                initialNumToRender={10}
                                columnWrapperStyle={{
                                    justifyContent: 'space-between'
                                }}
                                contentContainerStyle={{
                                    flexGrow: 1,
                                    paddingBottom: setWidth(10),
                                    paddingTop: normalize(15)
                                }}
                                onEndReachedThreshold={0.1}
                                onEndReached={() => {
                                    if (!this.state.noData) {
                                        this.setState({
                                            page: this.state.page + 1
                                        }, () => this._getProductList())
                                    }
                                }}
                                // onScroll={this.handleScroll}
                                scrollEventThrottle={16}
                                ListFooterComponent={() => this.state.noData ?
                                    <Text style={styles.emptyMessageStyle}>No More Data</Text>
                                    :
                                    this.state.showBottomLoader &&
                                    <ActivityIndicator animating={true} size="large" color={colors.primaryyellow} />
                                }
                                ItemSeparatorComponent={() => <View style={[commonStyle.gapTop10]} />}
                            />
                            :
                            <FlatList
                                ref={this.flatListRef}
                                key={'_'}
                                data={this.state.list}
                                keyExtractor={(item, index) => '_' + index}
                                renderItem={this.renderListViewItem}
                                numColumns={1}
                                initialNumToRender={10}
                                contentContainerStyle={{
                                    flexGrow: 1,
                                    paddingBottom: setWidth(10)
                                }}
                                onEndReachedThreshold={0.1}
                                onEndReached={() => {
                                    if (!this.state.noData) {
                                        this.setState({
                                            page: this.state.page + 1
                                        }, () => this._getProductList())
                                    }
                                }}
                                // onScroll={this.handleScroll}
                                scrollEventThrottle={16}
                                ListFooterComponent={() => this.state.noData ?
                                    <Text style={styles.emptyMessageStyle}>No More Data</Text>
                                    :
                                    this.state.showBottomLoader &&
                                    <ActivityIndicator animating={true} size="large" color={colors.primaryyellow} />
                                }
                            />
                    }
                </View>
                {
                    this.state.showFilter &&
                    <FilterModal
                    isMyFeed={false}
                        isOpen={this.state.showFilter}
                        onClose={() => this.setState({ showFilter: false })}
                        onDone={async (totalFilterApplied) => {
                            //await this.props.clearProductFilterAction()                            
                            this.flatListRef.current.scrollToOffset({ animated: true, offset: 0 })
                            this.setState({
                                showFilter: false,
                                totalFilterApplied: totalFilterApplied,
                                isFiltered: true,
                                page: 1
                            }, () => {
                                this._getProductList()
                            })
                        }}
                        onPageFilter={this.state.filter}
                    />
                }
                {
                    this.state.showLoader &&
                    <FullScreenLoader
                        isOpen={this.state.showLoader}
                    />
                }
            </View>
        );
    }
}

const mapStateToProps = state => {    
    return {
        cust_manu_id: state.loginReducer.data.cust_manu_id,
        filter: state.commonReducer.filter,
        lastproductfilter: state.productListReducer.lastproductfilter,
        // productListReducerLastState: state.productListReducer.lastState,
        total_wishlist_count: state.wishListReducer.total_wishlist_count,
        is_ws_not: state.loginReducer.data.is_ws_not
    }
}
const mapDispatchToProps = dispatch => ({
    setProductListViewType: (data) => dispatch(setProductListViewType(data)),
    setLastScreenOffset: (data) => dispatch(setLastScreenOffset(data)),
    setProductLastFilterAction: (data) => dispatch(setProductLastFilterAction(data)),
    setProductFilterAction: (param) => dispatch(setProductFilterAction(param)),
    clearProductFilterAction: () => dispatch(clearProductFilterAction()),
    setWishListCount: (data) => dispatch(setWishListCount(data)),
})

const connectComponent = connect(mapStateToProps, mapDispatchToProps)
export default connectComponent(ProductListingScreen)
