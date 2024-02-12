import React, { Component } from 'react';
import { View, Text, Animated } from 'react-native';
import Video from 'react-native-video';
import Lottie from 'lottie-react-native';
import { styles } from './style';
import { _recordCrashReport, _setCrashAttributes } from '../../helper/CrashlyticsHelper';


export default class VideoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uri: '',
            poster: '',
            paused: true,
            containerStyle: {},
            bufferConfig: {
                minBufferMs: 15000,
                maxBufferMs: 50000,
                bufferForPlaybackMs: 2500,
                bufferForPlaybackAfterRebufferMs: 2000
            },
            loading: true
        };
        this.translateX = new Animated.Value(0)
    }

    static getDerivedStateFromProps(props, state) {

        return {
            uri: props.uri ? props.uri : '',
            poster: props.poster ? props.poster : '',
            containerStyle: props.containerStyle ? props.containerStyle : {},
            paused: props.hasOwnProperty("paused") ? props.paused : true
        }
    }

    onBuffer = ({ isBuffering }) => {
        /// console.log('buffer ==> ', isBuffering);
    }

    videoError = (e) => {
        _setCrashAttributes({
            component: "VideoComponent",
            videoerror: JSON.stringify(e)
        })
        _recordCrashReport(e)
        // console.log("video error ===> ", e);
    }

    onLoad = (e) => {
        // console.log('onLoad   ====> ', e);
        this.setState({
            loading: false
        })
        // this.setState({
        //     loading: false
        // }, () => this.translateX.stopAnimation())
    }

    onProgress = (e) => {
        // console.log('onProgress   ===>  ', e);
    }

    onLoadStart = (e) => {
        // console.log('onLoadStart =====> ', e);
        this.setState({
            loading: true
        })
        // this.setState({
        //     loading: true
        // }, () => this.loadingAnim())

    }

    onReadyForDisplay = (e) => {
        // console.log('onReadyForDisplay  ====> ', e);
        this.setState({
            loading: false
        })
        // this.setState({
        //     loading: false
        // }, () => this.translateX.stopAnimation())
    }

    loadingAnim = () => {
        Animated.sequence([
            Animated.loop(
                Animated.sequence([
                    Animated.parallel([
                        Animated.spring(this.translateX, {
                            toValue: 100,
                            duration: 10,
                            friction: 5,
                            tension: 1,
                            useNativeDriver: true,
                        }),
                    ]),
                    Animated.parallel([
                        Animated.spring(this.translateX, {
                            toValue: 0,
                            duration: 10,
                            friction: 5,
                            tension: 1,
                            useNativeDriver: true,
                        }),
                    ]),
                ])
            )
        ]).start()
    }

    render() {
        const transform = [
            {
                translateX: this.translateX
            }
        ]

        return (
            <View style={[styles.contianer, this.state.containerStyle]}>
                <Video
                    source={{ uri: this.state.uri }}   // Can be a URL or a local file.
                    // source={require("../../../assets/videos/abc.mp4")}
                    ref={(ref) => {
                        this.player = ref
                    }}                                      // Store reference
                    onBuffer={this.onBuffer}                // Callback when remote video is buffering
                    onError={this.videoError}               // Callback when video cannot be loaded
                    paused={this.state.paused}
                    style={styles.backgroundVideo}
                    resizeMode="cover"
                    repeat={true}
                    poster={this.state.poster}
                    posterResizeMode="stretch"
                    ignoreSilentSwitch="ignore"
                    bufferConfig={this.state.bufferConfig}
                    onLoad={this.onLoad}                    // Callback function that is called when the media is loaded and ready to play.
                    onProgress={this.onProgress}            // Callback function that is called every progressUpdateInterval seconds with info about which position the media is currently playing.
                    onLoadStart={this.onLoadStart}          // Callback function that is called when the media starts loading.                    
                    onReadyForDisplay={this.onReadyForDisplay}
                    muted
                />
                {
                    this.state.loading &&
                    <Lottie
                        autoPlay
                        loop
                        style={styles.lottiView}
                        source={require("../../utils/loader.json")}
                    />
                }

            </View>
        );
    }
}
