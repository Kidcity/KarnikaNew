import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import colors from '../../utils/colors';
import { styles } from './style';

export default class CustomTextInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        
        return (
            <View style={[styles.container, this.props.container, (this.props.editable === false)&&{backgroundColor: colors.grey6}]}>

                {
                    this.props.leftIcon
                }

                <TextInput
                    placeholder={this.props.placeholder}
                    placeholderTextColor={colors.grey1}
                    value={this.props.value}
                    onChangeText={e => this.props.onChangeText(e)}
                    onBlur={(e) => {
                        if(this.props.onBlur){
                            this.props.onBlur(e)
                        }else{
                            
                        }
                    }}
                    //onChangeText={e => {}}
                    secureTextEntry={this.props.secureTextEntry}
                    keyboardType={this.props.keyboardType}                    
                    editable={this.props.editable}
                    multiline={this.props.multiline}
                    maxLength={this.props.maxLength}
                    style={[styles.input, this.props.inputStyle]}
                    autoCapitalize={(this.props.autoCapitalize)? "characters" : "none"}
                    autoCorrect={false}
                    importantForAutofill="no"
                    autoComplete="off"
                />

                {
                    (this.props.rightIcon) &&
                    <TouchableOpacity style={styles.pressableIcon} onPress={() => this.props.onPressRightIcon()}>
                        {
                            this.props.rightIcon
                        }
                    </TouchableOpacity>
                }

            </View>
        );
    }
}
