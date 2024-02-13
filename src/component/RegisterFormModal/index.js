import { ActivityIndicator, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { PureComponent } from 'react'
import { styles } from './style'
import CustomTextInput from '../CustomTextInput'
import { Strings } from '../../utils/strings'
import { setWidth } from '../../utils/variable'
import colors from '../../utils/colors'
import Dropdown from '../Dropdown'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CustomButton from '../CustomButton'
import RegisterService from '../../services/RegisterService'
import EmptyCartModal from '../EmptyCartModal'
import { store } from '../../redux/store'
import { successToast } from '../../helper/ToastHelper'

export default class RegisterFormModal extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            email: "",
            isgst: false,
            pangstno: "CDSPG0015",
            pangstLoader: false,
            companyname: "sd sdsd",
            address: "wewe",
            state: [],
            district: [],
            selectedState: "",
            selectedDistrict: "",
            showStateLoader: false,
            showdistrictLoader: false,
            city: "asds",
            pin: "123456",
            errMessage: "",
            showErrorModal: false,
            validationMessage: {
                company_name: "Please enter company name",
                bill_address: "Please enter bill address",
                state: "Please select state",
                district: "Please select district",
                city: "Please enter city",
                pin: "Please enter pin."
            }
        }
    }

    componentDidMount() {
        this._fetchState()
    }

    async _fetchState() {
        this.setState({ showStateLoader: true })
        await RegisterService._fetchBasicInfoService().then(response => {
            const data = response.data.data.data
            let state = []
            for (let index = 0; index < data.company_state.length; index++) {
                const element = data.company_state[index];
                state.push({
                    label: element.zone_name, value: element.zone_id
                })
            }

            this.setState({
                state: state,
                showStateLoader: false
            })
        }, error => {
            this.setState({ showStateLoader: false })
            if (error.message == "server_error") {
                retryAlert(() => this._fetchData())
            } else {
                this.setState({
                    errMessage: error.message,
                    showErrorModal: true
                })
            }
        })
    }

    async _fetchCities(value) {
        this.setState({ selectedState: value })
        const param = {
            zone_id: value
        }
        this.setState({ showdistrictLoader: true })
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
                showdistrictLoader: false
            })
        }, error => {
            this.setState({ showdistrictLoader: false })
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

    fillUpPanGST() {
        if (this.state.isgst) {
            this._checkValidGST()
        } else {
            this._checkValidPAN()
        }
    }

    async _checkValidGST() {
        const param = {
            gst_no: this.state.pangstno
        }
        this.setState({ pangstLoader: true })

        await RegisterService._checkValidGSTService(param).then(response => {

            if (response?.data?.data?.result) {
                const data = response?.data?.data?.result

                this.setState({
                    companyname: data?.legal_name,
                    city: data?.primary_business_address?.location,
                    address: data?.primary_business_address?.full_address,
                    pin: data?.primary_business_address?.pincode,
                    pangstLoader: false
                })
            } else {
                this.setState({ pangstLoader: false })
            }
        }, error => {
            this.setState({
                pan_no: ''
            })
            this.setState({ pangstLoader: false })
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
                    errMessage: "GST Number error : " + error.message,
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

        this.setState({ pangstLoader: true })
        await RegisterService._checkValidPANService(param).then(response => {

            console.log(response?.data?.data?.data);
            if (response?.data?.data?.data) {
                const data = response?.data?.data?.data
                this.setState({
                    pangstLoader: false
                })
            } else {
                this.setState({ pangstLoader: false })
            }
        }, error => {

            this.setState({ pangstLoader: false })
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
                    errMessage: "PAN Number error : " + error.message,
                    showErrorModal: true
                })
                // errorAlert("Error", error.message)
            }
        })
    }

    updateProfile = () => {

        const state = this.state
        let err = ""
        if (state.pangstno === "") {
            err = state.isgst ? "Please enter GST number" : "Please enter Pan number"
        }
        if (state.companyname === "") {
            err = state.validationMessage.company_name
        }
        else if (state.address === "") {
            err = state.validationMessage.bill_address
        }
        else if (state.selectedState === "") {
            err = state.validationMessage.state
        }
        else if (state.selectedDistrict === "") {
            err = state.validationMessage.district
        }
        else if (state.city === "") {
            err = state.validationMessage.city
        }
        else if (state.pin === "") {
            err = state.validationMessage.pin
        }

        if (err !== "") {
            this.setState({
                errMessage: err,
                showErrorModal: true
            })
            return
        }

        const param = {
            retailer_id: store.getState().loginReducer.data.cust_manu_id,
            email_id: this.state.email,
            gst_no: this.state.pangstno,
            is_pan_or_gst: (this.state.isgst) ? 1 : 0,
            company_name: this.state.companyname,
            bill_address: this.state.address,
            zone: this.state.selectedState,
            city_id: this.state.selectedDistrict,
            city_name: this.state.city,
            pin: this.state.pin,
        }

        console.log(param);

        RegisterService._updateProfileService(param).then(response => {
            if(response.status){
                successToast("SUCCESS!", "Profile Updated.")            
                this.props.onClose()
            }
        }, error => {
            this.setState({ showLoader: false })
            if (error.message == "server_error") {
                retryAlert(() => this.updateProfile())
            } else {
                
                this.setState({
                    errMessage: error.message,
                    showErrorModal: true
                })
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.content}>

                    <KeyboardAwareScrollView>

                        <Text style={styles.heading}>Please fill the required details</Text>

                        <CustomTextInput
                            placeholder={Strings.signupScreenStrings.emailText}
                            inputStyle={styles.inputStyle}
                            keyboardType="email-address"
                            value={this.state.email}
                            onChangeText={(e) => this.setState({ email: e })}
                        />

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
                            {
                                this.state.pangstLoader &&
                                <ActivityIndicator animating={true} color={colors.themeColor} style={{ alignSelf: 'flex-end', marginHorizontal: 10 }} />
                            }
                            <View style={[styles.row, { alignItems: 'flex-end' }]}>
                                <TouchableOpacity style={[styles.smallBtn, { marginRight: setWidth(1) }, (this.state.isgst) && styles.activeBtn]} onPress={() => this.setState({ isgst: true })}>
                                    <Text style={[styles.btnText, (this.state.isgst) && styles.activeBtnText]}>GST</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.smallBtn, (!this.state.isgst) && styles.activeBtn]} onPress={() => this.setState({ isgst: false })}>
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

                        <CustomTextInput
                            placeholder={Strings.signupScreenStrings.billingaddressText}
                            inputStyle={styles.inputStyle}
                            value={this.state.address}
                            onChangeText={(e) => this.setState({ address: e })}
                        />

                        {
                            this.state.showStateLoader ?
                                <ActivityIndicator animating={true} color={colors.themeColor} />
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
                            this.state.showdistrictLoader ?
                                <ActivityIndicator animating={true} color={colors.themeColor} />
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
                            keyboardType="number-pad"
                            onChangeText={(e) => this.setState({ pin: e })}
                        />

                        <CustomButton
                            container={{
                                backgroundColor: colors.themeColor,
                                marginTop: setWidth(10),
                                paddingHorizontal: setWidth(7),
                                paddingRight: setWidth(9),
                            }}
                            label="SUBMIT"
                            labelStyle={{ color: colors.white }}
                            iconColor={colors.white}
                            onPress={() => this.updateProfile()}
                            leftIcon
                        />

                    </KeyboardAwareScrollView>


                </View>
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
            </View>

        )
    }
}