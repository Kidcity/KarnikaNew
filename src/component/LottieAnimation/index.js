import { Text, View } from 'react-native'
import React, { Component, PureComponent } from 'react'
import LottieView from 'lottie-react-native';

export default class LottieAnimation extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            source: null,
            style: null
        };
    }

    static getDerivedStateFromProps(props, state) {
        return {
            source: props.hasOwnProperty("source") ? props.source : null,
            style: props.hasOwnProperty("style") ? props.style : null,
        }
    }

  render() {
    return (
        <LottieView source={this.state.source} autoPlay loop  style={[{flex: 1},this.state.style]}/>
      );
    
  }
}