import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import React, { Component, PureComponent } from 'react'
import {styles} from './style'
import { commonStyle } from '../../helper/commonStyle';
import CustomImage from '../FastImage';
import { images, normalize } from '../../utils/variable';

export default class HorizontalCategorySlider extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            containerStyle: null,
            genders: [],
            selectedGender:"",
            onPressGender: undefined,
            categories: []
        };
    }

    static getDerivedStateFromProps(props, state) {
        // console.log(props.categories);
        return {
            containerStyle: props.hasOwnProperty("containerStyle") ? props.containerStyle : null,
            genders: props.hasOwnProperty("genders") ? props.genders : [],
            selectedGender: props.hasOwnProperty("selectedGender") ? props.selectedGender : "",
            onPressGender:  props.hasOwnProperty("onPressGender") ? props.onPressGender : undefined,
            categories: props.hasOwnProperty("categories") ? props.categories : [],
            onPressCategory:  props.hasOwnProperty("onPressCategory") ? props.onPressCategory : undefined,
        }
    }

    renderGender = ({ item, index }) => {            
        return (
            <TouchableOpacity style={[styles.gender,
                (this.state.selectedGender == item.id) && styles.isActiveGender
            ]} onPress={() => this.state.onPressGender(item.id)}>
                <Text style={[styles.genderTitle,
                (this.state.selectedGender == item.id) && commonStyle.textBlack, commonStyle.text13
                ]}>{item.title}</Text>
            </TouchableOpacity>
        )
    }

    renderCategory = ({ item, index }) => {
        // console.log(item);
        return (
            <TouchableOpacity style={styles.category} onPress={() => this.state.onPressCategory(item)}>
                <View style={styles.imageView}>
                    <CustomImage
                        source={{
                            uri: item.image
                        }}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>
                <Text style={styles.catTitle} numberOfLines={2} adjustsFontSizeToFit>{item.title} </Text>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={[styles.container, this.state.containerStyle]}>
                <View>
                    <FlatList
                        data={this.state.genders}
                        renderItem={this.renderGender}
                        keyExtractor={(item, index) => index}
                        horizontal
                        ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
                        contentContainerStyle={{
                            paddingLeft: normalize(15),
                        }}
                    />
                </View>
                <View style={styles.categoriesListContainer}>
                    <View style={styles.stick}></View>
                    <FlatList
                        data={this.state.categories}
                        renderItem={this.renderCategory}
                        keyExtractor={(item, index) => index}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={() => <View style={styles.listSeparator} />}                        
                        contentContainerStyle={{
                            flexGrow:1, 
                            paddingRight: normalize(20),
                            // paddingVertical: normalize(10),
                            paddingTop: normalize(2)                                        
                        }}
                    />
                </View>
            </View>
        )
    }
}