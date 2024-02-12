import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import colors from '../../utils/colors';
import { fonts, setHeight, setWidth } from '../../utils/variable';
import CollapsableProductCartButton from '../CollapsableCartButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { styles } from './style';
import { Strings } from '../../utils/strings';
import TotalPriceDetails from '../TotalPriceDetails';
import { commonStyle } from '../../helper/commonStyle';

export default class CartView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart_items: null,
            total_price_details: this.props.total_price_details,
            is_ws_not: 0
        };

    }

    static getDerivedStateFromProps(props, state) {
        return {
            cart_items: props.cart_items ? props.cart_items : null,
            total_price_details: props.total_price_details ? props.total_price_details : null,
            is_ws_not: props.hasOwnProperty("is_ws_not") ? props.is_ws_not : 0
        }
    }

    // UNSAFE_componentWillReceiveProps(nextProps) {
    //     this.setState({
    //         cart_items: nextProps.cart_items,
    //         total_price_details: nextProps.total_price_details,
    //     });
    // }

    renderCartItem = ({ item, index }) => {

        return (
            <>
                <CollapsableProductCartButton
                    is_ws_not={this.state.is_ws_not}
                    item={item}
                    onDecrease={(value, idx) => this.props.onDecrease(value, index, idx)}
                    onIncrease={(value, idx) => this.props.onIncrease(value, index, idx)}
                    onPressItem={(id) => this.props.onPressItem(id)}
                />
                {
                    !item.is_minimum_order_amount_met &&
                    <View style={[styles.row, styles.warningView]}>
                        <FontAwesome name='warning' color={colors.primaryyellow} size={setWidth(5)} />
                        <Text style={styles.minimun_order_warning_text}>
                            Add Items worth ₹ <Text style={[commonStyle.bluredText]}>{parseFloat(+item.minimum_order_amount - +item.gross_total_price).toFixed(2)}</Text> from { (item?.shop_in_shop === "1") ? item?.brand_name : item.city_name} to complete <Text style={[{ fontFamily: fonts.fontBold }]}>Minimum Order Amount <Text style={[commonStyle.bluredText]}>₹{item.minimum_order_amount}</Text>  </Text> </Text>
                    </View>
                }
               
            </>
        )
    }

    render() {
        let total = 0
        if (this.state.total_price_details) {
            this.state.total_price_details.map((item, index) => {

                total += (+item.value)
            })
        }
        return (
            <View>
                {
                    this.props.not_deliverable &&
                    <View style={{ backgroundColor: colors.red, marginBottom: setWidth(5), paddingVertical: setWidth(3), borderRadius: setWidth(20), flexDirection: 'row', justifyContent: 'center' }}>
                        <FontAwesome name='warning' color={colors.primaryyellow} size={setWidth(5)} />
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', color: colors.white, fontFamily: fonts.fontBold, fontSize: setWidth(4), marginLeft: setWidth(2) }}>{Strings.cartScreenStrings.cartViewComponentStrings.ordernotdelivarableText}</Text>
                    </View>
                }

                <FlatList
                    data={this.state.cart_items}
                    keyExtractor={(item, index) => index}
                    renderItem={this.renderCartItem}
                    ItemSeparatorComponent={() => <View style={{ marginTop: setHeight(2) }} />}
                />


                <TotalPriceDetails 
                    total_price_details={this.state.total_price_details}
                    containerStyle={{
                        marginTop: setHeight(4)
                    }}
                />
                {/* <View style={styles.priceDetailsView}>
                    <Text style={[styles.darkText, styles.textBold]}>{Strings.cartScreenStrings.cartViewComponentStrings.totalPriceDetailsText}</Text>
                    <View style={styles.priceBoxView}>
                        {
                            this.state.total_price_details &&
                            this.state.total_price_details.map((item, index) => {
                                return (
                                    <View style={[styles.row, styles.textGap, { justifyContent: 'space-between' }]} key={index}>
                                        <Text style={[styles.subHeading, styles.darkText]}>{item.title}</Text>
                                        <Text style={[styles.subHeading, styles.darkText]}>₹ {parseFloat(item.value).toFixed(2)}</Text>
                                    </View>
                                )
                            })
                        }
                        <View style={[styles.row, { justifyContent: 'space-between', marginTop: setWidth(3) }]} >
                            <Text style={[styles.subHeading, styles.darkText, styles.textBold]}>You Pay</Text>
                            <Text style={[styles.subHeading, styles.darkText, styles.textBold]}>₹ {parseFloat(total).toFixed(2)}</Text>
                        </View>
                    </View>
                </View> */}

                {/* <TouchableOpacity style={styles.btn} onPress={() => this.props.onPressPromocode()}>
                    <View style={[styles.row, { alignItems: 'center' }]}>
                        <Feather name='tag' size={setWidth(6)} color={colors.red} />
                        <Text style={[styles.subHeading, styles.darkText, { marginLeft: setWidth(3), fontSize: setWidth(4) }]}>{Strings.cartScreenStrings.cartViewComponentStrings.applyPromoText}</Text>
                    </View>
                    <View style={[styles.row, { alignItems: 'center' }]}>
                        <Text style={[styles.subHeading, { color: colors.green, marginRight: setWidth(2) }]}></Text>
                        <MaterialIcons name='arrow-forward-ios' size={setWidth(4)} color={colors.dark_charcoal} />
                    </View>
                </TouchableOpacity> */}
            </View>
        );
    }
}
