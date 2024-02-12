import { Text, TouchableOpacity, View } from 'react-native'
import React, { Component, PureComponent } from 'react'
import { styles } from './style'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

import  colors  from '../../utils/colors';
import { normalize } from '../../utils/variable';

export default class PrimaryButton extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            btnLabel: "",
            containerStyle: null,
            onPress: undefined
        };
    }

    static getDerivedStateFromProps(props, state) {
        return {
            data: props.hasOwnProperty("data") ? props.data : null,
            btnLabel: props.hasOwnProperty("btnLabel") ? props.btnLabel : null,
            containerStyle: props.hasOwnProperty("containerStyle") ? props.containerStyle : null,
            onPress: props.hasOwnProperty("onPress") ? props.onPress : undefined,
        }
    }
    render() {
        return (
            <TouchableOpacity style={[styles.container, this.state.containerStyle]} onPress={this.state.onPress}>
                <Text style={styles.btnText}>{this.state.btnLabel}</Text>
                <SimpleLineIcons name="arrow-right" size={normalize(12)} color={colors.white} />
            </TouchableOpacity>
        )
    }
}