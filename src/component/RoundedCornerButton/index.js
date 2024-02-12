import React, { PureComponent } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { styles } from './style'
import { commonStyle } from '../../helper/commonStyle'

export class RoundedCornerButton extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
          label: '',
          containerStyle: null,
          onPress: undefined,
          labelStyle: null
        }
      }
    
      static getDerivedStateFromProps(props, state) {
        return {
            label: props.hasOwnProperty("label") ? props.label : "",
            containerStyle: props.hasOwnProperty("containerStyle") ? props.containerStyle : null,
            labelStyle: props.hasOwnProperty("labelStyle") ? props.labelStyle : null,            
            onPress: props.hasOwnProperty("onPress") ? props.onPress : undefined,
        }
      }

  render() {
    return (
      <TouchableOpacity style={[styles.container, this.state.containerStyle]} onPress={this.state.onPress}>
        <Text style={[commonStyle.textWhite, commonStyle.fontBold, commonStyle.text14, commonStyle.textAlignCenter, this.state.labelStyle]} adjustsFontSizeToFit numberOfLines={1}> {this.state.label} </Text>
      </TouchableOpacity>
    )
  }
}

export default RoundedCornerButton
