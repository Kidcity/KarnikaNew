import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import colors from '../../utils/colors';
import { setWidth } from '../../utils/variable';
import { styles } from './style';
import Feather from 'react-native-vector-icons/Feather'

export default class FilterButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
       // totalApplied: 0
    };
  }

  render() {
    return (
        <TouchableOpacity style={styles.container} onPress={this.props.onPress} >
        <View style={[styles.row, styles.alignItemsCenter, styles.justifyContentCenter]}>
            <View>
                <Text style={styles.sortbyText}>Filters</Text>
                <Text style={styles.optionText}>{this.props.totalFilterApplied} Applied</Text>
            </View>
            <Feather name='filter' size={setWidth(6)} color={colors.grey2} style={{ marginLeft: setWidth(2) }} />
        </View>
    </TouchableOpacity>
    );
  }
}
