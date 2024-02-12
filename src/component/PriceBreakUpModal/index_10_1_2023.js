import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import colors from '../../utils/colors';
import { setHeight, setWidth } from '../../utils/variable';
import { styles } from './style';

export default class PriceBreakUpModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total_order_value: 0,
            payment_details_obj: null
        };
        this.total_amount_to_pay = 0
    }

    static getDerivedStateFromProps(props, state) {
        //console.log(props.data);
        return {
            total_order_value: props.total_order_value,
            payment_details_obj: props.data
        }
    }

    creditAmountBreakup(item, index) {
        return (
            <View style={{paddingVertical: setHeight(2), marginTop: setHeight(1) }} key={index+2}>
                <View style={[styles.row, styles.justifyBetween, { alignItems: 'center' }]}>
                    <View style={{ flex: 1 }}>
                        <Text style={[styles.text, styles.textBold]}>Credit Taken: </Text>
                    </View>
                    <Text style={[styles.text]}>+ ₹ {item.credit_amount}</Text>
                </View>
                <View style={[styles.row, styles.justifyBetween, styles.mr_top_2, { alignItems: 'center' }]}>
                    <View style={{ flex: 1 }}>
                        <Text style={[styles.text, styles.textBold]}>Processing Fee: </Text>
                        <Text style={styles.tinyText}>( {item.processing_fee} on ₹{item.credit_amount} )</Text>
                    </View>
                    <Text style={[styles.text]}>+ ₹ {item.processing_amount}</Text>
                </View>
                <View style={[styles.row, styles.justifyBetween, styles.mr_top_2, styles.borderTopBottom, styles.borderDotted, { alignItems: 'center' }]}>
                    <View style={{ flex: 1, paddingVertical: setHeight(1) }}>
                        <Text style={[styles.text, styles.textBold]}>Total Credit Amount: </Text>
                    </View>
                    <Text style={[styles.text]}>₹ {(item.processing_amount) + (item.credit_amount)}</Text>
                </View>
                {
                    item.pending_amount &&
                    <View style={[styles.row, styles.justifyBetween, styles.mr_top_2, { alignItems: 'center' }]}>
                        <View style={{ flex: 1, paddingVertical: setHeight(1) }}>
                            <Text style={[styles.text, styles.textBold]}>Total Pending Amount: </Text>
                            <Text style={styles.tinyText}>( Pay via Rupifi )</Text>
                        </View>
                        <Text style={[styles.text]}>+ ₹ {(item.pending_amount)}</Text>
                    </View>
                }
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.headingView}>
                        <Text style={styles.heading}>Payment Details</Text>
                    </View>

                    <View style={styles.priceDetailsView}>
                        <View style={[styles.row, styles.justifyBetween]}>
                            <Text style={[styles.text, styles.textBold, styles.textUnderline]}>Total Goods Value: </Text>
                            <Text style={[styles.text, styles.textUnderline]}>₹ {this.state.total_order_value}</Text>
                        </View>
                        {
                            this.state.payment_details_obj &&
                            this.state.payment_details_obj.payment_model &&
                            this.state.payment_details_obj.payment_model.map((item, index) => {

                                const title = (item.mode == 'cod') ? 'COD' : (item.mode == 'city_wallet') ? 'City Wallet' : (item.mode == 'rupifi') ? 'Credit' : (item.mode == 'online') && 'Online'

                                const amount = item.amount

                                // this.total_amount_to_pay += parseFloat(amount)

                                const tinyText = (item.mode == 'rupifi') ? 'Pay via Rupifi' : (item.mode == 'online') ? 'Pay via Razorpay' : (item.mode == 'cod') ? `${item.cod_percentage}% on ₹${this.state.total_order_value}` : ''

                                return (
                                    <>
                                        {
                                            item.mode !== 'rupifi' &&
                                            <View style={[styles.row, styles.justifyBetween, styles.mr_top_2, { alignItems: 'center' }]} key={index}>
                                                <View style={{ flex: 1 }}>
                                                    <Text style={[styles.text, styles.textBold]}>{title} Amount: </Text>
                                                    {
                                                        tinyText !== '' &&
                                                        <Text style={styles.tinyText}>( {tinyText} )</Text>
                                                    }
                                                </View>
                                                <Text style={[styles.text]}>+ ₹ {amount}</Text>
                                            </View>
                                        }
                                        {
                                            item.mode === 'rupifi' &&
                                            this.creditAmountBreakup(item, index)
                                        }

                                    </>
                                )
                            }
                            )
                        }
                        <View style={[styles.row, styles.justifyBetween, styles.mr_top_2, styles.borderTopBottom, { alignItems: 'center' }]} >
                            <View style={{ flex: 1, paddingVertical: setHeight(1) }}>
                                <Text style={[styles.text, styles.textBold]}>Total Payable Amount: </Text>
                            </View>
                            <Text style={[styles.text]}>₹ {this.state.payment_details_obj.amount}</Text>
                        </View>
                    </View>


                    <View style={[styles.row, styles.justifyBetween, styles.mr_top_4]}>
                        <TouchableOpacity style={styles.cancelBtn} onPress={this.props.onPressCancel}>
                            <Text style={styles.btnText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.payBtn} onPress={this.props.onPressProceed}>
                            <Text style={styles.btnText}>Proceed</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        );
    }
}
