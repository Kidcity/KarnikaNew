import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, Platform, Linking } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { styles } from './style';
import CustomHeader from '../../component/CustomHeader'
import Feather from 'react-native-vector-icons/Feather'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CircleImage from '../../component/CircleImage';
import { setHeight, setWidth } from '../../utils/variable';
import CustomTextInput from '../../component/CustomTextInput';
import CustomButton from '../../component/CustomButton';
import colors from '../../utils/colors';
import RegisterService from '../../services/RegisterService';
import Dropdown from '../../component/Dropdown';
import { errorAlert, retryAlert, successToast } from '../../helper/ToastHelper';
import FullScreenLoader from '../../component/FullScreenLoader';
import VersionInfo from 'react-native-version-info'
import RBSheet from 'react-native-raw-bottom-sheet';
import { Strings } from '../../utils/strings';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ischannelPartner: false,
      isgst: false,
      image: '',
      imageObj: {},
      mobile: '',
      email: '',
      shopname: '',
      pangstno: '', // '19AAFCM1413M1ZE',
      companyname: '',
      ownername: '',
      address: '',
      city: '',
      pin: '',
      password: '',
      confpassword: '',
      cppartnercode: '',
      state: [],
      selectedState: '',
      district: [],
      selectedDistrict: '',
      companytype: [],
      selectedCompanyType: '',
      showLoader: false,
      showOtherLoader: false
    };
  }

  _openImageLibrary() {
    this.RBSheet.close()
    const options = {
      mediaType: 'photo',
      includeBase64: true
    }

    setTimeout(() => {
      launchImageLibrary(options, (response) => {
        if (!response.didCancel) {
          this.setState({
            image: response.assets[0].uri,
            imageObj: response
          })
        }
      })
    }, 200);

  }

  _openCamera() {
    this.RBSheet.close()
    const options = {
      mediaType: 'photo',
      includeBase64: true
    }
    setTimeout(() => {
      launchCamera(options, (response) => {
        if (!response.didCancel && !response.errorCode) {
          this.setState({
            image: response.assets[0].uri,
            imageObj: response
          })
        }
      })
    }, 200);

  }

  async _checkValidGST() {
    const param = {
      gst_no: this.state.pangstno
    }
    this.setState({ showLoader: true })
    //console.log(param);
    await RegisterService._checkValidGSTService(param).then(response => {
      //console.log('gst - ', response);
      if (response.data.data.result) {
        const data = response.data.data.result
        //console.log(data);
        this.setState({
          companyname: data.legal_name,
          city: data.primary_business_address.location,
          address: data.primary_business_address.full_address,
          pin: data.primary_business_address.pincode,
          showLoader: false
        })
      } else {
        this.setState({ showLoader: false })
      }
    }, error => {
      this.setState({ showLoader: false })
      if (error.message == "server_error") {
        Alert.alert("Oops!", "Something went wrong.", [
          {
            text: "Cancel"
          },
          {
            text: "Retry",
            onPress: () => this._checkValidGST()
          }
        ])
      } else {
        errorAlert("Error", error.message)
      }
    })
  }


  async _checkValidPAN() {
    const param = {
      pan_no: this.state.pangstno
    }
    this.setState({ showLoader: true })
    await RegisterService._checkValidPANService(param).then(response => {

      if (response.data.data.data) {
        const data = response.data.data.data
        this.setState({
          ownername: data.user_full_name,
          showLoader: false
        })
      } else {
        this.setState({ showLoader: false })
      }
    }, error => {
      this.setState({ showLoader: false })
      if (error.message == "server_error") {
        Alert.alert("Oops!", "Something went wrong.", [
          {
            text: "Cancel"
          },
          {
            text: "Retry",
            onPress: () => this._checkValidPAN()
          }
        ])
      } else {
        errorAlert("Error", error.message)
      }
    })
  }


  async _fetchData() {
    this.setState({ showOtherLoader: true })
    await RegisterService._fetchBasicInfoService().then(response => {
      const data = response.data.data.data
      let state = []
      for (let index = 0; index < data.company_state.length; index++) {
        const element = data.company_state[index];
        state.push({
          label: element.zone_name, value: element.zone_id
        })
      }

      let company_type = []
      for (let index = 0; index < data.company_type.length; index++) {
        const element = data.company_type[index];
        company_type.push({
          label: element.type_name, value: element.id
        })
      }

      this.setState({
        state: state,
        companytype: company_type,
        showOtherLoader: false
      })
    }, error => {
      this.setState({ showOtherLoader: false })
      if (error.message == "server_error") {
        retryAlert(() => this._fetchData())
      } else {
        errorAlert("Error", error.message)
      }
    })
  }

  async _fetchCities(value) {
    this.setState({ selectedState: value })
    const param = {
      zone_id: value
    }
    this.setState({ showOtherLoader: true })
    await RegisterService._fetchCitiesService(param).then(response => {
      const data = response.data.data.data
      let district = []
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        district.push({
          label: element.city_name, value: element.id
        })
      }

      this.setState({
        district: district,
        showOtherLoader: false
      })
    }, error => {
      this.setState({ showOtherLoader: false })
      if (error.message == "server_error") {
        retryAlert(() => this._fetchCities())
      } else {
        errorAlert("Error", error.message)
      }
    })
  }

  async _register() {
    const imageObj = this.state.imageObj
    const device_token = await AsyncStorage.getItem('@device_token_KARNIKA')

    const param = {
      fcm_token: device_token,
      bill_address: this.state.address,
      channel_partner_id: this.state.cppartnercode,
      city_id: this.state.selectedDistrict,
      city_name: this.state.city,
      company_name: this.state.companyname,
      company_type: this.state.selectedCompanyType,
      email_id: this.state.email,
      gst_no: this.state.pangstno,
      is_pan_or_gst: (this.state.isgst) ? 1 : 0,
      is_accept_tnc: true,
      mobile_no: this.state.mobile,

      owner_name: this.state.ownername,
      password: this.state.password,
      confirm_password: this.state.confpassword,
      pin: this.state.pin,
      shop_name: this.state.shopname,
      store_photo: (Object.keys(imageObj).length > 0) ? 'data:image/jpg;base64,' + imageObj.assets[0].base64 : '',

      zone: this.state.selectedState,

      android_version: (Platform.OS === 'android') ? VersionInfo.appVersion.toString() : '',
      ios_version: (Platform.OS === 'ios') ? VersionInfo.appVersion.toString() : '',
    }

    //console.log(param);
    this.setState({ showLoader: true })
    await RegisterService._registerService(param).then(response => {
      successToast("SUCCESS!", "Successfully Registered.")
      this.setState({ showLoader: false })
      this.props.navigation.navigate("OTPVerificationScreen", { phone: this.state.mobile, new_register: 1 })
    }, error => {
      this.setState({ showLoader: false })
      if (error.message == "server_error") {
        retryAlert(() => this._register())
      } else {
        // console.log(error);
        errorAlert("Error", error.message)
      }
    })
  }

  _createDemoAccount(){
    this.props.navigation.navigate("OTPVerificationScreen", { phone: this.state.mobile, create_demo_account: 1 })
  }

  fillUpPanGST() {
    if (this.state.isgst) {
      this._checkValidGST()
    } else {
      this._checkValidPAN()
    }
  }

  componentDidMount() {
    // this._fetchData()
  }

  render() {

    return (
      <View style={styles.container}>
        <CustomHeader
          heading={Strings.signupScreenStrings.heading}
          showBackButton={true}
          onPressBack={() => { this.props.navigation.goBack() }}
          headingStyle={{
            textAlign: 'center'
          }}
        />
        <KeyboardAwareScrollView contentContainerStyle={styles.content}>

          <CustomTextInput
            placeholder={Strings.signupScreenStrings.mobilenumberText}
            inputStyle={styles.inputStyle}
            keyboardType="number-pad"
            value={this.state.mobile}
            onChangeText={(e) => this.setState({ mobile: e })}
          />

          <CustomButton
            container={{
              backgroundColor: colors.primaryyellow,
              marginTop: setWidth(14),
              paddingHorizontal: setWidth(7),
              paddingRight: setWidth(9),
            }}
            label="SIGN UP"
            labelStyle={{ color: colors.white }}
            iconColor={colors.white}
            onPress={() => this._createDemoAccount()}
            leftIcon
          />

          <View style={[styles.row, styles.info]}>
            <Feather name='check-circle' size={setWidth(4)} color={colors.primaryyellow} />
            {/* <Text style={styles.infoText} adjustsFontSizeToFit numberOfLines={1}>By Signing in to this account , you agree to our terms of service and Privacy policy</Text> */}
            <View style={[styles.row, { alignItems: 'center', justifyContent: 'center' }]}>
              <Text style={styles.footerText} > {Strings.loginScreenStrings.bottomText1}</Text>
              <TouchableOpacity onPress={() => Linking.openURL("https://thekarnika.in/terms-conditions")}><Text style={[styles.footerText, styles.link]}> {Strings.loginScreenStrings.bottomText2}</Text></TouchableOpacity>
              <Text style={styles.footerText}> {Strings.loginScreenStrings.bottomText3}</Text>
              <TouchableOpacity onPress={() => Linking.openURL("https://thekarnika.in/privacy")}><Text style={[styles.footerText, styles.link]}> {Strings.loginScreenStrings.bottomText4}</Text></TouchableOpacity>
            </View>
          </View>

          {
            Platform.OS === 'ios' ?
              <Text numberOfLines={1} adjustsFontSizeToFit style={{ color: colors.grey3, marginTop: setWidth(10) }}>- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</Text>
              :
              <View style={styles.dashedBorder} />
          }

          <Text style={[styles.text, { marginTop: setWidth(8) }]}>{Strings.signupScreenStrings.alreadyRegisterText}</Text>
          <CustomButton
            container={{
              backgroundColor: colors.white,
              borderColor: colors.primaryyellow,
              borderWidth: setWidth(0.5),
              marginTop: setWidth(5),
              paddingHorizontal: setWidth(7),
              paddingRight: setWidth(9),
            }}
            label={Strings.loginScreenStrings.loginBtnText}
            labelStyle={{ color: colors.primaryyellow }}
            iconColor={colors.primaryyellow}
            onPress={() => { this.props.navigation.goBack() }}
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
