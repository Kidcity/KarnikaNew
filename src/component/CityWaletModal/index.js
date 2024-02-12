import React, { Component } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import colors from '../../utils/colors';
import { setWidth } from '../../utils/variable';
import { styles } from './style';

export default class CityWaletModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isApplied: false
    };
  }

  render() {
    return (
        <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.isOpen}
        onRequestClose={() => {
        }}
    >
        <View style={styles.modalContainer}>
            <View style={styles.content}>
                <Text style={styles.heading}>
                    {
                        this.state.isApplied ?
                            "REQUEST RECEIVED"
                            :
                            "REEDEM CITY WALLET POINTS"
                    }
                </Text>
                {
                    !this.state.isApplied ?
                        <>
                            <Text style={[styles.infoText, { marginTop: setWidth(4), paddingHorizontal: setWidth(4) }]}>City Wallet Ammont will be discounted from the toal bill.</Text>
                            <Text style={[styles.infoText, { marginTop: setWidth(4), paddingHorizontal: setWidth(7), color: colors.green, fontSize: setWidth(5) }]}>Available Balance ₹1344</Text>
                        </>
                        :
                        <Text style={[styles.infoText, { marginTop: setWidth(8), paddingHorizontal: setWidth(7), marginBottom: setWidth(10),fontWeight: 'bold', }]}>WE WILL CONNECT WITH YOU SOON!</Text>
                }
                {
                    !this.state.isApplied &&
                    <TouchableOpacity style={[styles.btn, { marginTop: setWidth(8) }]}>
                        <Text style={styles.btnText}>REDEEM NOW</Text>
                    </TouchableOpacity>
                }

                <TouchableOpacity style={[styles.btn]} onPress={this.props.onCloseModal}>
                    <Text style={styles.btnText}>
                        {
                            this.state.isApplied ?
                            'CLOSE'
                            :
                            "CANCEL"
                        }
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
    );
  }
}
