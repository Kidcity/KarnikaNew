import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Animated, Alert } from 'react-native';
import { styles } from './style';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { formattedCurrency, setHeight, setWidth } from '../../utils/variable';
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

            actual_order_amount: 0,
            credit_balance: 0,
            city_wallet_balance: 0,
            COD_percentage: 0,
            COD_amount_to_pay: 0,
            gst_percentage: 5,

            payment_obj: {}
        };
    }

    static getDerivedStateFromProps(props, state) {        
        return {
            COD_percentage: props.COD_percentage,
            COD_amount_to_pay: props.COD_amount_to_pay,
            address: props.address,
            actual_order_amount: props.total_order_value ? parseFloat(props.total_order_value).toFixed(2) : 0,
            credit_balance: props.credit_balance ? props.credit_balance : 0,
            city_wallet_balance: props.city_wallet_amount ? props.city_wallet_amount : 0
        }
    }

    calculateWalletPayment() {
        const actual_order_amount = this.state.actual_order_amount

        let payment_obj = this.state.payment_obj
        payment_obj = {
            mode: 'city_wallet',
            amount: actual_order_amount,
            payment_model: [
                {
                    mode: 'city_wallet',
                    amount: actual_order_amount,
                }
            ],
        }
        this.setState({
            isCheckedCreditBuy: false
        })
        // console.log(payment_obj);
        this.props.onChoosePaymentMode(payment_obj)
    }

    calculateCreditPayment() {
        const actual_order_amount = this.state.actual_order_amount

        let payment_obj = this.state.payment_obj
        const processing_fee = parseFloat(actual_order_amount * 1 / 100).toFixed(2)
        const gst = parseFloat(processing_fee * 5 / 100).toFixed(2)
        const total_processing_amount = parseFloat(Number(gst) + Number(processing_fee)).toFixed(2)

        payment_obj = {
            mode: 'rupifi',
            amount: (parseFloat(actual_order_amount) + parseFloat(total_processing_amount)),
            payment_model: [
                {
                    mode: 'rupifi',
                    amount: parseFloat(actual_order_amount) + parseFloat(total_processing_amount),
                    processing_fee_text: '1% + GST',
                    credit_amount: actual_order_amount,
                    total_processing_amount: total_processing_amount,
                    processing_fee: processing_fee,
                    gst: gst
                }
            ]
        }
        this.setState({
            isCheckedCityWallet: false
        })
        // console.log(payment_obj);
        this.props.onChoosePaymentMode(payment_obj)
    }

    calculate_Credit_And_Wallet_Payment_Mode() {
        const actual_order_amount = this.state.actual_order_amount

        const credit_balance = this.state.credit_balance
        const city_wallet_balance = this.state.city_wallet_balance

        let payment_obj = this.state.payment_obj

        if (!this.state.isCheckedCreditBuy && !this.state.isCheckedCityWallet) { // both false
            payment_obj = {
                mode: 'online',
                amount: actual_order_amount,
                payment_model: [
                    {
                        mode: 'online',
                        amount: actual_order_amount
                    }
                ]
            }
        }

        if (this.state.isCheckedCreditBuy && this.state.isCheckedCityWallet) {  // both true
            if(+credit_balance < +actual_order_amount){
                Alert.alert('Oops!', "Your Credit Balance Is Low, You Can Pay Through City Wallet.")
                this.setState({
                    isCheckedCreditBuy: false,
                    // isCheckedCityWallet: false
                })
                // return
            }
           else if (+city_wallet_balance > +actual_order_amount && +credit_balance > +actual_order_amount) {
                Alert.alert('Oops!', "You cannot use both features because you have enough balance in wallet and credit.\n\nYou have to choose any one option.", [
                    {
                        text: "Go with Credit Buy",
                        onPress: () => this.calculateCreditPayment()
                    },
                    {
                        text: "Go with City Wallet",
                        onPress: () => this.calculateWalletPayment()
                    }
                ])
            }
            else if (+credit_balance < +actual_order_amount && +city_wallet_balance > +actual_order_amount) {

                if (+credit_balance == 0) {
                    Alert.alert("Oops!", "Your credit balance is low.\nPlease use other features.")
                    this.setState({
                        isCheckedCreditBuy: false,
                        isCheckedCityWallet: false
                    })
                } else {

                    const pending_amount = parseFloat(+actual_order_amount - +credit_balance).toFixed(2)
                    const processing_fee = parseFloat(credit_balance * 1 / 100).toFixed(2)
                    const gst = parseFloat(processing_fee * 5 / 100).toFixed(2)
                    const total_processing_amount = parseFloat(Number(gst) + Number(processing_fee)).toFixed(2)

                    payment_obj = {
                        mode: "city_wallet,rupifi",
                        amount: (parseFloat(actual_order_amount).toFixed(2) + parseFloat(total_processing_amount).toFixed(2)),
                        payment_model: [
                            {
                                mode: 'city_wallet',
                                amount: pending_amount
                            },
                            {
                                mode: 'rupifi',
                                amount: parseFloat(+credit_balance + +total_processing_amount).toFixed(2),
                                processing_fee_text: '1% + GST',
                                credit_amount: credit_balance,
                                total_processing_amount: total_processing_amount,
                                processing_fee: processing_fee,
                                gst: gst
                            }
                        ]
                    }
                }
            }
            else if (+credit_balance > +actual_order_amount && +city_wallet_balance < +actual_order_amount) {
                const pending_amount = parseFloat(actual_order_amount - city_wallet_balance).toFixed(2)
                const processing_fee = parseFloat(pending_amount * 1 / 100).toFixed(2)
                const gst = parseFloat(processing_fee * 5 / 100).toFixed(2)
                const total_processing_amount = parseFloat(Number(gst) + Number(processing_fee)).toFixed(2)

                payment_obj = {
                    mode: "city_wallet,rupifi",
                    amount: parseFloat(+actual_order_amount + +total_processing_amount).toFixed(2),
                    payment_model: [
                        {
                            mode: 'city_wallet',
                            amount: city_wallet_balance
                        },
                        {
                            mode: 'rupifi',
                            amount: (parseFloat(pending_amount) + parseFloat(total_processing_amount)),
                            processing_fee_text: '1% + GST',
                            credit_amount: pending_amount,
                            total_processing_amount: total_processing_amount,
                            processing_fee: processing_fee,
                            gst: gst
                        }
                    ]
                }
            }
            else {
                if (+city_wallet_balance == 0 && +credit_balance == 0) {
                    Alert.alert("Oops!", "Your credit balance and wallet is low.\nPlease use other features.")
                    this.setState({
                        isCheckedCreditBuy: false,
                        isCheckedCityWallet: false
                    })
                    payment_obj = {
                        mode: 'online',
                        amount: actual_order_amount,
                        payment_model: [
                            {
                                mode: 'online',
                                amount: actual_order_amount
                            }
                        ]
                    }
                } else {
                    const pending_amount = (actual_order_amount - city_wallet_balance)
                    const processing_fee = parseFloat(pending_amount * 1 / 100).toFixed(2)
                    const gst = parseFloat(processing_fee * 5 / 100).toFixed(2)
                    const total_processing_amount = parseFloat(Number(gst) + Number(processing_fee)).toFixed(2)

                    payment_obj = {
                        mode: "city_wallet,rupifi",
                        amount: (parseFloat(actual_order_amount) + parseFloat(total_processing_amount)),
                        payment_model: [
                            {
                                mode: 'city_wallet',
                                amount: city_wallet_balance
                            },
                            {
                                mode: 'rupifi',
                                amount: parseFloat(pending_amount) + parseFloat(total_processing_amount),
                                processing_fee_text: '1% + GST',
                                credit_amount: pending_amount,
                                total_processing_amount: total_processing_amount,
                                processing_fee: processing_fee,
                                gst: gst
                            }
                        ]
                    }
                }
            }
        }

        if (this.state.isCheckedCreditBuy && !this.state.isCheckedCityWallet) {   // credit true and wallet false

            if (+credit_balance > +actual_order_amount) {
                const processing_fee = parseFloat(actual_order_amount * 1 / 100).toFixed(2)
                const gst = parseFloat(processing_fee * 5 / 100).toFixed(2)
                const total_processing_amount = parseFloat(Number(gst) + Number(processing_fee)).toFixed(2)

                payment_obj = {
                    mode: 'rupifi',
                    amount: (parseFloat(actual_order_amount) + parseFloat(total_processing_amount)),
                    payment_model: [
                        {
                            mode: 'rupifi',
                            amount: parseFloat(actual_order_amount) + parseFloat(total_processing_amount),
                            processing_fee_text: '1% + GST',
                            credit_amount: actual_order_amount,
                            total_processing_amount: total_processing_amount,
                            processing_fee: processing_fee,
                            gst: gst
                        }
                    ]
                }
            }
            else if (+credit_balance < +actual_order_amount) {
              
                if (+credit_balance == 0) {
                    Alert.alert("Oops!", "Your credit balance is low.\nPlease use other features.")
                    this.setState({
                        isCheckedCreditBuy: false
                    })
                    payment_obj = {
                        mode: 'online',
                        amount: actual_order_amount,
                        payment_model: [
                            {
                                mode: 'online',
                                amount: actual_order_amount
                            }
                        ]
                    }
                } else {
                    Alert.alert("Oops!", "Your credit balance is low.\nPlease remove some items from the cart to avail the credit or use other features.")
                    this.setState({
                        isCheckedCreditBuy: false
                    })
                    payment_obj = {
                        mode: 'online',
                        amount: actual_order_amount,
                        payment_model: [
                            {
                                mode: 'online',
                                amount: actual_order_amount
                            }
                        ]
                    }
                }
            }
            else {
                const processing_fee = (actual_order_amount * 1 / 100)
                const gst = parseFloat(processing_fee * 5 / 100).toFixed(2)
                const total_processing_amount = parseFloat(Number(gst) + Number(processing_fee)).toFixed(2)

                payment_obj = {
                    mode: 'rupifi',
                    amount: (parseFloat(actual_order_amount) + parseFloat(total_processing_amount)),
                    payment_model: [
                        {
                            mode: 'rupifi',
                            amount: parseFloat(actual_order_amount) + parseFloat(total_processing_amount),
                            processing_fee_text: '1% + GST',
                            credit_amount: actual_order_amount,
                            total_processing_amount: total_processing_amount,
                            processing_fee: processing_fee,
                            gst: gst
                        }
                    ],
                }
            }
        }

        if (!this.state.isCheckedCreditBuy && this.state.isCheckedCityWallet) {   // credit false and wallet true
           
            if ( +city_wallet_balance > +actual_order_amount) {
                payment_obj = {
                    mode: 'city_wallet',
                    amount: actual_order_amount,
                    payment_model: [
                        {
                            mode: 'city_wallet',
                            amount: actual_order_amount,
                        }
                    ],
                }
            }
            else if ( +city_wallet_balance < +actual_order_amount) {
                if (+city_wallet_balance == 0) {
                    Alert.alert("Oops!", "Your wallet balance is low.\nPlease use other features.")
                    this.setState({
                        isCheckedCreditBuy: false,
                        isCheckedCityWallet: false
                    })
                    payment_obj = {
                        mode: 'online',
                        amount: actual_order_amount,
                        payment_model: [
                            {
                                mode: 'online',
                                amount: actual_order_amount
                            }
                        ]
                    }
                } else {

                    payment_obj = {
                        mode: 'city_wallet,online',
                        amount: actual_order_amount,
                        payment_model: [
                            {
                                mode: 'city_wallet',
                                amount: city_wallet_balance
                            },
                            {
                                mode: 'online',
                                amount: parseFloat(+actual_order_amount - +city_wallet_balance).toFixed(2)
                            }
                        ]
                    }
                }
            }
            else {
                payment_obj = {
                    mode: 'city_wallet',
                    amount: actual_order_amount,
                    payment_model: [
                        {
                            mode: 'city_wallet',
                            amount: actual_order_amount,
                        }
                    ],
                }
            }
        }

        //console.log('payment_obj =====> ',payment_obj);
        this.setState({
            payment_obj: payment_obj
        }, () => this.props.onChoosePaymentMode(payment_obj))

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
                        this.setState({
                            isOnlinePay: false,
                            isCheckedCreditBuy: false,
                            isCheckedCityWallet: false,
                        }, () => {
                            let payment_obj = {
                                mode: 'cod',
                                amount: this.state.COD_amount_to_pay,
                                payment_model: [
                                    {
                                        mode: 'cod',
                                        amount: this.state.COD_amount_to_pay,
                                        cod_percentage: this.state.COD_percentage,
                                    }
                                ]
                            }
                            this.props.onChoosePaymentMode(payment_obj)
                        }
                        )
                    }}
                />

                <ExpandableButton
                    expandButtonContainer={{
                        marginTop: setWidth(3)
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
                        this.setState({
                            isOnlinePay: true,
                            isCheckedCreditBuy: false,
                            isCheckedCityWallet: false,
                        }, () => {
                            let payment_obj = {
                                mode: 'online',
                                amount: this.state.actual_order_amount,
                                payment_model: [
                                    {
                                        mode: 'online',
                                        amount: this.state.actual_order_amount,
                                    }
                                ]
                            }
                            this.props.onChoosePaymentMode(payment_obj)
                        }
                        )
                    }}
                />

                <TouchableOpacity style={[styles.collapsableButton, { marginTop: setWidth(3), padding: setWidth(3) }]} activeOpacity={0.8}>
                    <Text style={[styles.subHeading, styles.textBold]}>CREDIT BUY</Text>
                    <Text style={[styles.subHeading, { color: colors.red }]}>Available Balance: ₹ {(this.state.credit_balance && formattedCurrency(this.state.credit_balance))}</Text>
                    <Checkbox isChecked={this.state.isCheckedCreditBuy} onPressCheckBox={(v) => {
                        this.setState({
                            isCheckedCreditBuy: !this.state.isCheckedCreditBuy,
                            isOnlinePay: true
                        }, () => {
                            this.calculate_Credit_And_Wallet_Payment_Mode()
                        })
                    }} />
                </TouchableOpacity>
                {
                    this.state.isCheckedCreditBuy &&
                    <Text style={[styles.subHeading, { textAlign: 'center', marginTop: setHeight(1) }]}>
                        Processing Fees: 1% of Used Rupify Amount
                    </Text>
                }

                <TouchableOpacity style={[styles.collapsableButton, { marginTop: setWidth(3), padding: setWidth(3) }]} activeOpacity={0.8}>
                    <Text style={[styles.subHeading, styles.textBold]}>City Wallet</Text>
                    <Text style={[styles.subHeading, { color: colors.red }]}>Available Balance: ₹ {(this.state.city_wallet_balance && formattedCurrency(this.state.city_wallet_balance))}</Text>
                    <Checkbox isChecked={this.state.isCheckedCityWallet} onPressCheckBox={(v) => {
                        this.setState({
                            isCheckedCityWallet: !this.state.isCheckedCityWallet,
                            isOnlinePay: true
                        }, () => {
                            this.calculate_Credit_And_Wallet_Payment_Mode()
                        })
                    }} />
                </TouchableOpacity>

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
