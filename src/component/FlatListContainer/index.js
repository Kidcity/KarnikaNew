import { FlatList, Text, View, RefreshControl } from 'react-native'
import React, { Component, PureComponent } from 'react'
import { styles } from './style'

export default class FlatListContainer extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            keyVal: "#",
            numColumns: 1,
            initialNumToRender: 10,
            renderItem: undefined,
            itemSeparatorComponent: undefined,
            ListFooterComponent: undefined,
            onRefresh: undefined,
            onEndReached: undefined,
            refreshing: false,
            pullToRefresh: false,
            onEndReachedThreshold: 0.1,
            contentContainerStyle: null,
            columnWrapperStyle: null,
            horizontal: false,
            showsHorizontalScrollIndicator: false,
            style: null,
        }
    }

    static getDerivedStateFromProps(props, state) {
        return {
            keyVal: props.hasOwnProperty("keyVal") ? props.keyVal : "#",
            numColumns: props.hasOwnProperty("numColumns") ? props.numColumns : 1,
            initialNumToRender: props.hasOwnProperty("initialNumToRender") ? props.initialNumToRender : 10,
            data: props.hasOwnProperty("data") ? props.data : [],
            style: props.hasOwnProperty("style") ? props.style : null,
            renderItem: props.hasOwnProperty("renderItem") ? props.renderItem : undefined,
            itemSeparatorComponent: props.hasOwnProperty("itemSeparatorComponent") ? props.itemSeparatorComponent : undefined,
            onRefresh: props.hasOwnProperty("onRefresh") ? props.onRefresh : undefined,
            onEndReached: props.hasOwnProperty("onEndReached") ? props.onEndReached : undefined,
            refreshing: props.hasOwnProperty("refreshing") ? props.refreshing : false,
            onEndReachedThreshold: props.hasOwnProperty("onEndReachedThreshold") ? props.onEndReachedThreshold : 0.1,
            pullToRefresh: props.hasOwnProperty("pullToRefresh") ? props.pullToRefresh : false,
            contentContainerStyle: props.hasOwnProperty("contentContainerStyle") ? props.contentContainerStyle : null,
            columnWrapperStyle: props.hasOwnProperty("columnWrapperStyle") ? props.columnWrapperStyle : null,
            horizontal: props.hasOwnProperty("horizontal") ? props.horizontal : false,
            showsHorizontalScrollIndicator: props.hasOwnProperty("showsHorizontalScrollIndicator") ? props.showsHorizontalScrollIndicator : false,
            ListFooterComponent: props.hasOwnProperty("ListFooterComponent") ? props.ListFooterComponent : undefined
        }
    }

    render() {
        if (this.state.renderItem) {
            return (
                <FlatList
                    ref={this.props.setRef}
                    // key={this.state.key}
                    data={this.state.data}
                    numColumns={this.state.numColumns}
                    initialNumToRender={this.state.initialNumToRender}
                    renderItem={this.state.renderItem}
                    keyExtractor={(item, index) => this.state.keyVal + index}
                    contentContainerStyle={[styles.contentContainerStyle, this.state.contentContainerStyle]}
                    style={this.state.style}
                    ItemSeparatorComponent={this.state.itemSeparatorComponent}
                    horizontal={this.state.horizontal}
                    nestedScrollEnabled
                    showsHorizontalScrollIndicator={this.state.showsHorizontalScrollIndicator}
                    columnWrapperStyle={this.state.columnWrapperStyle}
                    ListFooterComponent={this.state.ListFooterComponent}
                    // ListEmptyComponent={() => <Text>No Data</Text>}
                    onEndReachedThreshold={this.state.onEndReachedThreshold}
                    onEndReached={this.state.onEndReached}
                    refreshControl={
                        this.state.pullToRefresh ?
                            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.state.onRefresh} />
                            :
                            null
                    }
                />
            )
        }
        return null

    }
}