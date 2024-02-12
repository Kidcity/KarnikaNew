import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Modal, Linking, } from 'react-native';
import Feather from 'react-native-vector-icons/Feather'
import colors from '../../utils/colors';
import { icons, setWidth } from '../../utils/variable';
import { styles } from './style';
import FontAwesome from 'react-native-vector-icons/FontAwesome'


export default class FloatingMenuIcon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [
                {
                    title: 'Whatsapp',
                    icon: <FontAwesome name='whatsapp' size={setWidth(6)} color={colors.white} />,
                    bgcolor: colors.green1,
                    onPress: () => this.linkToWhatsapp()
                },
                {
                    title: "Call Now",
                    icon: <Feather name='phone-call' size={setWidth(5)} color={colors.white} />,
                    bgcolor: colors.curiousBlue,
                    onPress: () => Linking.openURL(`tel:033-2655-8101`)
                },
                {
                    title: "Suggest Us",
                    icon: <Feather name='mail' size={setWidth(5)} color={colors.white} />,
                    bgcolor: colors.red,
                    onPress: () => Linking.openURL('mailto:info@karnikaindustries.com').then(() => { }).catch(() => alert("Something went wrong!"))
                }
            ],
            isOpenFloatingIcon: false
        };
    }

    linkToWhatsapp() {
        alert('coming soon')
        // Linking.openURL('https://wa.me/918240773294?text=Hello karnika')
    }

    render() {

        if (this.state.isOpenFloatingIcon) {
            return (
                // <TouchableWithoutFeedback onPress={() => this.setState({isOpenFloatingIcon: false})}>
                <Modal
                    transparent={true}
                    visible={true}
                    onRequestClose={() => {
                    }}
                    animationType="fade"
                >
                    <TouchableOpacity style={styles.itemsContainer} activeOpacity={1} onPress={() => this.setState({ isOpenFloatingIcon: false })}>
                        <View style={styles.itemsView}>
                            <TouchableOpacity style={styles.closeBtnView} onPress={() => this.setState({ isOpenFloatingIcon: false })}>
                                <Image source={icons.close_btn} style={styles.closeBtn} resizeMode="contain" />
                            </TouchableOpacity>
                            {
                                this.state.items.map((item, index) => {
                                    return (
                                        <TouchableOpacity key={index} style={styles.item} activeOpacity={0.8} onPress={item.onPress}>
                                            <Text style={[styles.itemText, { backgroundColor: item.bgcolor }]}>{item.title}</Text>
                                            <View style={[styles.iconView, { backgroundColor: item.bgcolor }]}>
                                                {
                                                    item.icon
                                                }
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    </TouchableOpacity>
                </Modal>
                // </TouchableWithoutFeedback>
            )
        }

        return (
            <TouchableOpacity style={styles.bottomIconContainer} onPress={() => this.setState({ isOpenFloatingIcon: true })}>
                <Feather name='phone-call' size={setWidth(6)} color={colors.white} />
            </TouchableOpacity>
        );
    }
}
