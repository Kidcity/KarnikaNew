import React, { Component } from 'react';
import { View, Text, Linking, BackHandler } from 'react-native';
import CustomHeader from '../../component/CustomHeader';
import Feather from 'react-native-vector-icons/Feather'
import { styles } from './styles';
import { icons, setHeight, setWidth } from '../../utils/variable';
import TextCard from '../../component/TextCard';
import colors from '../../utils/colors';
import FooterTabMenu from '../../component/FooterTabMenu';
import { connect } from 'react-redux';
import { clearProductFilterAction, setProductFilterAction } from '../../redux/actions/commonAction';
import { clearProductListData } from '../../redux/actions/productListAction';
import { setScreenActivity } from '../../helper/AppActivityTrackingHelper';
import AppHeader from '../../component/AppHeader';

class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    //alert('mount')
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    setScreenActivity({ action_type: "going_back", action_id: '', city_id: "" })
    this.props.navigation.goBack();
    return true;
  }


  render() {
    return (
      <View style={styles.container}>
        {/* <CustomHeader
          heading="SETTINGS"
          headingStyle={{
            textAlign: 'center'
          }}
          showingOneIcon={true}
          showMenu={true}
          showNotificationIcon={true}
          onPressBellIcon={() => this.props.navigation.navigate("Notification")}
          navigation={this.props.navigation}
        /> */}
        <AppHeader
          showMenu
          showSearch
          showWishList
          showLogo
          navigation={this.props.navigation}
        />

        <View style={styles.content}>

          {/* <TextCard
            image={icons.shopping_bag}
            leftText="Payment Method"
            onPress={() => { console.log('here') }}
            rightIcon={<Feather name='arrow-right' size={setWidth(6)} color={colors.dark_charcoal} />}
            containerStyle={{
              height: setHeight(7)
            }}            
          /> */}

          <TextCard
            image={icons.navigation}
            leftText="Shipping Address"
            onPress={() => { this.props.navigation.navigate("ChangeAddress") }}
            rightIcon={<Feather name='arrow-right' size={setWidth(6)} color={colors.dark_charcoal} />}
            containerStyle={{
              height: setHeight(7)
            }}
          />

          <TextCard
            image={icons.bell}
            leftText="About Karnika"
            rightIcon={<Feather name='arrow-right' size={setWidth(6)} color={colors.dark_charcoal} />}
            onPress={() => Linking.openURL("https://www.karnikaindustries.com/Default/About#")}
            containerStyle={{
              height: setHeight(7)
            }}
          />

          <TextCard
            image={icons.shield}
            leftText="Privacy Policy"
            rightIcon={<Feather name='arrow-right' size={setWidth(6)} color={colors.dark_charcoal} />}
            onPress={() => Linking.openURL("https://www.karnikaindustries.com/Default/About#")}
            containerStyle={{
              height: setHeight(7)
            }}
          />

          <TextCard
            image={icons.box}
            leftText="Damaged Goods Policy"
            rightIcon={<Feather name='arrow-right' size={setWidth(6)} color={colors.dark_charcoal} />}
            onPress={() => Linking.openURL("https://www.karnikaindustries.com/Default/About#")}
            containerStyle={{
              height: setHeight(7)
            }}
          />

          <TextCard
            image={icons.phone_call}
            leftText="Contact Us"
            rightIcon={<Feather name='arrow-right' size={setWidth(6)} color={colors.dark_charcoal} />}
            onPress={() => { this.props.navigation.navigate("ContactUs") }}
            containerStyle={{
              height: setHeight(7)
            }}
          />

          {/* <TextCard
            image={icons.message}
            leftText="What’s Missing Tell Us"
            rightIcon={<Feather name='arrow-right' size={setWidth(6)} color={colors.dark_charcoal} />}
            containerStyle={{
              height: setHeight(7)
            }}   
          /> */}

          <TextCard
            image={icons.file}
            leftText="Terms & Condition"
            rightIcon={<Feather name='arrow-right' size={setWidth(6)} color={colors.dark_charcoal} />}
            onPress={() => Linking.openURL('https://www.karnikaindustries.com/Default/About#')}
            containerStyle={{
              height: setHeight(7)
            }}
          />


        </View>
        <FooterTabMenu
          focused={true}
          route_name="Settings"
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    filter: state.commonReducer.filter
  }
}

const mapDispatchToProps = dispatch => ({
  clearProductFilterAction: () => dispatch(clearProductFilterAction()),
  setProductFilterAction: (data) => dispatch(setProductFilterAction(data)),
  clearProductListData: () => dispatch(clearProductListData())

})
const connectComponent = connect(mapStateToProps, mapDispatchToProps)
export default connectComponent(SettingsScreen)
