import React, { Component } from 'react'
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native'
import { styles } from './style'
import { normalize, setWidth } from '../../utils/variable'
import NearByWholeSalerCard from '../NearByWholeSalerCard'
import Entypo from 'react-native-vector-icons/Entypo'
import colors from '../../utils/colors'
import { commonStyle } from '../../helper/commonStyle'

export class NearByWholeSalerModal extends Component {

    renderItem = ({ item, index }) => {
        return (
            <NearByWholeSalerCard item={item} showEditButton />
        )
    }
    render() {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={true}
            >
                <View style={styles.container}>
                    <View style={styles.content}>
                        <View style={[commonStyle.row, commonStyle.justifyContentBetween, commonStyle.alignItemsCenter]}>
                            <View style={[commonStyle.row, commonStyle.alignItemsCenter]}>
                                <Entypo name='location-pin' size={normalize(25)} color={colors.black} />
                                <Text style={styles.heading}>Your nearby wholesalers </Text>
                            </View>
                            <TouchableOpacity style={styles.crossBtn} onPress={this.props.onClose}>
                                <Entypo name='circle-with-cross' size={normalize(20)} color={colors.black} />
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={this.props.data}
                            renderItem={this.renderItem}
                            keyExtractor={(item, index) => index}
                            style={{ marginTop: setWidth(2) }}
                            ItemSeparatorComponent={() => <View style={{ marginTop: setWidth(2) }} />}
                            contentContainerStyle={{
                                flexGrow: 1,
                                paddingBottom: normalize(20)
                            }}
                        />
                    </View>
                </View>
            </Modal>
        )
    }
}

export default NearByWholeSalerModal
