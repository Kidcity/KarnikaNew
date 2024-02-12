import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { images, setHeight, setWidth } from '../../../utils/variable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import CustomButton from '../../CustomButton';
import { styles } from './style';

export default class SeasonSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }



  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.seasonBtn} onPress={() => this.props.onSelectSeason('Summer','1,0')} >
          <FastImage
            style={styles.image}
            source={images.summer}
            resizeMode={FastImage.resizeMode.cover}
          />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.seasonBtn, { marginTop: setHeight(3) }]}  onPress={() => this.props.onSelectSeason('Winter','2,0')}>
          <FastImage
            style={styles.image}
            source={images.winter}
            resizeMode={FastImage.resizeMode.cover}
          />
        </TouchableOpacity>
        <View style={[styles.row, {  justifyContent:'space-between', marginTop: setHeight(4) }]}>
          <CustomButton
            label="BACK"
            container={[styles.buttonContainer,{width: setWidth(30)}]}
            rightIcon={<MaterialIcons name='arrow-back-ios' size={setWidth(4)} color={this.props.iconColor} />}
            labelStyle={styles.buttonLabelStyle}
            onPress={this.props.onPressBack}
          />
          <CustomButton
            label="SHOP ALL SEASON"
            container={[styles.buttonContainer,{flex: 1,marginLeft: setWidth(5)}]}
            leftIcon={true}            
            labelStyle={styles.buttonLabelStyle}
            onPress={() => this.props.onSelectSeason("All",'0,1,2')}
          />

        </View>
      </View>
    );
  }
}
