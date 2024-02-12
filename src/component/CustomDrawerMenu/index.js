import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Platform, Linking } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import LinearGradient from 'react-native-linear-gradient';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { styles } from './style';
import colors from '../../utils/colors';
import { fonts, formattedCurrency, icons, images, normalize, rupifi_status, setWidth } from '../../utils/variable';
import TextCard from '../TextCard';
import Feather from 'react-native-vector-icons/Feather'
import { connect } from 'react-redux';
import { clearLoginData } from '../../redux/actions/loginAction';
import FastImage from 'react-native-fast-image';
import SettingsService from '../../services/SettingsService';
import { logout } from '../../helper/Logout';
import Lottie from 'lottie-react-native';
import VersionInfo from 'react-native-version-info'
import FastImageComponent from '../FastImageComponent';

class CustomDrawerMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userdata: null,
            isDemoLogin: false,
            city_wallet_amt: 0,
            rupifi_credit_balance: 0,
            rupifi_soa_url: '',
            rupifi_repayment_url: "",
            rupifi_account_status: '',
            is_ws_not: 0
        };

    }

    static getDerivedStateFromProps(props, state) {
        return {
            userdata: props.loginReducer.data ? props.loginReducer.data : {},
            isDemoLogin: props.loginReducer.hasOwnProperty("demoLoggedin") ? props.loginReducer.demoLoggedin : false,
            city_wallet_amt: props.loginReducer.city_wallet_amt ? props.loginReducer.city_wallet_amt : 0,
            rupifi_credit_balance: props.rupifi_credit_balance ? props.rupifi_credit_balance : 0,
            rupifi_soa_url: props.rupifi_soa_url ? props.rupifi_soa_url : '',
            rupifi_repayment_url: props.rupifi_repayment_url ? props.rupifi_repayment_url : '',
            rupifi_account_status: props.rupifi_account_status ? props.rupifi_account_status : '',
            is_ws_not: props.hasOwnProperty("is_ws_not") ? props.is_ws_not : 0
        }
    }

    _rateus() {
        // SettingsService._rateinPlaystore()
    }

    componentDidMount() {
        this.animation.play();
    }

    render() {

        return (
            <View style={styles.container}>
                <DrawerContentScrollView {...this.props} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={colors.drawerProfileContainer} style={styles.profileInfoContainer}>
                        {
                            this.state.isDemoLogin ?
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <FastImageComponent
                                        source={images.logo}
                                        resizeMode={FastImage.resizeMode.cover}
                                        style={{
                                            width: setWidth(50),
                                            height: setWidth(30),
                                        }}
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
                                        <TouchableOpacity onPress={() => { this.props.navigation.navigate("EditProfile") }} style={{ height: setWidth(10), justifyContent: 'flex-start', }}>
                                            <Text style={{ fontFamily: fonts.fontRegular, color: colors.white, fontSize: normalize(10) }}>Edit Profile</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={[styles.row, { alignItems: 'center', justifyContent: 'center', marginTop: setWidth(3) }]}>
                                        <SimpleLineIcons name='location-pin' size={setWidth(6)} color={colors.white} />
                                        <Text style={styles.location}>

                                            {this.state.userdata?.default_address?.entry_address1} , {this.state.userdata?.default_address?.entry_city} {this.state.userdata?.default_address?.entry_postcode} {this.state.userdata?.default_address?.zone_name}
                                        </Text>
                                    </View>
                                </>
                        }

                    </LinearGradient>

                    {/* <View style={styles.creditView}>
                        <Text style={styles.creditText}>Your available credit limit Rs XXX</Text>
                    </View> */}

                    {                       
                        <TextCard
                            containerStyle={{
                                marginTop: setWidth(3)
                            }}
                            image={icons.shopping_bag}
                            leftText={  this.state.is_ws_not == 1 ? "My Orders" : "My Request"}
                            onPress={() => { this.props.navigation.navigate("MyOrders") }}
                            rightIcon={<Feather name='arrow-right' size={setWidth(5)} color={colors.grey3} />}
                            titleStyle={{
                                fontSize: setWidth(3.3)
                            }}
                        />
                    }

                    <TextCard
                        containerStyle={{
                            marginTop: setWidth(3)
                        }}
                        image={icons.heart}
                        leftText="Wishlist"
                        onPress={() => { this.props.navigation.navigate("WishList") }}
                        rightIcon={<Feather name='arrow-right' size={setWidth(5)} color={colors.grey3} />}
                        titleStyle={{
                            fontSize: setWidth(3.3)
                        }}
                    />
                    {/*
                        this.state.is_ws_not === 1 &&
                        <TextCard
                            containerStyle={{
                                marginTop: setWidth(3)
                            }}
                            image={icons.credit_card}
                            leftText="City Wallet"
                            middleView={
                                <View style={[styles.walletAmountView]}>
                                    <Text style={[styles.walletAmount]}>INR {(this.state.city_wallet_amt && formattedCurrency(this.state.city_wallet_amt))}</Text>
                                </View>
                            }
                            onPress={() => { this.props.navigation.navigate("CityWallet") }}
                            rightIcon={<Feather name='arrow-right' size={setWidth(5)} color={colors.grey3} />}
                            titleStyle={{
                                fontSize: setWidth(3.3),
                                textAlign: 'right'
                            }}
                        />
                        */ }

                    {/* <TextCard
                        containerStyle={{
                            marginTop: setWidth(3)
                        }}
                        leftIcon={<Feather name='loader' size={setWidth(6)} color={colors.grey3} />}
                        leftText={(this.state.rupifi_credit_balance) ? "Available Credit" : "Apply For Credit"}
                        onPress={() => {
                            (this.state.rupifi_credit_balance) ?
                                Linking.openURL(this.state.rupifi_soa_url)
                                :
                                this.props.navigation.navigate("ApplyForCredit")
                        }}
                        middleView={
                            (this.state.rupifi_credit_balance) ?
                                <View style={[styles.walletAmountView]}>
                                    <Text style={[styles.walletAmount]} numberOfLines={1}>INR {(this.state.rupifi_credit_balance && formattedCurrency(this.state.rupifi_credit_balance))}</Text>
                                </View> :
                                <></>
                        }
                        // middleView={
                        //     <View style={[{ backgroundColor: colors.white,}]}>
                        //         <Text style={[styles.walletAmount, { color: colors.dark_charcoal, marginLeft: setWidth(3), textAlign: 'right', fontSize: setWidth(3) }]}>Coming Soon</Text>
                        //     </View>
                        // }
                        rightIcon={<Feather name='arrow-right' size={setWidth(5)} color={colors.grey3} />}
                        titleStyle={{
                            fontSize: setWidth(3.4),
                        }}
                    /> */}
                    {/*
                        (this.state.rupifi_account_status !== '' && this.state.rupifi_account_status == rupifi_status.ACTIVE) &&
                        <TextCard
                            containerStyle={{
                                marginTop: setWidth(3)
                            }}
                            leftIcon={<MaterialIcons name='payments' size={setWidth(5.5)} color={colors.grey3} />}
                            leftText="Re-Pay Credit"
                            rightIcon={<Feather name='arrow-right' size={setWidth(5)} color={colors.grey3} />}
                            titleStyle={{
                                fontSize: setWidth(3.3)
                            }}
                            onPress={() => { Linking.openURL(this.state.rupifi_repayment_url) }}
                        />
                        */ }


                    {/*                       
                        <TextCard
                        containerStyle={{
                            marginTop: setWidth(3)
                        }}
                        leftIcon={<Feather name='users' size={setWidth(5)} color={colors.grey3} />}
                        leftText="Add Team Members"
                        middleView={
                            <View style={[{ backgroundColor: colors.white }]}>
                                <Text style={[styles.walletAmount, { color: colors.dark_charcoal, marginLeft: setWidth(3), textAlign: 'right', fontSize: setWidth(3) }]}>Coming Soon</Text>
                            </View>
                        }
                        titleStyle={{
                            fontSize: setWidth(3.3)
                        }}
                    />
                    */}

                    {/* <TextCard
                        leftIcon={<Ionicons name='chatbubble-outline' size={setWidth(6)} color={colors.dark_charcoal} />}
                        leftText="Your Suggestions ?"
                        onPress={() => { console.log('here') }}
                        rightIcon={<Feather name='arrow-right' size={setWidth(6)} color={colors.dark_charcoal} />}
                    /> */}

                    <TextCard
                        containerStyle={{
                            marginTop: setWidth(3)
                        }}
                        image={icons.phone_call}
                        leftText={this.state.is_ws_not == 0 ? "Contact" : "Contact Us"}
                        onPress={() => {
                            this.props.navigation.navigate("ContactUs")
                        }}
                        rightIcon={<Feather name='arrow-right' size={setWidth(5)} color={colors.grey3} />}
                        titleStyle={{
                            fontSize: setWidth(3.3)
                        }}
                    />

                    {/* <TextCard
                        leftIcon={<EvilIcons name='star' size={setWidth(6)} color={colors.dark_charcoal} />}
                        leftText="Rate Us"
                        onPress={() => { 
                            this._rateus()
                         }}
                        rightIcon={<Feather name='arrow-right' size={setWidth(6)} color={colors.dark_charcoal} />}
                    /> */}

                    <TextCard
                        containerStyle={{
                            marginTop: setWidth(3)
                        }}
                        leftIcon={<SimpleLineIcons name='settings' size={setWidth(5)} color={colors.grey3} />}
                        leftText="Settings"
                        onPress={() => { this.props.navigation.navigate("Settings") }}
                        rightIcon={<Feather name='arrow-right' size={setWidth(5)} color={colors.grey3} />}
                        titleStyle={{
                            fontSize: setWidth(3.3)
                        }}
                    />

                    <TextCard
                        containerStyle={{
                            marginTop: setWidth(3)
                        }}
                        leftIcon={
                            <Lottie
                                ref={animation => {
                                    this.animation = animation;
                                }}
                                style={styles.lottiView}
                                source={require("../../utils/jumping_youtube.json")}
                            />
                        }
                        leftText="App Tutorial"
                        onPress={() => Linking.openURL("https://www.youtube.com/@karnikaindia")}
                        rightIcon={<Feather name='arrow-right' size={setWidth(5)} color={colors.grey3} />}
                        titleStyle={{
                            fontSize: setWidth(3.3)
                        }}
                    />

                    <TextCard
                        containerStyle={{
                            marginTop: setWidth(3)
                        }}
                        image={icons.logout}
                        leftText="Logout"
                        onPress={logout}
                        titleStyle={{
                            fontSize: setWidth(3.3)
                        }}
                    />

                    <View style={styles.versionView}>
                        <Image source={images.header_logo2} resizeMode="contain" style={styles.logo} />
                        {
                            <>
                                <Text style={styles.versionText}>Version: {VersionInfo.appVersion.toString()}</Text>
                                <Text style={styles.versionText}>Version Code: {VersionInfo.buildVersion.toString()}</Text>
                            </>
                        }
                    </View>


                    {/* <DrawerItemList {...this.props} /> */}
                </DrawerContentScrollView>
            </View>
        );
    }
}
const mapStateToProps = state => {
    return {
        loginReducer: state.loginReducer,
        version_code: state.loginReducer.version_code,
        version_name: state.loginReducer.version_name,
        rupifi_credit_balance: state.applyForCreditReducer.rupifi_credit_balance,
        rupifi_soa_url: state.applyForCreditReducer.rupifi_soa_url,
        rupifi_repayment_url: state.applyForCreditReducer.rupifi_repayment_url,
        rupifi_account_status: state.applyForCreditReducer.rupifi_account_status,
        is_ws_not: state.loginReducer.data.is_ws_not
    }
}

const mapDispatchToProps = dispatch => ({
    clearLoginData: () => dispatch(clearLoginData())
})

const connectComponent = connect(mapStateToProps, mapDispatchToProps)
export default connectComponent(CustomDrawerMenu)
