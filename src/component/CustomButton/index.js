import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './style';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons' 
import { setWidth } from '../../utils/variable';
import colors from '../../utils/colors';

export default class CustomButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <TouchableOpacity style={[styles.container, this.props.container]} onPress={this.props.onPress}>
        {
          this.props.rightIcon &&
          this.props.rightIcon
        }
        <Text style={[styles.label, this.props.labelStyle]}>{this.props.label}</Text>
        {
          (this.props.leftIcon) &&
          <MaterialIcons name='arrow-forward-ios' size={setWidth(3.5)} color={this.props.iconColor} />
        }
      </TouchableOpacity>
    );
  }
}
