import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert, Platform, Animated, Dimensions } from 'react-native';
import CustomHeader from '../../component/CustomHeader';
import { styles } from './style';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import CircleImage from '../../component/CircleImage';
import { setHeight, setWidth } from '../../utils/variable';
import CustomTextInput from '../../component/CustomTextInput';
import Dropdown from '../../component/Dropdown';
import colors from '../../utils/colors';
import { connect } from 'react-redux';
import EditProfileService from '../../services/EditProfileService';
import { errorAlert, retryAlert, successToast } from '../../helper/ToastHelper';
import FullScreenLoader from '../../component/FullScreenLoader';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Easing } from 'react-native-reanimated';
import { setScreenActivity } from '../../helper/AppActivityTrackingHelper';
import AppHeader from '../../component/AppHeader';
import { commonStyle } from '../../helper/commonStyle';

const { width, height } = Dimensions.get("screen")

class EditProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {

            image: '',
            imageObj: {},
            mobile: "",
            email: "",
            shop_name: '',
            gst_pan: "",
            gst_or_pan: "",
            company_name: '',
            owner_name: '',
            address: '',
            state: "",
            dist: "",
            pin: "",
            url: '',
            no_of_store: '',
            transport_pref: '',

            imageContainer: new Animated.Value(-width),
            imageVisibility: new Animated.Value(0)
        };
        this.RBSheet = React.createRef()
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

    componentDidMount() {
        this._getProfileInfo()
    }

    _getProfileInfo() {
        const param = {
            retailer_id: this.props.loginReducer.data.cust_manu_id
        }
        this.setState({
            showLoader: true
        })
        EditProfileService._getProfileInfoService(param).then(response => {
            const data = response?.data?.data?.data
            if (!data) {
                errorAlert("Message", "API error: Proper data is missing")
                return
            }
            
            console.log(data);
            this.setState({
                mobile: data?.retailer_info[0]?.mobile_no,
                email: data?.retailer_info[0]?.email,
                owner_name: data.retailer_info[0]?.owner_name,
                shop_name: data.retailer_info[0]?.shop_name,
                gst_pan: data.retailer_info[0]?.gst_no,
                gst_or_pan: data.retailer_info[0]?.gst_or_pan,
                company_name: data.retailer_info[0]?.company_name,
                address: data.retailer_info[0]?.bill_address,
                state: data.retailer_info[0]?.state_name,
                dist: data.retailer_info[0]?.city_name,
                pin: data.retailer_info[0]?.pin,
                image: this.props.loginReducer.data.image,
                showLoader: false
            }, () => {
                this.moveToRight()
            })
        }, error => {
            this.setState({
                showLoader: false
            })
            if (error.message == "server_error") {
                retryAlert(() => this._getProfileInfo())
            } else {
                errorAlert("Error", error.message)
            }
        })
    }

    _editProfile() {
        const imageObj = this.state.imageObj
        const param = {
            retailer_id: this.props.loginReducer.data.cust_manu_id,
            email_id: this.state.email,
            shop_name: this.state.shop_name,
            owner_name: this.state.owner_name,
            bill_address: this.state.address,
            store_photo: (Object.keys(imageObj).length > 0) ? 'data:image/jpg;base64,' + imageObj.assets[0].base64 : ''
        }
        console.log({
            retailer_id: this.props.loginReducer.data.cust_manu_id,
            email_id: this.state.email,
            shop_name: this.state.shop_name,
            owner_name: this.state.owner_name,
            bill_address: this.state.address,
        });
        this.setState({ showLoader: true })
        EditProfileService._updateProfileInfo(param).then(response => {
            successToast("SUCCESS!", "Data Updated Successfully.")
            this.setState({ showLoader: false })
            this._getProfileInfo()
        }, error => {
            this.setState({ showLoader: false })
            if (error.message == "server_error") {
                retryAlert(() => this._editProfile())
            } else {
                errorAlert("Error", error.message)
            }
        })

    }

    moveToRight() {
        Animated.timing(
            this.state.imageContainer,
            {
                toValue: 0,
                duration: 900,
                easing: Easing.linear(),
                useNativeDriver: false
            },
        ).start()

        Animated.timing(
            this.state.imageVisibility,
            {
                toValue: 1,
                duration: 900,
                useNativeDriver: false
            }
        ).start()
    }


    render() {
        return (
            <View style={styles.container}>
                {/* <CustomHeader   
                    showBackButton
                    onPressBack={() => {
                        setScreenActivity({ action_type: "going_back", action_id: '' })
                        this.props.navigation.goBack()}}
                    // showSearchIcon={true}
                    heading="EDIT PROFILE"
                    headingStyle={{
                        textAlign: 'center'
                    }}
                    showAnimation={true}
                    navigation={this.props.navigation}
                /> */}
                <AppHeader
                    showBackBtn
                    showSearch
                    showWishList
                    showLogo
                    navigation={this.props.navigation}
                />
                <KeyboardAwareScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled"  >

                    <Animated.View style={[{ opacity: this.state.imageVisibility, left: this.state.imageContainer }]}>
                        <CircleImage
                            container={{
                                alignSelf: 'center',
                                marginTop: setWidth(4)
                            }}
                            image={this.state.image}
                            onPress={() => this.RBSheet.open()}
                            footerImage={true}
                        />
                    </Animated.View>
                    <Text style={styles.changeProfilePicText}>Change Profile Picture</Text>

                    {
                        this.state.mobile !== "" &&
                        <Text style={[styles.label, commonStyle.gapTop20]}>Mobile</Text>
                    }
                    <CustomTextInput
                        placeholder="Mobile Number"
                        inputStyle={styles.inputStyle}
                        value={this.state.mobile}
                        container={{
                            marginTop: 0
                        }}
                        editable={false}
                    />

                    {
                        this.state.email !== "" &&
                        <Text style={[styles.label, commonStyle.gapTop10]}>Email</Text>
                    }
                    <CustomTextInput
                        inputStyle={styles.inputStyle}
                        value={this.state.email}
                        container={{
                            marginTop: 0
                        }}
                        placeholder="Enter Email"
                        onChangeText={(e) => this.setState({ email: e })}
                    />

                    {
                        this.state.shop_name !== "" &&
                        <Text style={[styles.label, commonStyle.gapTop10]}>Shop Name</Text>
                    }
                    <CustomTextInput
                        placeholder="Shop Name*"
                        inputStyle={styles.inputStyle}
                        value={this.state.shop_name}
                        container={{
                            marginTop: 0
                        }}
                        onChangeText={(e) => this.setState({ shop_name: e })}
                    />

                    {
                        // this.state.gst_pan !== "" &&
                        <Text style={[styles.label, commonStyle.gapTop10]}>
                            {
                                this.state.gst_or_pan
                            }
                        </Text>
                    }
                    <CustomTextInput                        
                        inputStyle={styles.inputStyle}
                        value={this.state.gst_pan}
                        container={{
                            marginTop: 0
                        }}
                      editable={false}
                      placeholder="********"
                    />

                    {
                        // this.state.company_name !== "" &&
                        <Text style={[styles.label, commonStyle.gapTop10]}>Company Name</Text>
                    }
                    <CustomTextInput
                        placeholder="Company Name*"
                        inputStyle={styles.inputStyle}
                        value={this.state.company_name}
                        container={{
                            marginTop: 0
                        }}
                        editable={false}
                    />

                    {
                        this.state.owner_name !== "" &&
                        <Text style={[styles.label, commonStyle.gapTop10]}>Owner</Text>
                    }
                    <CustomTextInput
                        placeholder="Owner*"
                        inputStyle={styles.inputStyle}
                        value={this.state.owner_name}
                        container={{
                            marginTop: 0
                        }}
                        onChangeText={(e) => this.setState({ owner_name: e })}
                    />


                    {
                        // this.state.address !== "" &&
                        <Text style={[styles.label, commonStyle.gapTop10]}>Address</Text>
                    }
                    <CustomTextInput
                        placeholder="Address*"
                        inputStyle={styles.inputStyle}
                        value={this.state.address}
                        container={{
                            marginTop: 0
                        }}
                        onChangeText={(e) => this.setState({ address: e })}
                    />

                    {
                        // this.state.state !== "" &&
                        <Text style={[styles.label, commonStyle.gapTop10]}>State</Text>
                    }
                    <CustomTextInput
                        placeholder="State*"
                        inputStyle={styles.inputStyle}
                        value={this.state.state}
                        container={{
                            marginTop: 0
                        }}
                        editable={false}
                    />

                    {
                        // this.state.dist !== "" &&
                        <Text style={[styles.label, commonStyle.gapTop10]}>City</Text>
                    }
                    <CustomTextInput
                        placeholder="City*"
                        inputStyle={styles.inputStyle}
                        value={this.state.dist}
                        container={{
                            marginTop: 0
                        }}
                        editable={false}
                    />

                    {
                        // this.state.pin !== "" &&
                        <Text style={[styles.label, commonStyle.gapTop10]}>Pin</Text>
                    }
                    <CustomTextInput
                        placeholder="Pin*"
                        inputStyle={styles.inputStyle}
                        value={this.state.pin}
                        container={{
                            marginTop: 0
                        }}
                        editable={false}
                    />


                </KeyboardAwareScrollView>
                <View style={styles.footerBtnContainer} >
                    <TouchableOpacity style={[styles.footerBtn, { backgroundColor: colors.white }]} onPress={() => {
                        setScreenActivity({ action_type: "going_back", action_id: '' })
                        this.props.navigation.goBack()
                    }}>
                        <Text style={[styles.btnText, { color: colors.primaryyellow }]}>CANCEL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.footerBtn} onPress={() => this._editProfile()}>
                        <Text style={styles.btnText}>SAVE</Text>
                    </TouchableOpacity>
                </View>
                {
                    this.state.showLoader &&
                    <FullScreenLoader
                        isOpen={this.state.showLoader}
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

const mapStateToProps = state => {
    return {
        loginReducer: state.loginReducer,
    }
}

const mapDispatchToProps = dispatch => ({
})

const connectComponent = connect(mapStateToProps, mapDispatchToProps)
export default connectComponent(EditProfileScreen)

