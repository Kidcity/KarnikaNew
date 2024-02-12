import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Dropdown as DropdownPackage } from 'react-native-element-dropdown';
import { setHeight } from '../../utils/variable';
import { styles } from './style';

export default class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFocus: false
        };
    }

    static getDerivedStateFromProps(props, state) {
        // console.log(props);
        return{

        }
    }

    renderItem = (item: any) => {
        return (
            <View style={[styles.itemStyle, this.props.dropdownItemStyle]}>
                <Text style={[styles.textItem, this.props.dropdownItemTextStyle]}>{item.label}</Text>
            </View>
        );
    };

    render() {
        
        return (
            <DropdownPackage
                style={[styles.dropdownContainer, this.props.container && this.props.container]}
                placeholderStyle={[styles.placeholderStyle, this.props.placeholderStyle]}
                selectedTextStyle={[styles.selectedTextStyle, this.props.selectedTextStyle]}
                //inputSearchStyle={inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={this.props.data}                
                search={this.props.isSearch ? true : false}
                maxHeight={this.props.dropdownListingHeight ? this.props.dropdownListingHeight : setHeight(30)}
                labelField="label"
                valueField="value"
                placeholder={this.props.placeholder ? this.props.placeholder : "Select Item"}
                searchPlaceholder="Search..."
                value={this.props.value}
                onFocus={() => this.setState({isFocus: true})}
                onBlur={() =>  this.setState({isFocus: false})}
                onChange={item => {
                    this.props.onChange(item.value);
                    this.setState({isFocus: false})
                }}
                // renderLeftIcon={() => (
                //     this.props.renderLeftIcon
                // )}
                renderItem={this.renderItem}
            />
        );
    }
}
