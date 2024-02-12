import React, { Component } from 'react';
import { View, Text, Image, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Feather from 'react-native-vector-icons/Feather'
import CustomButton from '../../component/CustomButton';
import CustomHeader from '../../component/CustomHeader';
import CustomTextInput from '../../component/CustomTextInput';
import colors from '../../utils/colors';
import { fonts, setWidth } from '../../utils/variable';
import { styles } from './style';
import { images } from '../../utils/variable';
import ResetPasswordService from '../../services/ResetPasswordService';
import { errorAlert, retryAlert, successToast } from '../../helper/ToastHelper';
import FullScreenLoader from '../../component/FullScreenLoader';
import { Strings } from '../../utils/strings';
import { setScreenActivity } from '../../helper/AppActivityTrackingHelper';
import AppHeader from '../../component/AppHeader';

export default class ResetPasswordScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '', //'9131574648',
            showLoader: false
        };
    }

    async _resetPassword() {
        const param = {
            phone_number: this.state.phone
        }

        
        this.setState({ showLoader: true })
        await ResetPasswordService._resetpasswordService(param).then(response => {
         
            const id = response?.data?.data?.user?.myid
            this.setState({ showLoader: false })
            successToast("OTP SENT!", "Please check your Mobile.")
            this.props.navigation.navigate("OTPVerificationScreen", { phone: this.state.phone, id: id, what_for: "reset_password" })
        }, error => {
            this.setState({ showLoader: false })
            if (error.message == "server_error") {  
                retryAlert(() => this._resetPassword())
              } else {
                errorAlert("Error", error.message)
              }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                {/* <CustomHeader
                    heading={Strings.resetScreenStrings.heading}
                    onPressBack={() =>{
                        // setScreenActivity({ action_type: "going_back", action_id: '' })
                        this.props.navigation.goBack()}}
                    headingStyle={{textAlign: 'center'}}
                /> */}
                <AppHeader
                    showBackBtn
                    noRightIcons
                    // showSearch
                    // showWishList
                    showLabel
                    label={Strings.resetScreenStrings.heading}
                    navigation={this.props.navigation}
                />
                <KeyboardAwareScrollView contentContainerStyle={styles.content} >

                    <Image
                        source={images.phone_hand}
                        style={styles.image}
                        resizeMode="contain"
                    />

                    <CustomTextInput
                        inputStyle={styles.inputStyle}
                        leftIcon={<Feather name='phone-call' size={setWidth(4)} color={colors.grey3} />}
                        placeholder={Strings.resetScreenStrings.phonenumberText}
                        value={this.state.phone}
                        onChangeText={(e) => this.setState({ phone: e })}
                        keyboardType="number-pad"
                    />

                    <CustomButton
                        container={{
                            backgroundColor: colors.themeColor,
                            marginTop: setWidth(10),
                            paddingHorizontal: setWidth(7),
                            paddingRight: setWidth(9),
                        }}
                        label={Strings.resetScreenStrings.btnText}
                        labelStyle={{ color: colors.white }}
                        iconColor={colors.white}
                        onPress={() => this._resetPassword()}
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
