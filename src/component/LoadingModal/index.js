import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { styles } from './style';

export default class LoadingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>{this.props.title}</Text>
                    <Text style={styles.title2}>{this.props.title2}</Text>
                </View>
            </View>
        );
    }
}
