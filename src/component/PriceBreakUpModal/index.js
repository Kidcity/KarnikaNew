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

    creditView(item, index) {
        return (
            <View style={[styles.mr_top_2,]} key={Math.random() + index}>                
                <View style={[styles.row, styles.justifyBetween, { alignItems: 'center' }]}>
                    <View style={{ flex: 1 }}>
                        <Text style={[styles.text, styles.textBold]}>Processing Fee: </Text>
                        <Text style={styles.tinyText}>( {item.processing_fee_text})</Text>
                    </View>
                    <Text style={[styles.text]}>+ ₹ {item.total_processing_amount}</Text>
                </View>
                <View style={[styles.mr_top_2]}>
                    <View style={[styles.row, styles.justifyBetween, styles.borderTopBottom, { alignItems: 'center' }]} >
                        <View style={{ flex: 1, paddingVertical: setHeight(1) }}>
                            <Text style={[styles.text, styles.textBold]}>Total Payable Amount: </Text>
                        </View>
                        <Text style={[styles.text]}>₹ {parseFloat(item.amount).toFixed(2)}</Text>
                    </View>
                </View>              
            </View>
        )
    }

    citywalletView(item, index) {
        return (
            <View style={[styles.mr_top_2]} key={Math.random() + index}>
                <View style={[styles.row, styles.justifyBetween, { alignItems: 'center' }]}>
                    <View style={{ flex: 1 }}>
                        <Text style={[styles.text, styles.textBold]}>City Wallet: </Text>
                    </View>
                    <Text style={[styles.text, styles.textRed]}>- ₹ {item.amount}</Text>
                </View>
                <View style={[styles.row, styles.justifyBetween, styles.mr_top_2, styles.borderTop, { alignItems: 'center' }]}>
                    <View style={{ flex: 1, paddingVertical: setHeight(1) }}>
                        <Text style={[styles.text, styles.textBold]}>Subtotal: </Text>
                    </View>
                    <Text style={[styles.text]}>₹ {parseFloat(this.state.total_order_value - item.amount).toFixed(2)}</Text>
                </View>
            </View>
        )
    }

    onlineView(item, index) {
        return (
            <View style={[styles.mr_top_2]} key={Math.random() + index}>
                <View style={[styles.row, styles.justifyBetween, styles.borderTopBottom, { alignItems: 'center' }]} >
                    <View style={{ flex: 1, paddingVertical: setHeight(1) }}>
                        <Text style={[styles.text, styles.textBold]}>Total Payable Amount: </Text>
                    </View>
                    <Text style={[styles.text]}>₹ {parseFloat(item.amount).toFixed(2)}</Text>
                </View>
            </View>
        )
    }

    codView(item, index) {
        return (
            <View style={[styles.mr_top_2]} key={Math.random() + index}>
                <View style={[styles.row, styles.justifyBetween, { alignItems: 'center' }]} >
                    <View style={{ flex: 1, paddingVertical: setHeight(1) }}>
                        <Text style={[styles.text, styles.textBold]}>COD: </Text>
                    </View>
                    <Text style={[styles.text]}>₹ {parseFloat( this.state.total_order_value - item.amount ).toFixed(2)}</Text>
                </View>
                <View style={[styles.row, styles.justifyBetween, styles.borderTopBottom,styles.mr_top_2, { alignItems: 'center' }]} >
                    <View style={{ flex: 1, paddingVertical: setHeight(1) }}>
                        <Text style={[styles.text, styles.textBold]}>Total Payable Amount: </Text>
                    </View>
                    <Text style={[styles.text]}>₹ {parseFloat(item.amount).toFixed(2)}</Text>
                </View>
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
                            <Text style={[styles.text, styles.textUnderline]}>₹ {parseFloat(this.state.total_order_value).toFixed(2)}</Text>
                        </View>
                        {
                            this.state.payment_details_obj &&
                            this.state.payment_details_obj.payment_model &&
                            this.state.payment_details_obj.payment_model.map((item, index) => {

                                if (item.mode == 'city_wallet') {
                                    return (
                                        this.citywalletView(item, index)
                                    )
                                }
                                if (item.mode == 'rupifi') {
                                    return (
                                        this.creditView(item, index)
                                    )
                                }
                                if (item.mode == 'online') {
                                    return (
                                        this.onlineView(item, index)
                                    )
                                }
                                if (item.mode == 'cod') {
                                    return (
                                        this.codView(item, index)
                                    )
                                }
                            }
                            )
                        }
                        {/* <View style={[styles.row, styles.justifyBetween, styles.mr_top_2, styles.borderTopBottom, { alignItems: 'center' }]} >
                            <View style={{ flex: 1, paddingVertical: setHeight(1) }}>
                                <Text style={[styles.text, styles.textBold]}>Total Payable Amount: </Text>
                            </View>
                            <Text style={[styles.text]}>₹ {this.state.payment_details_obj.amount}</Text>
                        </View> */}
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
