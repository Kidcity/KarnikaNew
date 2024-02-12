import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import Feather from 'react-native-vector-icons/Feather'
import { icons, setWidth } from '../../utils/variable';
import { styles } from './style';

export default class TextCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <TouchableOpacity style={[styles.container, this.props.containerStyle]} onPress={this.props.onPress}>
                <View style={[styles.content, styles.row]}>
                    <View style={[styles.row, { alignItems: 'center', flex: 0.9,  }]}>
                        {
                            this.props.leftIcon ?
                                this.props.leftIcon
                                :
                                <FastImage
                                    style={[styles.image, this.props.imageStyle]}
                                    source={this.props.image}
                                    resizeMode={FastImage.resizeMode.contain}
                                />
                        }
                        <Text style={[styles.title, this.props.titleStyle]}>{this.props.leftText}</Text>
                        {
                            this.props.middleView
                        }
                    </View>
                    <View style={[{ alignItems: 'center', justifyContent: 'center', width: setWidth(6), flex: 0.1 }]}>
                        {
                            this.props.rightIcon &&
                            this.props.rightIcon
                        }

                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}
