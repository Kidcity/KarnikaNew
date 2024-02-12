import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';

export default class FlatListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <FlatList
                data={this.props.data}
                //bounces={false}
                renderItem={this.props.renderItem}
                keyExtractor={(item, index) => index}
                contentContainerStyle={[{ flexGrow: 1 }, this.props.contentContainerStyle]}
                nestedScrollEnabled
                showsVerticalScrollIndicator={false}
                //ItemSeparatorComponent={ItemSeparatorComponent}
                onEndReached={({ distanceFromEnd }) => {
                    if (distanceFromEnd < 0) return;
                    this.props.onEndReached()
                }}
                onEndReachedThreshold={0.01}
            />
        );
    }
}
