import { Text, View, Modal, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { styles } from './style'
import colors from '../../utils/colors'
import { setWidth } from '../../utils/variable'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import FastImageComponent from '../FastImageComponent'
import FastImage from 'react-native-fast-image'

class WelcomeModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openWelcomeModal: true,
            loginData: null
        }
        this.interval = null
        this.second = 0
    }

    static getDerivedStateFromProps(props, state) {
        return {
            loginData: props.hasOwnProperty("loginData") ? props.loginData : false
        }
    }

    componentDidMount() {        
        this.startTimer()
    }

    onPressLater = () => {
        this.setState({
            openWelcomeModal: false
        })
    }

    startTimer = () => {
        this.interval = setInterval(() => {
            this.second += 1
            if (this.second === 3) {
                this.setState({
                    openWelcomeModal: false
                })
                this.stopTimer()
            }
        }, 1000);
    }

    stopTimer = () => {
        clearInterval(this.interval)
    }
    render() {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.openWelcomeModal}
            >
                <View style={styles.container}>
                    <View style={styles.content}>
                        <FastImageComponent
                            style={styles.profileImage}
                            source={{ uri: this.state.loginData?.data?.image }}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                        <Text style={styles.welcomeText}>Welcome To karnika</Text>
                        <Text style={styles.smallWelcomeText}>Expand your business with us.</Text>

                        <View style={styles.featuresBox}>
                            <View style={styles.boxContent}>
                                <View style={styles.iconView}>
                                    <Ionicons name='md-shirt-outline' size={setWidth(7)} color={colors.primaryyellow} />
                                </View>
                                <Text style={styles.boxText}>Multiple Brands</Text>
                            </View>
                            <View style={styles.boxContent}>
                                <View style={styles.iconView}>
                                    <Feather name='truck' size={setWidth(7)} color={colors.blue2}/>
                                </View>
                                <Text style={styles.boxText}>Doorstep Delivery</Text>
                            </View>
                            <View style={styles.boxContent}>
                                <View style={styles.iconView}>
                                    <FontAwesome name='rupee' size={setWidth(7)} color={colors.primaryyellow}/>
                                </View>
                                <Text style={styles.boxText}>Best Price</Text>
                            </View>
                            <View style={styles.boxContent}>
                                <View style={styles.iconView}>
                                    <Entypo name='credit-card' size={setWidth(7)} color={colors.blue2}/>
                                </View>
                                <Text style={styles.boxText}>Easy Credit</Text>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.btn} onPress={this.onPressLater}>
                            <Text style={styles.btnText}>Start Exploring</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }
}
const mapStateToProps = state => {
    return {
        loginData: state.loginReducer
    }
}

const mapDispatchToProps = dispatch => ({

})

const connectComponent = connect(mapStateToProps, mapDispatchToProps)
export default connectComponent(WelcomeModal)

