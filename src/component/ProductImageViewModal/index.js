import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { styles } from './style';
import Entypo from 'react-native-vector-icons/Entypo'
import { normalize, setWidth } from '../../utils/variable';
import colors from '../../utils/colors';
import ImageView from "react-native-image-viewing";
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import FastImageComponent from '../FastImageComponent';
import FastImage from 'react-native-fast-image';

export default class ProductImageViewModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: this.props.hasOwnProperty("images") ? this.props.images : [],
            currentIndex: this.props.hasOwnProperty("imageIndex") ? this.props.imageIndex : 0
        };
    }

    renderItem = ({ item, index }) => {

        return (
            <TouchableOpacity style={[styles.imageBlock, (this.state.currentIndex == index) && styles.selectedimage]} onPress={() => this.setState({currentIndex: index})}>
                <FastImageComponent
                    style={[styles.image]}
                    source={{
                        uri: item.uri,
                        priority: FastImage.priority.high,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                />
            </TouchableOpacity>
        )
    }

    render() {
        console.log(this.props.imageIndex);
        return (
            <View style={styles.contianer}>
                <View style={styles.content}>
                    <ImageView
                        images={this.state.images}
                        imageIndex={this.state.currentIndex}
                        visible={true}
                        onRequestClose={this.props.onClose}
                        backgroundColor={colors.white}
                        HeaderComponent={({ imageIndex }) => (
                            <>
                                <TouchableOpacity style={styles.closeBtn} onPress={this.props.onClose}>
                                    <Entypo name='cross' size={setWidth(8)} color={colors.grey2} />
                                </TouchableOpacity>
                                {
                                    this.state.currentIndex != 0 &&
                                    <TouchableOpacity style={styles.leftArrow} onPress={() => this.setState({ currentIndex: imageIndex - 1 })}>
                                        <SimpleLineIcons name='arrow-left' size={setWidth(8)} color={colors.grey2} />
                                    </TouchableOpacity>
                                }

                                {
                                    (this.state.images.length != this.state.currentIndex + 1) &&
                                    <TouchableOpacity style={styles.rightArrow} onPress={() => this.setState({ currentIndex: this.state.currentIndex + 1 })}>
                                        <SimpleLineIcons name='arrow-right' size={setWidth(8)} color={colors.grey2} />
                                    </TouchableOpacity>
                                }

                            </>
                        )}
                        FooterComponent={({ imageIndex }) => (
                            <FlatList
                                data={this.state.images}
                                keyExtractor={(item, index) => index}
                                renderItem={this.renderItem}
                                horizontal
                                contentContainerStyle={{
                                    backgroundColor: 'transparent',
                                    paddingVertical: normalize(15),
                                    paddingHorizontal: normalize(15)
                                }}
                                ItemSeparatorComponent={() => <View style={{marginLeft: normalize(10)}} />}
                                style={styles.imageblocklist}
                            />
                        )}
                    />
                    {/* <FlatList
                        data={this.state.images}
                        keyExtractor={(item, index) => index}
                        renderItem={this.renderItem}
                        horizontal
                        contentContainerStyle={{
                            backgroundColor: 'red',
                        }}
                        style={styles.imageblocklist}
                    /> */}
                </View>


            </View>
        );
    }
}
