import { Animated, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { PureComponent } from 'react'
import { styles } from './style';
import CartPageMapping from '../CartPageMapping';
import { DEVICE_HEIGHT, normalize } from '../../utils/variables';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import { colors } from '../../utils/colors';
import { commonStyle } from '../../helper/commonStyle';
import RoundedCornerButton from '../RoundedCornerButton';

export class CartPaymentModal extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            cart_map_pointer: [
                {
                    id: 1,
                    title: "Step1",
                    isDone: true,
                    showRedDash: false
                },
                {
                    id: 2,
                    title: "Step2",
                    isDone: false,
                    showRedDash: false
                },
                {
                    id: 3,
                    title: "Step3",
                    isDone: false,
                    showRedDash: false
                }
            ],
            cart_items: null,
            currentMapIndex: 0,
            notDeliverable: false,
            selectedCartItem: null,
            showPaymentBreakUpModal: undefined
        };
        this.yAxis = new Animated.Value(DEVICE_HEIGHT)
    }

    static getDerivedStateFromProps(props, state) {
        return {
            cart_items: props.hasOwnProperty("cart_items") ? props.cart_items : null,
            notDeliverable: props.hasOwnProperty("notDeliverable") ? props.notDeliverable : false,
            showPaymentBreakUpModal: props.hasOwnProperty("showPaymentBreakUpModal") ? props.showPaymentBreakUpModal : undefined
        }
    }

    componentDidMount() {
        this.animUp()
    }

    animUp() {
        Animated.timing(this.yAxis, {
            useNativeDriver: false,
            toValue: 0,
            duration: 500
        }).start()
    }

    animDown() {
        Animated.timing(this.yAxis, {
            useNativeDriver: false,
            toValue: height,
            duration: 500
        }).start(() => {
            if (this.state.onClosePaymentProcessModal) {
                this.state.onClosePaymentProcessModal()
            }
        })
    }


    onPressBuy = () => {
        this.setState({
            currentMapIndex: this.state.currentMapIndex + 1
        })
        if (this.state.currentMapIndex > 1) {
            this.state.showPaymentBreakUpModal()
        }
    }

    onPressCartItem = (item) => {
        this.setState({
            selectedCartItem: item
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.backDrop}>

                </TouchableOpacity>
                <Animated.View style={[styles.content, { transform: [{ translateY: this.yAxis }] }]}>
                    <CartPageMapping
                        cart_map_pointer={this.state.cart_map_pointer}
                    />

                    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: normalize(20) }} style={[commonStyle.padding_H_15, commonStyle.gapTop20]}>
                        {
                            this.state.currentMapIndex == 0 ?
                                <Step1
                                    cart_items={this.state.cart_items}
                                    onPressCartItem={(item) => this.onPressCartItem(item)}
                                />
                                :
                                this.state.currentMapIndex == 1 ?
                                    <Step2
                                        selectedCartItem={this.state.selectedCartItem}
                                        // onPressChangeAddress={this.state.onPressChangeAddress}
                                        // onPressAddNewAddress={this.state.onPressAddNewAddress}
                                        // total_price_details={this.state.total_price_details}
                                        // default_shipping_address={this.state.default_shipping_address}
                                        notDeliverable={this.state.notDeliverable}
                                    />
                                    :
                                    <Step3
                                        default_shipping_address={this.state.default_shipping_address}
                                        city_wallet_amount={10000}
                                        credit_balance={1000000}
                                        cod_percentage={15}
                                        cod_amount_to_pay={500}
                                        selectedCartItem={this.state.selectedCartItem}
                                    // onChoosePaymentMode={(payment_obj) => this.onChoosePaymentMode(payment_obj)}
                                    />
                        }
                    </ScrollView>
                    {/*
                    {
                        this.state.showEmptyCartModal &&
                        <EmptyCartModal
                            title={this.state.emptyCartModalTitle}
                            onPressContinueShopping={() => {
                                this.setState({ showEmptyCartModal: false })
                                if (this.state.onPressContinueShopping) {
                                    this.state.onPressContinueShopping()
                                }
                            }}
                            onPressClose={() => {
                                this.setState({ showEmptyCartModal: false })
                                this.animDown()
                            }}
                        />
                    }*/}
                    <View style={[commonStyle.row, commonStyle.alignItemsCenter, { paddingVertical: normalize(10), paddingHorizontal: normalize(10) }]}>
                        <View style={commonStyle.row}>
                            <Text style={[commonStyle.fontBold, commonStyle.text14, commonStyle.textgrey]}>Total </Text>
                            <Text style={[commonStyle.fontBold, commonStyle.text14, commonStyle.textCharcoal]}> ₹{this.state.selectedCartItem?.price_breakup?.gross_total() ?? 0}</Text>
                        </View>

                        <RoundedCornerButton
                            label={
                                this.state.currentMapIndex == 0 ?
                                    "PROCEED TO SELECT ADDRESS"
                                    :
                                    this.state.currentMapIndex == 1 ?
                                        "CONFIRM ADDRESS"
                                        :
                                        "PROCEED TO BUY"
                            }
                            containerStyle={[commonStyle.flex1, commonStyle.gapLeft6]}
                            onPress={this.onPressBuy}
                        />

                    </View>
                </Animated.View>
            </View>
        )
    }
}

export default CartPaymentModal
// ?? 