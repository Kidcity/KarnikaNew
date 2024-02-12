import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { styles } from './style';
import { commonStyle } from '../../helper/commonStyle';

class ColorCodeCircle extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            bgColor: "#000",
            moreColorText: ""
        };
    }

    static getDerivedStateFromProps(props, state) {
        return {
            bgColor: props.hasOwnProperty("bgColor") ? props.bgColor : "#000",
            moreColorText: props.hasOwnProperty("moreColorText") ? props.moreColorText : ""
        }
    }

    render() {
        if (this.state.moreColorText !== "") {
            return (
                <View style={[styles.moreContainer, { backgroundColor: this.state.bgColor }]}>

                    <Text style={[commonStyle.textWhite, commonStyle.text12, commonStyle.fontBold]}>+ {this.state.moreColorText}</Text>
                </View>
            )
        }
        return (
            <View style={[styles.container, { backgroundColor: this.state.bgColor }]}>
            </View>
        );
    }
}

export default ColorCodeCircle;
