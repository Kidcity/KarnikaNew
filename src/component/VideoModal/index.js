import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { setHeight, setWidth } from '../../utils/variable';
import VideoComponent from '../VideoComponent';
import { styles } from './style';
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import colors from '../../utils/colors';

export default class VideoModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uri: '',
            poster: '',
            isPaused: true,
            onCloseModal: undefined
        };
    }

    static getDerivedStateFromProps(props, state) {
        return {
            uri: props.uri ? props.uri : '',
            poster: props.poster ? props.poster : '',
            onCloseModal: props.onCloseModal ? props.onCloseModal : undefined
        }
    }

    onClose = () => {
        if (this.state.onCloseModal) {
            this.state.onCloseModal()
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.videoContainer} activeOpacity={0.7} onPress={() => this.setState({ isPaused: !this.state.isPaused })}>

                    {
                        (this.state.isPaused) &&
                        <TouchableOpacity style={styles.playBtn} onPress={() => this.setState({ isPaused: false })}>
                            <AntDesign name='play' size={setWidth(15)} color={colors.white} />
                        </TouchableOpacity>
                    }
                    {
                        (!this.state.isPaused) &&
                        <VideoComponent
                            uri={this.state.uri}
                            containerStyle={{
                                height: setHeight(50),
                                width: setWidth(100),
                            }}
                            paused={this.state.isPaused}
                        />
                    }

                </TouchableOpacity>

                <TouchableOpacity style={styles.closeBtnView} onPress={this.onClose}>
                    <Entypo name='cross' size={setWidth(8)} color={colors.white} />
                </TouchableOpacity>
            </View>
        );
    }
}
