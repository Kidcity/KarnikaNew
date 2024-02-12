import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { errorAlert, retryAlert } from '../../../helper/ToastHelper';
import StoreByCityService from '../../../services/StoreByCityService';
import colors from '../../../utils/colors';
import { setHeight } from '../../../utils/variable';
import CategoriesSection from '../CategoriesSection';
import GenderSection from '../GenderSection';
import SeasonSection from '../SeasonSection';
import { styles } from './style';


class MainSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sectionHeading: 'SELECT GENDER',
      is_gender_selected: false,
      is_season_selected: false,
      is_categories_selected: false,
      selected_gender: '',
      selected_season: '',
      categories: [],
      city_id: '',
      city_name: '',
      showSectionLoader: false,

      gender_name: '',
      season_name: '',
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {
      categories: props.categories ? props.categories : [],
      city_id: (props.hasOwnProperty("city_id")) ? props.city_id : '',
      city_name: (props.hasOwnProperty("city_name")) ? props.city_name : ''
    }
  }

  async _getSubCategories(gender, season) {
    const param = {
      category_id: gender,
      season: season,
      city: this.state.city_id ? this.state.city_id : ''
    }
    //console.log(param);
    this.setState({ showSectionLoader: true })
    await StoreByCityService._categoriesService(param).then(response => {
      this.setState({ showSectionLoader: false })
    }, error => {
      this.setState({ showSectionLoader: false })
      if (error.message == "server_error") {
        retryAlert(() => this._getSubCategories())
      } else {
        errorAlert("Error in getting brands", error.message)
      }
    })
  }

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.heading}>{this.state.sectionHeading}</Text>
        {
          this.state.showSectionLoader ?
            <View style={{
              paddingTop: setHeight(5)
            }}>
              <ActivityIndicator
                animating={true}
                size="large"
                color={colors.green}
              />
            </View>
            :
            !this.state.is_gender_selected ?
              <GenderSection
                data={this.props.gender}
                city_name={this.state.city_name}
                min_ordervalue={this.props.min_ordervalue}
                onPressGender={(gender) => {
                  this.setState({
                    selected_gender: gender.id,
                    sectionHeading: 'SELECT SEASON',
                    is_gender_selected: true,
                  })
                }}
              />
              :
              !this.state.is_season_selected ?
                <SeasonSection
                  onPressBack={() => {
                    this.setState({
                      is_gender_selected: false,
                      sectionHeading: 'SELECT SEASON',
                      is_season_selected: false
                    })
                  }}
                  onSelectSeason={(season_name, season) => {
                    this.setState({                    
                      selected_season: season,
                      is_season_selected: true,
                      sectionHeading: 'SELECT CATEGORIES',
                    }, () => this._getSubCategories(this.state.selected_gender, this.state.selected_season))
                  }}
                />
                :
                !this.state.is_categories_selected &&
                <CategoriesSection
                  data={this.state.categories}
                  onPressBack={() => {
                    this.setState({
                      sectionHeading: 'SELECT SEASON',
                      is_gender_selected: false,
                      is_categories_selected: false,
                      is_season_selected: false
                    })
                  }}
                  onSelectCategories={(categories_name, categories) => {
                    this.setState({
                      sectionHeading: 'SELECT SEASON',
                      is_gender_selected: false,
                      is_categories_selected: false,
                      is_season_selected: false
                    }, () => this.props.onSelectCategories(this.state.selected_gender, this.state.selected_season, categories))
                  }}
                />

        }

      </View>
    );
  }
}


const mapStateToProps = state => {
  return {
    // gender: state.storeByCityReducer.gender,
    // filter: state.commonReducer.filter,
    categories: state.storeByCityReducer.categories
  }
}

const mapDispatchToProps = dispatch => ({
  //clearLoginData: () => dispatch(clearLoginData())
  // setProductFilterAction: (param) => dispatch(setProductFilterAction(param)),
  // clearProductFilterAction: (param) => dispatch(clearProductFilterAction()),
  // clearProductListData: () => dispatch(clearProductListData())
})

const connectComponent = connect(mapStateToProps, mapDispatchToProps)
export default connectComponent(MainSection)

