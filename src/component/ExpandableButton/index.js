import React, { Component } from 'react';
import { View, Text, Animated, TouchableOpacity } from 'react-native';
import colors from '../../utils/colors';
import { setWidth } from '../../utils/variable';
import { styles } from './style';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Checkbox from '../Checkbox';

export default class ExpandableButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opacity: new Animated.Value(0)
        };
    }

    _changeOpacity() {
        Animated.spring(     //Step 4
            (tag == 'cod') ? this.state.COD_opacity : this.state.ONLINE_opacity,
            {
                toValue: 1,
                useNativeDriver: true
            }
        ).start();
    }

    render() {
        return (
            <View>
                <TouchableOpacity style={[styles.collapsableButton, this.props.expandButtonContainer]} onPress={this.props.onPressExpandButton} activeOpacity={0.8}>
                    <Text style={[styles.subHeading, styles.textBold]}>{this.props.buttonTitle}</Text>
                    <MaterialIcons name={!this.props.isExpand ? 'keyboard-arrow-down' : 'keyboard-arrow-up'} size={setWidth(7)} color={colors.red} />
                </TouchableOpacity>
                {
                    this.props.isExpand &&
                    <Animated.View style={[styles.expandBox]}>
                        {
                            this.props.cardtext1 &&
                            <Text style={[styles.subHeading, styles.textBold,]}>{this.props.cardtext1}</Text>
                        }
                        <View style={[styles.row, { justifyContent: 'space-between', marginTop: setWidth(4), alignItems: 'center' }]}>
                            <Text style={[styles.subHeading, styles.textBold]}>
                                {this.props.cardtext2}
                            </Text>

                            <Checkbox isChecked={this.props.isChecked} onPressCheckBox={(v) => this.props.onPressCheckBox(v)} />
                        </View>
                    </Animated.View>
                }
            </View>
        );
    }
}
