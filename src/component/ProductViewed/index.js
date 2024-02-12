import { FlatList, Text, View } from 'react-native'
import React, { Component, PureComponent } from 'react'
import { styles } from './style'
import CustomImage from '../FastImage';
import { images, normalize } from '../../utils/variables';
import { commonStyle } from '../../helper/commonStyle';
import CircleIconButton from '../CircleIconButton';
import Octicons from 'react-native-vector-icons/Octicons'
import { colors } from '../../utils/colors';

export default class ProductViewed extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            containerStyle: null
        };
    }

    static getDerivedStateFromProps(props, state) {
        return {
            data: props.hasOwnProperty("data") ? props.data : null,
            containerStyle: props.hasOwnProperty("containerStyle") ? props.containerStyle : null,
        }
    }

    renderProductItem = ({ item, index }) => {
        return (
            <View style={styles.product}>
                <View style={styles.imageContainer}>
                    <CustomImage
                        source={images.product_view1}
                        style={styles.image}
                        resizeMode="cover"
                    />
                </View>
                <View style={styles.productDetails}>
                    <CircleIconButton
                        icon={<Octicons name="heart" size={normalize(20)} color={colors.red} />}
                        buttonContainer={styles.heartBtn}
                    />
                    <View style={[commonStyle.row, commonStyle.alignItemsCenter, commonStyle.justifyContentEvenly]}>
                        <Text style={styles.price}>₹999</Text>
                        <Text style={styles.crossedText}>₹19000</Text>
                        <Text style={styles.offerText}>50% Off</Text>
                    </View>
                    <View style={{ paddingLeft: normalize(8), marginTop: normalize(5), flex: 1 }} >
                        <Text style={styles.productTitle} numberOfLines={1}>Jacquard Work Baran 132</Text>
                        <Text style={styles.productBrand} numberOfLines={1}>By
                            <Text style={[commonStyle.textBlack]}> Brand Name</Text>
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={[styles.container, this.state.containerStyle]}>
                <View style={styles.heading}>
                    <Text style={styles.title}>Items You Have Viewed</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={this.state.data}
                        keyExtractor={(item, index) => index}
                        renderItem={this.renderProductItem}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                        contentContainerStyle={{
                            paddingLeft: normalize(10)
                        }}
                    />
                </View>
            </View>
        )
    }
}