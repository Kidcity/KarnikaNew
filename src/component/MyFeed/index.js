import { Text, TouchableOpacity, View } from 'react-native'
import React, { Component, PureComponent } from 'react'
import { styles } from './style';

export default class MyFeed extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            containerStyle: null,
            onPressFeed: undefined
        };
    }

    static getDerivedStateFromProps(props, state) {
        return {
            containerStyle: props.hasOwnProperty("containerStyle") ? props.containerStyle : null,
            onPressFeed: props.hasOwnProperty("onPressFeed") ? props.onPressFeed : undefined
        }
    }

  render() {
    return (
      <View style={[styles.container, this.state.containerStyle]}>
        <TouchableOpacity style={styles.outCircle} onPress={this.state.onPressFeed}>
            <View style={styles.innerCircle}>
                <Text style={styles.circleText}>MY</Text>
            </View>
        </TouchableOpacity>
        <Text style={styles.feedText}>MY FEED</Text>
      </View>
    )
  }
}