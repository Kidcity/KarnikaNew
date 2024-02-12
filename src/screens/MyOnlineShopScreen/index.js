import React, { Component } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import CustomHeader from '../../component/CustomHeader';
import { images, setWidth } from '../../utils/variable';
import CustomButton from '../../component/CustomButton'
import { styles } from './style';
import colors from '../../utils/colors';
import Feather from 'react-native-vector-icons/Feather'

export default class MyOnlineShopScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    id: 1,
                    date: '14/03/21',
                    image: images.temp
                },
                {
                    id: 2,
                    date: '14/03/21',
                    image: images.temp
                },
                {
                    id: 3,
                    date: '14/03/21',
                    image: images.temp
                },
                {
                    id: 4,
                    date: '14/03/21',
                    image: images.temp
                },
               
            ]
        };
    }

    renderItem = ({ item, index }) => {
        return (
            <View style={styles.item}>
                <Image source={item.image} resizeMode="cover" style={styles.itemImage} />
                <Text style={styles.itemText1}>Uploaded On</Text>
                <Text style={styles.itemText2}>{item.date}</Text>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <CustomHeader
                    heading="MY ONLINE SHOP"
                    headingStyle={{
                        textAlign: 'center'
                    }}
                    onPressBack={() => {this.props.navigation.goBack()}}
                />
                <View style={styles.content}>
                    <FlatList
                        data={this.state.data}
                        renderItem={this.renderItem}                       
                        numColumns={3}
                        columnWrapperStyle={{
                            justifyContent: 'space-between'
                        }}
                        ItemSeparatorComponent={() => <View style={{ marginTop: setWidth(2.5) }} />}
                        style={{
                            marginTop: setWidth(5),
                        }}
                        contentContainerStyle={{
                            paddingBottom: setWidth(5)
                        }}
                    />

                    <View style={styles.footerBtnView}>
                        <CustomButton
                            container={{
                                backgroundColor: colors.lightRed,
                                justifyContent:'center'
                            }}
                            label="UPLOAD PHOTOS"
                            labelStyle={{ color: colors.white }}
                            rightIcon={
                                <Feather name='camera' size={setWidth(5)} color={colors.white} style={{marginRight: setWidth(2)}} />
                            }
                            leftIcon={false}
                            //onPress={() => this.props.navigation.navigate("RegisterScreen")}
                        />
                    </View>
                </View>
            </View>
        );
    }
}
