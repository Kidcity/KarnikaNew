import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import React, { Component, PureComponent } from 'react'
import { styles } from './style';
import { commonStyle } from '../../helper/commonStyle';
import CustomImage from '../FastImage';
import { images, normalize } from '../../utils/variable';
import VideoComponent from '../VideoComponent';


export default class TopTrends extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            containerStyle: null,
            onPressBanner: undefined
        };
    }

    static getDerivedStateFromProps(props, state) {

        return {
            data: props.hasOwnProperty("data") ? props.data : null,
            containerStyle: props.hasOwnProperty("containerStyle") ? props.containerStyle : null,
            onPressBanner: props.hasOwnProperty("onPressBanner") ? props.onPressBanner : undefined,
        }
    }

    render() {
        return (
            <View style={[styles.container, this.state.containerStyle]}>

                <View style={{ flex: 1 }}>
                    <FlatList
                        data={this.state.data}
                        renderItem={({ item, index }) => <View >
                            <View style={styles.heading}>
                                <Text style={styles.title}>{item?.title}</Text>
                            </View>
                            <TouchableOpacity style={styles.imageContainer} onPress={() => this.state.onPressBanner(item?.category_id, item?.gender)}>
                                {
                                    item?.image !== "" ?

                                        <CustomImage
                                            source={{ uri: item?.image }}
                                            style={{
                                                flex: 1,
                                            }}
                                            resizeMode="contain"
                                        />
                                        :
                                        <VideoComponent
                                            uri={item?.video}
                                            containerStyle={{
                                                width: '100%',
                                                height: '100%',
                                            }}
                                            paused={false}
                                        />
                                }
                            </TouchableOpacity>
                        </View>}
                        keyExtractor={(item, index) => index}
                        ItemSeparatorComponent={() => <View style={{ marginTop: normalize(15) }} />}
                    />
                </View>
            </View>
        )
    }
}