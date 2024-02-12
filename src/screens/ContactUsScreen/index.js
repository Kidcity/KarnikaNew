import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Linking, FlatList } from 'react-native';
import CustomButton from '../../component/CustomButton';
import CustomHeader from '../../component/CustomHeader';
import { setScreenActivity } from '../../helper/AppActivityTrackingHelper';
import colors from '../../utils/colors';
import { icons, normalize, setWidth } from '../../utils/variable';
import { styles } from './style';
import AppHeader from '../../component/AppHeader';
import NearByWholeSalerCard from '../../component/NearByWholeSalerCard'
import { connect } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo'
import { commonStyle } from '../../helper/commonStyle';

class ContactUsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_ws_not: 0,
            wholesaler: [
                {
                    name: "Sagar Ghosh",
                    address: "Hooghly",
                    state: "WB",
                    pin: "712708",
                    email: "sagarghosh.ofc@gmail.com",
                    mobile: "9163029201",
                    country: "India"
                },
                {
                    name: "Sagar Ghosh",
                    address: "Hooghly",
                    state: "WB",
                    pin: "712708",
                    email: "sagarghosh.ofc@gmail.com",
                    mobile: "9163029201",
                    country: "India"
                },
                {
                    name: "Sagar Ghosh",
                    address: "Hooghly",
                    state: "WB",
                    pin: "712708",
                    email: "sagarghosh.ofc@gmail.com",
                    mobile: "9163029201",
                    country: "India"
                }
            ]
        };
    }

    static getDerivedStateFromProps(props, state) {
        return {
            is_ws_not: props.hasOwnProperty("is_ws_not") ? props.is_ws_not : 0
        }
    }

    linkToWhatsapp() {
        Linking.openURL('https://wa.me/03326558101?text=Hello Karnika')
    }

    renderItem = ({ item, index }) => {
        return (
            <NearByWholeSalerCard item={item} showEditButton />
        )
    }

    render() {
        return (
            <View style={styles.container}>
                {/* <CustomHeader
                    heading="CONTACT US"
                    headingContainerStyle={{
                        flex: 0.8
                    }}
                    headingStyle={{
                        textAlign: 'center',
                    }}
                    showBackButton={true}
                    onPressBack={() => {
                        setScreenActivity({ action_type: "going_back", action_id: '' })
                        this.props.navigation.goBack()}}
                    showIcons={false}
                /> */}
                <AppHeader
                    showBackBtn
                    showSearch
                    showWishList
                    showLogo
                    navigation={this.props.navigation}
                />
                <View style={styles.content}>
                    {
                        this.state.is_ws_not === 1 &&
                        <>
                            <CustomButton
                                container={{
                                    backgroundColor: colors.green,
                                    justifyContent: 'flex-start',
                                    marginTop: setWidth(5)
                                }}
                                label="WHATSAPP US"
                                labelStyle={{ color: colors.white }}
                                rightIcon={
                                    <Image source={icons.whatsapp} resizeMode="contain" style={{
                                        width: setWidth(10),
                                        height: setWidth(10),
                                        marginRight: setWidth(3)
                                    }} />
                                }
                                leftIcon={false}
                                onPress={() => this.linkToWhatsapp()}
                            />
                            <CustomButton
                                container={{
                                    backgroundColor: colors.red,
                                    justifyContent: 'flex-start',
                                    marginTop: setWidth(5)
                                }}
                                label="CALL US"
                                labelStyle={{ color: colors.white }}
                                rightIcon={
                                    <Image source={icons.phone} resizeMode="contain" style={styles.btnImage} />
                                }
                                leftIcon={false}
                                onPress={() => Linking.openURL(`tel:033-2655-8101`)}
                            />
                        </>
                    }
                    {
                        this.state.is_ws_not === 0 &&
                        <>
                            <View style={[commonStyle.row, commonStyle.alignItemsCenter, {marginTop: setWidth(4)}]}>
                                <Entypo name='location-pin' size={normalize(25)} color={colors.black} />
                                <Text style={styles.heading}>Your nearby wholesalers </Text>
                            </View>
                            <FlatList
                                data={this.state.wholesaler}
                                renderItem={this.renderItem}
                                keyExtractor={(item, index) => index}
                                style={{ marginTop: setWidth(2) }}
                                ItemSeparatorComponent={() => <View style={{ marginTop: setWidth(2) }} />}
                                contentContainerStyle={{
                                    flexGrow: 1,
                                    paddingBottom: normalize(20)
                                }}
                            />
                        </>
                    }


                    {
                        this.state.is_ws_not === 1 &&
                        <View style={[styles.footer, styles.row]}>
                            <TouchableOpacity style={styles.footerBlock} onPress={() => Linking.openURL("https://www.karnikaindustries.com/")}>
                                <Text style={styles.blockTitle}>Facebook</Text>
                                <Image source={icons.facebook} resizeMode="contain" style={styles.footerImage} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.footerBlock} onPress={() => Linking.openURL("https://www.instagram.com/karnika_india/")}>
                                <Text style={styles.blockTitle}>Instagram</Text>
                                <Image source={icons.instagram} resizeMode="contain" style={styles.footerImage} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.footerBlock} onPress={() => Linking.openURL("https://www.karnikaindustries.com/")}>
                                <Text style={styles.blockTitle}>Website</Text>
                                <Image source={icons.web} resizeMode="contain" style={styles.footerImage} />
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        is_ws_not: state.loginReducer.data.is_ws_not
    }
}

const mapDispatchToProps = dispatch => ({

})

const connectComponent = connect(mapStateToProps, mapDispatchToProps)
export default connectComponent(ContactUsScreen)

