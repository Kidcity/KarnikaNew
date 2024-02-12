import React, { Component } from 'react';
import { View, Text, Image, Alert } from 'react-native';
import Lottie from 'lottie-react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomButton from '../../component/CustomButton';
import CustomHeader from '../../component/CustomHeader';
import OtpInput from '../../component/OTPInput';
import colors from '../../utils/colors';
import { styles } from './style';
import OTPVerificationService from '../../services/OTPVerificationService';
import { errorAlert, retryAlert, successToast } from '../../helper/ToastHelper';
import FullScreenLoader from '../../component/FullScreenLoader';
import { setWidth } from '../../utils/variable';
import { StackActions } from '@react-navigation/native';
import { Strings } from '../../utils/strings';
import { store } from '../../redux/store'
import { demoLoginAction } from '../../redux/actions/loginAction';
import AppHeader from '../../component/AppHeader';
import ResetPasswordService from '../../services/ResetPasswordService';

export default class OTPVerificationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: [],
      showLoader: false
    };
  }

  componentDidMount() {
    this.animation.play();
  }
 
  async _validateOTP() {
    const purpose = this.props.route.params?.what_for

    const param = {
      user_mobile: this.props.route.params.phone,
      otp: (this.state.otp.length > 0) ? this.state.otp.join('') : ''
    }
    console.log(param);
    this.setState({ showLoader: true })
    await OTPVerificationService._OTPvalidate(param, purpose).then(response => {

      successToast("OTP VERIFIED!", "Your OTP has been verified.")

      // const id = this.props.route.params?.id
      // this.setState({ showLoader: false })
      // successToast("OTP VERIFIED!", "Your OTP has been verified.")

      // if (this.props.route.params.new_register == 1) {
      //   this.props.navigation.dispatch(
      //     StackActions.replace('Login')
      //   );
      // } else {
      // 
      // }

    }, error => {
      this.setState({ showLoader: false })
      if (error.message == "server_error") {
        retryAlert(() => this._validateOTP())
      } else {
        errorAlert("Error", error.message)
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <CustomHeader
          heading={Strings.otpverificationScreenStrings.heading}
          showBackButton={true}
          onPressBack={() => { this.props.navigation.goBack()}}
          headingStyle={{ textAlign: 'center' }}
        /> */}
        <AppHeader
          showBackBtn
          noRightIcons
          // showSearch
          // showWishList
          showLabel
          label={Strings.otpverificationScreenStrings.heading}
          navigation={this.props.navigation}
        />

        <KeyboardAwareScrollView contentContainerStyle={styles.content} >

          <Lottie
            ref={animation => {
              this.animation = animation;
            }}
            style={styles.lottiView}
            source={require("../../utils/OTP_lottie.json")}
          />


          <Text style={styles.infoText}> {Strings.otpverificationScreenStrings.bodyText1}</Text>
          <View style={[styles.row, { justifyContent: 'center', marginTop: setWidth(2) }]}>
            <Text style={[styles.infoText, { color: colors.lightRed, }]}>+91 {this.props.route.params.phone}</Text>
            <Text style={styles.infoText}> {Strings.otpverificationScreenStrings.bodyText2}</Text>
          </View>
          <OtpInput
            onOTPChange={(e) => this.setState({ otp: e })}
          />
          <CustomButton
            container={{
              backgroundColor: colors.themeColor,
              paddingHorizontal: setWidth(7),
              paddingRight: setWidth(9),
            }}
            label={Strings.otpverificationScreenStrings.btnText}
            labelStyle={{ color: colors.white }}
            iconColor={colors.white}
            onPress={() => this._validateOTP()}
            leftIcon
          />

        </KeyboardAwareScrollView>
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
