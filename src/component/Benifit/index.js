import { Text, View } from 'react-native'
import React, { Component, PureComponent } from 'react'

import { styles } from './style'
import colors from '../../utils/colors'
import CustomImage from '../FastImage'
import { commonStyle } from '../../helper/commonStyle'
import { images } from '../../utils/variable'

export default class Benifit extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            containerStyle: null,
            image: ""
        };
    }

    static getDerivedStateFromProps(props, state) {
        return {
            image: props.hasOwnProperty("image") ? props.image : "",
            containerStyle: props.hasOwnProperty("containerStyle") ? props.containerStyle : null,
        }
    }
    render() {
        
        return (
            <View style={[styles.container, this.state.containerStyle]}>
                <CustomImage
                    source={{
                        uri: this.state.image
                    }}
                    // source={require("../../../assets/a.png")}
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>
        )
    }
}