import React, { Component } from 'react';
import { View, Text } from 'react-native';
import colors from '../../utils/colors';
import { fonts, setWidth } from '../../utils/variable';
import Checkbox from '../Checkbox';
import CustomButton from '../CustomButton';
import { styles } from './style';

export default class AddressCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }

    render() {
        this.data = this.props.item
        return (
            <View style={[styles.shippingCardView, this.props.containerStyle]}>
                <View style={[styles.row, { justifyContent: 'space-between' }]}>
                    <Text style={[styles.text, styles.textBold, styles.textRed, {textTransform:'capitalize' }]}>{this.data.name}</Text>
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
                        this.data.address ?
                            this.data.address
                            :
                            '---'
                    }
                </Text>
                <Text style={[styles.text, styles.textBold, styles.textGrey3, { marginTop: setWidth(2) }]}>{this.data.state} - {this.data.pin}</Text>
                <Text style={[styles.text, styles.textBold, styles.textGrey3, { marginTop: setWidth(2) }]}>{this.data.country}</Text>
                <Text style={[styles.text, styles.textBold, styles.darkText, { marginTop: setWidth(2) }]}>+91 {this.data.mobile}</Text>
                <Text style={[styles.text, styles.textBold, styles.darkText, { marginTop: setWidth(2) }]}>
                    {
                        this.data.email ?
                        this.data.email
                        :
                        '---'
                    }
                </Text>

                {
                    this.props.showEditButton &&
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <CustomButton
                            container={{ backgroundColor: colors.white, borderColor: colors.red, borderWidth: setWidth(0.3), marginTop: setWidth(5), height: setWidth(8), flex: 0.3, justifyContent: 'center', }}
                            label="EDIT"
                            labelStyle={{ color: colors.red, fontFamily: fonts.fontRegular }}
                            // iconColor={colors.white}
                            //leftIcon={true}
                            onPress={() => this.props.onPressEditAddress()}
                        />
                        <CustomButton
                            container={{ backgroundColor: colors.white, borderColor: colors.red, borderWidth: setWidth(0.3), marginTop: setWidth(5), height: setWidth(8), flex: 0.3, justifyContent: 'center', }}
                            label="DELETE"
                            labelStyle={{ color: colors.red, fontFamily: fonts.fontRegular, }}
                            iconColor={colors.white}
                            //leftIcon={true}
                            onPress={() => this.props.onPressDeleteAddress()}
                        />
                    </View>
                }

            </View>
        );
    }
}
