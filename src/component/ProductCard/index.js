import { Text, TouchableOpacity, View } from 'react-native'
import React, { PureComponent } from 'react'
import { styles } from './style';
import { commonStyle } from '../../helper/commonStyle';
import CustomImage from '../FastImage';
import { formattedCurrency, images, normalize } from '../../utils/variables';
import { colors } from '../../utils/colors';
import IncrementDecrementButton from '../IncrementDecrementButton';

export class ProductCard extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            product: null
        };
    }

    static getDerivedStateFromProps(props, state) {
        return {
            product: props.hasOwnProperty("product") ? props.product : null,
        }
    }

    render() {
        return (
            <View style={[styles.container, commonStyle.row]}>
                <TouchableOpacity style={styles.imageContainer}>
                    <CustomImage
                        source={images.demo1}
                        style={styles.image}
                        resizeMode="cover"
                    />
                </TouchableOpacity>
                <View style={styles.detailsContainer}>
                    <Text style={[commonStyle.textCharcoal, commonStyle.text14, commonStyle.fontBold,]}>{this.state.product?.brand_name}</Text>

                    <View style={[commonStyle.row, commonStyle.alignItemsCenter, commonStyle.gapTop6]}>
                        <Text style={[commonStyle.textCharcoal, commonStyle.text14, commonStyle.fontRegular]}>Set Qty: </Text>
                        <Text style={[commonStyle.textCharcoal, commonStyle.text12, commonStyle.fontBold]}> {this.state.product?.set_qty} Pcs</Text>
                    </View>

                    <View style={[commonStyle.row, commonStyle.alignItemsCenter, commonStyle.gapTop6]}>
                        <Text style={[commonStyle.textCharcoal, commonStyle.text14, commonStyle.fontRegular]}>Size: </Text>
                        <Text style={[commonStyle.textCharcoal, commonStyle.text12, commonStyle.fontBold]}> {this.state.product?.size}</Text>
                    </View>

                    <View style={[commonStyle.row, commonStyle.alignItemsCenter, commonStyle.gapTop6]}>
                        <Text style={[commonStyle.textCharcoal, commonStyle.text14, commonStyle.fontRegular]}>Color: </Text>
                        <Text style={[commonStyle.textCharcoal, commonStyle.text12, commonStyle.fontBold]}> {this.state.product?.color}</Text>
                    </View>

                    <View style={[commonStyle.row, commonStyle.alignItemsCenter, commonStyle.gapTop6]}>
                        <Text style={[commonStyle.textCharcoal, commonStyle.text14, commonStyle.fontRegular]}>Price: </Text>
                        <Text style={[commonStyle.textCharcoal, commonStyle.text12, commonStyle.fontBold]}> ₹{formattedCurrency(this.state.product?.per_piece_price)} / Piece</Text>
                    </View>
                </View>
                <View style={styles.priceParameterContainer}>
                    <Text style={[commonStyle.textCharcoal, commonStyle.text14, commonStyle.fontBold]}>Quantity (Sets)</Text>
                    
                    <IncrementDecrementButton
                        container={{
                            backgroundColor: colors.themeColor,
                            marginTop: normalize(6),
                        }}
                        btnTextColor={colors.white}
                        iconSize={normalize(12)}
                        label={this.state.product?.qty_ordered}
                        // onDecrease={() => this.props.onDecrease(item.qty_ordered - 1, index)}
                        // onIncrease={() => this.props.onIncrease(item.qty_ordered + 1, index)}
                    />
                    <Text style={[commonStyle.textCharcoal, commonStyle.text14, commonStyle.fontBold, commonStyle.gapTop6]}>₹{formattedCurrency(this.state.product?.order_price_without_charges())}</Text>
                </View>
            </View>
        )
    }
}

export default ProductCard