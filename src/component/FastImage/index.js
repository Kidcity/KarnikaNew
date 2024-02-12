import { ActivityIndicator, Text, View } from 'react-native'
import React, { PureComponent } from 'react'
import FastImage from 'react-native-fast-image';
import { styles } from './style';
import colors from '../../utils/colors';

export default class CustomImage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            style: null,
            imageStyle: null,
            source: null,
            imageLoading: false,
            resizeMode: FastImage.resizeMode.stretch
        };
    }

    static getDerivedStateFromProps(props, state) {
        return {
            style: props.hasOwnProperty("style") ? props.style : null,
            imageStyle: props.hasOwnProperty("imageStyle") ? props.imageStyle : null,
            source: props.hasOwnProperty("source") ? props.source : null,
            resizeMode: props.hasOwnProperty("resizeMode") ?
                (props.resizeMode == "stretch") ? FastImage.resizeMode.stretch :
                    (props.resizeMode == "cover") ? FastImage.resizeMode.cover :
                        (props.resizeMode == "contain") ? FastImage.resizeMode.contain :
                            (props.resizeMode == "center") && FastImage.resizeMode.center :
                            FastImage.resizeMode.stretch                          
        }
    }

    render() {
        return (
            <>
                {this.state.imageLoading &&
                    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color={colors.black} animating={true} />
                    </View>
                }
                <FastImage
                    style={this.state.style}
                    source={this.state.source}
                    resizeMode={this.state.resizeMode}
                    onLoadStart={() => {
                        this.setState({ imageLoading: true })
                    }}
                    onLoadEnd={() => {
                        this.setState({ imageLoading: false })
                    }}
                />
            </>
        )
    }
}