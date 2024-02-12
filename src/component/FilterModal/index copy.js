import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Keyboard, Platform, NativeModules, Animated, Dimensions, StatusBar, ActivityIndicator } from 'react-native';
import colors from '../../utils/colors';
import { styles } from './style';
import Feather from 'react-native-vector-icons/Feather'
import { setHeight, setWidth } from '../../utils/variable';
import { connect } from 'react-redux';
import { clearProductFilterAction, setProductFilterAction } from '../../redux/actions/commonAction';
import FilterService from '../../services/FilterService';
import { errorAlert } from '../../helper/ToastHelper';
import { TextInput } from 'react-native-gesture-handler';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import { Easing } from 'react-native-reanimated';
import { initialWindowMetrics } from 'react-native-safe-area-context';

const { StatusBarManager } = NativeModules
const { width, height } = Dimensions.get("screen")
const usableHeight = initialWindowMetrics.frame.height

class FilterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusbarheight: 0,
      filters: [
        {
          title: "Shop",
          options: [],
          copy_options: [],
          isActive: true
        },
        {
          title: "Season",
          options: [
            {
              id: '1,0',
              subtitle: "Summer",
              isActive: false
            },
            {
              id: '2,0',
              subtitle: "Winter",
              isActive: false
            },
            {
              id: '1,2,0',
              subtitle: "All",
              isActive: false
            }
          ],
          isActive: false
        },
        {
          title: "Age/Size",
          options: [
            {
              id: "infant",
              subtitle: "0-24 Months (infant)",
              isActive: false
            },
            {
              id: "toddler",
              subtitle: "2-4 Years (toddler)",
              isActive: false
            },
            {
              id: "junior",
              subtitle: "4-10 Years (junior)",
              isActive: false
            },
            {
              id: "senior",
              subtitle: "10-16 Years (senior)",
              isActive: false
            }
          ],
          isActive: false
        },
        {
          title: "Brands",
          options: [],
          copy_options: [],
          isActive: false
        },
        {
          title: "Price Range",
          options: [
            {
              id: '0-99',
              subtitle: "UNDER 99",
              isActive: false
            },
            {
              id: '100-149',
              subtitle: "UNDER 100-149",
              isActive: false
            },
            {
              id: '150-299',
              subtitle: "UNDER 150-299",
              isActive: false
            },
            {
              id: '300-499',
              subtitle: "UNDER 300-499",
              isActive: false
            }
          ],
          isActive: false
        },
        {
          title: "Categories",
          options: [],
          copy_options: [],
          isActive: false
        },
      ],
      searchText: '',
      copyBrands: [],

      containerPosition: new Animated.Value(-usableHeight),
      showLoader: false
    };
  }

  async clearAllFilter() {
    const filters = [...this.state.filters]
    filters.map((item, index) => {
      item.options.map((itm, idx) => {
        filters[index].options[idx].isActive = false
      })
    })
    this.props.clearProductFilterAction()
    this.setState({
      filters: filters
    })
  }

  onPressLeftOption(index) {
    const filters = [...this.state.filters]
    filters[index].isActive = !filters[index].isActive
    filters.map((item, idx) => {
      if (idx !== index)
        filters[idx].isActive = false
    })
    this.setState({
      filters: filters
    })
  }

  onPressRightOption(parentIndex, childIndex) {
    const filters = [...this.state.filters]
    filters[parentIndex].options[childIndex].isActive = !filters[parentIndex].options[childIndex].isActive
    if (parentIndex == 0) {
      // filters[parentIndex].options.map((item,index) => {
      //   if(filters[parentIndex].options[childIndex].subtitle == "All"){

      //   }
      // })
      this._getSubCategory()
    }
    if (parentIndex == 1) {

      this._getSubCategory()
    }

    this.setState({
      filters: filters
    })
  }

  renderLeftMenu = ({ item, index }) => {
    return (
      <TouchableOpacity key={index} style={[styles.leftItemContainer, item.isActive && { backgroundColor: colors.white }]} onPress={() => this.onPressLeftOption(index)}>
        <Text style={styles.itemTextBold}>{item.title}</Text>
      </TouchableOpacity>
    )
  }

  renderRightMenu = ({ item, index }) => {
    // console.log(item);
    if (item.isActive && item.options.length > 0) {
      return item.options.map((itm, idx) => {
        return (
          <TouchableOpacity key={idx} style={[styles.rightItemContainer]} onPress={() => this.onPressRightOption(index, idx)}>
            <View style={styles.row}>
              <Feather name='check' size={itm.isActive ? setWidth(5) : setWidth(4)} style={{ marginRight: setWidth(3) }} color={itm.isActive ? colors.lightRed : colors.grey3} />
              <Text style={[styles.itemText, itm.isActive && { fontWeight: 'bold', color: colors.lightRed }]}>{itm.subtitle}</Text>
            </View>
            {
              (itm?.colorcode) &&
              <View style={[styles.colorView, { backgroundColor: itm.colorcode }]} />
            }
          </TouchableOpacity>
        )
      })
    } else {
      return null
    }
  }

  totalFilterApplied() {
    const filters = this.state.filters
    let i = 0
    filters.map((item, index) => {
      item.options.map((itm, idx) => {
        // console.log('item => ', item);
        if (itm.isActive) {
          i += 1
        }
      })
    })

    // getting main category
    const maincategoryArray = filters[0].options
    let maincategory = ''
    maincategoryArray.map((item, index) => {
      if (item.isActive) {
        maincategory += item.id + ','
      }

    })
    maincategory = maincategory.substring(0, maincategory.length - 1)

    // getting season
    const sesonArray = filters[1].options
    let season = ''
    sesonArray.map((item, index) => {
      if (item.isActive) {
        season += item.id + ','
      }

    })
    season = season.substring(0, season.length - 1)

    // getting age group
    const ageArray = filters[2].options
    let age = ''
    ageArray.map((item, index) => {
      if (item.isActive) {
        age += item.id + ','
      }

    })
    age = age.substring(0, age.length - 1)

    // getting color
    // const colorArray = filters[3].options
    // let color = ''
    // colorArray.map((item, index) => {
    //   if (item.isActive) {
    //     color += item.id + ','
    //   }

    // })
    // color = color.substring(0, color.length - 1)

    // getting brands
    const brandArray = filters[3].options
    let brand = ''
    brandArray.map((item, index) => {
      if (item.isActive) {
        brand += item.id + ','
      }

    })
    brand = brand.substring(0, brand.length - 1)

    // getting Price range
    const pricerangeArray = filters[4].options
    let range = ''
    pricerangeArray.map((item, index) => {
      if (item.isActive) {
        range += item.id + ','
      }

    })
    range = range.substring(0, range.length - 1)

    // getting sub category
    const subcategoryArray = filters[5].options
    let sub_category = ''
    subcategoryArray.map((item, index) => {
      if (item.isActive) {
        sub_category += item.id + ','
      }

    })
    sub_category = sub_category.substring(0, sub_category.length - 1)

    const param = {
      category: maincategory,
      subCategory: sub_category,
      season: season,
      brand: brand,
      color: '',
      ageGroup: age,
      priceRange: range,
    }

    let filter = this.props.filter
    //this.props.clearProductFilterAction()
    filter = {
      ...filter,
      ...param
    }
    this.props.setProductFilterAction(filter)
    // console.log(param);
    this.props.onDone(i)
  }

  _populateData() {
    const filters = this.state.filters
    const onPageFilter = this.props.filter
    //console.log('onPageFilter', onPageFilter);

    //shop
    const preselected_category = (onPageFilter.category && onPageFilter.category != '') ? onPageFilter.category.split(",") : ''
    const category = this.props.gender // this.props.homeReducer.main_categories
  
    let categoryArray = []
    if (category.length != 0) {
      for (let index = 0; index < category.length; index++) {
        const element = category[index];
        categoryArray.push({
          id: element.id,
          subtitle: element.title,
          isActive: (preselected_category.includes(element.id.toString())) ? true : false
        })
      }
    }
    filters[0].options = categoryArray
    if (preselected_category == '') {
      this._getSubCategory()
    }

    
    // color
    // const preselected_colors = (onPageFilter.color != '') ? onPageFilter.color.split(",") : ''
    // const colors = this.props.homeReducer.colors
    // let colorsArray = []
    // for (let index = 0; index < colors.length; index++) {
    //   const element = colors[index];
    //   colorsArray.push({
    //     id: element.id,
    //     subtitle: element.color,
    //     isActive: (preselected_colors.includes(element.id.toString())) ? true : false
    //   })
    // }
    //filters[3].options = colorsArray
    
    // season
    const preselected_season = (onPageFilter.season  && onPageFilter.season != '') ? onPageFilter.season : ''
    const season = this.state.filters[1].options
    let seasonArray = []
    for (let index = 0; index < season.length; index++) {
      const element = season[index];
      seasonArray.push({
        id: element.id,
        subtitle: element.subtitle,
        isActive: (preselected_season.includes(element.id.toString())) ? true : false
      })
    }
    filters[1].options = seasonArray

    // age group
    const preselected_age = (onPageFilter.ageGroup && onPageFilter.ageGroup != '') ? onPageFilter.ageGroup.split(",") : ''
    const age = this.state.filters[2].options
    let ageArray = []
    for (let index = 0; index < age.length; index++) {
      const element = age[index];
      ageArray.push({
        id: element.id,
        subtitle: element.subtitle,
        isActive: (preselected_age.includes(element.id.toString())) ? true : false
      })
    }
    filters[2].options = ageArray

    // brand
    const preselected_brand = (onPageFilter.brand && onPageFilter.brand != '') ? onPageFilter.brand.split(",") : ''
    let available_brand = this.props.homeReducer.available_brand
    if (onPageFilter.category !== '') {
      available_brand = this.props.brands_by_city_wise
    }

    let availablebrand = []
    for (let index = 0; index < available_brand.length; index++) {
      const element = available_brand[index];
      availablebrand.push({
        id: element.id,
        subtitle: element.brand_name,
        isActive: (preselected_brand.includes(element.id.toString())) ? true : false
      })
    }
    filters[3].options = availablebrand
    filters[3].copy_options = availablebrand
    this.setState({
      copyBrands: availablebrand
    })

    // price range
    const preselected_pricerange = (onPageFilter.priceRange && onPageFilter.priceRange != '') ? onPageFilter.priceRange.split(",") : ''    
    const priceranges = this.state.filters[4].options

    let pricerange = []
    for (let index = 0; index < priceranges.length; index++) {
      const element = priceranges[index];
      pricerange.push({
        id: element.id,
        subtitle: element.subtitle,
        isActive: (preselected_pricerange.includes(element.id.toString())) ? true : false
      })
    }
    filters[4].options = pricerange

    //sub category
    const preselected_subcategory = (onPageFilter.subCategory && onPageFilter.subCategory != '') ? onPageFilter.subCategory.split(",") : ''    
    const sub_category = this.props.categories

    let subcategory = []
    for (let index = 0; index < sub_category.length; index++) {
      const element = sub_category[index];
      subcategory.push({
        id: element.id,
        subtitle: element.title,
        isActive: (preselected_subcategory != '') && (preselected_subcategory.includes(element.id.toString())) ? true : false
      })
    }

    filters[5].options = subcategory

    this.setState({
      filters: filters
    })
  }

  _getSubCategory() {
    
    const onPageFilter = this.props.filter
    const filters = this.state.filters
    let cat_id = ''
    let season_id = ''
    const category = this.state.filters[0].options
    const season = this.state.filters[1].options

    const filtered_cat = category.filter(item => item.isActive == true)
    filtered_cat.map(item => {
      cat_id += item?.id + ','
    })
    cat_id = cat_id.substring(0, cat_id.length - 1)
    //cat_id = (cat_id == '') ? category.filter(item => (item.subtitle == "All"))[0].id : cat_id

    const filtered_season = season.filter(item => item.isActive == true)
    filtered_season.map(item => {
      season_id += item?.id + ','
    })
    season_id = season_id.substring(0, season_id.length - 1)
    season_id = (season_id == '') ? season.filter(item => (item?.subtitle == "All"))[0]?.id : season_id

    const param = {
      category_id: cat_id,
      season: season_id,
      city: onPageFilter.city
    }

    // console.log('_getSubCategory  => ', param);

    this.setState({ showLoader: true })

    FilterService._getSubCategoryService(param, onPageFilter).then(response => {
        // console.log('response  ',response);
      filters[5].options = [] // (response.categories.length > 0) ? response.categories : filters[5].copy_options
      filters[3].options = [] // (response.brands.length > 0) ? response.brands : filters[3].copy_options

      this.setState({
        filters: filters,
        showLoader: false
      })
    }, error => {
      this.setState({
        showLoader: false
      })
      errorAlert("Error", " Error Loading Categories." + error.message)
    })
  }

  componentDidMount() {
    if (Platform.OS === 'ios') {
      StatusBarManager.getHeight(response => {
        this.setState({
          statusbarheight: response.height
        })
      })
    }
    this._populateData()
  }

  _searchBrand(e) {

    const filters = this.state.filters
    const brands = filters[3].options
    const searchtext = (this.state.searchText).toLowerCase()

    if (searchtext == '') {
      filters[3].options = this.state.copyBrands
      this.setState({
        filters: filters
      })
      Keyboard.dismiss()
      return
    }


    let filteredData = this.state.copyBrands.filter(function (item) {
      return item.subtitle.toLowerCase().includes(searchtext);
    });

    filters[3].options = filteredData
    this.setState({
      filters: filters
    })

  }

  moveToDown() {
    Animated.timing(
      this.state.containerPosition,
      {
        toValue: 0,
        duration: 900,
        easing: Easing.linear(),
        useNativeDriver: false
      },
    ).start()
  }

  shouldComponentUpdate(props, state) {
    // console.log(props, state);
    if (props.isOpen) {
      this.moveToDown()
    }
    return true
  }


  render() {

    return (
      <View style={[styles.container,]}>

        <Animated.View style={{ top: this.state.containerPosition, height: usableHeight, width: width, }} >
          {
            Platform.OS === 'ios' &&
            <View style={{ height: this.state.statusbarheight }} />
          }
          <View style={styles.header}>
            <Text style={styles.heading}>Filters</Text>
            <TouchableOpacity onPress={() => this.clearAllFilter()}>
              <Text style={styles.clearFilterText}>Clear All Filter</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            <View style={[styles.row, { flex: 1 }]}>
              <View style={styles.leftFlexBox}>
                <FlatList
                  data={this.state.filters}
                  keyExtractor={(item, index) => index}
                  renderItem={this.renderLeftMenu}
                />
              </View>
              <View style={styles.rightFlexBox}>
                {
                  this.state.filters[3].isActive &&
                  <View style={styles.searchBox}>
                    <TouchableOpacity onPress={() => this._searchBrand()}>
                      <EvilIcons name='search' size={setWidth(6)} color={colors.grey3} style={{ padding: setWidth(2) }} />
                    </TouchableOpacity>
                    <TextInput
                      value={this.state.searchText}
                      onChangeText={(e) => {
                        this.setState({
                          searchText: e
                        }, () => this._searchBrand())
                      }}
                      placeholder="Search By Brand Name"
                      style={styles.input}
                      onSubmitEditing={() => this._searchBrand()}
                    />
                    <TouchableOpacity onPress={() => {
                      this.setState({
                        searchText: ''
                      }, () => this._searchBrand())
                    }}>
                      <Entypo name='cross' size={setWidth(6)} color={colors.grey3} style={{ padding: setWidth(2) }} />
                    </TouchableOpacity>
                  </View>
                }

                {
                  ((this.state.filters[5].isActive || this.state.filters[3].isActive) && this.state.showLoader) &&
                  <View style={{ position: 'absolute', zIndex: 9, height: setHeight(80), width: setWidth(60), justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator
                      animating
                      color={colors.primaryyellow}
                    />
                  </View>
                }

                <FlatList
                  data={this.state.filters}
                  keyExtractor={(item, index) => index}
                  renderItem={this.renderRightMenu}
                />
              </View>
            </View>
          </View>
          <View style={styles.footerBtnContainer}>
            <TouchableOpacity style={[styles.footerBtn, { backgroundColor: colors.white }]} onPress={() => {
              this.setState({
                containerPosition: new Animated.Value(-usableHeight)
              }, () => {
                this.props.onClose()
              })
            }}>
              <Text style={[styles.btnText, { color: colors.lightRed }]}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerBtn} onPress={() => this.totalFilterApplied()} >
              <Text style={styles.btnText}>DONE</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    homeReducer: state.homeReducer,
    filter: state.commonReducer.filter,
    storeReducer: state.storeReducer,
    storeReducer: state.storeReducer,
    filter: state.commonReducer.filter,
    gender: state.storeByCityReducer.gender,
    categories: state.storeByCityReducer.categories_for_filter,
    brands_by_city_wise: state.storeByCityReducer.available_brands,
  }
}

const mapDispatchToProps = dispatch => ({
  setProductFilterAction: (param) => dispatch(setProductFilterAction(param)),
  clearProductFilterAction: () => dispatch(clearProductFilterAction())
})

const connectComponent = connect(mapStateToProps, mapDispatchToProps)
export default connectComponent(FilterModal)
