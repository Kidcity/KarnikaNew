import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import CustomButton from '../../CustomButton';
import { styles } from './style';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { setHeight, setWidth } from '../../../utils/variable';

export default class CategoriesSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        };
    }

    static getDerivedStateFromProps(props, state) {
        return {
            categories: props.hasOwnProperty("data") ? props.data : []
        }
    }

    renderBox = (item) => {

        if (!item) {
            return (<></>)
        }

        return (
            <TouchableOpacity style={styles.categoryItems} onPress={() => this.props.onSelectCategories(item.title, item.id)}>
                {
                    (item.image != '') &&
                    <FastImage
                        style={[styles.categoryImage]}
                        source={{
                            uri: item.image,
                            priority: FastImage.priority.high,
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                }
                {
                    item.title &&
                    <Text style={styles.categoryText}>{item.title}</Text>
                }
            </TouchableOpacity>
        )
    }

    renderItem = ({ item, index }) => {
        if (!item) {
            return (<></>)
        }
        return (
            <View style={{}}>
                {
                    this.renderBox(item[0])
                }
                {
                    this.renderBox(item[1])
                }
            </View>
        )
    }

    selectAllCategories() {
        const categories = this.state.categories
        let list = ''

        categories.map((item, index) => {

            if (item[0]) {
                list += item[0].id + ','
            }
            if (item[1]) {
                list += item[1].id + ','
            }
        })

        list = list.substr(0, list.length-1)

        this.props.onSelectCategories('All Subcategories',list)
    }

    render() {

        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.categories}
                    renderItem={this.renderItem}
                    horizontal
                    keyExtractor={(item, index) => index}
                    showsHorizontalScrollIndicator
                    persistentScrollbar={true}
                    ListEmptyComponent={() => <Text style={[styles.categoryText]}>No Categories Found.</Text>}
                />
                <View style={[styles.row, { justifyContent: 'space-between', marginTop: setHeight(4) }]}>
                    <CustomButton
                        label="BACK"
                        container={[styles.buttonContainer, { width: setWidth(30) }]}
                        rightIcon={<MaterialIcons name='arrow-back-ios' size={setWidth(4)} color={this.props.iconColor} />}
                        labelStyle={styles.buttonLabelStyle}
                        onPress={this.props.onPressBack}
                    />
                    {
                        this.state.categories.length > 0 &&
                        <CustomButton
                            label="SHOP ALL CATEGORIES"
                            container={[styles.buttonContainer, { flex: 1, marginLeft: setWidth(5) }]}
                            leftIcon={true}
                            labelStyle={styles.buttonLabelStyle}
                            onPress={() => this.selectAllCategories()}
                        />
                    }

                </View>
            </View>
        );
    }
}
