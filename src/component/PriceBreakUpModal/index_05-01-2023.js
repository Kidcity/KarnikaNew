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
            payment_details_json: null
        };
    }

    static getDerivedStateFromProps(props, state) {
        return {
            total_order_value: props.total_order_value,
            payment_details_json: props.data
        }
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
                            <Text style={[styles.text, styles.textBold, styles.textUnderline]}>Total Order Value: </Text>
                            <Text style={[styles.text, styles.textUnderline]}>₹ {this.state.total_order_value}</Text>
                        </View>

                        {
                            (this.state.payment_details_json && this.state.payment_details_json[0].amount !== 0) &&
                            <View style={[styles.row, styles.justifyBetween, styles.mr_top_2]}>
                                <View>
                                    <Text style={[styles.text, styles.textBold, styles.textUnderline]}>COD Amount: </Text>
                                    <Text style={styles.tinyText}>({this.state.payment_details_json[0].percentage}% of ₹{this.state.total_order_value} )</Text>
                                </View>
                                <Text style={[styles.text, styles.textUnderline]}>₹ {this.state.payment_details_json[0].amount}</Text>
                            </View>
                        }

                        {
                            (this.state.payment_details_json && this.state.payment_details_json[1].amount !== 0) &&
                            <View style={[styles.row, styles.justifyBetween, styles.mr_top_2]}>
                                <View>
                                    <Text style={[styles.text, styles.textBold]}>Credit Pay: </Text>
                                    <Text style={styles.tinyText}>(Via Tupifi)</Text>
                                </View>
                                <Text style={styles.text}>₹ {this.state.payment_details_json[1].amount}</Text>
                            </View>
                        }

                        {
                            (this.state.payment_details_json && this.state.payment_details_json[2].amount !== 0) &&
                            <View style={[styles.row, styles.justifyBetween, styles.mr_top_2]}>
                                <Text style={[styles.text, styles.textBold]}>City Wallet Pay: </Text>
                                <Text style={styles.text}>₹ {this.state.payment_details_json[2].amount}</Text>
                            </View>
                        }

                        <View style={[styles.row, styles.justifyBetween, styles.mr_top_2, styles.totalAmountView]}>
                            <Text style={[styles.text, styles.textBold]}>Total : </Text>
                            <Text style={styles.text}>₹ 
                            { 
                            (this.state.payment_details_json[1].amount !== 0 || this.state.payment_details_json[2].amount !== 0)?
                            (this.state.payment_details_json[1].amount + this.state.payment_details_json[2].amount) 
                            :
                            (this.state.payment_details_json[0].amount !== 0)? this.state.payment_details_json[0].amount
                            :
                            this.state.payment_details_json[3].amount
                            }</Text>
                        </View>
                        {
                            (this.state.payment_details_json) ?
                                <View style={[styles.row, styles.justifyBetween, styles.mr_top_2]}>
                                    <View>
                                        <Text style={[styles.text, styles.textBold]}>Total Online Pay: </Text>
                                        <Text style={styles.tinyText}>(Via Razorpay)</Text>
                                    </View>
                                    <Text style={styles.text}>₹ {this.state.payment_details_json[3].amount}</Text>
                                </View>
                                :
                                <View style={[styles.row, styles.justifyBetween, styles.mr_top_2]}>
                                    <View>
                                        <Text style={[styles.text, styles.textBold]}>Total Online Pay: </Text>
                                        <Text style={styles.tinyText}>(Via Razorpay)</Text>
                                    </View>
                                    <Text style={styles.text}>₹ {this.state.total_order_value}</Text>
                                </View>
                        }

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
