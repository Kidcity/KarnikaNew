import { Text, View, Animated } from 'react-native'
import React, { Component } from 'react'
import { styles } from './style';
import colors from '../../utils/colors';

export default class BlinkText extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: "",
            style: null,
            children: null
        };
        this.fadeAnimation = new Animated.Value(1);
    }

    static getDerivedStateFromProps(props, state) {
        return {
            text: props.hasOwnProperty("text") ? props.text : "",
            style: props.hasOwnProperty("style") ? props.style : "",
            children: props.hasOwnProperty("children") ? props.children : null,
        }
    }

    componentDidMount() {
        Animated.loop(
            Animated.sequence([
                Animated.timing(this.fadeAnimation, {
                    toValue: 0.6,
                    duration: this.props.duration,
                    useNativeDriver: true,
                }),
                Animated.timing(this.fadeAnimation, {
                    toValue: 1,
                    duration: this.props.duration,
                    useNativeDriver: true,
                })
            ]),
            {
                iterations: this.props.repeat_count
            }
        ).start();
    }


    render() {
        return (
            <Animated.View style={[this.state.style, { opacity: this.fadeAnimation }]}>
                {
                    this.state.children ?
                        this.state.children
                        :
                        <Text style={styles.text} adjustsFontSizeToFit numberOfLines={1}>
                            {
                                this.state.text
                            }
                        </Text>
                }

            </Animated.View>
        )
    }
}