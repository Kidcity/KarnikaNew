import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { PureComponent } from 'react'
import { styles } from './style'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import { colors } from '../../utils/colors'
import { normalize } from '../../utils/variables'
import { commonStyle } from '../../helper/commonStyle'

export class TextBox extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            showSearchIcon: false,
            placeholder: "",
            containerStyle: null,
            onChangeText: undefined,
            value: ''
        }
    }

    static getDerivedStateFromProps(props, state) {
        return {
            showSearchIcon: props.hasOwnProperty("showSearchIcon") ? props.showSearchIcon : false,
            placeholder: props.hasOwnProperty("placeholder") ? props.placeholder : "Search here...",
            containerStyle: props.hasOwnProperty("containerStyle") ? props.containerStyle : null,
            onChangeText: props.hasOwnProperty("onChangeText") ? props.onChangeText : undefined,
        }
    }

    onChangeText = (e) => {
        this.setState({
            value: e
        })

        this.state.onChangeText(e)
    }


    render() {
        return (
            <View style={[styles.container, this.state.containerStyle, commonStyle.row,]}>
                {
                    this.state.showSearchIcon &&
                    <TouchableOpacity style={[commonStyle.alignItemsCenter, commonStyle.justifyContentCenter, { paddingHorizontal: normalize(15) }]} >
                        <AntDesign name='search1' size={normalize(16)} color={colors.grey1} />
                    </TouchableOpacity>
                }
                <TextInput
                    value={this.state.value}
                    placeholder={this.state.placeholder}
                    onChangeText={this.onChangeText}
                    style={styles.input}
                    placeholderTextColor={colors.grey1}
                />
                {
                    this.state.value !== "" &&
                    <TouchableOpacity style={[commonStyle.alignItemsCenter, commonStyle.justifyContentCenter, { paddingHorizontal: normalize(13) }]} >
                        <Entypo name='cross' size={normalize(20)} color={colors.charcoal} />
                    </TouchableOpacity>
                }
            </View>
        )
    }
}

export default TextBox