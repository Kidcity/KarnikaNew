import React, { Component } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Animated, Linking, BackHandler } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomHeader from '../../component/CustomHeader';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import colors from '../../utils/colors';
import { fonts, formattedCurrency, icons, images, rupifi_status, setWidth } from '../../utils/variable';
import { styles } from './style';
import { connect } from 'react-redux';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Feather from 'react-native-vector-icons/Feather'
import TextCard from '../../component/TextCard';
import { clearLoginData } from '../../redux/actions/loginAction';
import { clearProductListData } from '../../redux/actions/productListAction';
import { clearProductFilterAction, setProductFilterAction } from '../../redux/actions/commonAction';
import FooterTabMenu from '../../component/FooterTabMenu';
import FastImage from 'react-native-fast-image';
import { Easing } from 'react-native-reanimated';
import { logout } from '../../helper/Logout';
import { setScreenActivity } from '../../helper/AppActivityTrackingHelper';
import FastImageComponent from '../../component/FastImageComponent';
import CustomButton from '../../component/CustomButton';
import AppHeader from '../../component/AppHeader';
import { commonStyle } from '../../helper/commonStyle';

class ProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userdata: {},
            isDemoLogin: false,
            imageContainer: new Animated.Value(0),
            imageVisibility: new Animated.Value(1),
            city_wallet_amt: 0,
            rupifi_credit_balance: 0,
            rupifi_soa_url: '',
            rupifi_account_status: '',
            rupifi_repayment_url: '',
            is_ws_not: 0
        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        return {
            userdata: props.loginReducer.data ? props.loginReducer.data : {},
            isDemoLogin: props.loginReducer.hasOwnProperty("demoLoggedin") ? props.loginReducer.demoLoggedin : false,
            city_wallet_amt: props.loginReducer.city_wallet_amt ? props.loginReducer.city_wallet_amt : 0,
            rupifi_credit_balance: props.rupifi_credit_balance ? props.rupifi_credit_balance : 0,
            rupifi_soa_url: props.rupifi_soa_url ? props.rupifi_soa_url : '',
            rupifi_account_status: props.rupifi_account_status ? props.rupifi_account_status : '',
            rupifi_repayment_url: props.rupifi_repayment_url ? props.rupifi_repayment_url : '',
            is_ws_not: props.hasOwnProperty("is_ws_not") ? props.is_ws_not : 0
        }
    }

    componentDidMount() {
        //alert('mount')
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        this.props.navigation.addListener('blur', () => {
            this.setState({
                imageContainer: new Animated.Value(0),
                imageVisibility: new Animated.Value(1),
            })
        })
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    _logout() {
        logout()
    }

    async _navigateToProductList(searchText = '') {
        await this.props.clearProductListData()
        await this.props.clearProductFilterAction()

        let param = this.props.filter
        param = {
            ...param,
            searchValue: searchText
        }
        await this.props.setProductFilterAction(param)
        // return
        this.props.navigation.navigate("ProductListing")
    }

    moveToRight() {
        Animated.timing(
            this.state.imageContainer,
            {
                toValue: setWidth(90),
                duration: 900,
                easing: Easing.linear(),
                useNativeDriver: false
            },
        ).start()

        Animated.timing(
            this.state.imageVisibility,
            {
                toValue: 0,
                duration: 900,
                useNativeDriver: false
            }
        ).start()
        setTimeout(() => {
            this.props.navigation.navigate("EditProfile")
        }, 600);
    }

    handleBackButtonClick() {
        setScreenActivity({ action_type: "going_back", action_id: '', city_id: "" })
        this.props.navigation.goBack();
        return true;
    }

    render() {
        console.log("this.state.userdata.image ------- ", this.state.userdata.image);
        return (
            <View style={styles.contianer}>
                {/* <CustomHeader
                    showMenu={true}
                    showingOneIcon={true}
                    showSearchIcon={true}
                    heading="MY PROFILE"
                    headingStyle={{
                        textAlign: 'center'
                    }}
                    onSearch={(searchText) => {
                        this._navigateToProductList(searchText)
                    }}
                    navigation={this.props.navigation}
                /> */}
                <AppHeader
                    showMenu
                    showSearch
                    showWishList
                    showLogo
                    navigation={this.props.navigation}
                />
                <ScrollView contentContainerStyle={styles.content}>
                    <Animated.View style={[{ left: this.state.imageContainer, opacity: this.state.imageVisibility }]}>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={colors.drawerProfileContainer} style={styles.profileInfoContainer}>
                            {
                                this.state.isDemoLogin ?
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <FastImageComponent
                                            source={images.logo}
                                            resizeMode={FastImage.resizeMode.cover}
                                            style={{
                                                width: setWidth(20),
                                                height: setWidth(20),
                                            }}
                                        />
                                        <Text style={{ fontFamily: fonts.fontBold, color: colors.dark_charcoal, fontSize: setWidth(4), color: colors.white }}>You Loggedin As Demo User</Text>
                                        <CustomButton
                                            container={{
                                                backgroundColor: colors.white,
                                                borderColor: colors.primaryyellow,
                                                borderWidth: setWidth(0.5),
                                                marginTop: setWidth(5),
                                                paddingHorizontal: setWidth(7),
                                                paddingRight: setWidth(9),
                                            }}
                                            label="Sign Up Now"
                                            labelStyle={{ color: colors.primaryyellow }}
                                            iconColor={colors.primaryyellow}
                                        // onPress={() => { this.props.navigation.goBack() }}
                                        // leftIcon
                                        />
                                    </View>
                                    :
                                    <>
                                        <View style={styles.row}>
                                            <View style={styles.imageContainer}>
                                                {
                                                    (this.state.userdata.image != '') ?
                                                        <FastImage
                                                            style={[styles.image]}
                                                            source={{
                                                                uri: this.state.userdata.image,
                                                                priority: FastImage.priority.high,
                                                            }}
                                                            resizeMode={FastImage.resizeMode.cover}
                                                        />
                                                        :
                                                        <Image source={images.profileimg} style={styles.image} resizeMode="cover" />
                                                }
                                            </View>
                                            <View style={styles.nameContainer}>
                                                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.name}>{this.state.userdata.shop_name}</Text>
                                                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.name2}>Hi {this.state.userdata.first_name}</Text>
                                            </View>
                                            <TouchableOpacity onPress={() => this.moveToRight()} style={{ justifyContent: 'flex-start', marginRight: setWidth(2) }}>
                                                <Text style={[{ fontFamily: fonts.fontRegular, color: colors.white }, commonStyle.text11]}>Edit Profile</Text>
                                            </TouchableOpacity>
                                        </View>
                                        {
                                            this.state.userdata?.default_address &&
                                            <View style={[styles.row, { alignItems: 'center', justifyContent: 'center', marginTop: setWidth(3) }]}>
                                                <SimpleLineIcons name='location-pin' size={setWidth(6)} color={colors.white} />
                                                <Text style={styles.location}>
                                                    {this.state.userdata?.default_address?.entry_address1} , {this.state.userdata?.default_address?.entry_city} {this.state.userdata?.default_address?.entry_postcode} {this.state.userdata?.default_address?.zone_name}
                                                </Text>
                                            </View>
                                        }
                                    </>
                            }
                        </LinearGradient>
                    </Animated.View>

                    {
                        <TextCard
                            image={icons.shopping_bag}
                            leftText={this.state.is_ws_not == 1 ? "My Orders" : "My Request"}
                            onPress={() => { this.props.navigation.navigate("MyOrders") }}
                            rightIcon={<Feather name='arrow-right' size={setWidth(5)} color={colors.dark_charcoal} />}
                            containerStyle={{
                                borderBottomWidth: 0
                            }}
                        />
                    }

                    <TextCard
                        image={icons.heart}
                        leftText="WishList"
                        onPress={() => { this.props.navigation.navigate("WishList") }}
                        rightIcon={<Feather name='arrow-right' size={setWidth(5)} color={colors.dark_charcoal} />}
                        containerStyle={{
                            borderBottomWidth: 0
                        }}
                    />

                    {/*
                        this.state.is_ws_not === 1 &&
                        <TextCard
                            image={icons.credit_card}
                            leftText="City Wallet"
                            middleView={
                                <View style={[styles.walletAmountView]}>
                                    <Text style={[styles.walletAmount]}>INR {this.state.city_wallet_amt}</Text>
                                </View>
                            }
                            onPress={() => { this.props.navigation.navigate("CityWallet") }}
                            rightIcon={<Feather name='arrow-right' size={setWidth(5)} color={colors.dark_charcoal} />}
                            containerStyle={{
                                borderBottomWidth: 0
                            }}
                        />
                        */ }

                    {/* <TextCard
                        containerStyle={{
                            borderBottomWidth: 0
                        }}
                        leftIcon={<Feather name='loader' size={setWidth(6)} color={colors.dark_charcoal} />}
                        leftText={(this.state.rupifi_credit_balance) ? "Available Credit" : "Apply For Credit"}
                        // leftText="Apply For Credit"
                        onPress={() => {

                            (this.state.rupifi_credit_balance) ?
                                Linking.openURL(this.state.rupifi_soa_url)
                                :
                                this.props.navigation.navigate("ApplyForCredit")
                        }}
                        middleView={
                            (this.state.rupifi_credit_balance) ?
                                <View style={[styles.walletAmountView, {}]}>
                                    <Text style={[styles.walletAmount]} numberOfLines={1}>INR {(this.state.rupifi_credit_balance && formattedCurrency(this.state.rupifi_credit_balance))}</Text>
                                </View> :
                                <></>
                        }
                        // middleView={
                        //     <View style={[{ backgroundColor: colors.white, }]}>
                        //         <Text style={[styles.walletAmount, { color: colors.dark_charcoal, marginLeft: setWidth(3), textAlign: 'right', fontSize: setWidth(3) }]}>Coming Soon</Text>
                        //     </View>
                        // } 
                        rightIcon={<Feather name='arrow-right' size={setWidth(5)} color={colors.dark_charcoal} />}
                        titleStyle={{
                            // fontSize: setWidth(3.3),
                        }}
                    /> */}

                    {/*
                        (this.state.rupifi_account_status !== '' && this.state.rupifi_account_status == rupifi_status.ACTIVE) &&
                        <TextCard
                            leftIcon={<MaterialIcons name='payments' size={setWidth(5.5)} color={colors.grey3} />}
                            leftText="Re-Pay Credit"
                            rightIcon={<Feather name='arrow-right' size={setWidth(5)} color={colors.grey3} />}
                            titleStyle={{
                                fontSize: setWidth(3.3)
                            }}
                            onPress={() => { Linking.openURL(this.state.rupifi_repayment_url) }}
                            containerStyle={{
                                marginTop: setWidth(3),
                                borderBottomWidth: 0
                            }}
                        />
                        */}

                    {/*
                       
                        <TextCard
                            leftIcon={<Feather name='users' size={setWidth(6)} color={colors.dark_charcoal} />}
                            leftText="Add Team Members"
                            middleView={
                                <View style={[{ backgroundColor: colors.white }]}>
                                    <Text style={[styles.walletAmount, { color: colors.dark_charcoal, marginLeft: setWidth(3), textAlign: 'right', fontSize: setWidth(3) }]}>Coming Soon</Text>
                                </View>
                            }
                            //onPress={() => this.props.navigation.navigate("AddTeamMember")}
                            //rightIcon={<Feather name='arrow-right' size={setWidth(5)} color={colors.dark_charcoal} />}
                            containerStyle={{
                                borderBottomWidth: 0
                            }}
                        />
                        */   }

                    {/* <TextCard
                        leftIcon={<Ionicons name='chatbubble-outline' size={setWidth(6)} color={colors.dark_charcoal} />}
                        leftText="Your Suggestions ?"
                        onPress={() => { console.log('here') }}
                        rightIcon={<Feather name='arrow-right' size={setWidth(5)} color={colors.dark_charcoal} />}
                        containerStyle={{
                            borderBottomWidth: 0
                        }}
                    /> */}

                    <TextCard
                        image={icons.phone_call}
                        leftText={this.state.is_ws_not == 0 ? "Contact" : "Contact Us"}
                        onPress={() => { this.props.navigation.navigate("ContactUs") }}
                        rightIcon={<Feather name='arrow-right' size={setWidth(5)} color={colors.dark_charcoal} />}
                        containerStyle={{
                            borderBottomWidth: 0
                        }}
                    />

                    {/* <TextCard
                        leftIcon={<EvilIcons name='star' size={setWidth(6)} color={colors.dark_charcoal} />}
                        leftText="Rate Us"
                        onPress={() => { console.log('here') }}
                        rightIcon={<Feather name='arrow-right' size={setWidth(5)} color={colors.dark_charcoal} />}
                        containerStyle={{
                            borderBottomWidth: 0
                        }}
                    /> */}

                    {/* <TextCard
                        leftIcon={<SimpleLineIcons name='settings' size={setWidth(6)} color={colors.dark_charcoal} />}
                        leftText="Settings"
                        onPress={() => this.props.navigation.navigate("Settings")}
                        rightIcon={<Feather name='arrow-right' size={setWidth(5)} color={colors.dark_charcoal} />}
                        containerStyle={{
                            borderBottomWidth: 0
                        }}
                    /> */}

                    <TextCard
                        image={icons.logout}
                        leftText="Logout"
                        onPress={() => this._logout()}
                        containerStyle={{
                            borderBottomWidth: 0
                        }}
                    />


                </ScrollView>

                <FooterTabMenu
                    focused={true}
                    route_name="Profile"
                    navigation={this.props.navigation}
                />
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        loginReducer: state.loginReducer,
        filter: state.commonReducer.filter,
        rupifi_credit_balance: state.applyForCreditReducer.rupifi_credit_balance,
        rupifi_soa_url: state.applyForCreditReducer.rupifi_soa_url,
        rupifi_account_status: state.applyForCreditReducer.rupifi_account_status,
        rupifi_repayment_url: state.applyForCreditReducer.rupifi_repayment_url,
        is_ws_not: state.loginReducer.data.is_ws_not
    }
}

const mapDispatchToProps = dispatch => ({
    clearLoginData: () => dispatch(clearLoginData()),
    clearProductFilterAction: () => dispatch(clearProductFilterAction()),
    setProductFilterAction: (data) => dispatch(setProductFilterAction(data)),
    clearProductListData: () => dispatch(clearProductListData())

})
const connectComponent = connect(mapStateToProps, mapDispatchToProps)
export default connectComponent(ProfileScreen)
