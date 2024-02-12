import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { styles } from './style';

export default class TextCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        
        return (
            <TouchableOpacity style={[styles.container, this.props.containerStyle && this.props.containerStyle]} onPress={this.props.onPress}>
                <View style={[styles.content, styles.row]}>
                    <View style={[styles.row, { alignItems: 'center' }]}>
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
                    </View>
                    {
                        this.props.middleView
                    }

                    {
                        this.props.rightIcon &&
                        <View style={[{ alignItems: 'center', justifyContent: 'center' }]}>
                            {this.props.rightIcon}
                        </View>
                    }

                </View>
            </TouchableOpacity>
        );
    }
}
