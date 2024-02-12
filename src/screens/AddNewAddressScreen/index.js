import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, BackHandler } from 'react-native';
import AppHeader from '../../component/AppHeader';
import { styles } from './style';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CustomTextInput from '../../component/CustomTextInput';
import colors from '../../utils/colors';
import { fonts, setWidth } from '../../utils/variable';
import AddressService from '../../services/AddressService';
import Dropdown from '../../component/Dropdown';
import { errorAlert, retryAlert, successToast } from '../../helper/ToastHelper';
import { connect } from 'react-redux';
import FullScreenLoader from '../../component/FullScreenLoader';

import { setScreenActivity } from '../../helper/AppActivityTrackingHelper';

class AddNewAddressScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shopname: '',
            address: '',
            street: '',
            state: [],
            selectedState: '',
            district: [],
            selectedDistrict: '',
            city: '',
            pin: '',
            mobile: '',
            address_book_id: '',

            showOtherLoader: false,
            showLoader: false
        };
        this.param = this.props.route.params
        // console.log(this.param);
    }

    static getDerivedStateFromProps(props, state) {

        return {
            // address_book_id: ( props.route.params && props.route.params.address_item)? props.route.params.address_item.address_book_id : '',
            // shopname: ( props.route.params && props.route.params.address_item)? props.route.params.address_item.name : '',
            // address:  ( props.route.params && props.route.params.address_item)? props.route.params.address_item.address : '',
            // street:  ( props.route.params && props.route.params.address_item)? props.route.params.address_item.street_address : '',
            // selectedState: ( props.route.params && props.route.params.address_item)? props.route.params.address_item.state_id : '',
            // selectedDistrict: ( props.route.params && props.route.params.address_item)? props.route.params.address_item.district_id : '',
            // city: ( props.route.params && props.route.params.address_item)? props.route.params.address_item.city : '',
            // pin: ( props.route.params && props.route.params.address_item)? props.route.params.address_item.pin : '',
            // mobile: ( props.route.params && props.route.params.address_item)? props.route.params.address_item.mobile : '',
        }
    }
 
    async _fetchData() {
        
        this.setState({ showOtherLoader: true })
        await AddressService._fetchBasicInfoService().then(response => {
            const data = response.data.data.data
            // console.log('param  => ', this.param);
            let state = []
            for (let index = 0; index < data.company_state.length; index++) {
                const element = data.company_state[index];
                state.push({
                    label: element.zone_name, value: element.zone_id
                })
            }
            this._fetchCities((this.param && this.param.address_item) ? this.param.address_item.state_id : '')
            this.setState({
                state: state,
                showOtherLoader: false,

                address_book_id: (this.param && this.param.address_item) ? this.param.address_item.address_book_id : '',
                shopname: (this.param && this.param.address_item) ? this.param.address_item.name : '',
                address: (this.param && this.param.address_item) ? this.param.address_item.address : '',
                street: (this.param && this.param.address_item) ? this.param.address_item.street_address : '',
                selectedState: (this.param && this.param.address_item) ? this.param.address_item.state_id : '',
                selectedDistrict: (this.param && this.param.address_item) ? this.param.address_item.district_id : '',
                city: (this.param && this.param.address_item) ? this.param.address_item.city : '',
                pin: (this.param && this.param.address_item) ? this.param.address_item.pin : '',
                mobile: (this.param && this.param.address_item) ? this.param.address_item.mobile : '',
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
        await AddressService._fetchCitiesService(param).then(response => {
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

    _saveAddress() {

        const param = {
            id: this.state.address_book_id,
            retailer_id: this.props.loginReducer.data.cust_manu_id,
            address1: this.state.address,
            pin: this.state.pin,
            state: this.state.selectedState,
            entry_zone_id: this.state.selectedDistrict,
            street_address: this.state.street,
            city_name: this.state.city,
            shop_name: this.state.shopname,
            mobile_no: this.state.mobile
        }

        this.setState({ showLoader: true })

        AddressService._saveNewAddressService(param).then(response => {
            //console.log(response);
            this.setState({ showLoader: false })
            successToast("SUCCESS!", "Successfully Added.")  
            setScreenActivity({ action_type: "going_back", action_id: '' })          
            this.props.navigation.goBack()
        }, error => {
            this.setState({ showLoader: false })
            if (error.message == "server_error") {
                retryAlert(() => this._saveAddress())
            } else {
                errorAlert("Error", error.message)
            }
        })
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );
        this._fetchData()
    }

    componentWillUnmount() {
        this.backHandler.remove()
    }

    backAction = () => {
        setScreenActivity({ action_type: "going_back", action_id: '' })
        if (!this.props.navigation.canGoBack()) {
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
              })
        } else {
            this.props.navigation.goBack();
        }
        return true
    };

    render() {

        return (
            <View style={styles.container}>
                {/* <CustomHeader
                    heading={(this.param) ? "EDIT ADDRESS" : "ADD A NEW ADDRESS"}
                    headingStyle={{
                        textAlign: "center"
                    }}
                    showBackButton={true}
                    onPressBack={this.backAction}
                /> */}
                <AppHeader
                    showBackBtn
                    // showSearch
                    // showWishList
                    showLogo
                    navigation={this.props.navigation}
                />
                <KeyboardAwareScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                    <CustomTextInput
                        placeholder="Shop Name*"
                        inputStyle={styles.inputStyle}
                        value={this.state.shopname}
                        onChangeText={(e) => this.setState({ shopname: e })}
                    />
                    <CustomTextInput
                        placeholder="Address Line 1*"
                        inputStyle={styles.inputStyle}
                        value={this.state.address}
                        onChangeText={(e) => this.setState({ address: e })}
                    />
                    <CustomTextInput
                        placeholder="Street Address*"
                        inputStyle={styles.inputStyle}
                        value={this.state.street}
                        onChangeText={(e) => this.setState({ street: e })}
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
                                    color: colors.dark_charcoal
                                }}
                                value={this.state.selectedState}
                                placeholder={"State"}
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
                                    color: colors.dark_charcoal
                                }}
                                value={this.state.selectedDistrict}
                                placeholder={"District"}
                                onChange={(v) => this.setState({ selectedDistrict: v })}
                            />
                    }

                    <CustomTextInput
                        placeholder="City*"
                        inputStyle={styles.inputStyle}
                        value={this.state.city}
                        onChangeText={(e) => this.setState({ city: e })}
                    />
                    <CustomTextInput
                        placeholder="Pincode*"
                        inputStyle={styles.inputStyle}
                        keyboardType="number-pad"
                        value={this.state.pin}
                        onChangeText={(e) => this.setState({ pin: e })}
                    />
                    <CustomTextInput
                        placeholder="Mobile*"
                        inputStyle={styles.inputStyle}
                        keyboardType="number-pad"
                        value={this.state.mobile}
                        onChangeText={(e) => this.setState({ mobile: e })}
                    />
                </KeyboardAwareScrollView>
                <View style={styles.footerView}>
                    <TouchableOpacity style={[styles.footerBtn, { backgroundColor: colors.white }]} onPress={this.backAction}>
                        <Text style={[styles.footerBtnText, { color: colors.lightRed }]}>CANCEL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.footerBtn, { marginLeft: setWidth(2) }]} onPress={() => this._saveAddress()}>
                        <Text style={styles.footerBtnText}>
                            SAVE
                        </Text>
                    </TouchableOpacity>
                </View>

                {
                    this.state.showLoader &&
                    <FullScreenLoader />
                }
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        loginReducer: state.loginReducer,
    }
}

const mapDispatchToProps = dispatch => ({
    clearLoginData: () => dispatch(clearLoginData())
})
const connectComponent = connect(mapStateToProps, mapDispatchToProps)
export default connectComponent(AddNewAddressScreen)
