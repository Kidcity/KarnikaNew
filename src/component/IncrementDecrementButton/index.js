import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './style';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { setWidth } from '../../utils/variable';
import colors from '../../utils/colors';

export default class IncrementDecrementButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={[styles.container, this.props.container]}>
                <TouchableOpacity style={[styles.plusBtn,{flex: 0.3, alignItems:'center'}]} onPress={() => this.props.onDecrease()}>
                    <AntDesign name='minus' size={ this.props.iconSize ? this.props.iconSize : setWidth(4)} color={ this.props.btnTextColor ? this.props.btnTextColor : colors.white} />
                </TouchableOpacity>
                <Text style={[styles.btnText,this.props.labelColor,{flex: 0.4, textAlign:'center', fontWeight:'bold' }]} adjustsFontSizeToFit numberOfLines={1}>{this.props.label}</Text>
                <TouchableOpacity style={[styles.minusBtn,{flex: 0.3, alignItems:'center' }]} onPress={() => this.props.onIncrease()}>
                    <AntDesign name='plus' size={ this.props.iconSize ? this.props.iconSize : setWidth(4)} color={this.props.btnTextColor ? this.props.btnTextColor :colors.white} />
                </TouchableOpacity>
            </View>
        );
    }
}
