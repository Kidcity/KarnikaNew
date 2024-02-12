import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import colors from '../../utils/colors';
import { styles } from './style';
import AntDesign from 'react-native-vector-icons/AntDesign'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { normalize, setWidth } from '../../utils/variable';
import FastImage from 'react-native-fast-image';
import { commonStyle } from '../../helper/commonStyle';
import BlinkText from '../BlinkText';

export default class GridViewItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.fadein = new Animated.Value(0)
    }

    componentDidMount() {
        Animated.timing(
            this.fadein,
            {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true
            }
        ).start()
    }

    render() {

        return (
            <Animated.View style={[styles.container, this.props.containerStyle, {
                opacity: this.fadein
            }]}>
                <TouchableOpacity onPress={this.props.onPressProduct} style={{}}>
                    <FastImage
                        style={[styles.productImage]}
                        source={{
                            uri: this.props.item.image,
                            priority: FastImage.priority.high,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                    <TouchableOpacity style={styles.favBtn} onPress={() => this.props.onPressFavBtn(!this.props.item.isFavourite)}>
                        <AntDesign name={this.props.item.isFavourite ? 'heart' : 'hearto'} size={setWidth(4)} color={this.props.item.isFavourite ? colors.lightRed : colors.grey2} />
                    </TouchableOpacity>
                    {/*
                        (this.props.item.brand_mov !== 0 && this.props.item.brand_mov !== undefined) &&
                        <View style={styles.itemsRightContainer}>
                            <View style={styles.squre}>
                                <Text style={[styles.text, { color: colors.white, textAlign: 'center', fontSize: normalize(8) }]} >Shop In Shop</Text>
                            </View>
                            <View style={styles.tringle}>
                            </View>
                        </View>
                    */ }
                </TouchableOpacity>
                <TouchableOpacity onPress={this.props.onPressProduct}>
                    {
                        (this.props.item?.item_left != '') &&
                        <View style={[commonStyle.row]}>
                            <View style={styles.itemsLeftContainer}>
                                <Text style={[styles.text, { color: colors.white, textAlign: 'center' }]} >{this.props.item.item_left}</Text>
                            </View>
                        </View>
                    }


                    <View style={[styles.block, { borderLeftWidth: 0, borderRightWidth: 0 }]}>
                        <View style={[styles.row,]}>
                            <View style={[{ flex: 1 }]}>
                                <Text style={[styles.text, styles.largeBoldFont]} >{this.props.item.brand_name}</Text>
                            </View>
                            <View style={[{ flex: 1, }, styles.alignItemEnd]}>
                                <Text style={[styles.text, styles.largeBoldFont, commonStyle.bluredText]}>₹{this.props.item.price}</Text>
                            </View>
                        </View>
                        <View style={[styles.row, styles.justifyBetween, { marginTop: setWidth(3) }]}>
                            <Text style={[styles.text, { color: colors.green1 },  commonStyle.bluredText]}>{this.props.item.off}% OFF</Text>
                            <Text style={[styles.text, styles.strikThroughFont ,  commonStyle.bluredText]}>₹{this.props.item.prev_price}</Text>
                        </View>
                    </View>
                    <View style={[styles.block, { borderLeftWidth: 0, borderRightWidth: 0, height: normalize(30) }]}>
                        <View style={styles.row}>
                            <Text style={[styles.text, styles.subHeading]}>Size:</Text>
                            <Text style={[styles.text]} adjustsFontSizeToFit numberOfLines={1}> {this.props.item.size}</Text>
                            <Text style={[styles.text]} adjustsFontSizeToFit>  {this.props.item.otherSizes}</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={[styles.block, { flex: 0.5, borderLeftWidth: 0 }]}>
                            <View style={[styles.row, {}]}>
                                <Text style={[styles.text, styles.subHeading]}>Color:</Text>
                                <Text style={[styles.text]}> {this.props.item.color}</Text>
                            </View>
                            <Text style={[styles.text]}>{this.props.item.each_set_color}</Text>
                        </View>
                        <View style={[styles.block, { flex: 0.5, borderLeftWidth: 0, borderRightWidth: 0 }]}>
                            <View style={styles.row}>
                                <Text style={[styles.text, styles.subHeading]}>Set Qty:</Text>
                                <Text style={[styles.text]}> {this.props.item.quantity} Pcs</Text>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.row, { height: normalize(30) }]}>
                        <View style={[styles.block, { flex: 0.5, borderLeftWidth: 0 }]}>
                            <View style={[styles.row,]}>
                                <Text style={[styles.text, styles.subHeading]} adjustsFontSizeToFit numberOfLines={2}>MRP: </Text>
                                <Text style={[styles.text,commonStyle.bluredText]} adjustsFontSizeToFit numberOfLines={2}>{(this.props.item.mrp != "N/A") && "₹"} {this.props.item.mrp}</Text>
                            </View>
                        </View>
                        <View style={[styles.block, { flex: 0.5, borderLeftWidth: 0, borderRightWidth: 0 }]}>
                            <View style={[styles.row,]}>
                                <EvilIcons name='location' size={setWidth(5)} color={colors.dark_charcoal} />
                                <Text style={[styles.text]} adjustsFontSizeToFit numberOfLines={1}>{this.props.item.city_name}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.block, { borderRightWidth: 0, borderLeftWidth: 0, borderBottomWidth: 0, height: normalize(30), justifyContent: 'center' }]}>
                        <View style={styles.row}>
                            <Text style={[styles.text, styles.subHeading]}>Margin:</Text>
                            <Text style={[styles.text, { color: colors.red }, commonStyle.bluredText]}> {this.props.item.margin}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        );
    }
}
