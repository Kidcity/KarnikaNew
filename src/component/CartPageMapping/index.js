import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { styles } from './style';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { setWidth } from '../../utils/variable';
import colors from '../../utils/colors';

export default class CartPageMapping extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {

        return (
            <View style={[styles.container, styles.row, { alignItems: 'center' }]}>

                {
                    this.props.cart_map_pointer[0]?.isDone ?
                        <AntDesign name='checkcircle' size={setWidth(6)} color={colors.btnGreen} />
                        :
                        <View style={styles.mapPointerCircle} />
                }
                <Text style={[styles.mapTitle, (this.props.cart_map_pointer[0]?.isDone) && { color: colors.red }]}>{this.props.cart_map_pointer[0]?.title}</Text>
                <View style={[styles.sideDash, (this.props.cart_map_pointer[1]?.isDone) && { borderColor: colors.red }]} />

                {
                    this.props.cart_map_pointer[1]?.isDone ?
                        <AntDesign name='checkcircle' size={setWidth(6)} color={colors.btnGreen} />
                        :
                        <View style={styles.mapPointerCircle} />
                }


                <Text style={[styles.mapTitle, (this.props.cart_map_pointer[1]?.isDone) && { color: colors.red }]}>{this.props.cart_map_pointer[1]?.title}</Text>

{/*                
                {
                    (this.props.is_ws_not === 0) &&
                    <View style={[styles.sideDash, (this.props.cart_map_pointer[2]?.isDone) && { borderColor: colors.red }]} />
                }

                {
                    (this.props.is_ws_not === 0) ?
                        this.props.cart_map_pointer[2]?.isDone ?
                        <AntDesign name='checkcircle' size={setWidth(6)} color={colors.btnGreen} />
                        :
                        <View style={styles.mapPointerCircle} />
                        :
                        null
                }
                {
                    this.props.is_ws_not === 0 &&
                    <Text style={[styles.mapTitle, (this.props.cart_map_pointer[2]?.isDone) && { color: colors.red }]}>{this.props.cart_map_pointer[2]?.title}</Text>
                } */}


            </View>
        );
    }
}
