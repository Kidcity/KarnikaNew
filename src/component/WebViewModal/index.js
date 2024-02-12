import React, { Component } from 'react';
import { View, Text, Alert, NativeModules, Platform, BackHandler } from 'react-native';
import { WebView } from 'react-native-webview';
import LoadingModal from '../LoadingModal';
import { styles } from './style';

const { StatusBarManager } = NativeModules

export default class WebViewModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            showLoader: true,
            modalTitle1: 'Loading...',
            modalTitle2: 'Please wait...'
        };
        this.statusBarHeight = 0
    }

    static getDerivedStateFromProps(props, state) {
        return {
            url: props.url ? props.url : ''
        }
    }

    componentDidMount() {

        // BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
        if (Platform.OS === 'ios') {
            StatusBarManager.getHeight(response => {
                this.statusBarHeight = response.height
            })
        }
    }
    componentWillUnmount() {
        // BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    closeModal = (status = false) => {
        // BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
        this.props.onClose(status)
    }

    handleBackButton = (status) => {
        Alert.alert("Alert!", "Are You Sure Want To Exit ?", [
            {
                text: 'No',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Yes',
                onPress: () => this.closeModal(status),
                style: 'cancel',
            }
        ])
        return true
    }

    render() {
        return (
            <View style={[styles.container, { paddingTop: this.statusBarHeight }]}>
                {
                    this.state.url &&
                    <WebView
                        source={{ uri: this.state.url }}
                        onLoadStart={() => {
                            this.setState({
                                showLoader: true
                            })
                        }}
                        onLoadEnd={() => {
                            this.setState({
                                showLoader: false
                            })
                        }}
                        onLoad={(syntheticEvent) => {
                            const { nativeEvent } = syntheticEvent;
                            // this.url = nativeEvent.url;
                            //console.log('onload ==> ' + nativeEvent.url);                           
                        }}
                        onError={(syntheticEvent) => {
                            const { nativeEvent } = syntheticEvent;
                            console.warn('WebView error: ', nativeEvent);
                            this.props.onClose(false)
                        }}
                        onMessage={(e) => {

                        }}
                        onNavigationStateChange={(navState) => {
                            const navStateData = navState
                            // console.log(JSON.stringify(navState));
                            if (navState.title === 'success') {
                                // this.props.onClose(true)
                                this.closeModal(true)

                            } else if (navState.title === 'cancelled') {
                                // this.props.onClose(false)
                                this.closeModal(false)
                            }
                            else if (navState.title === 'failed') {
                                // this.props.onClose(false)
                                this.closeModal(false)
                            }

                        }}
                    />
                }

                {
                    this.state.showLoader &&
                    <LoadingModal
                        title={this.state.modalTitle1}
                        title2={this.state.modalTitle2}
                    />
                }
            </View>
        );
    }
}
