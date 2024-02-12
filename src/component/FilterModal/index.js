import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import colors from '../../utils/colors';
import { styles } from './style';
import { DEVICE_HEIGHT, images, normalize, setHeight, setWidth } from '../../utils/variable';
import { connect } from 'react-redux';
import { clearProductFilterAction, setMyFeedAction, setProductFilterAction } from '../../redux/actions/commonAction';
import FilterService from '../../services/FilterService';
import { errorAlert } from '../../helper/ToastHelper';
import FlatListContainer from '../FlatListContainer'
import { initialWindowMetrics } from 'react-native-safe-area-context';
import { commonStyle } from '../../helper/commonStyle'
import CustomImage from '../FastImage';

/**
 * category: '',
        color: '',
        city: '',
        sortPrice: 0,
        popularity: 0,
        whatsNew: 0,
        searchValue: '',
        page: 1
 */

class FilterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: [
        {
          id: 1,
          title: "Categories",
          tag: "subCategory",
          options: [],
          isActive: true
        },
        {
          id: 2,
          title: "Season",
          tag: "season",
          options: [],
          isActive: false
        },
        {
          id: 3,
          title: "Age/Size",
          tag: "ageGroup",
          options: [],
          isActive: false
        },
        {
          id: 4,
          title: "Brands",
          tag: "brand",
          options: [],
          isActive: false
        },
        {
          id: 5,
          title: "Price Range",
          tag: "priceRange",
          options: [],
          isActive: false
        }
      ],
      genders: [],
      selectedGender: '',
      selectedSeason: '',
      selectedAge: '',
      selectedBrands: '',
      selectedPrice: '',
      selectedCategories: '',
      onClose: undefined,
      isMyFeed: false
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {
      genders: props.hasOwnProperty("genders") ? props.genders : null,
      onClose: props.hasOwnProperty("onClose") ? props.onClose : undefined,
      isMyFeed: props.hasOwnProperty("isMyFeed") ? props.isMyFeed : false
    }
  }

  componentDidMount() {
    // this.moveToDown()
    this._populateFilter()
    this._getFilterData()
  }

  _populateFilter() {
    const param_filter = this.props.filter
    const filter = this.state.filters

    // GENDER
    if (param_filter?.category) {
      this.setState({
        selectedGender: param_filter?.category + ''
      }, () => this._getFilterData())
    }else{
      this.setState({
        selectedGender: this.state.genders[0].id
      }, () => this._getFilterData())
    }

    // CATEGORIES
    if (param_filter?.subCategory) {
      this.setState({
        selectedCategories: param_filter?.subCategory + ''
      })
      filter[0].options.map(item => {
        const arr = param_filter?.subCategory.split(",")
        if (arr.includes(item.id + '')) {
          item.isActive = true
        }
      })
    }
    

    // SEASON
    if (param_filter?.season) {
      this.setState({
        selectedSeason: param_filter?.season + ''
      })
      filter[1].options.map(item => {
        if (param_filter?.season.includes(item.id + '')) {
          item.isActive = true
        }
      })
    }

    
    // AGE
    if (param_filter?.ageGroup) {
      this.setState({
        selectedAge: param_filter?.ageGroup + ''
      })
      filter[2].options.map(item => {
        if (param_filter?.ageGroup.includes(item.id + '')) {
          item.isActive = true
        }
      })
    }

    // BRANDS
    if (param_filter?.brand) {
      this.setState({
        selectedBrands: param_filter?.brand + ''
      })
      filter[3].options.map(item => {
        if (param_filter?.brand.includes(item.id + '')) {
          item.isActive = true
        }
      })
    }

    // PRICE RANGE
    if (param_filter?.priceRange) {
      this.setState({
        selectedPrice: param_filter?.priceRange + ''
      })
      filter[4].options.map(item => {
        if (param_filter?.priceRange.includes(item.id + '')) {
          item.isActive = true
        }
      })
    }

    // console.log("changes => ",JSON.stringify(filter));
    this.setState({
      filter
    })
  }

  _getFilterData() {
    if(this.state.selectedGender == ''){
      return
    }

    const filters = this.state.filters
    const categories_filter = filters.filter((item) => item.id === 1)[0]
    const season_filter = filters.filter((item) => item.id === 2)[0]
    const age_filter = filters.filter((item) => item.id === 3)[0]
    const brand_filter = filters.filter((item) => item.id === 4)[0]
    const price_filter = filters.filter((item) => item.id === 5)[0]

    const param = {
      category_id: this.state.selectedGender + "",
      season: this.state.selectedSeason,
      city: ""
    }

    // console.log('_getFilterData  => ', param);

    this.setState({ showLoader: true })

    FilterService._getFilterDataService(param, this.props.filter, this.state.selectedSeason).then(response => {
      
      categories_filter.options = response?.categories
      filters[0] = categories_filter

      season_filter.options = response?.season
      filters[1] = season_filter

      age_filter.options = response?.age
      filters[2] = age_filter

      brand_filter.options = response?.brands
      filters[3] = brand_filter

      price_filter.options = response?.price
      filters[4] = price_filter

      // console.log(JSON.stringify(filters));

      this.setState({
        filters: filters,
      })
    }, error => {
      this.setState({
        showLoader: false
      })
      errorAlert("Error", " Error Loading Categories." + error.message)
    })
  }

  async clearAllFilter() {
    let filters = this.state.filters
    filters.map((item, index) => {
      item.options.map((itm, idx) => {
        filters[index].options[idx].isActive = false
      })
    })
    this.props.clearProductFilterAction()
    this.setState({
      filters: filters,
      selectedGender: this.state.genders[0].id,
      selectedCategories: "",
      selectedSeason:"",
      selectedAge: "",
      selectedBrands: '',
      selectedPrice: ""
    } , () =>this._getFilterData() )
  }

  _onPressGender(index) {
    const genders = this.state.genders
    this.setState({
      selectedGender: genders[index].id + ''
    }, () => this._getFilterData())
  }

  _onPressRightOption(parentIndex, childIndex) {

    const filters = this.state.filters
    filters[parentIndex].options[childIndex].isActive = !filters[parentIndex].options[childIndex].isActive

    this.setState({
      filters: filters
    })

    if (filters[parentIndex].title === "Season") {
      const filter = filters[parentIndex].options.filter(item => item.isActive === true).map(({ id }) => id)
      this.setState({
        selectedSeason: filter.toString()
      }, () => this._getFilterData())
    }

    if (filters[parentIndex].title === "Age/Size") {
      const filter = filters[parentIndex].options.filter(item => item.isActive === true).map(({ id }) => id)
      this.setState({
        selectedAge: filter.toString()
      })
    }
    if (filters[parentIndex].title === "Brands") {
      const filter = filters[parentIndex].options.filter(item => item.isActive === true).map(({ id }) => id)
      this.setState({
        selectedBrands: filter.toString()
      })
    }
    if (filters[parentIndex].title === "Price Range") {
      const filter = filters[parentIndex].options.filter(item => item.isActive === true).map(({ id }) => id)
      this.setState({
        selectedPrice: filter.toString()
      })
    }
    if (filters[parentIndex].title === "Categories") {
      const filter = filters[parentIndex].options.filter(item => item.isActive === true).map(({ id }) => id)
      this.setState({
        selectedCategories: filter.toString()
      })
    }

  }

 async _populateTotalFilters() {

    let count = 0
    if (this.state.selectedGender !== "") {
      count += 1
    }
    if (this.state.selectedCategories !== "") {
      count += 1
    }
    if (this.state.selectedSeason !== "") {
      count += 1
    }
    if (this.state.selectedBrands !== "") {
      count += 1
    }
    if (this.state.selectedAge !== "") {
      count += 1
    }
    if (this.state.selectedPrice !== "") {
      count += 1
    }

    const param = {
      category: this.state.selectedGender,
      subCategory: this.state.selectedCategories,
      season: this.state.selectedSeason,
      brand: this.state.selectedBrands,
      color: '',
      ageGroup: this.state.selectedAge,
      priceRange: this.state.selectedPrice,
    }

    let filter = this.props.storefilter
    filter = {
      ...filter,
      ...param
    }

    await this.props.clearProductFilterAction()

    this.props.setProductFilterAction(filter)

    // if(this.state.isMyFeed){
    //   this.props.setMyFeedAction(filter)
    // }else{
    // }
    
    this.props.onDone(count)
  }

  _onPressLeftOption(index) {
    const filters = this.state.filters
    filters[index].isActive = (filters[index].isActive) ? true : !filters[index].isActive
    filters.map((item, idx) => {
      if (idx !== index)
        filters[idx].isActive = false
    })

    this.setState({
      filters: filters
    })
  }

  renderLeftFilter = ({ item, index }) => {
    return (
      <TouchableOpacity style={[styles.leftFilters, item.isActive && { ...styles.borderLeft, ...styles.active }]} onPress={() => this._onPressLeftOption(index)}>
        <Text style={[styles.leftFiltersTitle, item.isActive && commonStyle.fontBold]}>{item.title}</Text>
      </TouchableOpacity>
    )
  }

  renderRightFilter = ({ item, index }) => {
    const Pindex = index
    if (item.isActive && item.options.length > 0) {

      if (item.title === 'Season') {

        return (
          <FlatListContainer
            data={item.options}
            style={{ paddingHorizontal: normalize(10) }}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity style={[item?.isActive && styles.selectedBorder, styles.seasonImageContainer, commonStyle.gapTop10, item.isActive && styles.selectedBorder]} onPress={() => this._onPressRightOption(Pindex, index)}>
                  <CustomImage
                    source={{uri: item.image}}
                    style={styles.image}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              )
            }
            }
          />
        )
      }

      if (item.title === 'Age/Size') {
        return (
          <FlatListContainer
            data={item.options}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: 'space-around',
            }}
            renderItem={({ item, index }) => {
              return (
                <View>
                  <TouchableOpacity style={[item?.isActive && styles.selectedBorder, styles.ageImageContainer]} onPress={() => this._onPressRightOption(Pindex, index)}>
                    <CustomImage
                      source={{uri: item.image}}
                      // source={images.trends2}
                      style={styles.image}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                  <Text style={[commonStyle.text11, commonStyle.textBlack, commonStyle.fontBold, commonStyle.textAlignCenter, commonStyle.textCapitalize]}>
                    {
                      item?.subtitle
                    }
                  </Text>
                </View>
              )
            }
            }
            itemSeparatorComponent={() => <View style={{ marginTop: normalize(15) }} />}
          />
        )
      }

      if (item.title === 'Brands') {

        return (
          <FlatListContainer
            data={item.options}
            numColumns={3}
            style={{ paddingHorizontal: normalize(10), paddingBottom: normalize(20), }}
            columnWrapperStyle={{
              justifyContent: 'space-between',
            }}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity style={[styles.brandsContainer, { width: '30%', overflow: 'hidden' }]} onPress={() => this._onPressRightOption(Pindex, index)}>
                  <View style={[styles.brandImageContainer, commonStyle.shadow, item?.isActive && styles.selectedBorder]}>
                    <CustomImage
                      source={{ uri: item.image }}
                      style={{flex:1, aspectRatio: 1}}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={[commonStyle.padding_V_10]}>
                    <Text style={[commonStyle.text11, commonStyle.textBlack, commonStyle.fontBold, commonStyle.textAlignCenter, commonStyle.textCapitalize]}>
                      {
                        item.subtitle
                      }
                    </Text>
                  </View>
                </TouchableOpacity>
              )
            }
            }
            itemSeparatorComponent={() => <View style={{ marginTop: normalize(25) }} />}
          />
        )
      }

      if (item.title === 'Price Range') {

        return (
          <FlatListContainer
            data={item.options}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity style={[styles.priceRangeContainer, item?.isActive && {backgroundColor: colors.grey5}]} onPress={() => this._onPressRightOption(Pindex, index)}>
                  <Text style={[commonStyle.text11, commonStyle.textBlack,commonStyle.fontRegular, item?.isActive && commonStyle.fontBold, commonStyle.textCapitalize]}>
                    Under {
                      item?.subtitle
                    }
                  </Text>
                </TouchableOpacity>                
              )
            }
            }
          />
        )
      }

      if (item.title === 'Categories') {        
        return (
          <FlatListContainer
            data={item.options}
            numColumns={3}
            style={{ paddingHorizontal: normalize(10), paddingBottom: normalize(20), }}
            columnWrapperStyle={{
              justifyContent: 'space-between',
            }}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity style={[styles.brandsContainer, { width: '31%', overflow: 'hidden' }]} onPress={() => this._onPressRightOption(Pindex, index)}>

                  <View style={[styles.brandImageContainer,  commonStyle.shadow, item?.isActive && styles.selectedBorder]}>
                    <CustomImage
                      source={{ uri: item.image }}
                      // source={images.trends2}
                      style={{flex:1, aspectRatio: 1}}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={[commonStyle.padding_V_10]}>
                    <Text style={[commonStyle.text11, commonStyle.textBlack, commonStyle.fontBold, commonStyle.textAlignCenter, commonStyle.textCapitalize]}>
                      {
                        item.subtitle
                      }
                    </Text>
                  </View>
                </TouchableOpacity>
              )
            }
            }
            itemSeparatorComponent={() => <View style={{ marginTop: normalize(20) }} />}
          />
        )
      }

    } else {
      return null
    }
  }

  render() {

    return (
      <View style={[styles.container, (this.state.isMyFeed)? {height: setHeight(100) - setHeight(10)} : {height: '100%'} ]}>
        <View style={{
          flex: 1,
        }} >

          <View style={[styles.header]} >
            <Text style={[styles.heading, this.state.isMyFeed && commonStyle.textUpperCase ]}>
              {
                this.state.isMyFeed ? 
                "Set Your Today's Feed"
                :
                "Filter"
              }
            </Text>
            <TouchableOpacity style={styles.headerBtn} onPress={() => this.clearAllFilter()}>
              <Text style={styles.headerBtnText}>Clear all filter</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <View style={[styles.genderContentContainerStyle]}>
              {
                this.state.genders.map((item, index) => {
                  return (
                    <TouchableOpacity key={index} style={[styles.gender, (this.state.selectedGender === item.id + '') && styles.borderBottom]} onPress={() => this._onPressGender(index)} >
                      <Text style={[styles.genderTitle, item.isSelected && { ...commonStyle.fontBold, ...commonStyle.textBlack }]}>{item.title}</Text>
                    </TouchableOpacity>
                  )
                })
              }

            </View>
            <View style={[commonStyle.row, { flex: 1, marginTop: normalize(3) }]}>
              <View style={styles.left}>
                <FlatListContainer
                  data={this.state.filters}
                  renderItem={this.renderLeftFilter}
                  contentContainerStyle={{ paddingBottom: 0, }}
                />
              </View>
              <View style={styles.right}>
                <FlatListContainer
                  data={this.state.filters}
                  renderItem={this.renderRightFilter}
                  contentContainerStyle={{ paddingBottom: 0, flexGrow: 1 }}
                />
              </View>
            </View>
          </View>

        </View>
        <View style={styles.footerBtnContainer}>
          <TouchableOpacity style={[styles.footerBtn, { backgroundColor: colors.white }]} onPress={this.state.onClose}>
            <Text style={[commonStyle.text13, commonStyle.textBlack, commonStyle.fontBold, commonStyle.textAlignCenter, commonStyle.textCapitalize]}>CANCEL</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerBtn} onPress={() => this._populateTotalFilters()}>
            <Text style={[commonStyle.text13, commonStyle.textWhite, commonStyle.fontBold, commonStyle.textAlignCenter, commonStyle.textCapitalize]}>
              {
                 this.state.isMyFeed ? 
                 "SET"
                 :
                 "DONE"
              }
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    genders: state.storeByCityReducer.gender,
    filter: state.commonReducer.filter,
  }
}

const mapDispatchToProps = dispatch => ({
  setProductFilterAction: (param) => dispatch(setProductFilterAction(param)),
  clearProductFilterAction: () => dispatch(clearProductFilterAction()),
  setMyFeedAction: (param) => dispatch(setMyFeedAction(param))
})

const connectComponent = connect(mapStateToProps, mapDispatchToProps)
export default connectComponent(FilterModal)
