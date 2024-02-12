import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './style';

export default class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ischecked: this.props.isChecked? this.props.isChecked : false
    };
  }

  // onPressCheckBox() {
  //   this.setState({
  //     ischecked: !this.state.ischecked
  //   })
  // }

  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={() => this.props.onPressCheckBox()}>
        {
          this.props.isChecked &&
          <View style={styles.circle} />

        }
      </TouchableOpacity>
    );
  }
}
