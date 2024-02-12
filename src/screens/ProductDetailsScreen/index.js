import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView, Image, ActivityIndicator, ImageURISource, ImageRequireSource, Dimensions, BackHandler } from 'react-native';
import CustomHeader from '../../component/CustomHeader';
import IncrementDecrementButton from '../../component/IncrementDecrementButton';
import colors from '../../utils/colors';
import { images, normalize, setHeight, setWidth } from '../../utils/variable';
import { styles } from './style';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import GridViewItem from '../../component/GridViewItem';
import ProductDetailsService from '../../services/ProductDetailsService';
import { errorAlert, retryAlert, successToast } from '../../helper/ToastHelper'
import FullScreenLoader from '../../component/FullScreenLoader'
import FullScreenBanner from '../../component/FullScreenBanner';
import { connect } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { clearProductFilterAction, setProductFilterAction } from '../../redux/actions/commonAction';
import ProductImageViewModal from '../../component/ProductImageViewModal';
import AddToCartModal from '../../component/AddToCartModal';
import { clearProductListData } from '../../redux/actions/productListAction';
import { setWishListCount } from '../../redux/actions/wishListAction';
import VideoModal from '../../component/VideoModal';
import { setScreenActivity } from '../../helper/AppActivityTrackingHelper';
// import { StackActions } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import CartServices from '../../services/CartServices';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import BlinkText from '../../component/BlinkText';
import FastImage from 'react-native-fast-image';
import AppHeader from '../../component/AppHeader';
import { commonStyle } from '../../helper/commonStyle';
import CircleIconButton from '../../component/CircleIconButton';
import CommonService from '../../services/CommonService';
import Share from 'react-native-share';

const SCREEN = Dimensions.get("window");
const SCREEN_WIDTH = SCREEN.width;
const SCREEN_HEIGHT = SCREEN.height;

class ProductDetailsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            brand_mov: 0,
            city_id: '',
            productSizeList: [],
            similerProduct: [],
            shop_in_shop_product: [],
            product_images: [],
            product_video: [],
            preview_product_image_list: [],
            currentImageIndex: 0,
            product_id: '',
            brand_id: 0,
            brand_name: '',
            total_color: 0,
            style_no: '',
            product_category: '',
            product_material: '',
            product_sleeves: '',
            product_necktype: '',
            product_fitting: '',
            product_packaging: '',
            showProductDetails: false,
            showSimilerProduct: false,
            is_added_to_wishlist: false,

            btnLoader: false,
            isAddedToCart: false,
            showLoader: false,
            showVideoModal: false,
            showProductImageZoomModal: false,
            showAddToCartModal: false,
            addToCartModalData: [],
            product_video_url: '',
            product_video_poster: '',

            total_price_details: [],
            remaining_mov_value: 0,
            items_left: '',
            product_category_id: "",
            is_ws_not: 0
        };
        this.param = this.props.route.params
        this.scrollRef = React.createRef()

        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

    }

    static getDerivedStateFromProps(props, state) {
        return {
            is_ws_not: props.hasOwnProperty("is_ws_not") ? props.is_ws_not : 0
        }
    }

    proceedToBuy() {
        // this.props.navigation.dispatch(
        //     StackActions.replace("Cart")
        // )
        this.props.navigation.navigate("Cart")
    }

    renderProductSizeView = ({ item, index }) => {
        return (
            <View style={styles.productSizeView}>
                <View style={[styles.row, { justifyContent: 'space-between', }]}>
                    <View style={{}} >
                        <Text style={[styles.subHeading, styles.textBold, styles.textCenter, { color: colors.dark_charcoal }]}>Age Group</Text>
                        <Text style={[styles.subHeading, styles.textCenter, { color: colors.dark_charcoal, paddingVertical: setWidth(1) }]}>{item.label}</Text>
                        <View style={[styles.sizeBtn, (item.is_selected) && { backgroundColor: colors.grey5 }]} >
                            <Text style={[styles.subHeading, styles.textCenter, styles.textBold, { color: colors.grey2, fontSize: setWidth(3.9) }]}>{item.size}</Text>
                        </View>
                    </View>
                    <View style={{ justifyContent: 'flex-end' }}>
                        <Text style={[styles.subHeading, styles.textCenter, styles.textBold, { color: colors.dark_charcoal }, commonStyle.bluredText]}>₹ {item.price_per_piece}</Text>
                        <Text style={[styles.subHeading, styles.textCenter, styles.textBold, styles.textStrikeThrough, { color: colors.lightRed },  commonStyle.bluredText]}>₹ {item.wsp}</Text>
                        <Text style={[styles.text, styles.textCenter, { color: colors.grey3, fontSize: setWidth(2.8) }]}>Per Piece</Text>
                        <Text style={[styles.text, styles.textCenter, styles.textBold, { color: colors.grey3, marginTop: setWidth(1) }]}>{item.total_set} Pcs / Set</Text>
                    </View>
                    <View style={{ justifyContent: 'flex-end' }}>
                        <Text style={[styles.text, styles.textCenter, styles.textBold, { color: colors.dark_charcoal, marginTop: setWidth(5) }]}>{(parseInt(item.total_selected) * parseInt(item.total_set))} Pieces</Text>
                        <IncrementDecrementButton
                            label={item.total_selected + ' Sets'}
                            container={{
                                marginTop: setWidth(1),
                                backgroundColor: '#263C69',
                            }}
                            onIncrease={() => this._checkStock(item.total_selected + 1, index)}
                            onDecrease={() => this._adjustProductQty(item.total_selected - 1, index)}
                        />
                    </View>
                </View>
            </View>
        )
    }

    renderSimilerProductItem = ({ item, index }) => {
        return (
            <GridViewItem
                item={item}
                containerStyle={{
                    marginRight: setWidth(1)
                }}
                onPressProduct={() => {
                    setScreenActivity({ action_type: "product_details", action_id: item.id, city_id: this.state.city_id ?? "" })
                    this._getProductDetails(item.id)
                    this.scrollRef.current.scrollTo({ x: 0, y: 0, animated: true })
                }}
                onPressFavBtn={(value) => this._addToFavouriteFromSimilerproduct(value, item.id, index)}
                is_ws_not={this.state.is_ws_not}
            />
        )
    }

    productDetailsView() {
        return (
            <View style={[styles.productDetailsView, styles.row]}>
                <View style={{ flex: 3.33, paddingLeft: setWidth(3) }}>
                    <Text style={[styles.text, styles.textBold, { color: colors.dark_charcoal }]}>Category</Text>
                    <Text style={[styles.text, styles.textBold, { color: colors.grey3, marginTop: setWidth(1), fontSize: setWidth(2.5), }]} >{this.state.product_category}</Text>

                    <Text style={[styles.text, styles.textBold, { color: colors.dark_charcoal, marginTop: setWidth(4) }]}>Neck Type</Text>
                    <Text style={[styles.text, styles.textBold, { color: colors.grey3, fontSize: setWidth(2.5), marginTop: setWidth(1) }]} >{this.state.product_necktype}</Text>
                </View>
                <View style={{ flex: 3.33 }}>
                    <Text style={[styles.text, styles.textBold, { color: colors.dark_charcoal }]}>Material</Text>
                    <Text style={[styles.text, styles.textBold, { color: colors.grey3, marginTop: setWidth(1), fontSize: setWidth(2.5) }]}>{this.state.product_material}</Text>
                    <Text style={[styles.text, styles.textBold, { color: colors.dark_charcoal, marginTop: setWidth(4) }]}>Fitting</Text>
                    <Text style={[styles.text, styles.textBold, { color: colors.grey3, fontSize: setWidth(2.5), marginTop: setWidth(1) }]}>{this.state.product_fitting}</Text>
                </View>
                <View style={{ flex: 3.33 }}>
                    <Text style={[styles.text, styles.textBold, { color: colors.dark_charcoal }]}>Sleeves</Text>
                    <Text style={[styles.text, styles.textBold, { color: colors.grey3, marginTop: setWidth(1), fontSize: setWidth(2.5) }]}>{this.state.product_sleeves}</Text>
                    <Text style={[styles.text, styles.textBold, { color: colors.dark_charcoal, marginTop: setWidth(4) }]}>Packaging</Text>
                    <Text style={[styles.text, styles.textBold, { color: colors.grey3, fontSize: setWidth(2.5), marginTop: setWidth(1) }]}>{this.state.product_packaging}</Text>
                </View>

            </View>
        )
    }

    _moreProductByBrand = async () => {
        let param = this.props.filter

        param = {
            ...param,
            brand: this.state.brand_id.toString(),
        }
        setScreenActivity({ action_type: "more_product", action_id: this.state.brand_id, city_id: this.state.city_id ?? "" })
        await this.props.setProductFilterAction(param)
        this.props.navigation.navigate("ProductListing")
    }

    async _adjustProductQty(value, index) {
        const sizelist = this.state.productSizeList

        if (value < 0) {
            return
        }

        sizelist[index].total_selected = value
        this.setState({
            productSizeList: sizelist
        })
    }

    _selectSizeGroup(index) {
        const sizelist = this.state.productSizeList
        sizelist[index].is_selected = !sizelist[index].is_selected
        this.setState({
            productSizeList: sizelist
        })
    }

    _addToFavourite() {
        const total_wishlist_count = this.props.total_wishlist_count

        const status = !this.state.is_added_to_wishlist
        const param = {
            liked_products_id: this.state.product_id,
            liked_retailers_id: this.props.loginReducer.data.cust_manu_id,
            status: status
        }

        ProductDetailsService._productLikeUnlikeService(param).then(response => {
            this.setState({
                is_added_to_wishlist: status
            })
            if (status) {
                successToast("Added!", "Product added to wishlist")
                this.props.setWishListCount(parseInt(total_wishlist_count) + 1)
            } else {
                this.props.setWishListCount(parseInt(total_wishlist_count) - 1)
                successToast("Removed!", "Product removed from wishlist")
            }

        }, error => {
            if (error.message == "server_error") {
                retryAlert(() => this._addToFavourite())
            } else {
                errorAlert("Error", error.message)
            }
        })
    }

    _addToFavouriteFromSimilerproduct(flag, product_id, productIndex) {

        const total_wishlist_count = this.props.total_wishlist_count

        const param = {
            liked_products_id: product_id,
            liked_retailers_id: this.props.loginReducer.data.cust_manu_id,
            status: flag
        }

        ProductDetailsService._productLikeUnlikeService(param).then(response => {

            const product = this.state.similerProduct
            product[productIndex].isFavourite = flag
            this.setState({
                similerProduct: product
            })
            if (flag) {
                successToast("Added!", "Product added to wishlist")

                this.props.setWishListCount(parseInt(total_wishlist_count) + 1)
            } else {
                this.props.setWishListCount(parseInt(total_wishlist_count) - 1)
                successToast("Removed!", "Product removed from wishlist")
            }
        }, error => {
            if (error.message == "server_error") {
                retryAlert(() => this._addToFavouriteFromSimilerproduct())
            } else {
                errorAlert("Error", error.message)
            }
        })
    }

    _checkStock(value, index) {
        const sizelist = this.state.productSizeList

        const param = {
            psg_id: sizelist[index].product_size_group_id,
            qty_ordered: value
        }

        ProductDetailsService._checkStockService(param).then(response => {
            if (response.data == 1) {
                this._adjustProductQty(value, index)
            } else {
                errorAlert("Error", response.message)
                return false
            }
        }, error => {
            if (error.message == "server_error") {
                retryAlert(() => this._checkStock())
            } else {
                errorAlert("Error", error.message)
            }
            return false
        })
    }

    _addToCart() {
        // this._checkMovValue()
        // return

        const sizelist = this.state.productSizeList

        const size_group_ids = sizelist.filter(function (item) {
            return (item.total_selected != 0)
        }).map(item => item.product_size_group_id).join(",")

        const size_group_ids_length = sizelist.filter(function (item) {
            return (item.total_selected != 0)
        }).map(item => item.product_size_group_id).length

        let size_qty = sizelist.filter(function (item) {
            return (item.total_selected != 0)
        }).map(item => item.total_selected).join(",")



        if (size_qty == '') {
            errorAlert('Sorry!', "Please select product quantity.")
            return
        }

        this.setState({ btnLoader: true })
        const param = {
            city_id: this.state.city_id,
            product_id: this.state.product_id,
            product_size_group_id: size_group_ids,
            qty_ordered: size_qty,
            retailer_id: this.props.loginReducer.data.cust_manu_id,
            shop_in_shop: (this.state.brand_mov === 0) ? "0" : "1",
            brand_mov: (this.state.brand_mov !== 0) ? this.state.brand_mov : 0,
            brand_id: this.state.brand_id
        }

        ProductDetailsService._addToCartService(param, size_group_ids_length).then(async response => {
            //successToast("Added!", "Successfully added to cart.")

            await this._populateModalData()
            await this._getCartData()
            // this._checkMovValue()
            this.setState({ isAddedToCart: !this.state.isAddedToCart, showAddToCartModal: true, btnLoader: false })

        }, error => {
            this.setState({ btnLoader: false })
            if (error.message == "server_error") {
                retryAlert(() => this._addToCart())
            } else {
                errorAlert("Error", error.message)
            }
        })
    }

    async _getCartData() {

        const param = {
            retailer_id: this.props.loginReducer.data.cust_manu_id
        }

        await CartServices._getCartProductService(param, this.state.brand_id).then(response => {
            // console.log('response?.remaining_mov_value ', response);
            this.setState({
                remaining_mov_value: response?.remaining_mov_value ?? 0
            })

        }, error => {
        })
    }

    async _populateModalData() {
        const sizelist = this.state.productSizeList

        let product_list = []
        for (let index = 0; index < sizelist.length; index++) {
            const element = sizelist[index];
            if (element.total_selected) {
                product_list.push({
                    image: this.state.product_images[0].image,
                    brand_name: this.state.brand_name,
                    set_qty: element.total_set,
                    size: element.size,
                    color: this.state.total_color,
                    price: element.price_per_piece
                })
            }
        }
        this.setState({
            addToCartModalData: product_list
        })
    }

    async _getProductDetails(product_id = null) {
        // console.log('route ',this.props);
        const param = {
            language_id: 1,
            product_id: (!product_id) ? this.param.product_id : product_id,
            retailer_id: this.props.loginReducer.data.cust_manu_id
        }
        console.log(param);
        if (product_id !== null) {
            this.props.navigation.setParams({ product_id: product_id })
        }
        this.setState({ showLoader: true })
        await ProductDetailsService._getProductDetailsService(param).then(response => {

            this.setState({
                brand_mov: response.brand_mov,
                city_id: response.city_id,
                product_id: response.product_id,
                brand_id: response.brand_id,
                brand_name: response.brand_name,
                total_color: response.product_total_colors,
                style_no: response.product_style_no,
                productSizeList: response.productSizeList,
                product_category: response.product_categories_name,
                product_material: response.product_material,
                product_sleeves: response.product_sleeve_name,
                product_necktype: response.product_neck_name,
                product_packaging: response?.product_packaging,
                product_fitting: response.product_fitting,
                product_images: response.product_images,
                product_video: response.product_video,
                preview_product_image_list: response.preview_product_image_list,

                shop_in_shop_product: response.shop_in_shop_product,
                similerProduct: response.similer_product,
                is_added_to_wishlist: response.is_added_to_wishlist,
                product_video_url: response.product_video_url,
                product_video_poster: response.product_video_poster,
                showLoader: false,
                isAddedToCart: false,
                showSimilerProduct: (response.brand_mov === 0) ? true : false,
                items_left: this.props.route.params?.items_left,
                product_category_id: response?.category_id
            })
        }, error => {
            this.setState({ showLoader: false })
            if (error.message == "server_error") {
                retryAlert(() => this._getProductDetails())
            } else {
                errorAlert("Error", error.message)
            }
        })
    }

    componentDidMount() {
        this._getProductDetails()
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
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
        // return
        this.props.navigation.navigate("ProductListing")
    }

    handleBackButtonClick() {
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

    _shareDoc(link) {
        const options = {
            message: "Please check our latest catelogs.",
            url: link
        }
        Share.open(options)
            .then((res) => {
                //console.log(res);
            })
            .catch((err) => {
                err && console.log(err);
            });
    }


    onPressShare() {

        this.setState({ showLoader: true })
        const param = {
            brand_id: this.state.brand_id + "",
            categories_id: this.state.product_category_id,
            vendor_style_no: this.state.style_no
        }

        CommonService._getSharePdfService(param).then(response => {
            if (response?.link) {
                this._shareDoc(response?.link)
            }
        }, error => {
            if (error.message == "server_error") {
                retryAlert(() => this.onPressShare())
            } else {
                // errorAlert("Error in get cities", error.message)
            }
        }).finally(() => {
            this.setState({ showLoader: false })
        })
    }

    render() {
        return (
            <View style={styles.contianer}>
                {/* <CustomHeader
                    city_id={this.state.city_id}
                    heading=""
                    showSearchIcon={true}
                    showCartIcon={true}
                    showBackButton={true}
                    onSearch={(text) => this._navigateToProductList(text)}
                    onPressBack={() => this.handleBackButtonClick()}
                    headingLogoStyle={{
                        marginLeft: setWidth(6)
                    }}

                    onPressCartIcon={() => {
                        setScreenActivity({ action_type: "", action_id: '', city_id: this.state.city_id ?? "" })
                        this.props.navigation.navigate("Cart")
                    }}
                    showFavouriteIcon={true}
                    showingThreeIcon={true}
                    navigation={this.props.navigation}
                /> */}
                <AppHeader
                    showBackBtn
                    showSearch
                    showCart
                    showWishList
                    showLogo
                    navigation={this.props.navigation}
                />
                <ScrollView contentContainerStyle={styles.content} ref={this.scrollRef}>
                    <View style={styles.topBanner}>
                        {/*
                            this.state.brand_mov !== 0 &&
                            <View style={styles.labelView}>
                                <View style={styles.squre}>
                                    <Text style={[styles.text, { color: colors.white, textAlign: 'center', fontSize: normalize(13), fontWeight: 'bold' }]} >Shop In Shop</Text>
                                </View>
                                <View style={styles.tringle}>
                                </View>
                            </View>
            */ }
                        <TouchableOpacity style={styles.shareBtn} onPress={() => this.onPressShare()}>
                            <CircleIconButton
                                icon={<Octicons name="share-android" size={normalize(20)} color={colors.themeColor} />}
                                onPress={() => this.onPressShare()}
                            />
                        </TouchableOpacity>

                        <FullScreenBanner
                            showDots={true}
                            staticImage={false}
                            autoScroll={false}
                            data={this.state.product_images}
                            videos={this.state.product_video}
                            // itemHeight={setHeight(60)}
                            bannerCardStyle={{
                                width: setWidth(100),
                                height: setHeight(69),
                                margin: 0,
                                borderRadius: 0,
                            }}
                            bannerImageStyle={{
                                width: '100%',
                                height: '100%',
                                borderRadius: 0,
                                resizeMode: 'contain'
                            }}
                            dotViewContainer={{
                                marginTop: 10,
                                // backgroundColor: 'orange'
                            }}
                            resizeMode={FastImage.resizeMode.contain}
                            onPressProductDetailsBannerItem={(index, isvideo, item) => {
                                if (isvideo) {
                                    this.setState({ showVideoModal: true })
                                } else {
                                    this.setState({ showProductImageZoomModal: true, currentImageIndex: index })
                                }
                            }}
                        />
                    </View>

                    {
                        (this.state.items_left != '' && this.state.items_left !== undefined) &&
                        <View style={{}}>
                            <View style={styles.itemsLeftContainer}>
                                <Text style={[styles.text, { color: colors.white, textAlign: 'center', fontSize: setWidth(4) }]} >{this.state.items_left}</Text>
                            </View>
                        </View>
                    }


                    <View style={styles.row}>
                        <View style={[styles.smallBlock, { flex: 0.5, }]}>
                            <View style={[styles.row, styles.alignitemCenter]}>
                                <Text style={[styles.subHeading, styles.textBold, { color: colors.grey2, fontSize: setWidth(3.7) }]}>Brand: </Text>
                                <Text style={[styles.subHeading, styles.textBold, { color: colors.grey3, fontSize: setWidth(3.7) }]}>{this.state.brand_name}</Text>
                            </View>
                        </View>
                        <View style={[styles.smallBlock, { flex: 0.5, borderLeftWidth: 0 }]}>
                            <View style={[styles.row, styles.alignitemCenter]}>
                                <Text style={[styles.subHeading, styles.textBold, { color: colors.grey2, fontSize: setWidth(3.7) }]}>Colour: </Text>
                                <Text style={[styles.subHeading, styles.textBold, { color: colors.grey3, fontSize: setWidth(3.7) }]}>{this.state.total_color}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.smallBlock, { borderTopColor: colors.white, backgroundColor: colors.grey6 }]}>
                        <View style={[styles.row, styles.alignitemCenter]}>
                            <Text style={[styles.subHeading, styles.textBold, { color: colors.grey2, fontSize: setWidth(3.7) }]}>Brand's Minimum Order Value: </Text>
                            <Text style={[styles.subHeading, styles.textBold, { color: colors.grey3, fontSize: setWidth(3.7) }]}>
                                {
                                    this.state.brand_mov === 0 ?
                                        "N/A"
                                        :
                                        "₹ " + this.state.brand_mov
                                }
                            </Text>
                        </View>
                    </View>
                    <View style={[styles.smallBlock, { borderTopColor: colors.white }]}>
                        <View style={[styles.row, styles.alignitemCenter]}>
                            <Text style={[styles.subHeading, styles.textBold, { color: colors.grey2, fontSize: setWidth(3.7) }]}>Style No. : </Text>
                            <Text style={[styles.subHeading, styles.textBold, { color: colors.grey3, fontSize: setWidth(3.7) }]}>{this.state.style_no}</Text>
                        </View>
                    </View>


                    {
                        /* Product Size Section */
                    }
                    <FlatList
                        data={this.state.productSizeList}
                        keyExtractor={(item, index) => index}
                        renderItem={this.renderProductSizeView}
                        style={{
                            backgroundColor: 'red',
                            margin: 0
                        }}
                    />


                    {
                        /* Product Details Section */
                    }
                    <TouchableOpacity style={styles.collasableBtn} onPress={() => this.setState({ showProductDetails: !this.state.showProductDetails })}>
                        <Text style={[styles.subHeading, styles.textBold, { color: colors.grey2 }]}>Product Details</Text>
                        <MaterialIcons name={this.state.showProductDetails ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={setWidth(7)} color={colors.grey2} />
                    </TouchableOpacity>
                    {
                        this.state.showProductDetails &&
                        this.productDetailsView()
                    }

                    {
                        (this.state.brand_mov === 0) &&
                        <TouchableOpacity style={styles.collasableBtn} onPress={this._moreProductByBrand}>
                            <Text style={[styles.subHeading, styles.textBold, { color: colors.grey2 }]}>More Products By {this.state.brand_name}</Text>
                            <MaterialIcons name='keyboard-arrow-right' size={setWidth(7)} color={colors.grey2} />
                        </TouchableOpacity>
                    }



                    {
                        /* similer product section */
                    }

                    <View style={styles.similerProductSection}>
                        {
                            (this.state.brand_mov !== 0) ?
                                <TouchableOpacity style={[styles.collasableBtn, { marginTop: 0 }]} onPress={() => this.setState({ showSimilerProduct: !this.state.showSimilerProduct })}>
                                    <Text style={[styles.subHeading, styles.textBold, { color: colors.grey2 }]}>Similar Products</Text>
                                    <MaterialIcons name={this.state.showSimilerProduct ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={setWidth(7)} color={colors.grey2} />
                                </TouchableOpacity>
                                :
                                <View style={[styles.row, { justifyContent: 'space-between', paddingHorizontal: setWidth(4) }]}>
                                    <Text style={[styles.subHeading, styles.textBold, { color: colors.grey2 }]}>Similar Products</Text>

                                    <TouchableOpacity onPress={() => {
                                        this.props.navigation.navigate("SeeAllProduct", { all_similer_product: this.state.similerProduct, city_id: this.state.city_id })
                                    }}>
                                        <Text style={[styles.subHeading, styles.textBold, { color: colors.lightRed }]}>See All</Text>
                                    </TouchableOpacity>
                                </View>
                        }

                        {
                            (this.state.showSimilerProduct) &&
                            <FlatList
                                data={this.state.similerProduct}
                                keyExtractor={(item, index) => index}
                                renderItem={this.renderSimilerProductItem}
                                horizontal
                                style={{
                                    marginTop: setWidth(3.5)
                                }}
                                contentContainerStyle={{
                                    paddingVertical: normalize(15),
                                    paddingLeft: normalize(15)
                                }}
                                ItemSeparatorComponent={() => <View style={{ marginLeft: normalize(12) }} />}
                            />
                        }

                    </View>

                    {
                        // shop in shop products
                    }
                    {
                        (this.state.brand_mov !== 0) &&
                        <View style={styles.similerProductSection}>
                            <View style={[styles.row, { justifyContent: 'space-between', paddingHorizontal: setWidth(4) }]}>
                                <Text style={[styles.subHeading, styles.textBold, { color: colors.grey2 }]}>More Products By {this.state.brand_name}</Text>

                                <TouchableOpacity onPress={this._moreProductByBrand}>
                                    <Text style={[styles.subHeading, styles.textBold, { color: colors.lightRed }]}>See All</Text>
                                </TouchableOpacity>
                            </View>

                            <FlatList
                                data={this.state.shop_in_shop_product}
                                keyExtractor={(item, index) => index}
                                renderItem={this.renderSimilerProductItem}
                                horizontal
                                style={{
                                    marginTop: setWidth(3.5)
                                }}
                            />
                        </View>
                    }

                    <Text style={[styles.subHeading, styles.textBold, { color: colors.dark_charcoal, marginTop: setWidth(8) }, styles.textCenter]}>Made In Bharat</Text>
                </ScrollView>

                {
                    this.state.remaining_mov_value > 0 &&
                    <BlinkText
                        duration={700}
                        // style={styles.movWarningView}
                        children={
                            <View style={styles.movWarningView}>
                                <FontAwesome name='warning' color={colors.yellow} size={setWidth(5)} />
                                <Text style={[styles.text, styles.movWarnText, { paddingHorizontal: 20 }]}>
                                    Add items worth
                                    <Text style={styles.textBold}> ₹ {this.state.remaining_mov_value}  </Text>
                                    from {this.state.brand_name} to complete
                                    <Text style={[styles.text, styles.movWarnText]}> Minimum Order Value</Text>
                                </Text>
                            </View>
                        }
                    />
                }

                <View style={styles.footerbtnView}>
                    <TouchableOpacity style={[styles.heartBtn]} onPress={() => this._addToFavourite()}>
                        {
                            this.state.is_added_to_wishlist ?
                                <Octicons name='heart-fill' size={setWidth(6)} color={"#62A25D"} />
                                :
                                <SimpleLineIcons name='heart' size={setWidth(6)} color={"#62A25D"} />
                        }
                    </TouchableOpacity>
                    {
                        // this.state.is_ws_not === 1 &&
                        <TouchableOpacity style={styles.addtoCartbtn} onPress={() => {
                            this._addToCart()
                        }} disabled={this.state.btnLoader ? true : false} >
                            {
                                this.state.btnLoader ?
                                    <ActivityIndicator animating={true} color={colors.white} />
                                    :
                                    <Text style={[styles.addtoCartBtnText, styles.subHeading, styles.textBold]}>
                                        {
                                            // this.state.isAddedToCart ?
                                            //     "PROCEED TO BUY"
                                            //     :
                                            "ADD TO CART"
                                        }
                                    </Text>
                            }

                        </TouchableOpacity>
                    }
                </View>
                {
                    this.state.showLoader &&
                    <FullScreenLoader />
                }
                {
                    this.state.showVideoModal &&
                    <VideoModal
                        uri={this.state.product_video_url}
                        poster={this.state.product_video_poster}
                        onCloseModal={() => this.setState({ showVideoModal: false })}
                    />
                }
                {
                    this.state.showProductImageZoomModal &&
                    <ProductImageViewModal
                        images={this.state.preview_product_image_list}
                        imageIndex={this.state.currentImageIndex}
                        onClose={() => this.setState({ showProductImageZoomModal: false })}
                    />
                }
                {
                    this.state.showAddToCartModal &&
                    <AddToCartModal
                        is_ws_not={this.state.is_ws_not}
                        brand_name={this.state.brand_name}
                        data={this.state.addToCartModalData}
                        onCloseModal={() => this.setState({ showAddToCartModal: false })}
                        onPressCartbtn={() => {
                            setScreenActivity({ action_type: "", action_id: '', city_id: this.state.city_id ?? "" })
                            this.props.navigation.navigate("Cart")
                        }}
                        onPressMoreProduct={this._moreProductByBrand}
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
        cart_items: state.cartReducer.cart_items,
        total_price_details: state.cartReducer.total_price_details,
        is_ws_not: state.loginReducer.data.is_ws_not
    }
}

const mapDispatchToProps = dispatch => ({
    setProductFilterAction: (param) => dispatch(setProductFilterAction(param)),
    clearProductFilterAction: () => dispatch(clearProductFilterAction()),
    clearProductListData: () => dispatch(clearProductListData()),
    setWishListCount: (data) => dispatch(setWishListCount(data))
})

const connectComponent = connect(mapStateToProps, mapDispatchToProps)
export default connectComponent(ProductDetailsScreen)


//24. By pressing more product from product details product list page need to reload