import { Text, TouchableOpacity, View } from 'react-native'
import React, { Component, PureComponent } from 'react'
import { commonStyle } from '../../helper/commonStyle'
import { styles } from './style'

export default class CircleIconButton extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            icon: null,
            buttonContainer: null,
            onPress: undefined
        };
    }

    static getDerivedStateFromProps(props, state) {
        return {
            icon: props.hasOwnProperty("icon") ? props.icon : null,
            buttonContainer: props.hasOwnProperty("buttonContainer") ? props.buttonContainer : null,
            onPress:  props.hasOwnProperty("onPress") ? props.onPress : undefined,
        }
    }

    render() {
        return (
            <TouchableOpacity activeOpacity={0.5} style={[styles.btn, this.state.buttonContainer, commonStyle.shadow]} onPress={this.state.onPress}>
                {
                    this.state.icon
                }
            </TouchableOpacity>
        )
    }
}