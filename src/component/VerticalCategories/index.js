import { FlatList, Text, View, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { noimage, setHeight, setWidth } from '../../utils/variable'
import FastImage from 'react-native-fast-image'
import { styles } from './style'
import FastImageComponent from '../FastImageComponent'

export default class VerticalCategories extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: null,
            onPressCategory: undefined
        }
    }

    static getDerivedStateFromProps(props, state) {
        return {
            categories: props.hasOwnProperty("categories") ? props.categories : null,
            onPressCategory: props.onPressCategory ? props.onPressCategory : undefined
        }
    }

    renderCategories = ({ item, index }) => {
     
        // let rgb = []
        // for (var i = 0; i < 3; i++)
        //     rgb.push(Math.floor(Math.random() * 255));

        return (
            <TouchableOpacity style={[styles.categoriesView,]} onPress={() => this.state.onPressCategory(item.id)}>
                <View style={[styles.imageView]}>
                    <FastImageComponent
                        style={[styles.image]}
                        source={{
                            uri: (item.image !== '') ? item.image : noimage,
                            priority: FastImage.priority.high,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                </View>                
                <Text style={[styles.title]} adjustsFontSizeToFit numberOfLines={1}>{item.title}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>DIRECT ACCESS TO CATEGORIES</Text>
                <FlatList
                    data={this.state.categories}
                    keyExtractor={(item, index) => index}
                    renderItem={this.renderCategories}
                    numColumns={2}
                    showsHorizontalScrollIndicator={false}
                    // ItemSeparatorComponent={() => <View style={{ marginVertical: setHeight(0.5),  }} />}
                    contentContainerStyle={{
                        flex: 1,
                        // backgroundColor:'red'
                    }}
                    columnWrapperStyle={{ justifyContent: 'space-evenly' }}
                    ItemSeparatorComponent={() => <View style={{ marginTop: setHeight(2) }} />}
                    style={{
                        marginTop: setHeight(3)
                    }}
                />
            </View>
        )
    }
}