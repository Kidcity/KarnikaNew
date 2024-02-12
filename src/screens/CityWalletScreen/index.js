import React, { Component } from 'react';
import { View, Text, ImageBackground, Image } from 'react-native';
import { connect } from 'react-redux';
import CustomButton from '../../component/CustomButton';
import CustomHeader from '../../component/CustomHeader';
import { setScreenActivity } from '../../helper/AppActivityTrackingHelper';
import colors from '../../utils/colors';
import { images, setWidth } from '../../utils/variable';
import { styles } from './style';
import AppHeader from '../../component/AppHeader';

class CityWalletScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city_wallet_amt: 0
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {
      city_wallet_amt: props.city_wallet_amt ? props.city_wallet_amt : 0,
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <CustomHeader
          heading="CITY WALLET"
          headingStyle={{
            textAlign: 'center'
          }}
          onPressBack={() => {
            setScreenActivity({ action_type: "going_back", action_id: '' })
            this.props.navigation.goBack()}}
        /> */}
        <AppHeader
          showBackBtn
          showSearch
          showWishList
          showLogo
          navigation={this.props.navigation}
        />

        <View style={styles.content}>
          <View style={styles.imageBlock}>
            <Image style={styles.image} source={images.citywalletbg} resizeMode="cover" />
          </View>
          <View style={styles.footerBlock}>
            <View style={styles.priceView}>
              <Text style={styles.subHeading}>Total Amount In Your Wallet</Text>
              <Text style={styles.heading}>₹{this.state.city_wallet_amt}</Text>
            </View>
            <CustomButton
              container={{ backgroundColor: colors.lightRed }}
              label="REDEEM NOW"
              labelStyle={{ color: colors.white }}
              iconColor={colors.white}
              leftIcon={true}
              onPress={() => {
                this.props.navigation.navigate("Cart")
              }}
            />
          </View>

        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    city_wallet_amt: state.loginReducer.city_wallet_amt,
  }
}

const mapDispatchToProps = dispatch => ({
})
const connectComponent = connect(mapStateToProps, mapDispatchToProps)
export default connectComponent(CityWalletScreen)

