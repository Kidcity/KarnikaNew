import Lottie from 'lottie-react-native';
import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { gif } from '../../utils/variable';
import { styles } from './style';

export default class FullScreenLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Lottie
          autoPlay
          loop
          style={styles.lottiView}
          source={require("../../utils/main_loader.json")}
        />
      </View>
    );
  }
}
