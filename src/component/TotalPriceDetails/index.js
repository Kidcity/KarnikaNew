import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { styles } from './style'
import { Strings } from '../../utils/strings';
import { setWidth } from '../../utils/variable';
import { commonStyle } from '../../helper/commonStyle';

export default class TotalPriceDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            containerStyle: null,
            total_price_details: this.props.total_price_details
        };

    }

    static getDerivedStateFromProps(props, state) {
        return {
            containerStyle: props.containerStyle ? props.containerStyle : null,
            total_price_details: props.total_price_details ? props.total_price_details : null,
        }
    }
    render() {
        let total = 0
        if (this.state.total_price_details) {
            this.state.total_price_details.map((item, index) => {

                total += (+item.value)
            })
        }
        return (
            <View style={[styles.container, this.state.containerStyle]}>
                <Text style={[styles.darkText, styles.textBold]}>{Strings.cartScreenStrings.cartViewComponentStrings.totalPriceDetailsText}</Text>

                <View style={styles.priceBoxView}>
                    {
                        this.state.total_price_details &&
                        this.state.total_price_details.map((item, index) => {
                            return (
                                <View style={[styles.row, styles.textGap, { justifyContent: 'space-between', alignItems:'center' }]} key={index}>
                                    <Text style={[styles.subHeading, styles.darkText,{flex: 0.7}]}>{item.title}</Text>
                                    <Text style={[styles.subHeading, styles.textRight, styles.darkText,{flex: 0.3},commonStyle.bluredText]}>₹ {parseFloat(item.value).toFixed(2)}</Text>
                                </View>
                            )
                        })
                    }
                    {/* <View style={[styles.row, { justifyContent: 'space-between', marginTop: setWidth(3) }]} >
                        <Text style={[styles.subHeading, styles.darkText, styles.textBold]}>You Pay</Text>
                        <Text style={[styles.subHeading, styles.darkText, styles.textBold]}>₹ {parseFloat(total).toFixed(2)}</Text>
                    </View> */}
                </View>


            </View>
        )
    }
}