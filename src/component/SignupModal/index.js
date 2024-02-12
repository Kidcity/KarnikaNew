import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import colors from '../../utils/colors';
import { normalize, setWidth } from '../../utils/variable';
import { styles } from './style';
import { commonStyle } from '../../helper/commonStyle';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'

export default class SignupModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showProcessBtn: true,
      heading: ""
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {
      showProcessBtn: props.hasOwnProperty("showProcessBtn") ? props.showProcessBtn : true,
      heading: props.hasOwnProperty("heading") ? props.heading : "",
    }
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={true}
        onRequestClose={() => {
        }}>
        <View style={styles.container}>
          <View style={[styles.content, commonStyle.shadow]}>
            <TouchableOpacity style={styles.btnClose} onPress={this.props.onClose}>
              <Entypo name='cross' size={normalize(20)} color={colors.black} />
            </TouchableOpacity>
            {
              (this.state.heading !== "") &&
              <Text style={[styles.heading, this.props.headingStyle]}>
                {this.state.heading}
              </Text>
            }

            <TouchableOpacity style={[styles.btn, this.props.leftBtnStyle, { marginTop: normalize(15) }]} onPress={this.props.onPressClose}>
              <Text style={[styles.btnText, { color: colors.white }]}>
                {
                  (this.props.leftBtnTitle) ?
                    this.props.leftBtnTitle.toUpperCase()
                    :
                    "Close".toUpperCase()
                }
              </Text>
              <AntDesign name='right' size={normalize(20)} color={colors.white} />
            </TouchableOpacity>
            {
              this.state.showProcessBtn &&
              <TouchableOpacity style={[styles.btn, this.props.rightBtnStyle, { backgroundColor: colors.themeColor, marginTop: normalize(15) }]} onPress={this.props.onPressContinueShopping}>
                <Text style={[styles.btnText, { color: colors.white }]}>
                  {
                    this.props.rightBtnTitle ?
                      (this.props.rightBtnTitle).toUpperCase()
                      :
                      "Shop More".toUpperCase()
                  }
                </Text>
                <AntDesign name='right' size={normalize(20)} color={colors.white} />
              </TouchableOpacity>
            }
          <Text style={styles.footerText}>*Registration is subject to approval by Karnika</Text>
          </View>
        </View>
      </Modal>
    )
    return (
      <View style={styles.container}>

      </View>
    );
  }
}
