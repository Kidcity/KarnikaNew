import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import React, { Component, PureComponent } from 'react'
import { styles } from './style';
import CustomImage from '../FastImage';
import { commonStyle } from '../../helper/commonStyle';
import { images, normalize } from '../../utils/variable';

export default class VerticleBrands extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            data: null,
            containerStyle: null,
            onPress: undefined
        };
    }

    static getDerivedStateFromProps(props, state) {
        return {
            data: props.hasOwnProperty("data") ? props.data : null,
            title: props.hasOwnProperty("title") ? props.title : null,
            containerStyle: props.hasOwnProperty("containerStyle") ? props.containerStyle : null,
            onPress: props.hasOwnProperty("onPress") ? props.onPress : undefined,
        }
    }

    renderBrandsItem = ({ item, index }) => {
        
        return (
            <TouchableOpacity style={[styles.brand, commonStyle.shadow]} onPress={()=> this.state.onPress(item.id)}>
                <CustomImage
                    source={{uri: item.image}}
                    style={styles.image}
                    resizeMode="cover"
                />
                <Text style={[commonStyle.text12, commonStyle.fontBold, commonStyle.textAlignCenter, commonStyle.textCharcoal, commonStyle.padding_V_10]}>{item.title}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={[styles.container, this.state.containerStyle]}>
                <View style={styles.heading}>
                    <Text style={styles.title}>
                        {
                            this.state.title
                        }
                    </Text>
                </View>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={this.state.data}
                        keyExtractor={(item, index) => index}
                        renderItem={this.renderBrandsItem}
                        numColumns={2}
                        contentContainerStyle={{
                            paddingBottom: normalize(10)
                        }}
                        columnWrapperStyle={{
                            justifyContent: 'space-evenly'
                        }}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                    />
                </View>
            </View>
        )
    }
}