import { Text, View } from 'react-native'
import React, { PureComponent } from 'react'
import { styles } from './style'
import { commonStyle } from '../../helper/commonStyle';
import { formattedCurrency } from '../../utils/variables';

export class EachOrderPriceBreakUp extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            priceDetails: null
        };
    }

    static getDerivedStateFromProps(props, state) {
        return {
            priceDetails: props.hasOwnProperty("priceDetails") ? props.priceDetails : null,
        }
    }

    render() {

        return (
            <View style={styles.container}>
                {
                    this.state.priceDetails?.gross_total_without_charges &&
                    <View style={[commonStyle.row, commonStyle.justifyContentBetween, styles.paddingHorizontal10]}>
                        <Text style={[commonStyle.text14, commonStyle.fontRegular, commonStyle.textCharcoal]}>
                            Total Value
                        </Text>
                        <Text style={[commonStyle.text14, commonStyle.fontRegular, commonStyle.textCharcoal]}>
                            ₹{
                                formattedCurrency(this.state.priceDetails?.gross_total_without_charges)
                            }
                        </Text>
                    </View>
                }

                {
                    this.state.priceDetails?.oda_charges &&
                    <View style={[commonStyle.row, commonStyle.justifyContentBetween, commonStyle.gapTop10, styles.paddingHorizontal10]}>
                        <Text style={[commonStyle.text14, commonStyle.fontRegular, commonStyle.textCharcoal]}>
                            ODA Charges
                        </Text>
                        <Text style={[commonStyle.text14, commonStyle.fontRegular, commonStyle.textCharcoal]}>
                            ₹{
                                formattedCurrency(this.state.priceDetails?.oda_charges)
                            }
                        </Text>
                    </View>
                }

                {
                    this.state.priceDetails?.shipping_charges &&
                    <View style={[commonStyle.row, commonStyle.justifyContentBetween, commonStyle.gapTop10, styles.paddingHorizontal10]}>
                        <Text style={[commonStyle.text14, commonStyle.fontRegular, commonStyle.textCharcoal]}>
                            Shipping Charges
                        </Text>
                        <Text style={[commonStyle.text14, commonStyle.fontRegular, commonStyle.textCharcoal]}>
                            ₹{
                                formattedCurrency(this.state.priceDetails?.shipping_charges)
                            }
                        </Text>
                    </View>
                }

                {
                    this.state.priceDetails?.platform_fees &&

                    <View style={[commonStyle.row, commonStyle.justifyContentBetween, commonStyle.gapTop10, styles.paddingHorizontal10]}>
                        <Text style={[commonStyle.text14, commonStyle.fontRegular, commonStyle.textCharcoal]}>
                            Platform Convenience Fee
                        </Text>
                        <Text style={[commonStyle.text14, commonStyle.fontRegular, commonStyle.textCharcoal]}>
                            ₹{
                                formattedCurrency(this.state.priceDetails?.platform_fees)
                            }
                        </Text>
                    </View>
                }

                {
                    this.state.priceDetails?.gst_cal_5 !== 0 &&
                    <View style={[commonStyle.row, commonStyle.justifyContentBetween, commonStyle.gapTop10, styles.paddingHorizontal10]}>
                        <Text style={[commonStyle.text14, commonStyle.fontRegular, commonStyle.textCharcoal]}>
                            GST 5%
                        </Text>
                        <Text style={[commonStyle.text14, commonStyle.fontRegular, commonStyle.textCharcoal]}>
                            ₹{
                                formattedCurrency(this.state.priceDetails?.gst_cal_5)
                            }
                        </Text>
                    </View>
                }

                {
                    this.state.priceDetails?.gst_cal_12 !== 0 &&
                    <View style={[commonStyle.row, commonStyle.justifyContentBetween, commonStyle.gapTop10, styles.paddingHorizontal10]}>
                        <Text style={[commonStyle.text14, commonStyle.fontRegular, commonStyle.textCharcoal]}>
                            GST 12%
                        </Text>
                        <Text style={[commonStyle.text14, commonStyle.fontRegular, commonStyle.textCharcoal]}>
                            ₹{
                                formattedCurrency(this.state.priceDetails?.gst_cal_12)
                            }
                        </Text>
                    </View>
                }

                {
                    this.state.priceDetails?.special_discount !== 0 &&
                    <View style={[commonStyle.row, commonStyle.justifyContentBetween, commonStyle.gapTop10, styles.paddingHorizontal10]}>
                        <Text style={[commonStyle.text14, commonStyle.fontRegular, commonStyle.textRed]}>
                            Special Discount
                        </Text>
                        <Text style={[commonStyle.text14, commonStyle.fontRegular, commonStyle.textRed]}> ( - )
                            ₹{
                                formattedCurrency(this.state.priceDetails?.special_discount)
                            }
                        </Text>
                    </View>
                }

                <View style={[styles.result, commonStyle.gapTop10, commonStyle.justifyContentBetween, commonStyle.row]}>
                    <Text style={[commonStyle.text14, commonStyle.fontBold, commonStyle.textCharcoal]}>Gross Total</Text>
                    <Text style={[commonStyle.text14, commonStyle.fontBold, commonStyle.textCharcoal]}>
                        ₹{
                            formattedCurrency(this.state.priceDetails?.gross_total())
                        }
                    </Text>
                </View>

            </View>
        )
    }
}

export default EachOrderPriceBreakUp