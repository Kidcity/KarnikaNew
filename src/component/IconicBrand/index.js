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
import ImageAutoScale from '../AutoScaleImage';

const { width, height } = Dimensions.get("window");

const portion = Platform.OS === 'ios' ? 1.5 : 1.7

const cardItemWidth = responsiveWidth((width - setWidth(2)) / portion)
const cardItemHeight = responsiveHeight(380)


export default class IconicBrand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iconic_brands: [],
      viewableItemIndex: 0,
      prevPlayingVideoIndex: -1,
      currentPlayingVideoIndex: -1,
      timer: null,
      counter: 0,
      onPressShowMore: undefined,
      selectedGender: null
    };

    this.dataListRef = React.createRef()
    this.childRef = React.createRef()
    this.scrollToFirst = this.scrollToFirst.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    return {
      iconic_brands: props.data ? props.data : [],
      onPressShowMore: props.hasOwnProperty("onPressShowMore") ? props.onPressShowMore : undefined,
      selectedGender: props.hasOwnProperty("selectedGender") ? props.selectedGender : null
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
    } else {
      if (iconic_brands[video_index].video == "") {
        this.props.onPressBrand(iconic_brands[video_index])
      }
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

    if (item?.show_more) {
      return (
        <TouchableOpacity style={[styles.show_more, { width: cardItemWidth, height: cardItemWidth }]} onPress={this.state.onPressShowMore}>
          <Text style={styles.showmoreText}>Show More</Text>
        </TouchableOpacity>
      )
    }

    return (
      <View style={[styles.cardView, { width: cardItemWidth, height: cardItemWidth }]}>

        <TouchableOpacity activeOpacity={(item.isPlaying ? 0.7 : 0.7)} style={[styles.cardImageView]} onPress={() => this.stopPlayingVideo(index)}>
          {
            (item.video != '') &&
            <AnimatedPlayButton
              ref={ref => this.childRef = ref}
              itemHeight={cardItemWidth}
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
                  height: cardItemWidth
                }}
                paused={item.isPlaying ? false : true}
              />
              :
              <FastImageComponent
                source={{
                  uri: item.image,
                  priority: FastImage.priority.high,
                }}
                style={[styles.cardImage]}
                resizeMode={FastImage.resizeMode.cover}
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

  componentDidMount() {
    let timer = setInterval(this.tick, 1000);
    this.setState({ timer })
  }

  componentDidUpdate(prevProps, prevState) {  
   if(prevProps.selectedGender !== this.props.selectedGender){    
    this.scrollToFirst()
   }
  }


  scrollToFirst = () => {
    // alert(1)
    if(this.state.iconic_brands.length > 0){
      this.dataListRef.current.scrollToIndex({ animated: true, index: 0 });
    }
      
  };

  componentWillUnmount() {
    clearInterval(this.state.timer)
  }

  stopTimer = () => {
    this.setState({
      counter: 1
    })
    clearInterval(this.state.timer)
    let timer = setInterval(this.tick, 1000);
    this.setState({ timer })
  }

  tick = () => {
    if (this.state.counter === 5) {
      this.stopTimer()
    }
    this.setState({
      counter: this.state.counter + 1
    });
  }


  render() {
    return (
      this.state.iconic_brands.length == 0 ?
        null :
        <ImageBackground source={this.state.counter % 2 == 0 ? images.shop_by_age_bg_left : images.shop_by_age_bg_right} style={[styles.container]} resizeMode='stretch' >
          <Text style={[styles.heading, { color: colors.dark_charcoal }]}>SUPER BRANDS</Text>
          <FlatList
            ref={this.dataListRef}
            data={this.state.iconic_brands}
            keyExtractor={(item, index) => index}
            renderItem={this.renderCardItem}
            showsHorizontalScrollIndicator={false}
            horizontal
            snapToInterval={cardItemWidth}
            // decelerationRate={0}
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
              paddingBottom: setHeight(10)
            }}
            style={{
              marginTop: setHeight(4)
              // backgroundColor:'yellow'
            }}
          />

          <View>
            <FlatList
              data={this.state.iconic_brands}
              keyExtractor={(item, index) => index}
              renderItem={this.renderDotItem}
              horizontal
              ItemSeparatorComponent={() => <View style={{ marginLeft: setWidth(3) }} />}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              style={{
                // backgroundColor:'pink',
                paddingVertical: setHeight(2)
              }}
            />
          </View>

        </ImageBackground>
    );
  }
}
