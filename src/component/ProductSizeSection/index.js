import { FlatList, Text, View } from 'react-native'
import React, { PureComponent } from 'react'
import { styles } from './style';
import { commonStyle } from '../../helper/commonStyle';
import IncrementDecrementButton from '../IncrementDecrementButton';
import { colors } from '../../utils/colors';

export class ProductSizeSection extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
        };
    }

    static getDerivedStateFromProps(props, state) {
        return {
            data: props.hasOwnProperty("data") ? props.data : null,
        }
    }

    renderProductSize = ({ item, index }) => {
        return (
            <View style={styles.productSizeView}>
                <View style={[commonStyle.row, commonStyle.justifyContentBetween,]}>

                    <View style={commonStyle.alignItemsCenter}>
                        <Text style={[commonStyle.textCharcoal, commonStyle.fontBold, commonStyle.text12]}>Age Group</Text>
                        <Text style={[commonStyle.textCharcoal, commonStyle.text12, commonStyle.fontRegular, commonStyle.gapTop6]}>2 - 5Y</Text>
                        <View style={[styles.sizeBtn, commonStyle.gapTop6]} >
                            <Text style={[commonStyle.fontBold, commonStyle.textAlignCenter, commonStyle.textCharcoal]}>20-24</Text>
                        </View>
                    </View>

                    <View style={[commonStyle.alignItemsCenter, commonStyle.justifyContentEnd]}>
                        <Text style={[commonStyle.textCharcoal, commonStyle.fontBold, commonStyle.text12]}>₹245.00</Text>
                        <Text style={[commonStyle.textCharcoal, commonStyle.fontBold, commonStyle.text12, commonStyle.textCrossed, commonStyle.textRed]}>₹255</Text>
                        <Text style={[commonStyle.textgrey, commonStyle.text11, commonStyle.fontRegular]}>Per Piece</Text>
                        <Text style={[commonStyle.textCharcoal, commonStyle.fontBold, commonStyle.text12, commonStyle.gapTop6]}>12 Pcs / Set</Text>
                    </View>

                    <View style={[commonStyle.alignItemsCenter, commonStyle.justifyContentEnd]}>
                        <Text style={[commonStyle.textCharcoal, commonStyle.fontBold, commonStyle.text12,]}>12 Pieces</Text>
                        <IncrementDecrementButton
                            label={2 + ' Sets'}
                            container={commonStyle.gapTop6}
                            btnTextColor={colors.charcoal}
                            labelColor={colors.charcoal}
                        // onIncrease={() => this._checkStock(item.total_selected + 1, index)}
                        // onDecrease={() => this._adjustProductQty(item.total_selected - 1, index)}
                        />
                    </View>
                </View>
            </View>
        )
    }

    render() {

        if (!this.state.data) {
            return null
        }
        return (
            <View>
                <FlatList
                    data={this.state.data}
                    keyExtractor={(item, index) => index}
                    renderItem={this.renderProductSize}
                    style={{
                        backgroundColor: 'red',
                        margin: 0
                    }}
                />
            </View>
        )
    }
}

export default ProductSizeSection