import React, { Component, PureComponent } from 'react';
import { View, Text, Image, TouchableOpacity, Animated } from 'react-native';

import { styles } from './style';
import AntDesign from 'react-native-vector-icons/AntDesign'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { normalize, setHeight, setWidth } from '../../utils/variable';
import FastImage from 'react-native-fast-image';
import CustomImage from '../FastImage';
import { images } from '../../utils/variables';
import { commonStyle } from '../../helper/commonStyle';
import AboutProduct from '../AboutProduct';
import { colors } from '../../utils/colors';
// import BlinkText from '../BlinkText';

export default class GridViewProductItem extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            containerStyle: null,
            onPressProduct: undefined
        };
        this.fadein = new Animated.Value(1)
    }

    static getDerivedStateFromProps(props, state) {
        return {
            containerStyle: props.hasOwnProperty("containerStyle") ? props.containerStyle : null,
            onPressProduct: props.hasOwnProperty("onPressProduct") ? props.onPressProduct : undefined
        }
    }

    componentDidMount() {
        // Animated.timing(
        //     this.fadein,
        //     {
        //         toValue: 1,
        //         duration: 1000,
        //         useNativeDriver: true
        //     }
        // ).start()
    }

    render() {

        return (
            <TouchableOpacity style={[styles.container, commonStyle.shadow, this.state.containerStyle,]} activeOpacity={0.5} onPress={this.state.onPressProduct}>
                <Animated.View style={[{
                    opacity: this.fadein
                }]}>
                    <View style={styles.imageContainer}>
                        <CustomImage
                            source={images.product_view1}
                            style={styles.image}
                            resizeMode="cover"
                        />                        
                    </View>
                    <AboutProduct
                    />

                </Animated.View>
            </TouchableOpacity>
        );
    }
}
