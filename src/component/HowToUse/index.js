import { Linking, Text, View } from 'react-native'
import React, { Component, PureComponent } from 'react'
import { styles } from './style'
import AnimatedLottieButton from '../AnimatedLottieButton'
import { lottie } from '../../lottie'
import { commonStyle } from '../../helper/commonStyle'
import { normalize } from '../../utils/variable'


export default class HowToUse extends PureComponent {

    constructor(props){
        super(props)
        this.state = {
            containerStyle: null
        }
    }

    static getDerivedStateFromProps(props, state) {
        return {
            containerStyle: props.hasOwnProperty("containerStyle") ? props.containerStyle : null,
        }
    }

    render() {
        return (
            <View style={[styles.container, this.state.containerStyle]}>
                <View style={styles.heading}>
                    <Text style={styles.title}>How To Use Karnika APP</Text>
                </View>
                <AnimatedLottieButton
                    lottieSource={lottie.youtube_icon}
                    containerStyle={{
                        justifyContent: 'flex-start',
                        paddingLeft: normalize(20),
                    }}
                    btnLabel="WATCH TUTORIAL ON YOUTUBE"
                    onPress={() => Linking.openURL("https://www.youtube.com/@karnikaindia")}
                />
                <AnimatedLottieButton
                    lottieSource={lottie.globe}
                    btnLabel="GO To the website"
                    containerStyle={{
                        marginTop: normalize(10),
                        justifyContent: 'flex-start',
                        paddingLeft: normalize(25),
                    }}
                    labelViewStyle={{
                        paddingLeft: normalize(10) ,
                    }}
                    lottieContainer={{
                        width: normalize(25),
                    }}
                    onPress={() => Linking.openURL("https://www.karnikaindustries.com/")}
                />
            </View>
        )
    }
}