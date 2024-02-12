import React, { Component } from 'react';
import { View, Text, Modal, TouchableOpacity, Image, Touchable, Animated, Dimensions } from 'react-native';
import { images, setWidth } from '../../utils/variable';
import { styles } from './style';
import FastImage from 'react-native-fast-image'
import Entypo from 'react-native-vector-icons/Entypo'
import colors from '../../utils/colors';
import { Easing } from 'react-native-reanimated';

const { width, height } = Dimensions.get("screen")

export default class ChooseStoreModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bottomPosition: new Animated.Value(-height)
        };
    }

    moveToUp() {
        Animated.timing(
            this.state.bottomPosition,
            {
                toValue: 0,
                duration: 900,
                easing: Easing.linear(),
                useNativeDriver: false
            },
        ).start()
    }

    moveToDown() {
        //alert(1)
        Animated.timing(
            this.state.bottomPosition,
            {
                toValue: -height,
                duration: 900,
                easing: Easing.linear(),
                useNativeDriver: false
            },
        ).start()
        setTimeout(() => {
        this.props.onClose()    
        }, 800);        
    }

    componentDidMount() {
        this.moveToUp()
    }

    // static getDerivedStateFromProps(props, state) {

    //     if (props.isOpen) {
    //         return {
    //             bottomPosition: new Animated.Value(0)
    //         }
    //     }
    //     else {
    //         return null
    //     }
    // }


    shouldComponentUpdate(props, state) {
        //console.log(props, state);
        if (props.isOpen) {
            this.moveToUp()
        }
        return true
    }

    render() {
       // console.log(this.state.bottomPosition);

        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.props.isOpen}
                onRequestClose={() => {
                }}
            >
                <TouchableOpacity style={styles.modalContainer} activeOpacity={1} onPress={() => this.moveToDown()}>
                    <Animated.View style={[{ bottom: this.state.bottomPosition, width: width, height: height, justifyContent: 'center', alignItems: 'center' }]}>
                        <TouchableOpacity style={styles.seasonBtn} onPress={() => this.props.onChooseSeason('1,0')}>
                            <FastImage
                                style={styles.image}
                                source={images.summer}
                                resizeMode={FastImage.resizeMode.contain}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.seasonBtn} onPress={() => this.props.onChooseSeason('2,0')}>
                            <FastImage
                                style={styles.image}
                                source={images.winter}
                                resizeMode={FastImage.resizeMode.contain}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.seasonBtn} onPress={() => this.props.onChooseSeason('1,2,0')}>
                            <FastImage
                                style={styles.image}
                                source={images.all}
                                resizeMode={FastImage.resizeMode.contain}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity style={{ marginTop: setWidth(5), padding: setWidth(3), borderRadius: setWidth(10), backgroundColor: colors.grey1 }} onPress={() => {
                            // this.setState({
                            //     bottomPosition: new Animated.Value(-height)
                            // })
                            this.moveToDown()
                        }}>
                            <Entypo name='cross' size={setWidth(6)} color={colors.red} />
                        </TouchableOpacity>
                    </Animated.View>
                </TouchableOpacity>

            </Modal>
        );
    }
}
