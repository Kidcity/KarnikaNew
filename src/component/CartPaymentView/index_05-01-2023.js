import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { styles } from './style';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { formattedCurrency, setWidth } from '../../utils/variable';
import colors from '../../utils/colors';
import Checkbox from '../Checkbox';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AddressCard from '../AddressCard';
import ExpandableButton from '../ExpandableButton';

export default class CartPaymentView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: {},
            isExpandeCOD: false,
            isExpandOnLinePayment: false,
            isOnlinePay: true,
            isCheckedCityWallet: false,
            isCheckedCreditBuy: false,

            total_price_to_pay: props.total_price_to_pay,
            actual_order_amount: 0,
            credit_balance: 0,
            city_wallet_amount: 0,
            COD_percentage: 0,
            COD_amount_to_pay: 0,

            credit_amount_to_pay: 0,
            city_wallet_amount_to_pay: 0,
            pending_amount: 0,

            payment_json: [
                {
                    mode: "cod",
                    amount: 0,
                    percentage: props.COD_percentage
                },
                {
                    mode: "credit",
                    amount: 0
                },
                {
                    mode: "wallet",
                    amount: 0
                },
                {
                    mode: "online",
                    amount: props.total_price_to_pay
                }
            ]

            // expandBox_COD: 0,
            // expandBox_ONLINE: 0,

            // COD_opacity: new Animated.Value(0),
            // ONLINE_opacity: new Animated.Value(0)
        };
    }

    static getDerivedStateFromProps(props, state) {
        return {
            COD_percentage: props.COD_percentage,
            COD_amount_to_pay: props.COD_amount_to_pay,
            address: props.address,
            actual_order_amount: props.total_price_to_pay,
            credit_balance: props.credit_balance,
            city_wallet_amount: props.city_wallet_amount
        }
    }

    calculateCreditPay() {
        let total_price_to_pay = this.state.total_price_to_pay
        const credit_balance = this.state.credit_balance
        let json = this.state.payment_json

        if (!this.state.isCheckedCreditBuy) {
            json[1].amount = 0
            json[3].amount = (json[3].amount + this.state.credit_amount_to_pay)
            this.setState({
                pending_amount: (this.state.pending_amount + this.state.credit_amount_to_pay),
                credit_amount_to_pay: 0,
                payment_json: json
            }, () => {
                if (this.state.isCheckedCityWallet) {
                    this.calculateCityWallet()
                } else {
                    this.props.onProcessPayment(json)
                }
            })
            return
        }

        if (this.state.city_wallet_amount_to_pay !== 0) {
            total_price_to_pay = total_price_to_pay - this.state.city_wallet_amount_to_pay
        }

        if (credit_balance > total_price_to_pay) {
            json[1].amount = total_price_to_pay
            json[3].amount = 0
            this.setState({ credit_amount_to_pay: total_price_to_pay, payment_json: json })
        }
        else if (credit_balance < total_price_to_pay) {
            json[1].amount = credit_balance
            json[3].amount = (total_price_to_pay - credit_balance)
            this.setState({
                credit_amount_to_pay: credit_balance,
                pending_amount: (total_price_to_pay - credit_balance),
                payment_json: json
            })
        }
        else {
            json[1].amount = total_price_to_pay
            json[3].amount = total_price_to_pay
            this.setState({
                credit_amount_to_pay: total_price_to_pay,
                payment_json: json
            })
        }

        this.props.onProcessPayment(json)

    }

    calculateCityWallet() {
        let total_price_to_pay = this.state.total_price_to_pay
        const wallet_balance = this.state.city_wallet_amount
        let json = this.state.payment_json

        if (!this.state.isCheckedCityWallet) {
            json[2].amount = 0
            json[3].amount = (json[3].amount + this.state.city_wallet_amount_to_pay)
            this.setState({
                pending_amount: (this.state.pending_amount + this.state.city_wallet_amount_to_pay),
                city_wallet_amount_to_pay: 0,
                payment_json: json
            }, () => {
                if (this.state.isCheckedCreditBuy) {
                    this.calculateCreditPay()
                } else {
                    this.props.onProcessPayment(json)
                }
            })
            return
        }

        if (this.state.credit_amount_to_pay !== 0) {
            total_price_to_pay = total_price_to_pay - this.state.credit_amount_to_pay
        }

        if (wallet_balance > total_price_to_pay) {
            json[2].amount = total_price_to_pay
            json[3].amount = 0
            this.setState({ city_wallet_amount_to_pay: total_price_to_pay, payment_json: json })
        }
        else if (wallet_balance < total_price_to_pay) {
            json[2].amount = wallet_balance
            json[3].amount = (total_price_to_pay - wallet_balance)
            this.setState({
                city_wallet_amount_to_pay: wallet_balance,
                pending_amount: (total_price_to_pay - wallet_balance),
                payment_json: json
            })
        }
        else {
            json[2].amount = total_price_to_pay
            json[3].amount = total_price_to_pay
            this.setState({ city_wallet_amount_to_pay: total_price_to_pay, payment_json: json })
        }
        this.props.onProcessPayment(json)
    }

    toggle(tag) {
        Animated.spring(     //Step 4
            (tag == 'cod') ? this.state.COD_opacity : this.state.ONLINE_opacity,
            {
                toValue: 1,
                useNativeDriver: true
            }
        ).start();  //Step 5
    }

    render() {

        return (
            <View style={styles.container}>

                <ExpandableButton
                    isExpand={this.state.isExpandeCOD}
                    buttonTitle={"Cash On Delivery"}
                    cardtext1={`For Cash On Delivery , Please Pay ${this.state.COD_percentage}% Advance, Balance on Delivery. `}
                    cardtext2={`Pay: ₹ ${this.state.COD_amount_to_pay} Online`}
                    isChecked={!this.state.isOnlinePay}
                    onPressExpandButton={() => {
                        this.setState({
                            isExpandeCOD: !this.state.isExpandeCOD,
                            isExpandOnLinePayment: false,
                        })
                    }}
                    onPressCheckBox={() => {
                        let json = this.state.payment_json
                        json[0].amount = this.state.COD_amount_to_pay
                        json[1].amount = 0
                        json[2].amount = 0
                        json[3].amount = this.state.COD_amount_to_pay
                        this.setState({
                            total_price_to_pay: this.state.COD_amount_to_pay,
                            isOnlinePay: false,
                            isCheckedCreditBuy: false,
                            isCheckedCityWallet: false,
                            city_wallet_amount_to_pay: 0,
                            credit_amount_to_pay: 0,
                            pending_amount: 0,
                            payment_json: json
                        }, () => this.props.onProcessPayment(json))
                    }}
                />

                <ExpandableButton
                    expandButtonContainer={{
                        marginTop: setWidth(6)
                    }}
                    isExpand={this.state.isExpandOnLinePayment}
                    buttonTitle={"Online Payment"}
                    cardtext2={`Pay: ₹ ${this.state.actual_order_amount}`}
                    isChecked={this.state.isOnlinePay}
                    onPressExpandButton={() => {
                        this.setState({
                            isExpandOnLinePayment: !this.state.isExpandOnLinePayment,
                            isExpandeCOD: false,
                        })
                    }}
                    onPressCheckBox={() => {
                        let json = this.state.payment_json
                        json[0].amount = 0
                        json[1].amount = 0
                        json[2].amount = 0
                        json[3].amount = this.state.actual_order_amount
                        this.setState({
                            total_price_to_pay: this.state.actual_order_amount,
                            isOnlinePay: true,
                            isCheckedCreditBuy: false,
                            isCheckedCityWallet: false,
                            city_wallet_amount_to_pay: 0,
                            credit_amount_to_pay: 0,
                            pending_amount: 0,
                            payment_json: json
                        }, () => this.props.onProcessPayment(json))
                    }}
                />

                <TouchableOpacity style={[styles.collapsableButton, { marginTop: setWidth(6), padding: setWidth(3) }]} activeOpacity={0.8}>
                    <Text style={[styles.subHeading, styles.textBold]}>CREDIT BUY</Text>
                    <Text style={[styles.subHeading, { color: colors.red }]}>Available Balance: ₹ {(this.state.credit_balance && formattedCurrency(this.state.credit_balance))}</Text>
                    <Checkbox isChecked={this.state.isCheckedCreditBuy} onPressCheckBox={(v) => {
                        this.setState({
                            isCheckedCreditBuy: !this.state.isCheckedCreditBuy,
                        }, () => {
                            this.calculateCreditPay()
                        })
                    }} />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.collapsableButton, { marginTop: setWidth(6), padding: setWidth(3) }]} activeOpacity={0.8}>
                    <Text style={[styles.subHeading, styles.textBold]}>City Wallet</Text>
                    <Text style={[styles.subHeading, { color: colors.red }]}>Available Balance: ₹ {(this.state.city_wallet_amount && formattedCurrency(this.state.city_wallet_amount))}</Text>
                    <Checkbox isChecked={this.state.isCheckedCityWallet} onPressCheckBox={(v) => {
                        this.setState({
                            isCheckedCityWallet: !this.state.isCheckedCityWallet,
                        }, () => {
                            this.calculateCityWallet()
                        })
                    }} />
                </TouchableOpacity>

                {/* <ExpandableButton
                    expandButtonContainer={{
                        marginTop: setWidth(6)
                    }}
                    isExpand={this.state.isExpandCityWallet}
                    buttonTitle={"City Wallet"}
                    // cardtext1={`For Cash On Delivery , Please Pay ${this.props.COD_percentage}% Advance , Balance on Delivery. `}
                    cardtext2={`Pay: ₹ ${this.props.city_wallet_amount}`}
                    isChecked={false}
                    onPressButton={() => {
                        this.setState({
                            isExpandOnLinePayment: false,
                            isExpandeCOD: false,
                            isExpandCityWallet: !this.state.isExpandCityWallet,
                        }, () => {
                            this.toggle('online')
                        })
                    }}
                    onPressCheckBox={() => {
                        this.setState({ isOnlinePay: true })
                        this.payment('online', total)
                    }}
                /> */}

                {/* <TouchableOpacity style={[styles.collapsableButton, { marginTop: setWidth(6) }]} activeOpacity={0.8} onPress={() => {
                    this.setState({
                        isExpandOnLinePayment: false,
                        isExpandeCOD: false,
                        isExpandCityWallet: !this.state.isExpandCityWallet,
                    })
                }
                }>
                    <Text style={[styles.subHeading, styles.textBold]}>City Wallet</Text>
                    <Text style={[styles.subHeading, styles.textBold]}>₹{this.props.city_wallet_amount}</Text>
                    <MaterialIcons name={!this.state.isExpandCityWallet ? 'keyboard-arrow-down' : 'keyboard-arrow-up'} size={setWidth(7)} color={colors.red} />
                </TouchableOpacity>
                {
                    this.state.isExpandCityWallet &&
                    <View style={[styles.expandBox]}>
                        <View style={[styles.row, { justifyContent: 'space-between', marginTop: setWidth(2), alignItems: 'center' }]}>
                            <Text style={[styles.subHeading, styles.darkText, styles.textBold]}>Pay: ₹ {total}</Text>

                            <Checkbox isChecked={this.state.isOnlinePay ? true : false} onPressCheckBox={(v) => {

                            }} />
                        </View>
                    </View>
                } */}


                <View style={styles.shippingAddressView}>
                    <View style={[styles.row, { alignItems: 'center' }]}>
                        <EvilIcons name='location' size={setWidth(7)} color={colors.dark_charcoal} />
                        <Text style={styles.shippingAddressHeading}>Shipping Address</Text>
                    </View>

                    <AddressCard
                        item={this.state.address}
                        showCheckBox={false}
                        containerStyle={{
                            marginTop: setWidth(3),
                        }}
                    />
                </View>

            </View >
        );
    }
}
