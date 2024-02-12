import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, FlatList, ImageBackground } from 'react-native';
import colors from '../../utils/colors';
import { normalize, setHeight, setWidth } from '../../utils/variable';
import CustomButton from '../CustomButton';
import { styles } from './style';
import { images } from '../../utils/variable';
import FastImage from 'react-native-fast-image'
import HorizontalBrandView from '../HorizontalBrandView';
import TextAnimator from '../TextAnimator';
import LinearGradient from 'react-native-linear-gradient';
import FastImageComponent from '../FastImageComponent';
import { commonStyle } from '../../helper/commonStyle';

export default class AvailableBrands extends Component {
    constructor(props) {
        super(props);
        this.state = {
            brands: null,
            onPressBrand: undefined,
            onPressAllBrand: undefined,
            selectedGender: null
        };

    }

    static getDerivedStateFromProps(props, state) {
        return {
            brands: props.hasOwnProperty("brands") ? props.brands : null,
            onPressBrand: props.hasOwnProperty("onPressBrand") ? props.onPressBrand : undefined,
            onPressAllBrand: props.hasOwnProperty("onPressAllBrand") ? props.onPressAllBrand : undefined,
            selectedGender: props.hasOwnProperty("selectedGender") ? props.selectedGender : null
        }
    }

    onPressBrand = (brand) => {
        if (this.state.onPressBrand) {
            this.state.onPressBrand(brand)
        }
    }

    renderBrands = ({ item, index }) => {
        
        if (item.brand_name == "view_more") {
            return (
                <TouchableOpacity style={[styles.brandImageView, commonStyle.shadow, { backgroundColor: "#F0F1F3" }, commonStyle.justifyContentCenter, commonStyle.alignItemsCenter]} onPress={() => this.onPressBrand(item)}>
                    <Text style={[commonStyle.text10, commonStyle.fontBold, commonStyle.textBlack, { textDecorationLine: 'underline' }]}>
                        View More
                    </Text>
                </TouchableOpacity>
            )
        }
        return (
            <TouchableOpacity style={[styles.brandImageView, commonStyle.shadow]} onPress={() => this.onPressBrand(item)}>
                <FastImageComponent
                    style={[styles.brandimage]}
                    source={{
                        uri: item.brandimage,
                        priority: FastImage.priority.high,
                    }}
                    // source={require('../../../assets/a.png')}
                    resizeMode={FastImage.resizeMode.contain}
                />
            </TouchableOpacity>
        )
    }

    renderBrandCity = ({ item, index }) => {
        // console.log(item?.titleLogo);
        if (item.brands.length == 0) {
            return null
        }

        return (
            <View style={styles.brandView}>
                <View style={{ flex: 1, justifyContent: 'space-around' }}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[colors.grey5, colors.themeColor, colors.grey5]} style={[ styles.headingView]}>
                        {
                            item.titleLogo ?
                                <FastImageComponent
                                    style={[styles.titleImage]}
                                    source={{
                                        uri: item.titleLogo,
                                        priority: FastImage.priority.high,
                                    }}
                                    // source={require("../../../assets/t.png")}
                                    resizeMode={FastImage.resizeMode.cover}
                                />
                                :
                                <Text style={styles.animatedTextStyle}>
                                    Brands Of {item.location}
                                </Text>
                        }
                    </LinearGradient>
                    <FlatList
                        data={item.brands}
                        keyExtractor={(item, index) => index}
                        renderItem={this.renderBrands}
                        numColumns={3}
                        style={{ marginTop: normalize(15) }}
                        columnWrapperStyle={{
                            justifyContent: 'space-evenly',
                            paddingVertical: normalize(10),
                            // paddingHorizontal: normalize(15)
                        }}
                    // ItemSeparatorComponent={() => <View style={{ marginTop: setHeight(3) }} />}
                    />
                    {/* <HorizontalBrandView
                        selectedGender={this.state.selectedGender}
                        list={item.brands}
                        onPressBrand={this.onPressBrand}
                        containerStyle={{ marginTop: setHeight(1.5) }}
                    /> */}
                </View>
            </View>
        )
    }


    render() {
        return (
            <View style={[styles.container, this.props.containerStyle && this.props.containerStyle]}>
                <View style={styles.heading}>
                    <Text style={styles.title}>
                        Top Brands For You
                    </Text>
                </View>
                <FlatList
                    data={this.state.brands}
                    keyExtractor={(item, index) => index}
                    renderItem={this.renderBrandCity}
                    style={{ marginTop: normalize(15) }}
                    ItemSeparatorComponent={() => <View style={{ marginTop: setHeight(3) }} />}
                />

                <CustomButton
                    container={{
                        backgroundColor: colors.themeColor,
                        // marginTop: setWidth(),
                        paddingHorizontal: setWidth(7),
                        paddingRight: setWidth(9),
                        marginHorizontal: setWidth(2)
                    }}
                    label="VIEW ALL BRANDS"
                    labelStyle={{ color: colors.white }}
                    iconColor={colors.white}
                    onPress={this.state.onPressAllBrand}
                    leftIcon={true}
                />

            </View>
        );
    }
}
