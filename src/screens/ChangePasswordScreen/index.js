import React, { Component } from 'react';
import { View, Text, Image, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomButton from '../../component/CustomButton';
import CustomHeader from '../../component/CustomHeader';
import CustomTextInput from '../../component/CustomTextInput';
import FullScreenLoader from '../../component/FullScreenLoader';
import { errorAlert, retryAlert, successToast } from '../../helper/ToastHelper';
import ChangePasswordService from '../../services/ChangePasswordService';
import colors from '../../utils/colors';
import { Strings } from '../../utils/strings';
import { images, setWidth } from '../../utils/variable';
import { styles } from './style';
import AppHeader from '../../component/AppHeader';

export default class ChangePasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newpassword: '',
      confpassword: '',
      showLoader: false
    };
  }

  async _changePassword() {
    //this.props.navigation.navigate("Login")
    const param = {
      id: this.props.route.params.id,
      password: this.state.newpassword,
      password_confirmation: this.state.confpassword
    }
    this.setState({ showLoader: true })
    await ChangePasswordService._changepasswordService(param).then(response => {
      this.setState({ showLoader: false })
      successToast("SUCCESS!",Strings.changepasswordScreenStrings.successMessageText)
      this.props.navigation.navigate("Login")
    }, error => {
      this.setState({ showLoader: false })
      if (error.message == "server_error") {
        retryAlert(() => this._changePassword())
      } else {
        errorAlert("Error", error.message)
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <CustomHeader
          heading={Strings.changepasswordScreenStrings.heading}
          onPressBack={() => {this.props.navigation.goBack()}}
          headingStyle={{ textAlign: 'center' }}
        /> */}
         <AppHeader
          showBackBtn
          noRightIcons
          // showSearch
          // showWishList
          showLabel
          label={Strings.changepasswordScreenStrings.heading}
          navigation={this.props.navigation}
        />

        <KeyboardAwareScrollView contentContainerStyle={styles.content} >

          <Image source={images.note_hand} resizeMode="contain" style={styles.image} />

          <CustomTextInput
            inputStyle={styles.inputStyle}
            placeholder={Strings.changepasswordScreenStrings.passwordText}
            value={this.state.newpassword}
            onChangeText={(e) => this.setState({ newpassword: e })}
            secureTextEntry
          />
          <CustomTextInput
            inputStyle={styles.inputStyle}
            placeholder={Strings.changepasswordScreenStrings.confirmpasswordText}
            value={this.state.confpassword}
            onChangeText={(e) => this.setState({ confpassword: e })}
            secureTextEntry
          />
          <CustomButton
            container={{
              backgroundColor: colors.themeColor,
              marginTop: setWidth(6),
              paddingHorizontal: setWidth(7),
              paddingRight: setWidth(9),
            }}
            label={Strings.changepasswordScreenStrings.btnText}
            labelStyle={{ color: colors.white }}
            iconColor={colors.white}
            onPress={() => this._changePassword()}
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
