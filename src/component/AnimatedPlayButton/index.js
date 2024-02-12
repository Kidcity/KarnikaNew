import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { styles } from './style';
import Feather from 'react-native-vector-icons/Feather'
import { setWidth } from '../../utils/variable';
import colors from '../../utils/colors';


export default class AnimatedPlayButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            style: {},
            iconSize: setWidth(10),
            iconColor: colors.grey2,
            itemHeight: 0,
            itemWidth: 0,
            onPressPlayButton: undefined,
            onStopPlaying: undefined,
        };       
    }

    static getDerivedStateFromProps(props, state) {
        return {
            style: props.style ? props.style : {},
            iconSize: props.iconSize ? props.iconSize : setWidth(10),
            iconColor: props.iconColor ? props.iconColor : colors.grey2,
            itemHeight: props.itemHeight ? props.itemHeight : 0,
            itemWidth: props.itemWidth ? props.itemWidth : 0,
            onPressPlayButton: props.onPressPlayButton ? props.onPressPlayButton : undefined,
        }
    }


    onPress = () => {
        if (this.state.onPressPlayButton) {
            this.state.onPressPlayButton()
        }
    }

    render() {
        return (
                <Animated.View style={[
                    styles.btnContainer,
                    {
                        left: (+this.state.itemWidth / 2),
                        top: (+this.state.itemHeight / 2)
                    },
                    this.state.style
                ]}>
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', }} activeOpacity={0.6} onPress={this.onPress}>
                        <Feather name='play-circle' size={this.state.iconSize} color={this.state.iconColor} />
                    </TouchableOpacity>
                </Animated.View>
        );
    }
}
