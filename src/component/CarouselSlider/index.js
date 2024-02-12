import { Text, View } from 'react-native'
import React, { PureComponent } from 'react'
import Carousel,{Pagination} from 'react-native-snap-carousel';
import { DEVICE_WIDTH, normalize } from '../../utils/variables';
import ProductImageSliderItem from '../ProductImageSliderItem';
import { styles } from './style';

export class CarouselSlider extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            autoplay: false,
            showPagination: false,
            activeSlide: 0,
            contentContainerCustomStyle: null
        };
    }

    static getDerivedStateFromProps(props, state) {
        return {
            data: props.hasOwnProperty("data") ? props.data : null,
            contentContainerCustomStyle: props.hasOwnProperty("contentContainerCustomStyle") ? props.contentContainerCustomStyle : null, 
            autoplay: props.hasOwnProperty("autoplay") ? props.autoplay : false,
            showPagination: props.hasOwnProperty("showPagination") ? props.showPagination : false
        }
    }

    renderBannerItem = ({ item, index }) => {
        return (
            <ProductImageSliderItem />
        )
    }

    render() {
        if (!this.state.data) {
            return null
        }
        return (
            <View style={this.state.contentContainerCustomStyle}>
                <Carousel
                    layout={'default'}
                    data={this.state.data}
                    renderItem={this.renderBannerItem}
                    sliderWidth={DEVICE_WIDTH}
                    itemWidth={DEVICE_WIDTH}
                    scrollEnabled
                    useScrollView 
                    initialNumToRender={this.state.data.length}
                    autoplay={this.state.autoplay}
                    autoplayInterval={3000}
                    loop
                    shouldOptimizeUpdates
                    removeClippedSubviews
                    enableMomentum={true}
                    decelerationRate={0.9}
                    onSnapToItem={(index) => this.setState({ activeSlide: index }) }
                    // contentContainerCustomStyle={this.state.contentContainerCustomStyle}
                    
                />
                {
                    this.state.showPagination &&
                    <Pagination
                        dotsLength={this.state.data.length}
                        activeDotIndex={this.state.activeSlide}
                        containerStyle={styles.paginationContainerStyle}
                        dotStyle={styles.dotStyle}                        
                        inactiveDotStyle={{
                            // Define styles for inactive dots here
                        }}
                        inactiveDotOpacity={0.4}
                        inactiveDotScale={0.6}
                    />
                     }
            </View>
        )
    }
}

export default CarouselSlider