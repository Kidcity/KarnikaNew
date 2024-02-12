import React, { Component } from 'react';
import { View, Text, FlatList, Image, TextInput, TouchableOpacity, ImageBackground, Platform, BackHandler } from 'react-native';
import CustomHeader from '../../component/CustomHeader';
import { fonts, images, setWidth } from '../../utils/variable';
import { styles } from './style';
import Feather from 'react-native-vector-icons/Feather'
import colors from '../../utils/colors';
import { setScreenActivity } from '../../helper/AppActivityTrackingHelper';

export default class PromoCodeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            promocode: [
                {
                    id: 1,
                    code: "TRYNEW",
                    offer: "40% OFF",
                }
            ]
        };
    }

    renderItem = ({ item, index }) => {
        return (
            <View style={[styles.row, styles.listItem]} >
                <ImageBackground source={images.promocodesidebg} resizeMode="cover" style={[styles.leftView]}>
                    <View style={styles.leftSideOfferTextView}>
                        <Text style={styles.leftSideOfferText}>{item.offer}</Text>
                    </View>
                </ImageBackground>
                <View style={[styles.rightView]}>

                    <View style={[styles.row, styles.alignItemsCenter, { justifyContent: 'space-between' }]}>
                        <View style={[styles.row, styles.alignItemsCenter]}>
                            <View style={styles.logoView}>
                                <Image source={images.logo} resizeMode="contain" style={styles.logo} />
                            </View>
                            <Text style={styles.code}>{item.code}</Text>
                        </View>
                        <TouchableOpacity style={{ paddingHorizontal: setWidth(5) }}>
                            <Text style={{ color: colors.lightRed, fontFamily: fonts.fontRegular }}>Apply</Text>
                        </TouchableOpacity>
                    </View>


                    <Text style={styles.codeDescriptionText}>Use Code {item.code} and Get {item.offer} On All Orders Above 10,000</Text>

                    {
                        Platform.OS === 'android' ?
                            <View style={[styles.borderDashedTop]}></View>
                            :
                            <Text adjustsFontSizeToFit numberOfLines={1} >-------------------------------------------------------------------------------------------------------------</Text>
                    }

                    <View style={styles.codeFooterView}>
                        <Text style={{ fontFamily: fonts.fontRegular }}>Get {item.offer} On All Orders</Text>
                    </View>
                </View>
            </View >
        )
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );
    }

    componentWillUnmount() {
        this.backHandler.remove()
    }


    backAction = () => {
        setScreenActivity({ action_type: "going_back", action_id: '', city_id: "" })

        
        if (!this.props.navigation.canGoBack()) {
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
              })
        } else {
            this.props.navigation.goBack();
        }
        return true;
    };


    render() {
        return (
            <View style={styles.container}>
                <CustomHeader
                    heading="PROMO CODE"
                    headingStyle={{
                        textAlign: "center"
                    }}
                    onPressBack={this.backAction}
                />
                <View style={styles.content}>

                    <View style={styles.searchBoxView}>
                        <Feather name='tag' size={setWidth(6)} color={colors.dark_charcoal} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Enter Promo Code Here......."
                        />
                        <TouchableOpacity style={{ padding: setWidth(3) }}>
                            <Text style={{ fontFamily: fonts.fontRegular }}>Apply</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.heading}>Available Promos</Text>
                    <FlatList
                        data={this.state.promocode}
                        keyExtractor={(item, index) => index}
                        renderItem={this.renderItem}
                        style={{
                            marginTop: setWidth(5)
                        }}
                    />
                </View>
            </View>
        );
    }
}
