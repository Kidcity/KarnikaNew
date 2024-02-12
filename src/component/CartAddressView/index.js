import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import colors from '../../utils/colors';
import { setWidth } from '../../utils/variable';
import { styles } from './style';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Feather from 'react-native-vector-icons/Feather'
import moment from 'moment'
import AddressCard from '../AddressCard';
import { commonStyle } from '../../helper/commonStyle';

export default class CartAddressView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: undefined,
            total_price_details: undefined,
            est_date: ''
        };
    }

    static getDerivedStateFromProps(props, state) {
        return {
            address: props.address ? props.address : undefined,
            total_price_details: props.total_price_details ? props.total_price_details : undefined,
        }
    }

    // UNSAFE_componentWillReceiveProps(nextProps) {
    //     this.setState({
    //         address: nextProps.address,
    //         total_price_details: nextProps.total_price_details,
    //     });
    // }

    componentDidMount() {
        var startdate = moment()
        startdate = startdate.format("DD-MM-YYYY");
        var new_date = moment(startdate, "DD-MM-YYYY").add(10, 'days');

        this.setState({
            est_date: moment(new_date).format("Do MMM YYYY")
        })
    }

    render() {
        let total = 0
        if (this.state.total_price_details) {
            this.state.total_price_details.map((item, index) => {
                total += (+item.value)
            })
        }
        return (
            <View style={styles.container}>
                <View style={styles.shippingAddressView}>
                    <View style={[styles.row, { alignItems: 'center' }]}>
                        <EvilIcons name='location' size={setWidth(7)} color={colors.dark_charcoal} />
                        <Text style={styles.shippingAddressHeading}>Shipping Address</Text>
                    </View>
                    {
                        this.state.address &&
                        <AddressCard
                            item={this.state.address}
                            showCheckBox={false}
                            containerStyle={{
                                marginTop: setWidth(3),
                            }}
                        />
                    }
                </View>

                <View style={[styles.row, { marginTop: setWidth(8), marginHorizontal: setWidth(4) }]}>
                    <TouchableOpacity style={styles.button} onPress={this.props.onPressChangeAddress}>
                        <Text style={styles.buttonText}>CHANGE / EDIT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, { marginLeft: setWidth(2) }]} onPress={this.props.onPressAddNewAddress}>
                        <Text style={styles.buttonText}>ADD NEW ADDRESS</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.estimateTimeView}>
                    <Feather name='truck' size={setWidth(6)} color={colors.dark_charcoal} />
                    <Text style={styles.estimateText}>Estimated Delivey By {this.state.est_date}</Text>
                </View>

                <View style={styles.priceDetailsView}>
                    <Text style={[{ color: colors.grey2 }, styles.textBold]}>Total Price Details</Text>
                    <View style={styles.priceBoxView}>
                        {
                            this.state.total_price_details &&
                            this.state.total_price_details.map((item, index) => {
                                return (
                                    <View style={[styles.row, styles.textGap, { justifyContent: 'space-between' }]} key={index}>
                                        <Text style={[styles.subHeading, styles.darkText]}>{item.title}</Text>
                                        <Text style={[styles.subHeading, styles.darkText, commonStyle.bluredText,]}>₹ {parseFloat(item.value).toFixed(2)}</Text>
                                    </View>
                                )
                            })
                        }
                        {/* <View style={[styles.row, { justifyContent: 'space-between', marginTop: setWidth(3) }]} >
                            <Text style={[styles.subHeading, styles.darkText, styles.textBold]}>You Pay</Text>
                            <Text style={[styles.subHeading, styles.darkText, styles.textBold]}> ₹ {parseFloat(total).toFixed(2)}</Text>
                        </View> */}
                    </View>
                </View>
            </View>
        );
    }
}
