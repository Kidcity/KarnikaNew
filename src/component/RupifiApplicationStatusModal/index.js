import Lottie from 'lottie-react-native';
import React, { Component } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { rupifi_status, setWidth } from '../../utils/variable';
import { styles } from './style';
import Entypo from 'react-native-vector-icons/Entypo'
import colors from '../../utils/colors';
import { connect } from 'react-redux';

class RupifiApplicationStatusModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rupifi_account_status: '',
            fromScreen: '',
            modalText1: "",
            modalText2: "",
            lottiJson: require("../../utils/check_right_tick.json")
        };
    }

    static getDerivedStateFromProps(props, state) {
        
        return {
            rupifi_account_status: props.rupifi_account_status ? props.rupifi_account_status : '',
            fromScreen: props.fromScreen ? props.fromScreen : ''
        }
    }

    componentDidMount() {
        const rupifi_account_status = this.state.rupifi_account_status
        
        if (rupifi_account_status == rupifi_status.ACTIVE) {
            
            this.setState({
                lottiJson: require("../../utils/check_right_tick.json"),
                modalText1: "Your Account is Active!",
                modalText2: "Enjoy the facility...."
            })
        } 
        if (rupifi_account_status == rupifi_status.UNDER_REVIEW && this.state.fromScreen == "ApplyForCredit") {
            this.setState({
                lottiJson: require("../../utils/check_right_tick.json"),
                modalText1: "Your Application Has Been Submitted!",
                modalText2: "Your Application Is Under Review It will take 2 - 4 Working Days."
            })
        } else if (rupifi_account_status == rupifi_status.PRE_APPROVAL_PENDING) {
            this.setState({
                lottiJson: require("../../utils/moving_gear.json"),
                modalText1: "Your Pre Approval is Pending!",
                modalText2: "This may take 2-4 working days."
            })
        } else if (rupifi_account_status == rupifi_status.REJECTED) {
            this.setState({
                lottiJson: require("../../utils/moving_rejected.json"),
                modalText1: "Your Credit Approval has Been Cancelled.",
                modalText2: "Please Contact to karnika."
            })
        }  else if (rupifi_account_status == rupifi_status.INCOMPLETE) {
            this.setState({
                lottiJson: require("../../utils/moving_incomplete.json"),
                modalText1: "Your Application Is Incomplete.",
                modalText2: "Please Contact to karnika or try again."
            })
        }

    }

    render() {

        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.content}>
                        <View style={styles.lottiView}>
                            <Lottie
                                autoPlay
                                loop
                                style={styles.lotti}
                                source={this.state.lottiJson}
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.heading1, this.state.rupifi_account_status == rupifi_status.REJECTED && { color: colors.red }]}>{this.state.modalText1}</Text>
                            <Text style={styles.heading2}>{this.state.modalText2}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.crossBtn} onPress={this.props.onCloseModal}>
                        <Entypo name='cross' size={setWidth(7)} color={colors.white} style={{ padding: setWidth(2) }} />
                    </TouchableOpacity>
                </View>
            </Modal>
        );
    }
}


const mapStateToProps = state => {
    return {
        rupifi_account_status: state.applyForCreditReducer.rupifi_account_status
    }
}

const mapDispatchToProps = dispatch => ({
})

const connectComponent = connect(mapStateToProps, mapDispatchToProps)
export default connectComponent(RupifiApplicationStatusModal)
