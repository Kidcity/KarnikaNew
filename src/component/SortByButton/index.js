import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './style';
import Feather from 'react-native-vector-icons/Feather'
import { setHeight, setWidth } from '../../utils/variable';
import colors from '../../utils/colors';

import RBSheet from "react-native-raw-bottom-sheet";
import { store } from '../../redux/store'
import { setProductFilterAction } from '../../redux/actions/commonAction';


export default class SortByButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: '0 Selected',
            options: [
                {
                    title: "Popularity"
                },
                {
                    title: "Price: High To Low"
                },
                {
                    title: "Price: Low To High"
                },
                {
                    title: "What's New"
                }
            ]
        };
        this.RBSheet = React.createRef()
    }

    onPress = () => {
        this.RBSheet.open()
    }
    // this.ActionSheet.show()

    onSelectSortOption = async (index) => {

        this.setState({
            selectedOption: index == 0 ? 'Popularity' : index == 1 ? 'High To Low' : index == 2 ? 'Low To High' : index == 3 ? "What's New" : index == 4 && 'Popularity',           
        })

        const param = {
            sortPrice: (index == 1) ? 2 : (index == 2) ? 1 : 0,
            popularity: (index == 0) ? 1 : 0,
            whatsNew: (index == 3) ? 1 : 0,
        }

        let filters = store.getState().commonReducer.filter
        filters = { ...filters, ...param }
        // console.log(filters);
        await store.dispatch(setProductFilterAction(filters))
        this.RBSheet.close()
        this.props.onSelectSortItem((index == 4) ? true : false)
    }

    render() {
        return (
            <>
                <TouchableOpacity style={styles.container} onPress={this.onPress}>
                    <View style={[styles.row, styles.alignItemsCenter, styles.justifyContentCenter]}>
                        <View>
                            <Text style={styles.sortbyText}>Sort By </Text>
                            {
                                (this.state.selectedOption != '') &&
                                <Text style={styles.optionText}>{this.state.selectedOption}</Text>
                            }
                        </View>
                        <Feather name='git-commit' size={setWidth(6)} color={colors.grey2} style={{ marginLeft: setWidth(2) }} />
                    </View>
                </TouchableOpacity>
                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    // height={setHeight(10)}
                    openDuration={250}
                    customStyles={{
                        container: {
                            height: setHeight(30),
                        },
                        wrapper: {
                            // backgroundColor: 'red'
                        },
                    }}
                >
                    {
                        this.state.options.map((item, index) =>
                            <TouchableOpacity style={styles.itemView} onPress={() => this.onSelectSortOption(index)} key={index}>
                                <Text style={styles.actionsheetTitle}>{item.title}</Text>
                            </TouchableOpacity>
                        )
                    }

                </RBSheet>
            </>
        );
    }
}
