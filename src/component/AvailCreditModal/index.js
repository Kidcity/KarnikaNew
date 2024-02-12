import { Modal, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import { styles } from './style'
import Lottie from 'lottie-react-native'
import { connect } from 'react-redux'
import { navigate } from '../../helper/NavigationHelper'
import colors from '../../utils/colors'
import { setHeight } from '../../utils/variable'
import { store } from '../../redux/store'
import { setOpenAvailCreditModalAction } from '../../redux/actions/commonAction'


class AvailCreditModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openAvailCreditModal: false
        }
        this.interval = null
        this.second = 0
    }

    static getDerivedStateFromProps(props, state) {
        return {
            openAvailCreditModal: props.hasOwnProperty("openAvailCreditModal") ? props.openAvailCreditModal : false
        }
    }

    componentDidMount() {
        // this.startTimer()
    }

    shouldComponentUpdate(nextProps, nextState){        
        if(nextProps.openAvailCreditModal){
            this.startTimer()
        }
        return true
    }

    onPressApply = () => {
        store.dispatch(setOpenAvailCreditModalAction(false))
        navigate("ApplyForCredit")
    }

    onPressLater = () => {
        store.dispatch(setOpenAvailCreditModalAction(false))
    }

    startTimer = () => {
        this.interval = setInterval(() => {
            this.second += 1            
            if (this.second === 5) {                
                store.dispatch(setOpenAvailCreditModalAction(false))
                this.stopTimer()
            }
        }, 1000);
    }

    stopTimer = () => {
        clearInterval(this.interval)
        this.second = 0
    }

    render() {
        if (!this.state.openAvailCreditModal) {
            return null
        }
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.openAvailCreditModal}
            >
                <View style={styles.container}>
                    {/* <View style={styles.headerTextView}>
                        <Text style={styles.heading}>Didn't Apply For Credit ?</Text>
                    </View> */}
                    <View style={styles.content}>
                        <View>
                        <Lottie
                            autoPlay
                            loop
                            style={styles.lottiView}
                            source={require("../../utils/availcredit.json")}
                        />
                        </View>
                        <View style={{marginTop: setHeight(5)}}>
                            <Text style={styles.heading}>Havn't Avail Credit ?</Text>
                            <Text style={styles.smallText}>
                                Avail your Credit                                
                            </Text>
                            <Text style={styles.boldText}> Buy Now Pay Later</Text>
                        </View>
                    
                        
                    </View>
                    <View style={styles.footerTextView}>
                    <TouchableOpacity style={styles.btn} onPress={this.onPressApply}>
                        <Lottie
                            autoPlay
                            loop
                            style={styles.correctIcon}
                            source={require("../../utils/correct.json")}
                        />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }
}
const mapStateToProps = state => {
    return {
        openAvailCreditModal: state.commonReducer.openAvailCreditModal
    }
}

const mapDispatchToProps = dispatch => ({

})

const connectComponent = connect(mapStateToProps, mapDispatchToProps)
export default connectComponent(AvailCreditModal)
