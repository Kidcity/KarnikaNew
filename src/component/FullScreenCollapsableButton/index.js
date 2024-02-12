import { Text, TouchableOpacity, View } from 'react-native'
import React, { PureComponent } from 'react'
import { styles } from './style';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { colors } from '../../utils/colors';
import { normalize } from '../../utils/variables';
import { commonStyle } from '../../helper/commonStyle';
import FlatListContainer from '../FlatListContainer';
import GridViewProductItem from '../GridViewProductItem';
import Checkbox from '../Checkbox';

export class FullWidthButton extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      flatListdata: null,
      collapsableButton: false,
      isCollapsed: false,
      label: "",
      showFlatlist: false,
      showGridProduct: false,
      numOfCols: 1,
      icon: null,
      onPressButton: undefined,
      itemSeparatorComponent: undefined,
      customeComponent: null,
      middleTextComponent: null,
      showCheckBox: false,
      isChecked: false,
      onPressCheckBox: undefined
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {
      flatListdata: props.hasOwnProperty("flatListdata") ? props.flatListdata : null,
      icon: props.hasOwnProperty("icon") ? props.icon : null,
      label: props.hasOwnProperty("label") ? props.label : "",
      collapsableButton: props.hasOwnProperty("collapsableButton") ? props.collapsableButton : false,
      showFlatlist: props.hasOwnProperty("showFlatlist") ? props.showFlatlist : false,
      showGridProduct: props.hasOwnProperty("showGridProduct") ? props.showGridProduct : false,
      itemSeparatorComponent: props.hasOwnProperty("itemSeparatorComponent") ? props.itemSeparatorComponent : undefined,
      numOfCols: props.hasOwnProperty("numOfCols") ? props.numOfCols : 1,
      onPressButton: props.hasOwnProperty("onPressButton") ? props.onPressButton : undefined,
      customeComponent: props.hasOwnProperty("customeComponent") ? props.customeComponent : null,
      middleTextComponent: props.hasOwnProperty("middleTextComponent") ? props.middleTextComponent : null,
      showCheckBox: props.hasOwnProperty("showCheckBox") ? props.showCheckBox : false,
      isChecked: props.hasOwnProperty("isChecked") ? props.isChecked : false,
      onPressCheckBox: props.hasOwnProperty("onPressCheckBox") ? props.onPressCheckBox : undefined,
    }
  }

  renderGridProductItems = ({ item, index }) => {
    return (
      <GridViewProductItem
        item={item}
      // onPressProduct={() => this.props.navigation.navigate("ProductDetails")}
      />
    )
  }

  renderFlatListColItem = ({ item, index }) => {
    return (
      <View style={styles.coloum}>
        <Text style={[commonStyle.text12, commonStyle.fontBold, commonStyle.textCharcoal]}>
          {item.title}
        </Text>
        <Text style={[commonStyle.text12, commonStyle.fontBold, commonStyle.textgrey, commonStyle.gapTop6]} >
          {item.value}
        </Text>
      </View>
    )
  }

  render() {

    if (this.state.collapsableButton) {
      return (
        <View>
          <TouchableOpacity style={styles.collasableBtn} onPress={() => this.setState({ isCollapsed: !this.state.isCollapsed })}>
            <Text style={[commonStyle.fontBold, commonStyle.text14, commonStyle.textCharcoal, commonStyle.textCapitalize]}>{this.state.label}</Text>
            <MaterialIcons name={this.state.isCollapsed ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={normalize(25)} color={colors.charcoal} />
          </TouchableOpacity>

          {
            (this.state.showFlatlist && this.state.isCollapsed) &&
            <View>
              <FlatListContainer
                data={this.state.flatListdata}
                renderItem={this.state.showGridProduct ? this.renderGridProductItems : this.renderFlatListColItem}
                horizontal={this.state.showGridProduct ? true : false}
                numColumns={this.state.numOfCols}
                contentContainerStyle={{
                  paddingLeft: normalize(10),
                  marginTop: 10,
                }}
                itemSeparatorComponent={this.state.itemSeparatorComponent}
              />
            </View>
          }
          {
            (this.state.customeComponent && this.state.isCollapsed) &&
            this.state.customeComponent
          }

        </View>
      )
    }
    else {
      return (
        <TouchableOpacity style={styles.collasableBtn} onPress={this.state.onPressButton}>
          <Text style={[commonStyle.fontBold, commonStyle.text14, commonStyle.textCharcoal, commonStyle.textCapitalize]}>{this.state.label}</Text>
          {this.state.icon}
          {
            this.state.middleTextComponent
          }
          {
            this.state.showCheckBox &&
            <Checkbox
              isChecked={this.state.isChecked}
              onPressCheckBox={(v) => this.state.onPressCheckBox(v)}
            />
          }
        </TouchableOpacity>
      )
    }
  }
}

export default FullWidthButton