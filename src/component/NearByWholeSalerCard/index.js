import React, { Component } from 'react';
import { View, Text, Linking } from 'react-native';
import colors from '../../utils/colors';
import { fonts, setWidth } from '../../utils/variable';
import Checkbox from '../Checkbox';
import CustomButton from '../CustomButton';
import { styles } from './style';

export default class NearByWholeSalerCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    message = (num) => {
        Linking.openURL(`sms:${num}?body=hi`)
    }

    call =(num) => {
        Linking.openURL(`tel:${num}`)
    }

    render() {
        this.data = this.props?.item
        return (
            <View style={[styles.shippingCardView, this.props.containerStyle]}>
                <View style={[styles.row, { justifyContent: 'space-between' }]}>
                    <Text style={[styles.text, styles.textBold, styles.textRed, {textTransform:'capitalize' }]}>{this.data?.name}</Text>
                    {
                        this.props.showCheckBox &&
                        <Checkbox
                            onPressCheckBox={() => this.props.onPressCheckBox()}
                            isChecked={this.data.isChecked}
                        />
                    }
                </View>
                <Text style={[styles.text, styles.textBold, styles.textGrey3, { marginTop: setWidth(2),textTransform:'capitalize' }]}>
                    {
                        this.data?.address ?
                            this.data?.address
                            :
                            '---'
                    }
                </Text>
                <Text style={[styles.text, styles.textBold, styles.textGrey3, { marginTop: setWidth(2) }]}>{this.data?.state} - {this.data?.pin}</Text>
                <Text style={[styles.text, styles.textBold, styles.textGrey3, { marginTop: setWidth(2) }]}>{this.data?.country}</Text>
                <Text style={[styles.text, styles.textBold, styles.darkText, { marginTop: setWidth(2) }]}>+91 {this.data?.mobile}</Text>
                <Text style={[styles.text, styles.textBold, styles.darkText, { marginTop: setWidth(2) }]}>
                    {
                        this.data?.email ?
                        this.data?.email
                        :
                        '---'
                    }
                </Text>

                {
                    this.props.showEditButton &&
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <CustomButton
                            container={{ backgroundColor: colors.primaryyellow, marginTop: setWidth(5), height: setWidth(8), flex: 0.3, justifyContent: 'center', }}
                            label="Message"
                            labelStyle={{ color: colors.black, fontFamily: fonts.fontRegular, letterSpacing: 0.9 }}
                            onPress={() => this.message(this.data?.mobile)}
                        />
                        <CustomButton
                            container={{ backgroundColor: colors.themeColor, marginTop: setWidth(5), height: setWidth(8), flex: 0.3, justifyContent: 'center', }}
                            label="Call"
                            labelStyle={{ color: colors.white, fontFamily: fonts.fontRegular, letterSpacing: 0.9}}
                            iconColor={colors.white}
                            onPress={() => this.call(this.data?.mobile)}
                        />
                    </View>
                }

            </View>
        );
    }
}
