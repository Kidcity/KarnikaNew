import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import colors from '../../utils/colors';
import { setHeight, setWidth } from '../../utils/variable';
import CustomButton from '../CustomButton';
import { styles } from './style';
import { images } from '../../utils/variable';
import FastImage from 'react-native-fast-image'

export default class AvailableBrands extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentOffset: { x: 0, y: 0 },
            contentSize: 0,
            scrollViewWidth: 0
        };
        // this.scrollX = new Animated.Value(0);
        // this.position = Animated.divide(this.scrollX, width);
    }

    render() {
        const scrollPerc = (this.state.contentOffset.x / (this.state.contentSize - this.state.scrollViewWidth))
            * (100);
        
        return (
            <View style={[styles.availableBrandContainer, this.props.containerStyle && this.props.containerStyle]}>
                {/* <Text style={[styles.heading, { color: colors.grey2 }]}>
                    {
                        (this.props.title) ?
                            this.props.title
                            :
                            "AVAILABLE BRANDS"
                    }
                </Text> */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    onScroll={e => {
                        this.setState({
                            contentOffset: e.nativeEvent.contentOffset
                        })
                    }}
                    onContentSizeChange={(width, height) => {
                        this.setState({
                            contentSize: width
                        })
                    }}
                    onLayout={e => {
                        this.setState({
                            scrollViewWidth: e.nativeEvent.layout.width
                        })
                    }}
                    style={{
                        marginTop: setHeight(2)
                    }}
                    scrollEventThrottle={16}
                >
                    {
                        this.props.brands.map((item, index) =>
                            <TouchableOpacity style={styles.brandView} key={index} onPress={() => this.props.onPressBrand(item)}>
                                <FastImage
                                    style={[styles.brandImage]}
                                    source={{
                                        uri: item.image,
                                        priority: FastImage.priority.high,
                                    }}
                                    resizeMode={FastImage.resizeMode.contain}
                                />
                            </TouchableOpacity>
                        )
                    }
                </ScrollView>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: colors.grey5,
                        marginHorizontal: setWidth(40),
                        marginTop: setWidth(5)
                    }}
                >
                    <View
                        style={{                          
                            width: (scrollPerc < 0 || isNaN(scrollPerc)) ? 0 : `${scrollPerc}%`,
                            backgroundColor: colors.yellow,
                            height: 5
                        }}
                    />
                </View>             
                {/* <CustomButton
                    container={{
                        backgroundColor: colors.primaryyellow,
                        marginTop: setWidth(6),
                        paddingHorizontal: setWidth(7),
                        paddingRight: setWidth(9),
                    }}
                    label="VIEW ALL BRANDS"
                    labelStyle={{ color: colors.white }}
                    iconColor={colors.white}
                    onPress={() => this.props.onPressAllBrand()}
                    leftIcon={true}
                /> */}
            </View>
        );
    }
}
