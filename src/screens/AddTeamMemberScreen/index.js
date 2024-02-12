import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import CustomHeader from '../../component/CustomHeader';
import { styles } from './style';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import CustomTextInput from '../../component/CustomTextInput';
import { setWidth } from '../../utils/variable';
import colors from '../../utils/colors';
import { setScreenActivity } from '../../helper/AppActivityTrackingHelper';

export default class AddTeamMemberScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <CustomHeader
                    heading="ADD A NEW ADDRESS"
                    headingStyle={{
                        textAlign: "center"
                    }}
                    onPressBack={() => {
                        setScreenActivity({ action_type: "going_back", action_id: '' })
                        this.props.navigation.goBack()}}
                />
                <KeyboardAwareScrollView style={styles.content}>
                <CustomTextInput
                        placeholder="Member Name*"
                        inputStyle={styles.inputStyle}
                    />
                    <CustomTextInput
                        placeholder="Phone*"
                        inputStyle={styles.inputStyle}
                        keyboardType="number-pad"
                    />
                   
                    <CustomTextInput
                        placeholder="Password*"
                        inputStyle={styles.inputStyle}
                        secureTextEntry={true}
                    />
                </KeyboardAwareScrollView>
                <View style={styles.footerView}>
                    <TouchableOpacity style={[styles.footerBtn,{backgroundColor: colors.white}]}>
                        <Text style={[styles.footerBtnText,{color: colors.lightRed}]}>CANCEL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.footerBtn,{marginLeft: setWidth(2)}]}>
                        <Text  style={styles.footerBtnText}>SAVE</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
