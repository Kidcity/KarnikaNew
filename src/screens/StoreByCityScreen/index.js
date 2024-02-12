import React, { Component } from 'react';
import { View, Text, FlatList, Image, ScrollView, TouchableOpacity, ActivityIndicator, Linking, BackHandler } from 'react-native';
import CustomHeader from '../../component/CustomHeader';
import { styles } from './style';
import colors from '../../utils/colors';
import { fonts, images, secondBanner, setHeight, setWidth } from '../../utils/variable';
import ShopByAge from '../../component/ShopByAge';
import AvailableBrands from '../../component/AvailableBrands';
import { connect } from 'react-redux'
import { errorAlert, retryAlert } from '../../helper/ToastHelper';
import FullScreenLoader from '../../component/FullScreenLoader';
import { clearProductFilterAction, setProductFilterAction } from '../../redux/actions/commonAction';
import { clearProductListData } from '../../redux/actions/productListAction';
import FullScreenBanner from '../../component/FullScreenBanner';
import StoreByCityService from '../../services/StoreByCityService';
import MainSection from '../../component/ChooseStoreDynamicSection/MainSection'
import { setScreenActivity } from '../../helper/AppActivityTrackingHelper';

class StoreByCityScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            banners: {},
            topbanner: secondBanner,
            gender: [],
            available_brands: [],
            showLoader: false,
            selectedMainCategoryId: '',
            selectedMainCategoryTitle: '',
            second_banner: secondBanner,
            city_id: '',
            city_name: '',
            minimum_order_price: 0,
        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        return {
            banners: props.banners ? props.banners : {},
            gender: props.gender ? props.gender : [],
            available_brands: props.available_brands ? props.available_brands : [],
            city_id: (props.route.params.hasOwnProperty("city_id")) ? props.route.params.city_id : '',
            city_name: (props.route.params.hasOwnProperty("city_name")) ? props.route.params.city_name : '',
            minimum_order_price: props.minimum_order_price ? props.minimum_order_price : 0
        }
    }

    async _navigateToProductListing(searchText = '', gender = '', season = '', categories_id = '', age = '', brand = null) {

        this.props.clearProductListData()
        this.props.clearProductFilterAction()

        let param = this.props.filter
        param = {
            ...param,
            subCategory: categories_id.toString(),
            season: season.toString(),
            category: gender.toString(),
            ageGroup: age,
            city: this.state.city_id,
            brand: brand ? brand.id.toString() : "",
            searchValue: searchText
        }

        if (gender && season && categories_id) {
            setScreenActivity({ action_type: "categorieswise_select", action_id: categories_id, city_id: this.state.city_id ?? "" })
        } else if (brand) {
            setScreenActivity({ action_type: "brandwise_list", action_id: brand.id, city_id: this.state.city_id ?? "" })
        } else if (searchText != '') {
            // setScreenActivity({action_type: "product_details", action_id: item.id, city_id:  this.state.city_id ?? ""})
        } else if (age != '') {
            setScreenActivity({ action_type: "agewise_list", action_id: "", city_id: this.state.city_id ?? "" })
        }

        await this.props.setProductFilterAction(param)
        this.props.navigation.navigate("ProductListing")
    }

    async _getGenderByCity() {
        const param = {
            category_id: '',
            season: '',
            city: this.state.city_id ? this.state.city_id : ''
        }
        this.setState({ showLoader: true })
        await StoreByCityService._getGenderService(param).then(response => {
            this.setState({ showLoader: false })
        }, error => {
            this.setState({ showLoader: false })
            if (error.message == "server_error") {
                retryAlert(() => this._getGenderByCity())
            } else {
                errorAlert("Error in getting categories", error.message)
            }
        })
    }

    async _getAvailableBrand() {
        const param = {
            city: this.state.city_id ? this.state.city_id : ''
        }
        //console.log(param);
        await StoreByCityService._availableBrandService(param).then(response => {
        }, error => {
            if (error.message == "server_error") {
                retryAlert(() => this._getAvailableBrand())
            } else {
                errorAlert("Error in getting brands", error.message)
            }
        })
    }

    _getBanners() {
        this.setState({ showLoader: true })
        const param = {
            city: this.state.city_id ? this.state.city_id : ''
        }
        // console.log(param);
        StoreByCityService._getBannerService(param).then(response => {
            this.setState({ showLoader: false })
        }, error => {
            this.setState({ showLoader: false })
            if (error.message == "server_error") {
                retryAlert(() => this._getBanners())
            } else {
                errorAlert("Error in get banners", error.message)
            }
        })
    }


    componentDidMount() {
        this.willFocusSubscription = this.props.navigation.addListener(
            'focus',
            () => {
                const { fromHomeScreen } = this.props.route.params
                if (fromHomeScreen) {
                    this._getBanners()
                    this._getGenderByCity()
                    this._getAvailableBrand()
                }
            })
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        this.willFocusSubscription()
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    onPressBannerItem = (index, status, item) => {
        setScreenActivity({ action_type: "banner_select", action_id: item.id, city_id: this.state.city_id ?? "" })
        if (item.link) {
            Linking.openURL(item.link)
        }
    }

    handleBackButtonClick() {
        setScreenActivity({ action_type: "going_back", action_id: '' })
        if (!this.props.navigation.canGoBack()) {
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
              })
        } else {
            this.props.navigation.goBack();
        }
        return true
    }


    render() {
        const city_name = this.state.city_name
        const city_id = this.state.city_id
        return (
            <View style={styles.container}>
                <CustomHeader
                    city_id={this.state.city_id}
                    showSearchIcon={true}
                    showNotificationIcon={true}
                    onSearch={(searchText) => {
                        this._navigateToProductListing(searchText, '', '', '', '', '')
                    }}
                    onPressBellIcon={() => this.props.navigation.navigate("Notification")}
                    navigation={this.props.navigation}
                    heading={this.state.city_name.toUpperCase()}
                    headingStyle={{
                        textAlign: 'center'
                    }}
                    onPressBack={() => this.handleBackButtonClick()}
                />

                <ScrollView contentContainerStyle={styles.content}>
                    <View style={styles.bannerContainer}>
                        <FullScreenBanner
                            autoScroll
                            showDots={true}
                            data={(this.state.banners && this.state.banners.HEADER) ? this.state.banners.HEADER.banner_details : []}
                            // staticImage={true}
                            bannerCardStyle={{
                                width: setWidth(100),
                                height: setHeight(40),
                                margin: 0,
                                borderRadius: 0,
                            }}
                            bannerImageStyle={{
                                width: '100%',
                                height: '100%',
                                borderRadius: 0,
                                resizeMode: 'cover'
                            }}
                            onPressBannerItem={(index, status, item) => this.onPressBannerItem(index, status, item)}
                        />
                    </View>
                    <View style={styles.chooseStoreContainer}>
                        <MainSection
                            gender={this.state.gender}
                            city_name={city_name}
                            city_id={city_id}
                            min_ordervalue={this.state.minimum_order_price}
                            onSelectCategories={(gender, season, categories) => {
                                this.setState({
                                }, () => this._navigateToProductListing('', gender, season, categories, '', ''))

                            }}
                        />
                    </View>

                    <AvailableBrands
                        title="B R A N D S  A V A I L A B L E"
                        containerStyle={{
                            marginTop: setWidth(10)
                        }}
                        brands={this.state.available_brands}
                        onPressBrand={(brand) => this._navigateToProductListing('', '', '', '', '', brand)}
                        onPressAllBrand={() => {
                            this.props.navigation.navigate("AllBrands", { city_name: this.state.city_name, city_id: this.state.city_id, from_screen: "storeByCity" })
                        }}
                    />

                    <ShopByAge
                        onPress={(age) => this._navigateToProductListing('', '', '', '', age, '')}
                        containerStyle={{
                            marginTop: setHeight(4),
                        }}
                    />

                    {
                        this.state.banners.SECTION_1 &&
                        <View style={[styles.bannerContainer, { height: setHeight(30) }]}>
                            <FullScreenBanner
                                showDots={true}
                                autoScroll
                                data={(this.state.banners.SECTION_1) ? this.state.banners.SECTION_1.banner_details : []}
                                bannerCardStyle={{
                                    height: setHeight(25),
                                }}
                                bannerImageStyle={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: 0,
                                    resizeMode: 'cover'
                                }}
                                dotContainerStyle={{
                                    marginTop: setWidth(2)
                                }}
                                onPressBannerItem={(index, status, item) => this.onPressBannerItem(index, status, item)}
                            />
                        </View>
                    }

                    {
                        this.state.banners.SECTION_2 &&
                        <View style={[styles.bannerContainer, { height: setHeight(30), marginTop: setHeight(2) }]}>
                            <FullScreenBanner
                                showDots={true}
                                autoScroll
                                data={(this.state.banners.SECTION_2) ? this.state.banners.SECTION_2.banner_details : []}
                                bannerCardStyle={{
                                    height: setHeight(25),
                                }}
                                bannerImageStyle={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: 0,
                                    resizeMode: 'cover'
                                }}
                                dotContainerStyle={{
                                    marginTop: setWidth(2)
                                }}
                                onPressBannerItem={(index, status, item) => this.onPressBannerItem(index, status, item)}
                            />
                        </View>
                    }


                    {
                        Platform.OS === 'ios' ?
                            <Text numberOfLines={1} adjustsFontSizeToFit style={{ color: colors.grey3, marginHorizontal: setWidth(2) }}>- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</Text>
                            :
                            <View style={styles.dashedBorder} />
                    }

                    <View style={styles.footer}>
                        <Text style={[styles.footerText]}>SHOP MORE</Text>
                        <Text style={[styles.footerText]}>SAVE MORE</Text>
                        <Text style={[styles.heading, { textAlign: 'left', color: colors.grey2, fontSize: setWidth(3.5), fontFamily: fonts.fontRegular }]}>Connecting Brands With Retailers</Text>
                    </View>

                </ScrollView>
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
        banners: state.storeByCityReducer.banners,
        gender: state.storeByCityReducer.gender,
        filter: state.commonReducer.filter,
        available_brands: state.storeByCityReducer.available_brands,
        minimum_order_price: state.storeByCityReducer.minimum_order_price
    }
}

const mapDispatchToProps = dispatch => ({
    //clearLoginData: () => dispatch(clearLoginData())
    setProductFilterAction: (param) => dispatch(setProductFilterAction(param)),
    clearProductFilterAction: (param) => dispatch(clearProductFilterAction()),
    clearProductListData: () => dispatch(clearProductListData())
})

const connectComponent = connect(mapStateToProps, mapDispatchToProps)
export default connectComponent(StoreByCityScreen)
