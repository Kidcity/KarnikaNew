import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { FlatList } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { errorToast } from '../../../helper/ToastHelper';
import colors from '../../../utils/colors';
import { setHeight, setWidth } from '../../../utils/variable';
import CustomButton from '../../CustomButton';
import FastImageComponent from '../../FastImageComponent';
import { styles } from './style';

export default class GenderSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gender: []
        };
    }

    static getDerivedStateFromProps(props, state){        
        return{
            gender: props.hasOwnProperty("data")? props.data : []
        }
    }

    renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => {
                this.props.onPressGender(item)
            }} key={index} style={{ overflow: 'hidden' }}>
                <FastImageComponent
                    style={[styles.storeImage]}
                    source={{
                        uri: item.image,
                        priority: FastImage.priority.high,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />
                <View style={[styles.row, styles.justifyCenter, styles.alignCenter, { marginTop: setWidth(2) }]}>
                    <Text style={styles.storeTitle}>{item.title}  </Text>
                    <AntDesign name='arrowright' size={setWidth(3)} color={colors.dark_charcoal} />
                </View>
            </TouchableOpacity>
        )
    }

    selectAllGender(){        
        const gender = this.state.gender
        let genders = Object.assign({})
        let ids= ''
        gender.map((item, index) => {
            ids += item.id + ','
        })
        ids = ids.substring(0, ids.length - 1)
        genders.id = ids
        this.props.onPressGender(genders)  
    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.gender}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index}
                    numColumns={3}
                    columnWrapperStyle={{
                        justifyContent: 'space-around'
                    }}
                    style={{
                        flex: 1,
                        marginTop: setHeight(4)
                    }}
                />
                <CustomButton
                    label="SHOP ALL GENDERS"
                    container={styles.buttonContainer}
                    leftIcon={true}
                    labelStyle={styles.buttonLabelStyle}
                    onPress={() => this.selectAllGender()}
                />

                <View style={styles.minimumOrderView}>
                    <Text style={styles.minimumOrderText}>MINIMUM ORDER VALUE FOR {this.props.city_name} IS ₹{this.props.min_ordervalue}</Text>
                </View>
            </View>
        );
    }
}
