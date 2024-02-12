import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { styles } from './style';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { setHeight, setWidth } from '../../utils/variable';
import colors from '../../utils/colors';
import IncrementDecrementButton from '../IncrementDecrementButton';
import Checkbox from '../Checkbox';
import Feather from 'react-native-vector-icons/Feather'
import RBSheet from 'react-native-raw-bottom-sheet';

export default class CollapsableSKUButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isExpand: false
        };
    }

    render() {
        const item = this.props.item
        const index = this.props.index
        
        return (
            <View style={styles.card}>
                <TouchableOpacity style={styles.header} onPress={() => this.setState({ isExpand: !this.state.isExpand })}>

                    {
                        !this.state.isExpand ?
                            <>
                                <View style={styles.cardHeaderImageContainer}>
                                    <Image source={{ uri: item.image }} style={styles.cardHeaderImage} resizeMode="stretch" />
                                </View>
                                <View style={{ flex: 1, paddingHorizontal: setWidth(2) }}>
                                    <Text style={styles.cardHeading}>{item.brand_name}</Text>
                                    <Text style={[styles.cardSubHeading, styles.mt_1]}>Size: {item.size}</Text>
                                    <Text style={[styles.cardSubHeading, styles.mt_1]}>Vendor Style No.: {item.vendor_style_no}</Text>
                                </View>
                            </>
                            :
                            <View style={{ paddingVertical: setWidth(3) }}>
                                <Text style={styles.cardHeading}>Showing Item {index + 1}</Text>
                            </View>
                    }
                    <SimpleLineIcons name='arrow-down' size={setWidth(4)} color={colors.dark_charcoal} />
                </TouchableOpacity>
                {
                    this.state.isExpand &&

                    <View style={[styles.collapsableContainer]}>

                        <View style={[styles.row]}>
                            <View style={[styles.cardHeaderImageContainer, {}]}>
                                <Image source={{ uri: item.image }} style={styles.cardHeaderImage} resizeMode="stretch" />
                            </View>
                            <View style={{ flex: 1, paddingHorizontal: setWidth(2) }}>
                                <Text style={styles.cardHeading}>{item.brand_name}</Text>
                                <Text style={[styles.cardSubHeading, styles.mt_1]}>{item.size}</Text>
                                <Text style={[styles.cardSubHeading, styles.mt_1]}>Vendor Style No.: {item.vendor_style_no}</Text>
                            </View>
                            <View style={styles.incrementBtnContainer}>
                                <Text style={[styles.text, { fontSize: setWidth(3) }]}>Quantity (sets)</Text>
                                <IncrementDecrementButton
                                    label={item.return_set_qty}
                                    container={{
                                        flex: 1,
                                        marginTop: setWidth(1)
                                    }}
                                    onIncrease={() => this.props.onPressIncrease()}
                                    onDecrease={() => this.props.onPressDecrease()}
                                />
                            </View>
                        </View>

                        <Text style={[styles.cardHeading, styles.textBold, { color: colors.grey2, marginTop: setHeight(4) }]}>Select Reason For Return Below</Text>
                        {
                            item.return_reason.map((item, index) => {
                                return (
                                    <View style={styles.reasonCard} key={index}>
                                        <Text style={[styles.text, { color: colors.grey2 }]}>{item.title}</Text>
                                        <Checkbox
                                            isChecked={item.isChecked}
                                            onPressCheckBox={() => this.props.onChooseReason(item.title)}
                                        />
                                    </View>
                                )
                            })
                        }

                        <TouchableOpacity style={styles.uploadBtn} onPress={() => this.RBSheet.open()}>
                            <Feather name='upload' size={setWidth(6)} color={colors.white} />
                            <Text style={[styles.heading, { marginLeft: setWidth(3) }]}>Uploads Photos</Text>
                        </TouchableOpacity>

                        {
                            item.return_images.length > 0 &&

                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={[styles.reasonImageView]}>
                                {
                                    item.return_images.map((item, index) =>
                                        <Image
                                            source={{ uri: item.uri }}
                                            key={index}
                                            style={styles.reasonImage}
                                            resizeMode="contain"
                                        />
                                    )
                                }
                            </ScrollView>
                        }

                    </View>
                }
                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    openDuration={250}
                    customStyles={{
                        container: {
                            height: Platform.OS === 'ios' ? setHeight(25) : setHeight(20),
                        },
                        wrapper: {
                            // backgroundColor: 'red'
                        },
                    }}
                >
                    <TouchableOpacity style={styles.itemView} onPress={() => {
                        this.RBSheet.close()
                        this.props.onPressGallery()
                    }}>
                        <Text style={styles.actionsheetTitle}>Launch Gallery</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.itemView} onPress={() => {
                        this.RBSheet.close()
                        this.props.onPressCamera()
                    }}>
                        <Text style={styles.actionsheetTitle}>Launch Camera</Text>
                    </TouchableOpacity>
                </RBSheet>
            </View>
        );
    }
}
