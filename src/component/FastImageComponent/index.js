import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import FastImage from 'react-native-fast-image';
import colors from '../../utils/colors';

export default class FastImageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            style: {},
            source: null,
            imageLoading: false,
            resizeMode: FastImage.resizeMode.stretch
        };
    }
    static getDerivedStateFromProps(props, state) {
        return {
            style: props.style ? props.style : {},
            source: props.source ? props.source : null,
            resizeMode: props.resizeMode ? props.resizeMode : FastImage.resizeMode.stretch
        }
    }

    render() {
        const { style, source, imageLoading } = this.state
        // console.log(JSON.stringify(source))
        return (
            <>
                {imageLoading && 
                <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999, alignItems:'center', justifyContent:'center'}}>
                    <ActivityIndicator size="large" color={colors.black} animating={true} />
                </View>
                }
                <FastImage
                    style={style}
                    source={source}
                    resizeMode={this.state.resizeMode}
                    onLoadStart={() => {
                        this.setState({ imageLoading: true })
                    }}
                    onLoadEnd={() => {                      
                        this.setState({ imageLoading: false })
                    }}
                />
            </>
        );
    }
}
