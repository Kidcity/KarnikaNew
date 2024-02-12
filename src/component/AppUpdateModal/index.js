import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './style';

export default class AppUpdateModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
            <Text style={styles.heading1}>Get more with the new update.</Text>
            <Text style={styles.heading2}>We have enhanced the app. Please update for new features.</Text>
            <TouchableOpacity style={styles.btn} onPress={this.props.onPressUpdate}>
                <Text style={styles.btnText}>Update</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}
