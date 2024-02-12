import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import colors from '../../utils/colors';
import { styles } from './style';
import AntDesign from 'react-native-vector-icons/AntDesign'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { normalize, setHeight, setWidth } from '../../utils/variable';
import FastImage from 'react-native-fast-image';
import BlinkText from '../BlinkText';
import CustomImage from '../FastImage';
import { commonStyle } from '../../helper/commonStyle'

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

        const br = this.props.item.brand_name
        const brand_name = (br.length > 13) ? br.substring(0, 13) + "..." : br

        return (

            <TouchableOpacity style={[styles.container, this.state.containerStyle,]} activeOpacity={0.5} onPress={this.props.onPressProduct}>
                <Animated.View style={[{
                    opacity: this.fadein
                }]}>
                    <TouchableOpacity style={styles.favBtn} onPress={() => this.props.onPressFavBtn(!this.props.item.isFavourite)}>
                        <AntDesign name={this.props.item.isFavourite ? 'heart' : 'hearto'} size={setWidth(4)} color={this.props.item.isFavourite ? colors.lightRed : colors.grey2} />
                    </TouchableOpacity>

                    <View style={styles.imageContainer}>
                        <CustomImage
                            source={{
                                uri: this.props.item.image,
                                priority: FastImage.priority.high,
                            }}
                            style={styles.image}
                            resizeMode="cover"
                        />
                        {
                            (this.props.item.item_left != '') &&
                            <View style={styles.itemsLeftContainer}>
                                <Text style={[styles.text, { color: colors.white }]} >{this.props.item.item_left}</Text>
                            </View>
                        }
                    </View>

                    <View onPress={this.props.onPressProduct}>

                        {
                            (this.props.item.brand_mov !== 0) &&
                            // <View style={styles.movView}>
                            <BlinkText
                                text="Shop In Shop"
                                duration={700}
                                style={styles.movView}
                            />
                            // </View>
                        }

{/* 
                        <View style={[styles.mainblock, { borderLeftWidth: 0, borderRightWidth: 0 }]}>
                            <View style={[styles.row, { flex: 0.5, alignItems: 'center', justifyContent: 'space-between', }]}>
                                <View style={[{ flex: 1, justifyContent: 'center', }]}>
                                    <Text style={[styles.text, { fontSize: setWidth(3.5) }]}  >{brand_name}</Text>
                                </View>
                                <View style={[]}>
                                    <Text style={[styles.text, styles.largeBoldFont]}>₹{this.props.item.price}</Text>
                                </View>
                            </View>
                            <View style={[styles.row, { flex: 0.5, alignItems: 'center', justifyContent: 'space-between' }]}>
                                <Text style={[styles.text, { color: colors.green1 }]}>{this.props.item.off}% OFF</Text>
                                <Text style={[styles.text, styles.strikThroughFont]}>₹{this.props.item.prev_price}</Text>
                            </View>
                        </View> */}

                        {/* <View style={[styles.block]}>
                            <View style={styles.row}>
                                <Text style={[styles.text, styles.subHeading]}>Size:</Text>
                                <Text style={[styles.text]} adjustsFontSizeToFit numberOfLines={1}> {this.props.item.size}</Text>
                                <Text style={[styles.text]} adjustsFontSizeToFit>  {this.props.item.otherSizes}</Text>
                            </View>
                        </View> */}

                        <View style={[styles.block, { height: setHeight(7) }]}>
                            <View style={[{ flex: 1 }, styles.row]}>
                                <View style={[{ flex: 0.5 }, styles.rightBorder, styles.justifyCenter]}>
                                    <View style={styles.row}>
                                        <Text style={[styles.text, styles.subHeading]}>Color:</Text>
                                        <Text style={[styles.text]}> {this.props.item.color}</Text>
                                    </View>
                                    <Text style={[styles.text]}>{this.props.item.each_set_color}</Text>
                                </View>
                                <View style={[{ flex: 0.5, paddingLeft: 4 }, styles.justifyCenter]}>
                                    {/* <View style={[styles.row]}>
                                        <Text style={[styles.text, styles.subHeading]}>Set Qty:</Text>
                                        <Text style={[styles.text]}> {this.props.item.quantity} Pcs</Text>
                                    </View> */}
                                </View>
                            </View>
                        </View>

                        <View style={[styles.block, { height: setHeight(7) }]}>
                            <View style={[{ flex: 1 }, styles.row]}>
                                <View style={[{ flex: 0.5 }, styles.rightBorder, styles.justifyCenter]}>
                                    {/* <View style={styles.row}>
                                        <Text style={[styles.text, styles.subHeading]}>MRP:</Text>
                                        <Text style={[styles.text]}> {(this.props.item.mrp != "N/A") && "₹"}{this.props.item.mrp}</Text>
                                    </View> */}
                                </View>
                                <View style={[{ flex: 0.5, paddingLeft: 4 }, styles.justifyCenter]}>
                                    {/* <View style={[styles.row]}>
                                        <EvilIcons name='location' size={setWidth(5)} color={colors.dark_charcoal} />
                                        <Text style={[styles.text]} adjustsFontSizeToFit numberOfLines={1}>{this.props.item.city_name}</Text>
                                    </View> */}
                                </View>
                            </View>
                        </View>

                        <View style={[styles.block, { borderBottomWidth: 0 }]}>
                            <View style={styles.row}>
                                <Text style={[styles.text, styles.subHeading]}>Margin:</Text>
                                <Text style={[styles.text, { color: colors.red }]}> {this.props.item.margin}</Text>
                            </View>
                        </View>

                    </View>

                </Animated.View>
            </TouchableOpacity>

        );
    }
}

