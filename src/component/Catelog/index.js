import { Text, TouchableOpacity, View } from 'react-native'
import React, { Component, PureComponent } from 'react'
import { styles } from './style';
import CustomImage from '../FastImage';

import Octicons from 'react-native-vector-icons/Octicons'
import colors from '../../utils/colors';
import { commonStyle } from '../../helper/commonStyle';
import CircleIconButton from '../CircleIconButton';
import { DEVICE_WIDTH, images, normalize } from '../../utils/variable';
import VideoComponent from '../VideoComponent';

export default class Catelog extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            containerStyle: null,
            onPressCatelogImage: undefined,
            onPressCatelogBanner: undefined,
            onPressShare: undefined
        };
    }

    static getDerivedStateFromProps(props, state) {

        return {
            data: props.hasOwnProperty("data") ? props.data : null,
            containerStyle: props.hasOwnProperty("containerStyle") ? props.containerStyle : null,
            onPressCatelogImage: props.hasOwnProperty("onPressCatelogImage") ? props.onPressCatelogImage : undefined,
            onPressCatelogBanner: props.hasOwnProperty("onPressCatelogBanner") ? props.onPressCatelogBanner : undefined,
            onPressShare: props.hasOwnProperty("onPressShare") ? props.onPressShare : undefined
        }
    }

    render() {
        // console.log(this.state.data?.catalogLogo);
        return (
            <View style={[styles.container, this.state.containerStyle]}>
                <View style={styles.catalogHeader}>
                    <Text style={styles.catalogTitle}>{this.state.data?.title}</Text>
                </View>
                <View style={styles.catalogBody}>
                    <TouchableOpacity style={{
                        flex: (this.state.data?.productImages.length > 0) ? 0.7 : 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                        onPress={() => this.state.onPressCatelogBanner(this.state.data?.brand_id, this.state.data?.category_id)}
                    >
                        {
                            this.state.data?.catalogLogo !== "" ?

                                <CustomImage
                                    source={{ uri: this.state.data?.catalogLogo }}
                                    // source={require("../../../assets/a4.png")}
                                    style={[styles.image, commonStyle.shadow]}
                                    resizeMode={
                                        this.state.data?.productImages.length > 0 ?
                                            "cover"
                                            :
                                            "contain"
                                    }
                                />
                                :
                                this.state.data?.catalogVideo ?
                                    <VideoComponent
                                        uri={this.state.data?.catalogVideo}
                                        // poster={item.poster}
                                        containerStyle={{
                                            width: '92%',
                                            height: '95%',
                                        }}
                                        paused={false}
                                    />
                                    :
                                    null
                        }
                    </TouchableOpacity>
                    {
                        (this.state.data?.productImages && this.state.data?.productImages.length > 0) &&
                        <View style={{ flex: 0.3, alignItems: 'flex-start', justifyContent: 'space-evenly' }}>
                            {
                                this.state.data?.productImages[0]?.image &&

                                <TouchableOpacity style={[styles.smallimage, commonStyle.shadow]} onPress={() => this.state.onPressCatelogImage(this.state.data?.productImages[0]?.product_id)}>
                                    <CustomImage
                                        source={{ uri: this.state.data?.productImages[0].image }}
                                        style={{
                                            width: '100%',
                                            height: '100%'
                                        }}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                            }
                            {
                                this.state.data?.productImages[1]?.image &&
                                <TouchableOpacity style={[styles.smallimage, commonStyle.shadow]} onPress={() => this.state.onPressCatelogImage(this.state.data?.productImages[1]?.product_id)}>
                                    <CustomImage
                                        source={{ uri: this.state.data?.productImages[1].image }}
                                        style={{
                                            width: '100%',
                                            height: '98%'
                                        }}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                            }
                            {
                                this.state.data?.productImages[2]?.image &&
                                <TouchableOpacity style={styles.smallimage} onPress={() => this.state.onPressCatelogImage(this.state.data?.productImages[2]?.product_id)}>
                                    <CustomImage
                                        source={{ uri: this.state.data?.productImages[2].image }}
                                        style={{
                                            width: '100%',
                                            height: '98%'
                                        }}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                            }
                        </View>
                    }

                </View>
                <View style={styles.catalogFooter}>
                    <CustomImage
                        source={{ uri: this.state.data?.brand_logo }}
                        style={styles.logo}
                        resizeMode="cover"
                    />
                    <View style={styles.brandDetails}>
                        <Text style={styles.brandTitle}>By {this.state.data?.brand_name}</Text>
                        {/* <Text style={styles.followerTitle}>{this.state.data?.total_liked_by} Followers</Text> */}
                    </View>
                    <View style={styles.buttonContainer}>
                        {/* <CircleIconButton
                            icon={<Octicons name={this.state.data?.is_liked_brand ? "heart-fill" : "heart"} size={normalize(20)} color={colors.red} />}
                        /> */}
                        <CircleIconButton
                            icon={<Octicons name="share-android" size={normalize(20)} color={colors.themeColor} />}
                            onPress={this.state.onPressShare}
                        />
                    </View>
                </View>
            </View>
        )
    }
}