import React, { Component } from 'react';
import { View, Text, FlatList, Image, ScrollView, TouchableOpacity, Animated, Easing, BackHandler } from 'react-native';
import AppHeader from '../../component/AppHeader';
import { styles } from './style';
import { connect } from 'react-redux';
import { clearAllBrandData, setFilteredBrandAction } from '../../redux/actions/allBrandAction';
import AllBrandService from '../../services/AllBrandService';
import { errorAlert, retryAlert } from '../../helper/ToastHelper';
import FullScreenLoader from '../../component/FullScreenLoader';
import { clearProductFilterAction, setProductFilterAction } from '../../redux/actions/commonAction';
import { cities, images, setHeight, setWidth } from '../../utils/variable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import colors from '../../utils/colors';
import { clearProductListData } from '../../redux/actions/productListAction';
import { storeCitiesAction } from '../../redux/actions/homeAction';
import { store } from '../../redux/store'
import { setScreenActivity } from '../../helper/AppActivityTrackingHelper';
import CityDropdown from '../../component/CityDropdown';

class AllBrandsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            brands: [],
            filtered_brand: [],
            coming_soon_brand: [],
            showFilter: false,
            totalFilterApplied: 0,
            showLoader: false,
            animation: new Animated.Value(0),
            cities: [],
            city_id: '',
            selected_city_id: '',
            city_name: '',
            from_screen: '',
            contentOffset: { x: 0, y: 0 },
            contentSize: 0,
            scrollViewWidth: 0,
            flatListScrollOffset: 0,
        };

        this.flatListRef = React.createRef()
        this.param = this.props.route.params
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    static getDerivedStateFromProps(props, state) {        
        return {
            brands: (props.allBrandReducer.brands) ? props.allBrandReducer.brands : [],
            filtered_brand: (props.allBrandReducer.filtered_brand) ? props.allBrandReducer.filtered_brand : [],
            coming_soon_brand: (props.allBrandReducer.coming_soon_brand) ? props.allBrandReducer.coming_soon_brand : [],
            cities: (props.cities) ? props.cities : [],
            city_id: props.route.params?.hasOwnProperty("city_id") ? props.route.params?.city_id : '',
            from_screen: props.route.params?.hasOwnProperty("from_screen") ? props.route.params?.from_screen : '',
        }
    }

    renderComingSoonItems = ({ item, index }) => {
        return (
            <View style={[styles.comingSoonItem]}>
                <Image source={{ uri: item.image }} resizeMode="contain" style={[styles.comingSoonImage]} />
            </View>
        )
    }


    renderBrandItems = ({ item, index }) => {
        return (
            <TouchableOpacity style={[styles.row, styles.itemContainer]} onPress={() => this._navigateToProductList(item)} >
                <View style={[styles.alignItemsCenter, styles.itemLeft]}>
                    <Image source={{ uri: item.image }} resizeMode="contain" style={styles.itemImage} />
                </View>
                <View style={[styles.itemRight]}>
                    <Text style={[styles.itemTitle, { fontWeight: 'bold' }]} adjustsFontSizeToFit numberOfLines={1}>{item.title}</Text>
                    <Text style={[styles.itemTitle]} adjustsFontSizeToFit numberOfLines={1}>{item.category}</Text>
                    <Text style={[styles.itemTitle]} adjustsFontSizeToFit numberOfLines={1}>{item.location}</Text>
                    <Text style={[styles.itemTitle]} adjustsFontSizeToFit numberOfLines={1}>Minimum Order Value: {item.min_order}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    async _navigateToProductList(brand = '') {

        await this.props.clearProductListData()
        await this.props.clearProductFilterAction()

        let filter = this.props.filter
        let selected_city = this.state.cities.filter((item, index) => item.isActive == true)

        this.props.navigation.setParams({
            city_id: selected_city[0].city_id,
            city_name: selected_city[0].city_name
        })
        
        filter = {
            ...filter,
            city: (selected_city.length > 0) ? selected_city[0].city_id : '',
            brand: brand ? brand.id.toString() : '',
        }

        setScreenActivity({ action_type: "brandwise_list", action_id: brand.id, city_id: (selected_city.length > 0) ? selected_city[0].city_id : '' })
        await this.props.setProductFilterAction(filter)
        this.props.navigation.navigate("ProductListing")
    }

    async _getAllBrand() {

        const cities = this.state.cities

        let selected_city = cities.filter((item, index) => item.isActive == true)

        const param = {
            city: (selected_city.length > 0) ? selected_city[0].city_id : '',
            category_id: (this.props.route.params?.category_id) ? this.props.route.params?.category_id : '',
            season: (this.props.route.params?.season) ? this.props.route.params?.season : '',
            returnedCategories: (this.props.route.params?.returnedCategories) ? this.props.route.params?.returnedCategories : ''
        }

        // console.log('_getAllBrand  => ', param);

        this.setState({ showLoader: true, city_name: (selected_city.length > 0) ? selected_city[0].city_name : "All" })

        await AllBrandService._getAllBrand(param).then(response => {

            if (response == false) {
                this.setState({
                    brands: [],
                    coming_soon_brand: []
                })
            }
            this.setState({ showLoader: false })
            this._bounce()
        }, error => {
            this.setState({ showLoader: false })
            this._bounce()
            if (error.message == "server_error") {
                retryAlert(() => this._getAllBrand())
            } else {
                errorAlert("Error", error.message)
            }
        })
    }

    intervalFunc() {
        let i = 0;
        const interval = setInterval(() => {
            i += 1;
            this._bounce();
            if (i === 2) {
                clearInterval(interval);
                //console.log(i); // this will appear after 5 seconds...
            }
        }, 2000);
    }

    _bounce() {
        Animated.spring(this.state.animation, {
            toValue: -10,
            duration: 2000,
            friction: 1,
            tension: 20,
            useNativeDriver: false,
        }).start()
    }


    handleScroll(event) {
        this.setState({
            flatListScrollOffset: event.nativeEvent.contentOffset.y
        })
    }

    async scrollToTop() {
        const offset = this.state.flatListScrollOffset - 400

        await this.flatListRef.current.scrollToOffset({ animated: true, offset: offset })
        this.setState({
            flatListScrollOffset: (offset < 0) ? 0 : offset
        })
    }

    async scrollToDown() {
        const offset = this.state.flatListScrollOffset + 400

        await this.flatListRef.current.scrollToOffset({ animated: true, offset: offset })
        this.setState({
            flatListScrollOffset: offset
        })

    }

    async componentDidMount() {

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);

        const cities = this.state.cities

        if (this.state.from_screen == "home") {
            if (this.state.city_id !== '') {
                cities.forEach((item, index) => {
                    if (item.city_id == this.state.city_id) {
                        item.isActive = true
                    } else {
                        item.isActive = false
                    }
                })
            } else {
                cities.forEach((item, index) => item.isActive = false)
            }
        }

        const filter_not_active = cities.filter(item => item.isActive === false)
        const filter_active = cities.filter(item => item.isActive === true)

        const array = filter_active.concat(filter_not_active)
        
        // else if (this.state.from_screen == "storeByCity") {
        //     cities.map((item, index) => {
        //         if (item.city_id == this.state.city_id) {
        //             item.isActive = true
        //         } else {
        //             item.isActive = false
        //         }
        //     })
        // }

        await store.dispatch(storeCitiesAction(array))

        this._getAllBrand()
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);

    }

    async _searchBrand(searchText) {

        let filteredData = this.state.brands.filter(function (item) {
            if (item.title.toLowerCase().includes(searchText.toLowerCase())) {
                return item.title.toLowerCase().includes(searchText.toLowerCase())
            } else if (item.category.toLowerCase().includes(searchText.toLowerCase())) {
                return item.category.toLowerCase().includes(searchText.toLowerCase())
            } else if (item.location.toLowerCase().includes(searchText.toLowerCase())) {
                return item.location.toLowerCase().includes(searchText.toLowerCase())
            }
        });


        await store.dispatch(setFilteredBrandAction(filteredData))
    }

    async _resetData() {
        await store.dispatch(setFilteredBrandAction(this.state.brands))
    }

    onPressCity = async (index) => {
        const cities = this.state.cities
        cities.forEach((item, index) => {
            item.isActive = false
        })
        cities[index].isActive = !cities[index].isActive

        const filter_not_active = cities.filter(item => item.isActive === false)
        const filter_active = cities.filter(item => item.isActive === true)

        const array = filter_active.concat(filter_not_active)

        await store.dispatch(storeCitiesAction(array))
        this._getAllBrand()
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
        return true;
    }

    render() {

        const trans = {
            transform: [
                { translateY: this.state.animation }
            ]
        }
        const scrollPerc = (this.state.contentOffset.x / (this.state.contentSize - this.state.scrollViewWidth))
            * (100);
        return (
            <View style={styles.container}>
                {/* <CustomHeader
                    showingOneIcon={true}
                    showSearchIcon={true}
                    heading="ALL BRANDS" //"SEARCH BRAND BY NAME"
                    placeHolderText="Search Brand By Name"
                    headingStyle={{ textAlign: 'center' }}
                    navigation={this.props.navigation}
                    onPressBack={() => {
                        this.handleBackButtonClick()
                    }}
                    showBackButton
                    // shouldRedirectToSelfScreen
                    shouldFilterOnSamePage
                    // shouldShowSuggesstionDropdown={false}
                    onSearch={(searchText) => this._searchBrand(searchText)}
                    onCancel={() => this._resetData()}
                /> */}
                <AppHeader
                    showBackBtn
                    showSearch
                    showWishList
                    showLogo
                    navigation={this.props.navigation}
                />
                <View style={styles.content}>
                    <CityDropdown
                        cities={this.state.cities}
                        onPressCity={(index) => this.onPressCity(index)}
                    />
                    {/* <View style={styles.cityNameView}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cityItemView}  >
                            {
                                this.state.cities.map((item, index) => {
                                    return (
                                        <TouchableOpacity style={[styles.cityBtn, (item.isActive) && styles.activeCityBtn]} key={index} onPress={() => this.onPressCity(item, index)}>
                                            <Text style={[styles.cityBtnText, (item.isActive) && styles.activeCityBtnText]}>{item.city_name}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </ScrollView>
                    </View> */}
                    <View style={{ flex: 1 }}>
                        <Text style={[styles.textdark, { marginVertical: setHeight(2), paddingLeft: setWidth(3) }]}>All Brands in {this.state.city_name} </Text>
                        <FlatList
                            ref={this.flatListRef}
                            data={this.state.filtered_brand}
                            keyExtractor={(item, index) => index}
                            renderItem={this.renderBrandItems}
                            nestedScrollEnabled
                            style={{
                                flex: 1,
                                marginHorizontal: setWidth(4),
                                // paddingTop: setWidth(2)
                            }}
                            contentContainerStyle={{
                                paddingBottom: setHeight(4)
                            }}
                            showsVerticalScrollIndicator={false}
                            ItemSeparatorComponent={() => <View style={{ marginTop: setHeight(2) }} />}
                            onScroll={(event) => this.handleScroll(event)}
                            scrollEventThrottle={16}
                        />

                        <Animated.View style={[styles.upArrow, trans]}>
                            <TouchableOpacity onPress={() => this.scrollToTop()} style={{ flex: 1, padding: setWidth(1.5) }}>
                                <MaterialIcons name={'arrow-upward'} size={setWidth(4)} color={colors.black} />
                            </TouchableOpacity>
                        </Animated.View>

                        <Animated.View style={[styles.downArrow, trans]}>
                            <TouchableOpacity onPress={() => this.scrollToDown()} style={{ flex: 1, padding: setWidth(1.5) }}>
                                <MaterialIcons name={'arrow-downward'} size={setWidth(4)} color={colors.black} />
                            </TouchableOpacity>
                        </Animated.View>


                        {/*
                            this.state.coming_soon_brand.length > 0 &&
                            <View style={styles.comingSoonView}>
                                <Text style={[styles.comingSoonHeading]}>COMING SOON</Text>
                                <View style={{ flex: 1 }}>
                                    <FlatList
                                        data={this.state.coming_soon_brand}
                                        keyExtractor={(item, index) => index}
                                        horizontal
                                        renderItem={this.renderComingSoonItems}
                                        nestedScrollEnabled
                                        showsHorizontalScrollIndicator={false}
                                        ItemSeparatorComponent={() => <View style={{ marginRight: setWidth(6) }} />}
                                        style={{
                                            paddingHorizontal: setWidth(4),
                                        }}
                                        contentContainerStyle={{
                                            alignItems: 'center'
                                        }}
                                        onScroll={e => {
                                            this.setState({
                                                contentOffset: e.nativeEvent.contentOffset
                                            })
                                        }}
                                        onContentSizeChange={(width, height) => {
                                            this.setState({
                                                contentSize: width
                                            })
                                        }}
                                        onLayout={e => {
                                            this.setState({
                                                scrollViewWidth: e.nativeEvent.layout.width
                                            })
                                        }}
                                    />
                                </View>
                                <View
                                    style={{
                                        backgroundColor: colors.grey5,
                                        marginHorizontal: setWidth(40),
                                    }}
                                >
                                    <View
                                        style={{
                                            //position: "absolute",
                                            width: (scrollPerc < 0 || isNaN(scrollPerc)) ? 0 : `${scrollPerc}%`,
                                            backgroundColor: colors.yellow,
                                            height: 5
                                        }}
                                    />
                                </View>
                            </View>
                                    */}
                    </View>
                </View>
                {
                    this.state.showLoader &&
                    <FullScreenLoader

                    />
                }
            </View>
        );
    }
}


const mapStateToProps = state => {

    return {
        allBrandReducer: state.allBrandReducer,
        filter: state.commonReducer.filter,
        cities: state.homeReducer.cities,
    }
}

const mapDispatchToProps = dispatch => ({
    clearAllBrandData: () => dispatch(clearAllBrandData()),
    setProductFilterAction: (param) => dispatch(setProductFilterAction(param)),
    clearProductFilterAction: () => dispatch(clearProductFilterAction()),
    clearProductListData: () => dispatch(clearProductListData())
})

const connectComponent = connect(mapStateToProps, mapDispatchToProps)
export default connectComponent(AllBrandsScreen)
