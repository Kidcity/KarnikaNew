import { ActivityIndicator, FlatList, Text, View, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { PureComponent } from 'react';
import { styles } from './style';
import FastImageComponent from '../FastImageComponent';
import FastImage from 'react-native-fast-image';
import { colors_set, setHeight, setWidth } from '../../utils/variable';
import colors from '../../utils/colors';

export default class CategoriesSlider extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            categories: null,
            onPressCategory: undefined,
            selectedGender: null
        }
        this.dataListRef = React.createRef()
        this.scrollToFirst = this.scrollToFirst.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        return {
            categories: props.hasOwnProperty("categories") ? props.categories : null,
            onPressCategory: props.onPressCategory ? props.onPressCategory : undefined,
            selectedGender: props.hasOwnProperty("selectedGender") ? props.selectedGender : null
        }
    }

    renderCategories = ({ item, index }) => {
        // let rgb = []
        // for (var i = 0; i < 3; i++)
        //     rgb.push(Math.floor(Math.random() * 255));

        return (
            <TouchableOpacity style={[styles.categoriesView, (index === 0) && { marginLeft: setWidth(4) }]} onPress={() => this.state.onPressCategory(item)}>
                <View style={[styles.imageView]}>
                    <FastImageComponent
                        style={[styles.image]}
                        source={{
                            uri: item.image,
                            priority: FastImage.priority.high,
                        }}
                        resizeMode={FastImage.resizeMode.stretch}
                    />
                </View>
                <Text style={styles.title} adjustsFontSizeToFit numberOfLines={1}>{item.title}</Text>
            </TouchableOpacity>
        )
    }

    
  componentDidUpdate(prevProps, prevState) {  
    if(prevProps.selectedGender !== this.props.selectedGender){    
     this.scrollToFirst()
    }
   }
 
 
   scrollToFirst = () => {
     // alert(1)
     if(this.state.categories.length > 0){
         this.dataListRef.current.scrollToIndex({ animated: true, index: 0 });
     }
   };
 

    render() {
        // console.log('CategoriesSlider render');
        return (
            <View style={styles.container}>

                <FlatList   
                    ref={this.dataListRef}
                    data={this.state.categories}
                    keyExtractor={(item, index) => index}
                    renderItem={this.renderCategories}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    // style={{marginHorizontal: setWidth(4)}}
                    ItemSeparatorComponent={() => <View style={{ marginHorizontal: setWidth(2) }} />}
                />

            </View>
        )
    }
}