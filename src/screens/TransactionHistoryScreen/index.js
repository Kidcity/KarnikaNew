import React, { Component } from 'react';
import { View, Text, NativeModules, Platform, Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';
import CustomHeader from '../../component/CustomHeader';
import { setHeight } from '../../utils/variable';
import { styles } from './style';

const { StatusBarManager } = NativeModules

class TransactionHistoryScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userdata: null,
            statusbarheight: 0,
        };
    }

    static getDerivedStateFromProps(props, state) {
        return {
            userdata: props.userdata
        }
    }

    componentDidMount() {
        if (Platform.OS === 'ios') {
            StatusBarManager.getHeight(response =>
                this.setState({
                    statusbarheight: response.height
                })
            )
        }
    }

    render() {
       // console.log(this.state.userdata.image);
        return (
            <View style={styles.container}>
                {/* <CustomHeader
                    heading={"Available Credit"}
                    headingStyle={{
                        textAlign: 'center'
                    }}
                    onPressBack={() => this.props.navigation.goBack()}
                /> */}
                <View style={[styles.header, Platform.OS === 'ios' && { paddingTop: this.state.statusbarheight + setHeight(2) }]}>
                    {/* <Text style={styles.heading}>Available Credit</Text> */}
                    <View style={[styles.row, { marginTop: setHeight(3) }]}>
                        <View style={styles.headerLeftSide}>
                            <Text style={styles.heading}>
                                Hey {this.state.userdata.first_name}{(this.state.userdata.last_name) && " " + this.state.userdata.last_name},
                            </Text>
                            <Text style={styles.subHeading}>Check Your Available Credit Here.</Text>
                        </View>
                        <View style={styles.headerRightSide}>
                            <View style={styles.profilePicOuterView}>
                                <View style={styles.profilePicInnerView}>
                                    <FastImage source={{
                                        uri: this.state.userdata.image,
                                        priority: FastImage.priority.high,
                                    }}
                                        resizeMode={FastImage.resizeMode.cover}
                                        style={styles.profilePic}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.floatingCard}>
                    <View style={styles.cardHeadingView}>
                        <View style={[styles.row, { justifyContent: 'space-between' }]}>
                            <Text style={styles.cardHeading}>My Available Credit Balance</Text>
                            <Text style={styles.cardHeading}>₹1000</Text>
                        </View>
                    </View>
                    <View>
                        
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        userdata: state.loginReducer.data,
    }
}

const mapDispatchToProps = dispatch => ({
})

const connectComponent = connect(mapStateToProps, mapDispatchToProps)
export default connectComponent(TransactionHistoryScreen)
