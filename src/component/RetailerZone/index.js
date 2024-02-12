import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../utils/colors';
import { images, setWidth } from '../../utils/variable';
import { styles } from './style';

export default class RetailerZone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: null,
            counter: 0,
            containerStyle: {}
        };
    }

    static getDerivedStateFromProps(props, state){
        return{
            containerStyle: props.containerStyle ? props.containerStyle : {}
        }
    }

    componentDidMount() {
        let timer = setInterval(this.tick, 1000);
        this.setState({ timer })
    }

    componentWillUnmount() {
        clearInterval(this.state.timer)
    }

    tick = () => {
        this.setState({
            counter: this.state.counter + 1
        });
    }

    render() {
        return (
            <View style={[styles.retailerZoneContainer,this.state.containerStyle]}>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={ this.state.counter % 2 == 0 ? colors.retailerHeadingGradient1 : colors.retailerHeadingGradient2 } style={styles.retailerZoneHeadingView}>
                    <View style={[styles.row, styles.alignCenter, styles.justifyCenter]}>
                        <Text style={styles.retailerZoneHeading}>RETAILER </Text>
                        <Text style={[styles.retailerZoneHeading, { color: colors.white }]}>ZONE</Text>
                    </View>
                </LinearGradient>
                <TouchableOpacity style={[styles.retailerZoneImageView, { marginTop: setWidth(6) }]} onPress={() => {
                    //this.props.navigation.navigate("MyOnlineShop")
                }}>
                    <FastImage
                        style={styles.retailerZoneImage}
                        source={images.online_shop}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                    {/* <Image source={images.online_shop} resizeMode="contain" style={styles.retailerZoneImage} /> */}
                </TouchableOpacity>
                <TouchableOpacity style={[styles.retailerZoneImageView, { marginTop: setWidth(2) }]}>
                    <FastImage
                        style={styles.retailerZoneImage}
                        source={images.directory_service}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                    {/* <Image source={images.directory_service} resizeMode="contain" style={styles.retailerZoneImage} /> */}
                </TouchableOpacity>
                <TouchableOpacity style={[styles.retailerZoneImageView, { marginTop: setWidth(2) }]} onPress={() => {
                    //this.props.navigation.navigate("PurchaseHistory")
                }
                }>
                    <FastImage
                        style={styles.retailerZoneImage}
                        source={images.purchase_history}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                    {/* <Image source={images.purchase_history} resizeMode="contain" style={styles.retailerZoneImage} /> */}
                </TouchableOpacity>
            </View>
        );
    }
}
