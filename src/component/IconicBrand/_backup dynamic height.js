import React, { Component } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image, FlatList, Animated, Dimensions, Platform, PixelRatio } from 'react-native';
import colors from '../../utils/colors';
import { images, normalize, setHeight, setWidth } from '../../utils/variable';
import { styles } from './style';
import FastImage from 'react-native-fast-image'
import FastImageComponent from '../FastImageComponent';
import AnimatedPlayButton from '../AnimatedPlayButton';
import Video from 'react-native-video';
import VideoComponent from '../VideoComponent';
import { moderateScale, responsiveHeight, responsiveWidth } from '../../helper/metrics';

const { width, height } = Dimensions.get("window");

const portion = Platform.OS === 'ios' ? 1.5 : 1.7
// console.log(width, height);
// const cardItemWidth = normalize(width / 1.8)
// const cardItemHeight = normalize(height / 3)

// const cardItemWidth =  setWidth(70)
// const cardItemHeight = setHeight(50)

// const cardItemWidth = moderateScale(250, 0.3)
// const cardItemHeight = moderateScale(height/1.8, 0.3)
// console.log(PixelRatio.get());
const cardItemWidth = responsiveWidth((width - setWidth(2)) / portion)
const cardItemHeight = responsiveHeight(380)


export default class IconicBrand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iconic_brands: [],
      viewableItemIndex: 0,
      prevPlayingVideoIndex: -1,
      currentPlayingVideoIndex: -1
    };

    this.childRef = React.createRef()
  }

  static getDerivedStateFromProps(props, state) {
    return {
      iconic_brands: props.data ? props.data : []
    }
  }

  fadeInDownAnim = async (index) => {
    const iconic_brands = this.state.iconic_brands

    Animated.spring(iconic_brands[index].xyAxis, {
      useNativeDriver: true,
      toValue: { x: -40, y: (+cardItemHeight) },
      speed: 1,
    }).start()
    Animated.timing(iconic_brands[index].opacity, {
      useNativeDriver: true,
      toValue: 0,
      duration: 200
    }).start()
    this.setState({ iconic_brands })
  }

  fadeInUpAnim = async (index) => {
    const iconic_brands = this.state.iconic_brands

    Animated.spring(iconic_brands[index].xyAxis, {
      useNativeDriver: true,
      toValue: { x: -40, y: -50 },
      speed: 1,
    }).start()
    Animated.timing(iconic_brands[index].opacity, {
      useNativeDriver: true,
      toValue: 1,
      duration: 200
    }).start()
    this.setState({ iconic_brands })
  }

  playVideo = async (current_index) => {

    const iconic_brands = this.state.iconic_brands

    this.checkAnyRunningVideo(current_index).then(async response => {

      if (response.status) {
        this.stopPlayingVideo(response.video_index)
      }
      await this.fadeInDownAnim(current_index)
      iconic_brands[current_index].isPlaying = !iconic_brands[current_index].isPlaying
      this.setState({
        iconic_brands: iconic_brands,
      })

    })
  }

  stopPlayingVideo = async (video_index) => {

    const iconic_brands = this.state.iconic_brands

    if (iconic_brands[video_index].isPlaying) {
      await this.fadeInUpAnim(video_index)
      iconic_brands[video_index].isPlaying = !iconic_brands[video_index].isPlaying
      this.setState({
        iconic_brands: iconic_brands
      })
    }
  }

  checkAnyRunningVideo = async (current_index) => {
    const iconic_brands = this.state.iconic_brands

    return new Promise((resolve, reject) => {

      const video_index = iconic_brands.findIndex((item) => item.isPlaying === true)
      if (video_index !== -1) {
        resolve({ status: true, video_index: video_index })
      } else {
        resolve({ status: false })
      }
    })
  }

  
  renderCardItem = ({ item, index }) => {     
    return (
      <View style={[styles.cardView, { width: cardItemWidth, height: cardItemHeight }]}>

        <TouchableOpacity activeOpacity={(item.isPlaying ? 0.7 : 1)} style={[styles.cardImageView, { height: cardItemHeight / 1.1 }]} onPress={() => this.stopPlayingVideo(index)}>
          {
            (item.video != '') &&
            <AnimatedPlayButton
              ref={ref => this.childRef = ref}
              itemHeight={cardItemHeight}
              itemWidth={cardItemWidth}
              iconColor={colors.grey2}
              iconSize={setWidth(15)}
              isBackDropPressable={item.isPlaying}
              onPressPlayButton={() => this.playVideo(index)}
              onStopPlaying={() => this.stopVideo(index)}
              style={{
                opacity: item.opacity,
                transform: [
                  { "translateX": item.xyAxis.x }, { "translateY": item.xyAxis.y }
                ]
              }}
            />
          }

          {
            item.isPlaying ?
              <VideoComponent
                uri={item.video}
                poster={item.poster}
                containerStyle={{
                  width: cardItemWidth,
                  height: cardItemHeight
                }}
                paused={item.isPlaying ? false : true}
              />
              :
              <FastImageComponent
                // source={require("../../../assets/videos/b.png")}
                source={{
                  uri: item.image,
                  priority: FastImage.priority.high,
                }}
                style={[styles.cardImage, {
                  aspectRatio: cardItemWidth / (cardItemHeight / 1.1)
                }]}
              // resizeMode={FastImage.resizeMode.stretch}
              />
          }
        </TouchableOpacity>
        <TouchableOpacity style={[styles.row, styles.cardTitleView]} onPress={() => this.props.onPressBrand(item)}>
          <View style={styles.logoView}>
            <FastImageComponent
              source={{
                uri: item.logo,
                priority: FastImage.priority.high,
              }}
              style={styles.cardLogo}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>

          <Text style={styles.cardTitle}>
            {item.brand_name}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderDotItem = ({ item, index }) => {
    const viewableItemIndex = this.state.viewableItemIndex

    return (
      <View style={[styles.dotView]}>
        {
          (viewableItemIndex == index) &&
          <Animated.View style={[styles.activeDot]}>
          </Animated.View>
        }
      </View>
    )
  }

  onViewableItemsChanged = (info: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
    const visibleItems = info.changed.filter((entry) => entry.isViewable);
    visibleItems.forEach((visible) => {
      this.setState({
        viewableItemIndex: (visible) ? visible.index : this.state.viewableItemIndex
      })
    });
  }

  render() {
    return (
      this.state.iconic_brands.length == 0 ?
        null :
        <ImageBackground source={images.iconic_brand_bg} resizeMode="cover" style={styles.container}>
          <Text style={[styles.heading, { color: colors.dark_charcoal }]}>ICONIC BRANDS</Text>
          <FlatList
            data={this.state.iconic_brands}
            keyExtractor={(item, index) => index}
            renderItem={this.renderCardItem}
            showsHorizontalScrollIndicator={false}
            horizontal
            snapToInterval={cardItemWidth}
            decelerationRate={0}
            removeClippedSubviews
            scrollEventThrottle={16}
            ItemSeparatorComponent={() => <View style={{ marginLeft: setWidth(2) }} />}
            onViewableItemsChanged={this.onViewableItemsChanged}
            viewabilityConfig={{
              itemVisiblePercentThreshold: 75,
              minimumViewTime: 200,
            }}
            contentContainerStyle={{
              //flexGrow: 1
            }}
            style={{
              // backgroundColor:'yellow'
            }}
          />

          <View>
            <FlatList
              data={this.state.iconic_brands}
              keyExtractor={(item, index) => index}
              renderItem={this.renderDotItem}
              horizontal
              ItemSeparatorComponent={() => <View style={{ marginLeft: setWidth(2) }} />}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              style={{
                // backgroundColor:'pink'
              }}
            />
          </View>

        </ImageBackground>
    );
  }
}