{/* <TouchableOpacity onPress={this.props.onPressProduct}>
                    <FastImage
                        style={[styles.productImage,(this.props.item.brand_mov == 0) && {height: setHeight(40)}]}
                        source={{
                            uri: this.props.item.image,
                            priority: FastImage.priority.high,
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                    <TouchableOpacity style={styles.favBtn} onPress={() => this.props.onPressFavBtn(!this.props.item.isFavourite)}>
                        <AntDesign name={this.props.item.isFavourite ? 'heart' : 'hearto'} size={setWidth(4)} color={this.props.item.isFavourite ? colors.lightRed : colors.grey2} />
                    </TouchableOpacity>
                    {
                        (this.props.item.item_left != '') &&
                        <View style={styles.itemsLeftContainer}>
                            <Text style={[styles.text, { color: colors.white }]} >{this.props.item.item_left}</Text>
                        </View>
                    }
                </TouchableOpacity>
                <TouchableOpacity onPress={this.props.onPressProduct}>

                    {
                        (this.props.item.brand_mov !== 0) &&
                        // <View style={styles.movView}>
                        <BlinkText
                            text="Shop In Shop"
                            duration={700}
                            style={styles.movView}
                        />
                        // </View>
                    }


                    <View style={[styles.mainblock, { borderLeftWidth: 0, borderRightWidth: 0 }]}>
                        <View style={[styles.row, { flex: 0.5, alignItems: 'center', justifyContent: 'space-between', }]}>
                            <View style={[{ flex: 1, justifyContent: 'center', }]}>
                                <Text style={[styles.text, { fontSize: setWidth(3.5) }]}  >{brand_name}</Text>
                            </View>
                            <View style={[]}>
                                <Text style={[styles.text, styles.largeBoldFont]}>₹{this.props.item.price}</Text>
                            </View>
                        </View>
                        <View style={[styles.row, { flex: 0.5, alignItems: 'center', justifyContent: 'space-between' }]}>
                            <Text style={[styles.text, { color: colors.green1 }]}>{this.props.item.off}% OFF</Text>
                            <Text style={[styles.text, styles.strikThroughFont]}>₹{this.props.item.prev_price}</Text>
                        </View>
                    </View>

                    <View style={[styles.block]}>
                        <View style={styles.row}>
                            <Text style={[styles.text, styles.subHeading]}>Size:</Text>
                            <Text style={[styles.text]} adjustsFontSizeToFit numberOfLines={1}> {this.props.item.size}</Text>
                            <Text style={[styles.text]} adjustsFontSizeToFit>  {this.props.item.otherSizes}</Text>
                        </View>
                    </View>

                    <View style={[styles.block, { height: setHeight(7) }]}>
                        <View style={[{ flex: 1 }, styles.row]}>
                            <View style={[{ flex: 0.5 }, styles.rightBorder, styles.justifyCenter]}>
                                <View style={styles.row}>
                                    <Text style={[styles.text, styles.subHeading]}>Color:</Text>
                                    <Text style={[styles.text]}> {this.props.item.color}</Text>
                                </View>
                                <Text style={[styles.text]}>{this.props.item.each_set_color}</Text>
                            </View>
                            <View style={[{ flex: 0.5, paddingLeft: 4 }, styles.justifyCenter]}>
                                <View style={[styles.row]}>
                                    <Text style={[styles.text, styles.subHeading]}>Set Qty:</Text>
                                    <Text style={[styles.text]}> {this.props.item.quantity} Pcs</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.block, { height: setHeight(7) }]}>
                        <View style={[{ flex: 1 }, styles.row]}>
                            <View style={[{ flex: 0.5 }, styles.rightBorder, styles.justifyCenter]}>
                                <View style={styles.row}>
                                    <Text style={[styles.text, styles.subHeading]}>MRP:</Text>
                                    <Text style={[styles.text]}> {(this.props.item.mrp != "N/A") && "₹"}{this.props.item.mrp}</Text>
                                </View>
                            </View>
                            <View style={[{ flex: 0.5, paddingLeft: 4 }, styles.justifyCenter]}>
                                <View style={[styles.row]}>
                                    <EvilIcons name='location' size={setWidth(5)} color={colors.dark_charcoal} />
                                    <Text style={[styles.text]} adjustsFontSizeToFit numberOfLines={1}>{this.props.item.city_name}</Text>
                                </View>
                            </View>                            
                        </View>
                    </View>

                    <View style={[styles.block, { borderBottomWidth: 0}]}>
                        <View style={styles.row}>
                            <Text style={[styles.text, styles.subHeading]}>Margin:</Text>
                            <Text style={[styles.text, { color: colors.red }]}> {this.props.item.margin}</Text>
                        </View>
                    </View>

                </TouchableOpacity> */}
