import { Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'

import { styles } from './style'
import { commonStyle } from '../../helper/commonStyle'
import AppHeader from '../../component/AppHeader'
import MyFeed from '../../component/MyFeed'
import Banner from '../../component/Banner'
import Catelog from '../../component/Catelog'
import VerticleBrands from '../../component/VerticleBrands'
import Benifit from '../../component/Benifit'
import TopTrends from '../../component/TopTrends'
import HorizontalCategorySlider from '../../component/HorizontalCategorySlider'
import HowToUse from '../../component/HowToUse'
import TopBrandToday from '../../component/TopBrandToday'
import CustomImage from '../../component/FastImage'
import FooterTabMenu from '../../component/FooterTabMenu'
import { images, normalize, setHeight, setWidth } from '../../utils/variable'
import { connect } from 'react-redux'
import { clearProductFilterAction, setMyFeedAction, setProductFilterAction } from '../../redux/actions/commonAction';
import { clearProductListData } from '../../redux/actions/productListAction'
import StoreByCityService from '../../services/StoreByCityService';
import HomeService from '../../services/HomeService'
import AvailableBrands from '../../component/AvailableBrands'
import FullScreenLoader from '../../component/FullScreenLoader'
import FilterModal from '../../component/FilterModal'
import FullScreenBanner from '../../component/FullScreenBanner'
import FloatingMenuIcon from '../../component/FloatingMenuIcon'
import { successToast } from '../../helper/ToastHelper'
import CommonService from '../../services/CommonService'
import Share from 'react-native-share';

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedGender: "",
      genders: null,
      H_categories: [],
      V_categories: [],
      promo_banner: [],
      banner: [],
      available_brands: [],
      catelogs: [],
      topbrand: [],
      purchase_history: "",
      benefitlogo: "",
      footer_banner: "",
      total_catelogs: 0,
      toptrend: null,
      showLoader: false,
      openfiltermodal: false,
      filter: null,
      all_filter_cleared: 0,
      isSetFeed: false,
      is_ws_not: 0,
      user_id: ""
    }
    this.scrollRef = React.createRef()
  }

  static getDerivedStateFromProps(props, state) {
    return {
      filter: props.hasOwnProperty("filter") ? props.filter : null,
      genders: props.hasOwnProperty("genders") ? props.genders : null,
      all_filter_cleared: props.hasOwnProperty("all_filter_cleared") ? props.all_filter_cleared : null,
      is_ws_not: props.hasOwnProperty("is_ws_not") ? props.is_ws_not : 0,
      user_id: props.hasOwnProperty("user_id") ? props.user_id : ""
      // H_categories: props.hasOwnProperty("H_categories") ? props.H_categories : null,
      // V_categories: props.hasOwnProperty("V_categories") ? props.V_categories : null,
      // available_brands: props.hasOwnProperty("available_brands") ? props.available_brands : null,
    }
  }

  async componentDidMount() {
    this.willFocusSubscription = this.props.navigation.addListener(
      'focus',
      async () => {
        if (this.props.route.params?.scroll_to_top === true) {
          this.scrollRef.current.scrollTo({ animated: true, y: 0 });
        }
      })

    await this.props.clearProductFilterAction()
    await this.props.clearProductListData()

    this._singleTymCallingApis()
  }

  componentWillUnmount() {
    this.willFocusSubscription()
  }

  _singleTymCallingApis = async () => {

    this.setState({ showLoader: true })
    const response = await Promise.allSettled([
      await this._getGenders(),
      this._getBanners(),
      this._getCategories(),
      this._getTopBrand(),
      this._getCatelogs(),
      this._availableBrand(),
      this._getTopTrends(),
      this._getCities(),
    ])
    if (response.length > 0) {
      this.setState({ showLoader: false })
    }

  }

  _multiTymCallingAPIs = async () => {
    this.setState({ showLoader: true })
    const response = await Promise.allSettled([
      this._getCategories(),
      this._getBanners(),
      this._availableBrand(),
      this._getCatelogs(),
      this._getTopTrends(),
      this._getTopBrand(),
    ])
    if (response.length > 0) {
      this.setState({ showLoader: false })
    }
  }

  _onSelectgender = (id) => {
    this.setState({
      selectedGender: id
    }, () => {
      this._multiTymCallingAPIs()
    })
  }

  _getGenders = async () => {
    const param = {
      category_id: '',
      season: '',
      city: ''
    }

    await StoreByCityService._getGenderService(param).then(response => {
      if (!this.state.selectedGender) {
        this.setState({
          selectedGender: this.state.genders ? this.state.genders[0].id : ''
        })
      }
    }, error => {
    })
  }

  _getCatelogs = async () => {
    if (!this.state.selectedGender) {
      return
    }

    const param = {
      gender: this.state.selectedGender + "",
      season: '1,2',
      city: '',
      retailer_id: this.state.user_id
    }

    await StoreByCityService._catelogService(param).then(response => {
      if (response?.catelogs) {
        this.setState({
          catelogs: response?.catelogs,
          total_catelogs: response?.total
        })
      }
    }, error => {
    })
  }

  _getCategories = async () => {
    if (!this.state.selectedGender) {
      return
    }

    const param = {
      category_id: this.state.selectedGender + "",
      season: '1,2',
      city: ''
    }

    await StoreByCityService._categoriesService(param).then(response => {
      if (response?.categories) {
        this.setState({
          H_categories: response?.categories,
          V_categories: response?.vertical_categories
        })
      }
    }, error => {
    })
  }

  _getBanners() {

    const param = {
      // city: '',
      gender: this.state.selectedGender + "",
      retailer_id: this.state.user_id
    }

    console.log("banner param ==> ", param);

    HomeService._getBannerService(param).then(response => {

      this.setState({
        promo_banner: response?.promo_banner?.banner_details ?? [],
        banner: response?.header_banner?.banner_details ?? [],
        purchase_history: response?.purchase_history,
        benefitlogo: response?.benefitlogo,
        footer_banner: response?.footer_banner
      })
    }, error => {
      if (error.message == "server_error") {
        retryAlert(() => this._getBanners())
      } else {
      }
    })
  }

  _getTopTrends() {

    const param = {
      gender: this.state.selectedGender + "",
      retailer_id: this.state.user_id
    }

    HomeService._getTopTrendsService(param).then(response => {
      this.setState({
        toptrend: response
      })
    }, error => {
      if (error.message == "server_error") {
        retryAlert(() => this._getBanners())
      } else {
      }
    })
  }

  _availableBrand() {
    const param = {
      city: '',
      gender: this.state.selectedGender
    }
    // console.log('_availableBrand ', param);

    HomeService._availableBrandService(param).then(response => {
      this.setState({
        available_brands: response.brands
      })
    }, error => {
      if (error.message == "server_error") {
        retryAlert(() => this._availableBrand())
      } else {
      }
    })
  }

  _getCities() {

    HomeService._getCitiesService().then(response => {

    }, error => {

      if (error.message == "server_error") {
        retryAlert(() => this._getCities())
      } else {
        // errorAlert("Error in get cities", error.message)
      }
    })
  }

  _getTopBrand() {

    const param = {
      gender: this.state.selectedGender + "",
      retailer_id: this.state.user_id
    }

    HomeService._getTopBrandService(param).then(response => {
      this.setState({
        topbrand: response?.topbrand
      })
    }, error => {

      if (error.message == "server_error") {
        retryAlert(() => this._getCities())
      } else {
        // errorAlert("Error in get cities", error.message)
      }
    })
  }

  async _brandWistList(brand = null) {

    await this.props.clearProductListData()
    await this.props.clearProductFilterAction()
    let param = this.props.filter
    param = {
      ...param,
      brand: brand.id.toString(),
      city: brand.city_id.toString()
    }

    await this.props.setProductFilterAction(param)
    this.props.navigation.navigate("ProductListing")
  }

  async _categoryWiseList(category_id) {

    await this.props.clearProductListData()
    await this.props.clearProductFilterAction()
    let param = this.props.filter
    param = {
      ...param,
      category: this.state.selectedGender + "",
      subCategory: category_id.toString(),
    }

    await this.props.setProductFilterAction(param)
    this.props.navigation.navigate("ProductListing")
  }

  async _topTrendsWiseList(category_id, gender_id) {

    await this.props.clearProductListData()
    await this.props.clearProductFilterAction()
    let param = this.props.filter
    param = {
      ...param,
      category: gender_id + "",
      subCategory: category_id + "",
    }

    await this.props.setProductFilterAction(param)
    this.props.navigation.navigate("ProductListing")
  }

  async _categoryAndBrandWiseList(brand_id, category_id) {
    await this.props.clearProductListData()
    await this.props.clearProductFilterAction()
    let param = this.props.filter
    param = {
      ...param,
      subCategory: category_id.toString(),
      brand: brand_id.toString(),
    }
    await this.props.setProductFilterAction(param)
    this.props.navigation.navigate("ProductListing")
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

  onPressShare(data) {
    console.log(data);
    this.setState({ showLoader: true })
    const param = {
      brand_id: data?.brand_id + "",
      categories_id: data?.category_id,
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

  _onPressHorizontalCategories = async (item) => {

    if (item.link !== "") {
      await this.props.clearProductListData()
      await this.props.clearProductFilterAction()
      console.log(item.link);
      Linking.openURL(item.link)
    }
  }

  onBannerItemPress = async (item) => {
    if (item?.link !== "") {
      // console.log(item.link);
      await this.props.clearProductListData()
      await this.props.clearProductFilterAction()
      Linking.openURL(item.link)
    }
  }

  onCloseFilterModal = () => {
    this.setState({ openfiltermodal: false, isSetFeed: false })
  }

  onSetFeed = async (count) => {

    await this.props.clearProductListData()
    // await this.props.clearProductFilterAction()

    const filter = this.state.filter
    console.log(filter);
    // await this.props.setProductFilterAction(filter)
    this.setState({ openfiltermodal: false, isSetFeed: true })
    successToast("Success", "My Feed Set Succefully!!!")
  }

  onPressFeed = async () => {
    if (this.state.all_filter_cleared == 0) {
      this.setState({ openfiltermodal: true })
      return
    }

    const filter = this.state.filter
    console.log(filter);
    await this.props.clearProductListData()
    await this.props.clearProductFilterAction()
    await this.props.setProductFilterAction(filter)

    this.props.navigation.navigate("ProductListing")
  }



  render() {

    return (
      <View style={styles.container}>
        <AppHeader
          showMenu
          showSearch
          showWishList
          showCart
          // showBell
          showLogo
          navigation={this.props.navigation}
        />
        <ScrollView ref={this.scrollRef} contentContainerStyle={styles.content}>
          <View style={[commonStyle.row, styles.feed, commonStyle.shadow]} >
            <MyFeed
              containerStyle={{ flex: 0.25, paddingTop: normalize(25) }}
              onPressFeed={this.onPressFeed}
            />
            <HorizontalCategorySlider
              selectedGender={this.state.selectedGender}
              genders={this.state.genders}
              categories={this.state.H_categories}
              containerStyle={{ flex: 0.75, }}
              onPressGender={(id) => this._onSelectgender(id)}
              onPressCategory={(data) => this._onPressHorizontalCategories(data)}
            />
          </View>

          {
            (this.state.promo_banner && this.state.promo_banner.length > 0) &&
            <Banner
              data={this.state.promo_banner}
              autoScroll
              onPressBannerItem={(data) => this.onBannerItemPress(data)}
            />
          }

          {/*
            (this.state.banner && this.state.banner.length > 0) &&
            <Banner
              data={this.state.banner}
              autoScroll
              containerStyle={{
                height: normalize(300)
              }}
            />
            */}
          {
            (this.state.banner && this.state.banner.length > 0) &&

            <View style={{ height: normalize(310) }}>
              <FullScreenBanner
                autoScroll
                data={(this.state.banner) ? this.state.banner : []}
                bannerCardStyle={{
                  // width: setWidth(100),
                  height: normalize(280),
                }}
                bannerImageStyle={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 0,
                  resizeMode: 'cover'
                }}
                showDots={true}
                onPressBannerItem={(data) => this.onBannerItemPress(data)}
              />
            </View>
          }

          {
            this.state.catelogs[0] &&
            <Catelog
              data={this.state.catelogs[0]}
              onPressCatelogImage={(product_id) => this.props.navigation.navigate("ProductDetails", { product_id: product_id })}
              onPressCatelogBanner={(brand_id, category_id) => this._categoryAndBrandWiseList(brand_id, category_id)}
              onPressShare={() => this.onPressShare(this.state.catelogs[0])}
            />
          }

          {
            (this.state.available_brands && this.state.available_brands.length > 0) &&
            <AvailableBrands
              selectedGender={this.state.selectedGender}
              brands={this.state.available_brands}
              containerStyle={{
                marginTop: normalize(15)
              }}
              onPressBrand={(brand) => {
                if (brand.brand_name == "view_more") {
                  this.props.navigation.navigate("AllBrands", { city_name: brand.city_name, city_id: brand.city_id, from_screen: 'home' })
                } else {
                  this._brandWistList(brand)
                }
              }}
              onPressAllBrand={() => {
                this.props.navigation.navigate("AllBrands", { city_name: '', from_screen: 'home' })
              }}
            />
          }

          {
            this.state.catelogs[1] &&
            <Catelog
              data={this.state.catelogs[1]}
              containerStyle={{
                marginTop: normalize(15)
              }}
              onPressCatelogImage={(product_id) => this.props.navigation.navigate("ProductDetails", { product_id: product_id })}
              onPressShare={() => this.onPressShare(this.state.catelogs[1])}
            />
          }

          {
            (this.state.V_categories && this.state.V_categories.length > 0) &&
            <VerticleBrands
              title="Top Categories For You"
              data={this.state.V_categories}
              containerStyle={{
                marginTop: normalize(15)
              }}
              onPress={(category_id) => this._categoryWiseList(category_id)}
            />
          }

          {
            this.state.catelogs[2] &&
            <Catelog
              data={this.state.catelogs[2]}
              containerStyle={{
                marginTop: normalize(15)
              }}
              onPressCatelogImage={(product_id) => this.props.navigation.navigate("ProductDetails", { product_id: product_id })}
              onPressShare={() => this.onPressShare(this.state.catelogs[2])}
            />
          }

          {
            this.state.benefitlogo !== "" &&
            <Benifit
              image={this.state.benefitlogo}
              containerStyle={{
                marginTop: normalize(15)
              }}
            />
          }

          {
            this.state.catelogs[3] &&
            <Catelog
              data={this.state.catelogs[3]}
              containerStyle={{
                marginTop: normalize(15)
              }}
              onPressCatelogImage={(product_id) => this.props.navigation.navigate("ProductDetails", { product_id: product_id })}
              onPressShare={() => this.onPressShare(this.state.catelogs[3])}
            />
          }

          {
            (this.state.toptrend && this.state.toptrend.length > 0) &&
            <TopTrends
              data={this.state.toptrend}
              containerStyle={{
                marginTop: normalize(15)
              }}
              onPressBanner={(category_id, gender_id) => this._topTrendsWiseList(category_id, gender_id)}
            />
          }

          <HowToUse
            containerStyle={{
              marginTop: normalize(15)
            }}
          />

          {
            this.state.topbrand &&
            <TopBrandToday
              data={this.state.topbrand}
              containerStyle={{
                marginTop: normalize(10)
              }}
              onPressBrand={(brand) => this._brandWistList(brand)}
              onPressProduct={(product_id) => this.props.navigation.navigate("ProductDetails", { product_id: product_id })}

              onPressViewMore={(brand) => this._brandWistList(brand)}
            />
          }

          {
            this.state.purchase_history !== "" &&
            <TouchableOpacity style={styles.purchasehistory} onPress={() => this.props.navigation.navigate("MyOrders")}>
              <CustomImage
                source={{ uri: this.state.purchase_history }}
                style={styles.image}
                resizeMode="contain"
              />
            </TouchableOpacity>
          }

          <View style={styles.thankyouImage}>
            <CustomImage
              source={{ uri: this.state.footer_banner }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>

        </ScrollView>
        {
          this.state.is_ws_not === 1 &&
          <FloatingMenuIcon />
        }

        {
          this.state.openfiltermodal &&
          <FilterModal
            isMyFeed={true}
            isOpen={this.state.openfiltermodal}
            onClose={this.onCloseFilterModal}
            onDone={this.onSetFeed}
          />
        }

        <FooterTabMenu
          focused={true}
          route_name="Home"
          navigation={this.props.navigation}
        />
        {
          this.state.showLoader &&
          <FullScreenLoader
            isOpen={this.state.showLoader}
          />
        }
      </View>
    )
  }
}


const mapStateToProps = state => {
  // console.log(state.commonReducer);
  return {
    genders: state.storeByCityReducer.gender,
    H_categories: state.storeByCityReducer.categories,
    V_categories: state.storeByCityReducer.vertical_categories,
    available_brands: state.homeReducer.available_brand,
    filter: state.commonReducer.filter,
    all_filter_cleared: state.commonReducer.all_filter_cleared,
    is_ws_not: state.loginReducer.data.is_ws_not,
    user_id: state.loginReducer.data.cust_manu_id,
  }
}

const mapDispatchToProps = dispatch => ({
  setProductFilterAction: (param) => dispatch(setProductFilterAction(param)),
  clearProductFilterAction: () => dispatch(clearProductFilterAction()),
  clearProductListData: () => dispatch(clearProductListData()),
  setMyFeedAction: () => dispatch(setMyFeedAction())
  // setAppVersionAction: (param) => dispatch(setAppVersionAction(param)),
  // setOpenAvailCreditModalAction: (data) => dispatch(setOpenAvailCreditModalAction(data)),
})

const connectComponent = connect(mapStateToProps, mapDispatchToProps)
export default connectComponent(Home)
