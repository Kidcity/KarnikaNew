import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Animated, BackHandler } from 'react-native';
import CustomButton from '../../component/CustomButton';
import CustomHeader from '../../component/CustomHeader';
import colors from '../../utils/colors';
import { styles } from './style';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { setWidth } from '../../utils/variable';
import AddressCard from '../../component/AddressCard';
import AddressService from '../../services/AddressService';
import { errorAlert, retryAlert, successToast } from '../../helper/ToastHelper';
import { connect } from 'react-redux';
import { setAddressAction, setDefaultAddressAction } from '../../redux/actions/addressAction';
import { Easing } from 'react-native-reanimated';
import { setScreenActivity } from '../../helper/AppActivityTrackingHelper';
import AppHeader from '../../component/AppHeader';

class ChangeAddressScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shipping_address: [],
            showLoader: false,
            opacity: new Animated.Value(0)
        };

    }

    static getDerivedStateFromProps(nextProps, nextState) {
        return {
            shipping_address: nextProps.addressReducer.shipping_addresses ? nextProps.addressReducer.shipping_addresses : []
        }
    }

    renderItem = ({ item, index }) => {
        return (
            <Animated.View style={{opacity: this.state.opacity}}>
                <AddressCard
                    item={item}
                    showCheckBox={true}
                    onPressCheckBox={() => this._selectAddress(index)}
                    containerStyle={{
                        marginTop: setWidth(0)
                    }}
                    showEditButton={true}
                    onPressEditAddress={() => this.props.navigation.navigate("AddNewAddress", { address_item: item })}
                    onPressDeleteAddress={() => this._deleteAddress(item.address_book_id)}
                />
            </Animated.View>
        )
    }

    _selectAddress(addressindex) {
        let shipping_address = this.state.shipping_address
        let list = []
        if (shipping_address && shipping_address.length) {
            for (let index = 0; index < shipping_address.length; index++) {
                const element = shipping_address[index];
                list.push({ ...element, isChecked: (index == addressindex) ? true : false })
            }
            // this.setState({
            //     shipping_address: list
            // })
            this.props.setAddressAction(list)

        }
    }

    _deleteAddress(id) {

        AddressService._deleteAddressService(id).then(response => {

            successToast("Success", "Address Deleted.")
            this._getAddressList()
        }, error => {
            //console.log(error.data.response);
            let message = error.message
            // console.log('data', data);
            if (error.data.response.data.message) {
                message = error.data.response.data.message
            }
            if (error.message == "server_error") {
                retryAlert(() => this._deleteAddress())
            } else {
                errorAlert("Error", message)
            }
        })
    }

    _saveDefaultAddress() {

        const filtered_data = this.state.shipping_address.filter(item => item.isChecked == true)

        if (filtered_data.length > 0) {
            AddressService._setDefaultAddress(filtered_data[0]).then(response => {
                console.log('_saveDefaultAddress ====> ', response);
                successToast("Success", "Default Address Saved!")
                setScreenActivity({ action_type: "going_back", action_id: '' })
                this.props.navigation.goBack()
            })
        } else {
            errorAlert("Oops!", "Please choose an address.")
        }
    }

    _getAddressList() {
        const param = {
            retailer_id: this.props.loginReducer.data.cust_manu_id,
            user_type_id: 3
        }

        this.setState({ showLoader: true })
        AddressService._getAddressService(param).then(response => {

            this.setState({
                showLoader: false
                // shipping_address: response
            },() => {
                this.visibleContent()
            })
        }, error => {
            this.setState({ showLoader: false })
            if (error.message == "server_error") {
                retryAlert(() => this._getAddressList())
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
        this._getAddressList()
    }

    componentWillUnmount() {
        this.backHandler.remove()
    }

    visibleContent(){
        Animated.timing(
            this.state.opacity,
            {
                toValue: 1,
                duration: 500,
                easing: Easing.linear(),
                useNativeDriver: false
            }
        ).start()
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
                    heading="CHANGE ADDRESS"
                    headingStyle={{
                        textAlign: "center"
                    }}
                    showBackButton={true}
                    onPressBack={() => {this.backAction()}}
                    showAnimation={true}
                /> */}
                <AppHeader
                    showBackBtn
                    showSearch
                    showWishList
                    showLogo
                    navigation={this.props.navigation}
                />
                <View style={styles.content}>
                    <CustomButton
                        container={{ backgroundColor: colors.lightRed, marginTop: setWidth(5) }}
                        label="ADD NEW ADDRESS"
                        labelStyle={{ color: colors.white }}
                        iconColor={colors.white}
                        leftIcon={true}
                        rightIcon={<EvilIcons name='location' size={setWidth(6)} color={colors.white} />}
                        onPress={() => this.props.navigation.navigate("AddNewAddress")}
                    />

                    <View style={{ flex: 1 }}>

                        {
                            this.state.showLoader ?
                                <ActivityIndicator animating size={setWidth(8)} color={colors.yellow} style={{ marginTop: setWidth(5) }} />
                                :
                                <FlatList
                                    data={this.state.shipping_address}
                                    renderItem={this.renderItem}
                                    keyExtractor={(item, index) => index}
                                    style={{ marginTop: setWidth(4) }}
                                    ItemSeparatorComponent={() => <View style={{ marginTop: setWidth(2) }} />}
                                />
                        }

                    </View>
                </View>
                <View style={styles.footerView}>
                    <TouchableOpacity style={[styles.footerBtn, { backgroundColor: colors.white }]} onPress={this.backAction}>
                        <Text style={[styles.footerBtnText, { color: colors.lightRed }]}>CANCEL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.footerBtn, { marginLeft: setWidth(2) }]} onPress={() => this._saveDefaultAddress()}>
                        <Text style={styles.footerBtnText}>SAVE</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        loginReducer: state.loginReducer,
        addressReducer: state.addressReducer,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setDefaultAddressAction: (value) => dispatch(setDefaultAddressAction(value)),
        setAddressAction: (data) => dispatch(setAddressAction(data))
    }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)
export default connectComponent(ChangeAddressScreen)
