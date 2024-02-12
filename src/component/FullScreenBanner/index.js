import React, { Component } from 'react';
import { View, Text, Dimensions, Animated, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { images, setHeight, setWidth } from '../../utils/variable';
import { styles } from './style';
const { width, height } = Dimensions.get("window");
import FastImage from 'react-native-fast-image'
import colors from '../../utils/colors';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import FastImageComponent from '../FastImageComponent';
import VideoComponent from '../VideoComponent';

export default class FullScreenBanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            itemHeight: 0,
            onPressBannerItem: undefined,
            resizeMode: ""
        };
        this.flatlist = React.createRef();
        this.scrollX = new Animated.Value(0);
        this.position = Animated.divide(this.scrollX, width);
    }

    static getDerivedStateFromProps(props, state) {
        return {
            dataList: (props.videos) ? [...props.data, ...props.videos] : (props.data) ? props.data : [],
            itemHeight: props.itemHeight ? props.itemHeight : 0,
            onPressBannerItem: props.onPressBannerItem ? props.onPressBannerItem : undefined,
            resizeMode: props.hasOwnProperty("resizeMode") ? props.resizeMode : ""
        }
    }



    infiniteScroll(dataList) {
        const numberOfData = dataList.length;
        let scrollValue = 0,
            scrolled = 0;

        setInterval(() => {
            scrolled++;
            if (scrolled < numberOfData) scrollValue = scrollValue + width;
            else {
                scrollValue = 0;
                scrolled = 0;
            }
            if (this.flatList != null) {
                this.flatList.scrollToOffset({ animated: true, offset: scrollValue });
            }
        }, 3000);
    }

    componentDidMount() {
        if (this.props.autoScroll)
            this.infiniteScroll(this.state.dataList);
    }

    onPressBannerItem = (index, item) => {
        if (item?.isVideoPoster) {
            if (this.state.onPressBannerItem) {
                this.state.onPressBannerItem(item)
            }
            if(this.props.onPressProductDetailsBannerItem){
                this.props.onPressProductDetailsBannerItem(index, true, item)
            }
        } else {
            if (this.state.onPressBannerItem) {
                this.state.onPressBannerItem(item)
            }
            if(this.props.onPressProductDetailsBannerItem){
                this.props.onPressProductDetailsBannerItem(index, false, item)
            }
        }
    }

    renderSlideItem = ({ item, index }) => {
        let viewHeight = 0
        return (
            <TouchableOpacity style={[styles.cardView, this.props.bannerCardStyle]} onPress={() => this.onPressBannerItem(index, item)} activeOpacity={this.props.activeOpacity ? this.props.activeOpacity : 0.8} onLayout={(e) => { viewHeight = e.nativeEvent.layout.height }}>

                {
                    this.props.staticImage ?
                        <FastImageComponent
                            style={[styles.image, this.props.bannerImageStyle]}
                            source={require("../../../assets/videos/a.png")}
                            resizeMode={this.state.resizeMode}
                        />
                        :
                        (item?.isVideoPoster) ?
                            <>
                                <View style={styles.playBtnContainer}>
                                    <View style={styles.circle1}>
                                        <EvilIcons name='play' color={colors.white} size={setWidth(20)} />
                                    </View>
                                </View>
                                <FastImageComponent
                                    source={{
                                        uri: item.image,
                                        priority: FastImage.priority.high,
                                    }}
                                    style={[styles.image, this.props.bannerImageStyle]}
                                />
                            </>
                            :
                            (item?.isVideo == true) ?
                                <VideoComponent
                                    uri={item.video_url}
                                    poster={item.poster}
                                    containerStyle={{
                                        width: width,
                                        height: this.state.itemHeight
                                    }}
                                    paused={false}
                                />
                                :
                                <FastImageComponent
                                    source={{
                                        // uri: "https://upload.wikimedia.org/wikipedia/commons/5/5a/2008-04-27_1500x900_chicago_sepia_view_from_within.jpg", 
                                        uri: item.image,
                                        priority: FastImage.priority.high,
                                    }}
                                    style={[styles.image, this.props.bannerImageStyle]}
                                    resizeMode={FastImage.resizeMode.cover}
                                />

                }

            </TouchableOpacity>
        )
    }


    render() {
        // console.log(this.state.dataList);
        return (
            <View>
                <FlatList
                    data={this.state.dataList}
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
                    renderItem={this.renderSlideItem}
                    onScroll={Animated.event([
                        { nativeEvent: { contentOffset: { x: this.scrollX } } },
                    ], { useNativeDriver: false })}
                    removeClippedSubviews={true}
                />

                {
                    (!this.props.showDots || this.state.dataList.length == 1) ?
                        <></>
                        :
                        <View style={[styles.dotView, this.props.dotViewContainer]}>
                            {this.state.dataList.map((_, i) => {
                                let opacity = this.position.interpolate({
                                    inputRange: [i - 1, i, i + 1],
                                    outputRange: [0.3, 1, 0.3],
                                    extrapolate: "clamp",
                                });
                                return (

                                    <Animated.View
                                        key={i}
                                        style={[{
                                            opacity,
                                            height: 6,
                                            width: 6,
                                            backgroundColor: colors.red,
                                            marginHorizontal: 3,
                                            borderRadius: 8,
                                        }, this.props.dotContainerStyle]}
                                    />

                                );
                            })}
                        </View>
                }

            </View>
        );
    }
}
