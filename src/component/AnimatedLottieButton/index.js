import { Text, TouchableOpacity, View } from 'react-native'
import React, { Component, PureComponent } from 'react'
import { styles } from './style';
import { commonStyle } from '../../helper/commonStyle';
import LottieAnimation from '../LottieAnimation';

export default class zAnimatedLottieButton extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            containerStyle: null,
            lottieContainer: null,
            btnLabel: "",
            lottieSource: null,
            onPress: undefined,
            labelViewStyle: null
        };
    }

    static getDerivedStateFromProps(props, state) {
        return {
            containerStyle: props.hasOwnProperty("containerStyle") ? props.containerStyle : null,
            lottieContainer: props.hasOwnProperty("lottieContainer") ? props.lottieContainer : null,
            btnLabel: props.hasOwnProperty("btnLabel") ? props.btnLabel : "",
            lottieSource: props.hasOwnProperty("lottieSource") ? props.lottieSource : null,
            onPress: props.hasOwnProperty("onPress") ? props.onPress : undefined,
            labelViewStyle: props.hasOwnProperty("labelViewStyle") ? props.labelViewStyle : null
        }
    }

    render() {
        return (
            <TouchableOpacity style={[styles.button, this.state.containerStyle, commonStyle.shadow]} onPress={this.state.onPress} >
                <View style={[styles.lottieContainer, this.state.lottieContainer]}>
                    <LottieAnimation
                        source={this.state.lottieSource}
                    />
                </View>
                <View style={[styles.labelView, this.state.labelViewStyle, commonStyle.row, commonStyle.alignItemsCenter]}>
                    <Text style={styles.btnText}>{this.state.btnLabel}</Text>
                </View>
            </TouchableOpacity>

        )
    }
}
