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
import AppHeader from '../../component/AppHeader';
import EmptyCartModal from '../../component/EmptyCartModal';

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
      showOtherLoader: false,
      is_ws_not: 0,
      errMessage: "",
      showErrorModal: false
    };
  }

  static getDerivedStateFromProps(props, state) {

    return {
      is_ws_not: props.route.params?.reg_type ?? 0
    }
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
    console.log(param);
    await RegisterService._checkValidGSTService(param).then(response => {

      if (response.data.data.result) {
        const data = response?.data?.data?.result

        this.setState({
          companyname: data?.legal_name,
          city: data?.primary_business_address?.location,
          address: data?.primary_business_address?.full_address,
          pin: data?.primary_business_address?.pincode,
          showLoader: false
        })
      } else {
        this.setState({ showLoader: false })
      }
    }, error => {
      // console.log(error);
      this.setState({
        pan_no: ''
      })
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
        this.setState({
          errMessage: error.message,
          showErrorModal: true
        })
        // errorAlert("Error", error.message)
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
        this.setState({
          pan_no: ''
        })
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
        this.setState({
          errMessage: error.message,
          showErrorModal: true
        })
        // errorAlert("Error", error.message)
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
        this.setState({
          errMessage: error.message,
          showErrorModal: true
        })
        // errorAlert("Error", error.message)
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
        this.setState({
          errMessage: error.message,
          showErrorModal: true
        })
        // errorAlert("Error", error.message)
      }
    })
  }

  async _register() {

    const imageObj = this.state.imageObj
    const device_token = await AsyncStorage.getItem('@device_token_KARNIKA')
    
    const param = {
      fcm_token: device_token,
      is_accept_tnc: true,
      mobile_no: this.state.mobile,
      owner_name: this.state.ownername,
      shop_name: this.state.shopname,
      store_photo: (Object.keys(imageObj).length > 0) ? 'data:image/jpg;base64,' + imageObj.assets[0].base64 : '',
      is_ws_not: this.state.is_ws_not + "",

      android_version: (Platform.OS === 'android') ? VersionInfo.appVersion.toString() : '',
      ios_version: (Platform.OS === 'ios') ? VersionInfo.appVersion.toString() : '',
    }

    console.log(param);

    this.setState({ showLoader: true })
    await RegisterService._registerService(param).then(response => {
      successToast("SUCCESS!", "Successfully Registered.")
      this.setState({ showLoader: false })
      this.props.navigation.goBack()
      // this.props.navigation.navigate("OTPVerificationScreen", { phone: this.state.mobile, what_for: 'signup' })
    }, error => {
      this.setState({ showLoader: false })
      if (error.message == "server_error") {
        retryAlert(() => this._register())
      } else {
        console.log(error);
        this.setState({
          errMessage: error.message,
          showErrorModal: true
        })
        // errorAlert("Error", error.message)
      }
    })
  }

  fillUpPanGST() {
    if (this.state.isgst) {
      this._checkValidGST()
    } else {
      this._checkValidPAN()
    }
  }

  componentDidMount() {
    this._fetchData()
  }

  render() {
    // console.log(VersionInfo.appVersion.toString());
    return (
      <View style={styles.container}>
        {/* <CustomHeader
          showBackButton
          heading={Strings.signupScreenStrings.heading}
          onPressBack={() => { this.props.navigation.goBack() }}
          headingStyle={{
            textAlign: 'center'
          }}
        /> */}
        <AppHeader
          showBackBtn
          noRightIcons
          // showSearch
          // showWishList
          showLabel
          label={"Sign Up As " + this.props.route.params?.reg_label}
          navigation={this.props.navigation}
        />
        <KeyboardAwareScrollView contentContainerStyle={styles.content}>

          <CircleImage
            container={{
              alignSelf: 'center',
              marginTop: setWidth(4)
            }}
            image={this.state.image}
            // onPress={() => this._openImageLibrary()}
            onPress={() => this.RBSheet.open()}
          />
          <Text style={styles.uploadText}>{Strings.signupScreenStrings.uploadphotoText}</Text>

          <CustomTextInput
            placeholder={Strings.signupScreenStrings.mobilenumberText}
            inputStyle={styles.inputStyle}
            keyboardType="number-pad"
            value={this.state.mobile}
            onChangeText={(e) => this.setState({ mobile: e })}
          />
          {/*           
          <CustomTextInput
            placeholder={Strings.signupScreenStrings.emailText}
            inputStyle={styles.inputStyle}
            keyboardType="email-address"
            value={this.state.email}
            onChangeText={(e) => this.setState({ email: e })}
          /> */}


          <CustomTextInput
            placeholder={Strings.signupScreenStrings.shopnameText}
            inputStyle={styles.inputStyle}
            value={this.state.shopname}
            onChangeText={(e) => this.setState({ shopname: e })}
          />

{/* 
          <View style={[styles.row]}>
            <CustomTextInput
              container={{ flex: 1 }}
              placeholder={`Type ${(this.state.isgst ? Strings.signupScreenStrings.gstText : Strings.signupScreenStrings.panText)} ${Strings.signupScreenStrings.panfieldText}`}
              inputStyle={[styles.inputStyle,]}
              value={this.state.pangstno}
              autoCapitalize={true}
              onChangeText={(e) => this.setState({ pangstno: e })}
              onBlur={(e) => this.fillUpPanGST()}
            />
            <View style={[styles.row, { alignItems: 'flex-end' }]}>
              <TouchableOpacity style={[styles.btn, { marginRight: setWidth(1) }, (this.state.isgst) && styles.activeBtn]} onPress={() => this.setState({ isgst: true })}>
                <Text style={[styles.btnText, (this.state.isgst) && styles.activeBtnText]}>GST</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btn, (!this.state.isgst) && styles.activeBtn]} onPress={() => this.setState({ isgst: false })}>
                <Text style={[styles.btnText, (!this.state.isgst) && styles.activeBtnText]}>PAN</Text>
              </TouchableOpacity>
            </View>
          </View>
           
          <CustomTextInput
            placeholder={Strings.signupScreenStrings.companynameText}
            inputStyle={styles.inputStyle}
            value={this.state.companyname}
            onChangeText={(e) => this.setState({ companyname: e })}
          />
          */}
          {/* <Dropdown
            container={styles.dropdownContainer}
            placeholderStyle={styles.dropdownPlacholderStyle}
            dropdownItemStyle={styles.dropdownItemStyle}
            selectedTextStyle={{
              fontSize: setWidth(3.2),
              fontWeight: 'bold',
            }}
            dropdownItemTextStyle={styles.dropdownItemTextStyle}
            data={this.state.companytype}
            value={this.state.selectedCompanyType}
            placeholder={"Company Type*"}
            onChange={(v) => this.setState({ selectedCompanyType: v })}
          /> */}
          <CustomTextInput
            placeholder={Strings.signupScreenStrings.ownernameText}
            inputStyle={styles.inputStyle}
            value={this.state.ownername}
            onChangeText={(e) => this.setState({ ownername: e })}
          />
{/*           
          <CustomTextInput
            placeholder={Strings.signupScreenStrings.billingaddressText}
            inputStyle={styles.inputStyle}
            value={this.state.address}
            onChangeText={(e) => this.setState({ address: e })}
          />
          {
            this.state.showOtherLoader ?
              <ActivityIndicator animating={true} color={colors.primaryyellow} />
              :
              <Dropdown
                container={styles.dropdownContainer}
                placeholderStyle={styles.dropdownPlacholderStyle}
                dropdownItemStyle={styles.dropdownItemStyle}
                dropdownItemTextStyle={styles.dropdownItemTextStyle}
                data={this.state.state}
                selectedTextStyle={{
                  fontSize: setWidth(3.2),
                  color: colors.grey3
                }}
                value={this.state.selectedState}
                placeholder={Strings.signupScreenStrings.stateText}
                onChange={(v) => this._fetchCities(v)}
              />
          }

          {
            this.state.showOtherLoader ?
              <ActivityIndicator animating={true} color={colors.primaryyellow} />
              :
              <Dropdown
                container={styles.dropdownContainer}
                placeholderStyle={styles.dropdownPlacholderStyle}
                dropdownItemStyle={styles.dropdownItemStyle}
                dropdownItemTextStyle={styles.dropdownItemTextStyle}
                data={this.state.district}
                selectedTextStyle={{
                  fontSize: setWidth(3.2),
                  color: colors.grey3
                }}
                value={this.state.selectedDistrict}
                placeholder={Strings.signupScreenStrings.districtText}
                onChange={(v) => this.setState({ selectedDistrict: v })}
              />
          }

          <CustomTextInput
            placeholder={Strings.signupScreenStrings.cityText}
            inputStyle={styles.inputStyle}
            value={this.state.city}
            onChangeText={(e) => this.setState({ city: e })}
          />
          <CustomTextInput
            placeholder={Strings.signupScreenStrings.pincodeText}
            inputStyle={styles.inputStyle}
            value={this.state.pin}
            onChangeText={(e) => this.setState({ pin: e })}
          />
           */}
          {/* <CustomTextInput
            placeholder={Strings.signupScreenStrings.passwordText}
            inputStyle={styles.inputStyle}
            rightIcon={<Feather name={this.state.showPassword ? 'eye-off' : 'eye'} size={setWidth(5)} color={colors.grey3} />}
            value={this.state.password}
            secureTextEntry={this.state.showPassword ? false : true}
            onChangeText={(e) => this.setState({ password: e })}
            onPressRightIcon={() => this.setState({ showPassword: !this.state.showPassword })}
          />
          <CustomTextInput
            placeholder={Strings.signupScreenStrings.confirmpasswordText}
            inputStyle={styles.inputStyle}
            rightIcon={<Feather name={this.state.showPassword ? 'eye-off' : 'eye'} size={setWidth(5)} color={colors.grey3} />}
            value={this.state.confpassword}
            secureTextEntry={this.state.showPassword ? false : true}
            onChangeText={(e) => this.setState({ confpassword: e })}
            onPressRightIcon={() => this.setState({ showPassword: !this.state.showPassword })}
          /> */}

          {/* <View style={[styles.row, { marginTop: setWidth(8), justifyContent: 'space-between' }]}>
            <Text style={styles.text}>{Strings.signupScreenStrings.cannelpartnerText}</Text>
            <View style={styles.row}>
              <TouchableOpacity style={[styles.btn, { marginRight: setWidth(1) }, (!this.state.ischannelPartner) && styles.activeBtn]} onPress={() => this.setState({ ischannelPartner: false })}>
                <Text style={[styles.btnText, (!this.state.ischannelPartner) && styles.activeBtnText]}>{Strings.signupScreenStrings.noText}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btn, (this.state.ischannelPartner) && styles.activeBtn]} onPress={() => this.setState({ ischannelPartner: true })}>
                <Text style={[styles.btnText, (this.state.ischannelPartner) && styles.activeBtnText]}>{Strings.signupScreenStrings.yesText}</Text>
              </TouchableOpacity>
            </View>
          </View> */}
          {
            this.state.ischannelPartner &&
            <CustomTextInput
              placeholder={Strings.signupScreenStrings.partnerCodeText}
              inputStyle={styles.inputStyle}
              value={this.state.cppartnercode}
              onChangeText={(e) => this.setState({ cppartnercode: e })}
            />
          }

          <CustomButton
            container={{
              backgroundColor: colors.themeColor,
              marginTop: setWidth(14),
              paddingHorizontal: setWidth(7),
              paddingRight: setWidth(9),
            }}
            label="SIGN UP"
            labelStyle={{ color: colors.white }}
            iconColor={colors.white}
            onPress={() => this._register()}
            leftIcon
          />

          <View style={[styles.row, styles.info]}>
            <Feather name='check-circle' size={setWidth(4)} color={colors.primaryyellow} />
            {/* <Text style={styles.infoText} adjustsFontSizeToFit numberOfLines={1}>By Signing in to this account , you agree to our terms of service and Privacy policy</Text> */}
            <View style={[styles.row, { alignItems: 'center', justifyContent: 'center' }]}>
              <Text style={styles.footerText} > {Strings.loginScreenStrings.bottomText1}</Text>
              <TouchableOpacity onPress={() => Linking.openURL("https://karnikaindustries.com/terms.html")}><Text style={[styles.footerText, styles.link]}> {Strings.loginScreenStrings.bottomText2}</Text></TouchableOpacity>
              <Text style={styles.footerText}> {Strings.loginScreenStrings.bottomText3}</Text>
              <TouchableOpacity onPress={() => Linking.openURL("https://karnikaindustries.com/privacy.html")}><Text style={[styles.footerText, styles.link]}> {Strings.loginScreenStrings.bottomText4}</Text></TouchableOpacity>
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
              borderColor: colors.themeColor,
              borderWidth: setWidth(0.5),
              marginTop: setWidth(5),
              paddingHorizontal: setWidth(7),
              paddingRight: setWidth(9),
            }}
            label={Strings.loginScreenStrings.loginBtnText}
            labelStyle={{ color: colors.themeColor }}
            iconColor={colors.themeColor}
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
        {
          this.state.showErrorModal &&
          <EmptyCartModal
            title={this.state.errMessage}
            showProcessBtn={false}
            onPressContinueShopping={() => {
              this.setState({ showErrorModal: false })
            }}
            onPressClose={() => this.setState({ showErrorModal: false })}
          />
        }
        <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          // height={setHeight(10)}
          openDuration={250}
          customStyles={{
            container: {
              height: Platform.OS === 'ios' ? setHeight(25) : setHeight(20),
            },
            wrapper: {
              // backgroundColor: 'red'
            },
          }}
        >
          <TouchableOpacity style={styles.itemView} onPress={() => this._openImageLibrary()}>
            <Text style={styles.actionsheetTitle}>Launch Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemView} onPress={() => this._openCamera()}>
            <Text style={styles.actionsheetTitle}>Launch Camera</Text>
          </TouchableOpacity>
        </RBSheet>
      </View>
    );
  }
}
