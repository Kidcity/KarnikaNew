import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { styles } from './style';

export default class OrderDetailsPriceBreakUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            payment_breakup: null
        };
    }

    static getDerivedStateFromProps(props, state) {
        return {
            payment_breakup: props.payment_breakup
        }
    }

    render() {
        // console.log(this.state.payment_breakup);
        if (this.state.payment_breakup) {
            return (
                <View style={styles.container}>
                    <View style={[styles.row, styles.justifyBetween]}>
                        <Text style={styles.text}>Order Value:</Text>
                        <Text style={styles.text}>₹ {parseFloat(this.state.payment_breakup.total_order_value).toFixed(2)}</Text>
                    </View>
                    <View style={[styles.row, styles.justifyBetween, styles.mr_t_2]}>
                        <Text style={styles.text}>Platform Fee:</Text>
                        <Text style={styles.text}>₹ {parseFloat(this.state.payment_breakup.platform_fees).toFixed(2)}</Text>
                    </View>
                    <View style={[styles.row, styles.justifyBetween, styles.mr_t_2]}>
                        <Text style={styles.text}>Shipping Charge:</Text>
                        <Text style={styles.text}>₹ {parseFloat(this.state.payment_breakup.shipping_conv).toFixed(2)}</Text>
                    </View>
                    <View style={[styles.row, styles.justifyBetween, styles.mr_t_2]}>
                        <Text style={styles.text}>ODA Charge:</Text>
                        <Text style={styles.text}>₹ {parseFloat(this.state.payment_breakup.oda_charges).toFixed(2)}</Text>
                    </View>
                    {
                        (+this.state.payment_breakup.processing_fee !== 0) &&
                        <View style={[styles.row, styles.justifyBetween, styles.mr_t_2]}>
                            <Text style={styles.text}>Processing Fee(1 % Applicable):</Text>
                            <Text style={styles.text}>₹ {parseFloat(this.state.payment_breakup.processing_fee).toFixed(2)}</Text>
                        </View>
                    }

                    {
                        this.state.payment_breakup?.gst_5 !== 0 &&
                        <View style={[styles.row, styles.justifyBetween, styles.mr_t_2]}>
                            <Text style={styles.text}>GST 5%:</Text>
                            <Text style={styles.text}>₹ {parseFloat(this.state.payment_breakup.gst_5).toFixed(2)}</Text>
                        </View>
                    }

                    {
                        this.state.payment_breakup?.gst_12 !== 0 &&
                        <View style={[styles.row, styles.justifyBetween, styles.mr_t_2]}>
                            <Text style={styles.text}>GST 12%:</Text>
                            <Text style={styles.text}>₹ {parseFloat(this.state.payment_breakup.gst_12).toFixed(2)}</Text>
                        </View>
                    }

                    <View style={[styles.row, styles.justifyBetween, styles.mr_t_2, styles.borderTop, styles.pd_t_2]}>
                        <Text style={[styles.text, styles.textBold, styles.textBlack]}>Total Amount:</Text>
                        <Text style={[styles.text, styles.textBold, styles.textBlack]}>₹ {parseFloat(this.state.payment_breakup.sub_total_amount).toFixed(2)}</Text>
                    </View>

                    {
                        (this.state.payment_breakup.city_wallet_amount) ?
                            <View style={[styles.row, styles.justifyBetween, styles.mr_t_2]}>
                                <Text style={[styles.text, styles.textBold]}>Wallet:</Text>
                                <Text style={[styles.text, styles.textRed, styles.textBold]}>- ₹ {parseFloat(this.state.payment_breakup.city_wallet_amount).toFixed(2)}</Text>
                            </View> : null
                    }
                    {
                        (this.state.payment_breakup.online_prepaid) ?
                            <View style={[styles.row, styles.justifyBetween, styles.mr_t_2]}>
                                <Text style={[styles.text, styles.textBold]}>Prepaid:</Text>
                                <Text style={[styles.text, styles.textRed, styles.textBold]}>- ₹ {parseFloat(this.state.payment_breakup.online_prepaid).toFixed(2)}</Text>
                            </View> : null
                    }
                    {
                        (+this.state.payment_breakup.credit_amount) ?
                            <View style={[styles.row, styles.justifyBetween, styles.mr_t_2]}>
                                <Text style={[styles.text, styles.textBold]}>Credit Approved (Rupifi):</Text>
                                <Text style={[styles.text, styles.textRed, styles.textBold]}>- ₹ {parseFloat(this.state.payment_breakup.credit_amount).toFixed(2)}</Text>
                            </View> : null
                    }
                    {
                        (this.state.payment_breakup.cod_amount_paid) ?
                            <View style={[styles.row, styles.justifyBetween, styles.mr_t_2]}>
                                <Text style={[styles.text, styles.textBold]}>COD Amount Paid:</Text>
                                <Text style={[styles.text, styles.textRed, styles.textBold]}>- ₹ {parseFloat(this.state.payment_breakup.cod_amount_paid).toFixed(2)}</Text>
                            </View> : null
                    }

                    <View style={[styles.row, styles.justifyBetween, styles.mr_t_2, styles.borderTop, styles.pd_t_2]}>
                        <View>
                            <Text style={[styles.text, styles.textBold, styles.textBlack]}>Net Payable:</Text>
                            {
                                (this.state.payment_breakup.cod_amount_paid) ?
                                    <Text style={[styles.text, styles.textBold]}>(On Delivery)</Text>
                                    : null
                            }
                        </View>
                        <Text style={[styles.text, styles.textBold, styles.textBlack]}>₹ {parseFloat(this.state.payment_breakup.net_total_amount).toFixed(2)}</Text>
                    </View>
                </View>
            );
        } else {
            return (
                <View></View>
            )
        }
    }
}
