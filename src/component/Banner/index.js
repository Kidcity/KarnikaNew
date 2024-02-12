import { Animated, FlatList, Text, TouchableOpacity, View } from 'react-native'
import React, { Component, PureComponent } from 'react'
import { styles } from './style'

import CustomImage from '../FastImage';
import { DEVICE_WIDTH, images } from '../../utils/variable';


export default class Banner extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            containerStyle: null,
            showPagination: true,
            autoScroll: false,
            onPressBannerItem: undefined
        };
        this.flatlist = React.createRef();
        this.scrollX = new Animated.Value(0);
        this.position = Animated.divide(this.scrollX, DEVICE_WIDTH);
    }

    static getDerivedStateFromProps(props, state) {
        return {
            data: props.hasOwnProperty("data") ? props.data : null,
            containerStyle: props.hasOwnProperty("containerStyle") ? props.containerStyle : null,
            showPagination: props.hasOwnProperty("showPagination") ? props.showPagination : true,
            autoScroll: props.hasOwnProperty("autoScroll") ? props.autoScroll : false,
            onPressBannerItem: props.onPressBannerItem ? props.onPressBannerItem : undefined,
        }
    }

    componentDidMount() {
        if (this.state.autoScroll)
            this.infiniteScroll();
    }

    onPressBannerItem = (item) => {
        if (item.isVideoPoster) {
            if (this.state.onPressBannerItem) {
                this.state.onPressBannerItem(item)
            }
        } else {
            if (this.state.onPressBannerItem) {
                this.state.onPressBannerItem( item)
            }
        }
    }

    infiniteScroll() {
        const numberOfData = this.state.data.length;
        let scrollValue = 0,
            scrolled = 0;

        setInterval(() => {
            scrolled++;
            if (scrolled < numberOfData) scrollValue = scrollValue + DEVICE_WIDTH;
            else {
                scrollValue = 0;
                scrolled = 0;
            }
            if (this.flatList != null) {
                this.flatList.scrollToOffset({ animated: true, offset: scrollValue });
            }
        }, 3000);
    }

    renderBannerItem = ({ item, index }) => {
        // console.log("banner  ===> ",item.image);
        return (
            <TouchableOpacity style={styles.bannerImageContainer} onPress={() => this.onPressBannerItem(item)}>
                <CustomImage
                    source={{uri: item.image}}
                    style={styles.image}
                    resizeMode="cover"
                />
            </TouchableOpacity>
        )
    }


    render() {
        return (
            <View style={[styles.container, this.state.containerStyle]}>
                <FlatList
                    data={this.state.data}
                    ref={(ref) => {
                        this.flatList = ref;
                    }}
                    keyExtractor={(item, index) => "key" + index}
                    horizontal
                    pagingEnabled
                    scrollEnabled
                    snapToAlignment="center"
                    scrollEventThrottle={16}
                    decelerationRate={"fast"}
                    showsHorizontalScrollIndicator={false}
                    renderItem={this.renderBannerItem}
                    onScroll={Animated.event([
                        { nativeEvent: { contentOffset: { x: this.scrollX } } },
                    ], { useNativeDriver: false })}
                    removeClippedSubviews={true}
                />
                {
                    (!this.state.showPagination || this.state.data.length == 1) ?
                        <></>
                        :
                        <View style={[styles.paginationContainer]}>
                            {
                                this.state.data.map((_, i) => {
                                    let opacity = this.position.interpolate({
                                        inputRange: [i - 1, i, i + 1],
                                        outputRange: [0.3, 1, 0.3],
                                        extrapolate: "clamp",
                                    });
                                    return (

                                        <Animated.View
                                            key={i}
                                            style={[styles.dots, { opacity }]}
                                        />

                                    );
                                })
                            }
                        </View>
                }
            </View>
        )
    }
}