import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import colors from '../../utils/colors';
import { styles } from './style';
import Lottie from 'lottie-react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { setWidth } from '../../utils/variable';

export default class YoutubeTutorialButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            containerStyle: {}
        };
    }

    static getDerivedStateFromProps(props, state){
        return{
            containerStyle: props.containerStyle? props.containerStyle : {}
        }
    }

    componentDidMount() {
        this.animation.play();
    }

    render() {
        return (
            <View style={[styles.container,this.state.containerStyle]}>
                <View style={[styles.row, styles.justifyCenter, styles.alignCenter]}>
                    <Text style={[styles.heading]}>HOW TO USE</Text>
                    <Text style={[styles.heading, { color: colors.primaryyellow, textDecorationLine: 'underline' }]}> karnika APP</Text>
                </View>
                <TouchableOpacity style={styles.youtubeBtn} onPress={this.props.onPress}>
                    <Lottie
                        ref={animation => {
                            this.animation = animation;
                        }}
                        style={styles.lottiView}
                        source={require("../../utils/jumping_youtube.json")}
                    />
                    <View style={[styles.row, styles.alignCenter]}>
                    <Text style={styles.btnText}>WATCH TUTORIAL ON YOUTUBE</Text>
                    <AntDesign name='arrowright' size={setWidth(5)} color={colors.dark_charcoal} style={{marginLeft: setWidth(2)}} />
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}
