import { Animated, Easing, FlatList, SectionList, Text, TouchableOpacity, View } from 'react-native'
import React, { Component, PureComponent } from 'react'
import { styles } from './style';

import CustomImage from '../FastImage';
import { commonStyle } from '../../helper/commonStyle';
import LottieAnimation from '../LottieAnimation';
import { lottie } from '../../lottie';
import PrimaryButton from '../PrimaryButton';
import { images, normalize, setWidth } from '../../utils/variable';
import FastImageComponent from '../FastImageComponent';
import FlatListContainer from '../FlatListContainer';
import colors from '../../utils/colors';
import CustomButton from '../CustomButton';

export default class TopBrandToday extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            brand_name: '',
            brand_id: '',
            brand_logo: '',
            city_id: '',
            containerStyle: null,
            onPressBrand: undefined,
            onPressProduct: undefined,
            onPressViewMore: undefined
        };

    }

    static getDerivedStateFromProps(props, state) {

        return {
            data: props.hasOwnProperty("data") ? props.data : [],
            brand_name: props.hasOwnProperty("data") ? props.data?.brand_name : null,
            brand_logo: props.hasOwnProperty("data") ? props.data?.brand_logo : null,
            city_id: props.hasOwnProperty("data") ? props.data?.city_id : null,
            brand_id: props.hasOwnProperty("data") ? props.data?.brand_id : null,
            containerStyle: props.hasOwnProperty("containerStyle") ? props.containerStyle : null,
            onPressBrand: props.hasOwnProperty("onPressBrand") ? props.onPressBrand : undefined,
            onPressViewMore: props.hasOwnProperty("onPressViewMore") ? props.onPressViewMore : undefined,
            onPressProduct: props.hasOwnProperty("onPressProduct") ? props.onPressProduct : undefined,
        }
    }

    onPressViewMore = () => {
        const brands = this.state.data
        const ids = brands.map(item => item.brand_id).join(",")
        const cityids = brands.map(item => item.city_id).join(",")
        this.state.onPressViewMore({ id: ids, city_id: "" })
    }

    renderBrandItem = ({ item, index }) => {
       
        return (
            <View style={[styles.brandLogoView]}>
                <TouchableOpacity style={[styles.brandLogoContainer, commonStyle.shadow]} onPress={() => this.state.onPressBrand({ id: item.brand_id, city_id: item.city_id })}>
                    <View style={[styles.lottieContainer]}>
                        <LottieAnimation
                            source={lottie.pulse_circle}
                        />
                        <FastImageComponent
                            source={{ uri: item.brand_logo }}
                            style={styles.brandlogo}
                            resizeMode="contain"
                        />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    renderProductItem = ({ item, index }) => {
        
        return (
            <View style={[commonStyle.row]}>
                {
                    item.products.map((item, index) => {                        
                        return (
                            <TouchableOpacity style={[styles.productCard, commonStyle.shadow, { marginLeft: normalize(10) }]} key={index} onPress={() => this.state.onPressProduct(item.products_id)}>
                                <FastImageComponent
                                    source={{ uri: item.image }}
                                    style={styles.productimage}
                                    resizeMode="cover"
                                />
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    }

    render() {
        return (
            <View style={[styles.container, this.state.containerStyle]}>
                <View style={styles.heading}>
                    <Text style={styles.title}>Today's Top Brand</Text>
                    <Text style={styles.subtitle}>Check The Top Collections from The Brand</Text>
                </View>

                <FlatList
                    data={this.state.data}
                    keyExtractor={(item, index) => index}
                    renderItem={this.renderBrandItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    style={{
                        marginTop: normalize(10)
                    }}
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: 'center',
                        paddingVertical: normalize(10),
                        paddingHorizontal: normalize(20)
                    }}
                />

                <Text style={[commonStyle.text14, commonStyle.textgrey, commonStyle.fontBold, commonStyle.margin_H_15, commonStyle.gapTop10]}>Products: </Text>

                <View style={[{ flex: 1 }]}>
                    <FlatList
                        data={this.state.data}
                        keyExtractor={(item, index) => index}
                        renderItem={this.renderProductItem}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            flexGrow: 1,
                            paddingVertical: normalize(10),
                            paddingHorizontal: normalize(10)
                        }}
                    />
                </View>
                <CustomButton
                    container={{
                        backgroundColor: colors.themeColor,
                        marginTop: setWidth(2),
                        paddingHorizontal: setWidth(7),
                        paddingRight: setWidth(9),
                        marginHorizontal: setWidth(2)
                    }}
                    label="VIEW MORE"
                    labelStyle={{ color: colors.white }}
                    iconColor={colors.white}
                    onPress={this.onPressViewMore}
                    leftIcon={true}
                />

            </View>
        )
    }
}