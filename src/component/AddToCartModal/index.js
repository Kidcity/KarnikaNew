import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { styles } from './style';
import FastImage from 'react-native-fast-image'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { setWidth } from '../../utils/variable';
import colors from '../../utils/colors';
import { commonStyle } from '../../helper/commonStyle';

export default class AddToCartModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    renderItem = ({ item, index }) => {
        return (
            <View style={styles.productView}>
                <View style={styles.leftBlock}>
                    <FastImage
                        style={[styles.image]}
                        source={{
                            uri: item.image,
                            priority: FastImage.priority.high,
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                </View>
                <View style={styles.rightBlock}>
                    <Text style={[styles.text, styles.textBold]}>{item.brand_name}</Text>
                    <View style={styles.row}>
                        <Text style={[styles.text]}>Set Qty: </Text>
                        <Text style={[styles.text, styles.textBold]}>{item.set_qty} Pcs</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={[styles.text]}>Size: </Text>
                        <Text style={[styles.text, styles.textBold]}>{item.size}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={[styles.text]}>Color: </Text>
                        <Text style={[styles.text, styles.textBold]}>{item.color}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={[styles.text]}>Price: </Text>
                        <Text style={[styles.text, styles.textBold, commonStyle.bluredText]}>₹ {item.price} / Piece</Text>
                    </View>
                </View>
            </View>
        )
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>

                    <Text style={styles.heading}>Items Successfully Added To The Cart!</Text>

                    <FlatList
                        data={this.props.data}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index}
                        style={{
                            marginTop: setWidth(3)
                        }}
                        ItemSeparatorComponent={() => <View style={{ borderTopWidth: 0 }} />}
                    />

                    <TouchableOpacity style={styles.viewCartBtn} onPress={this.props.onPressCartbtn}>
                        <Text style={[styles.text, styles.textBold]}>View Cart</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.moreProductBtn} onPress={this.props.onPressMoreProduct} >
                        <Text style={[styles.text, styles.textBold, styles.textWhite]}>More Products By {this.props.brand_name}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.closeBtnView}  onPress={this.props.onCloseModal}>
                        <AntDesign name='closecircleo' size={setWidth(10)} color={colors.white} />
                    </TouchableOpacity>

                </View>
            </View>
        );
    }
}


// onPress={this.props.onCloseModal}