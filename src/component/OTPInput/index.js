import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, {Component} from 'react'
import { styles } from './style';



const total_input = Array(6).fill(0)

export default class OtpInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
        otp: []
    };
    this.textInputRef = []
  }

   focusNext(value, index) {
   
    if (index < this.textInputRef.length - 1 && value) {
      this.textInputRef[index + 1].focus()
    }
    if (index === this.textInputRef.length - 1 && value) {
      this.textInputRef[index].blur()
    }

    let myotp = this.state.otp
    myotp[index] = value

    this.setState({
        otp: myotp
    })
    this.props.onOTPChange(myotp)
  }

  focusPrev(key, index){
    if (key === 'Backspace' && index != 0) {
      this.textInputRef[index - 1].focus()
    }
  }

  render() {
    return (
        <View style={styles.container}>
        {
          total_input.map((x, i) =>
            <TextInput
              style={styles.input}
              ref={ref => this.textInputRef[i] = ref}
              keyboardType="number-pad"
              onChangeText={e => this.focusNext(e, i)}
              onKeyPress={e => this.focusPrev(e.nativeEvent.key, i)}
              key={i}
              maxLength={1}
              autoFocus={(i == 0)? true: false}
            />
          )
        }
  
      </View>
    );
  }
}

