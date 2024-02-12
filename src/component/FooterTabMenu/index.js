import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BottomTabHelper from '../../helper/BottomTabHelper';
import colors from '../../utils/colors';
import { icons, setWidth } from '../../utils/variable';
import { styles } from './style';
import Feather from 'react-native-vector-icons/Feather'
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { commonStyle } from '../../helper/commonStyle';

class FooterTabMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: [
                {
                    title: "Home",
                    onPress: () => { this.props.navigation.navigate("Home") }
                },
                {
                    title: "Cart",
                    onPress: () => { this.props.navigation.navigate("Cart") }
                },
                {
                    title: "Filter",
                    onPress: () => { this.props.navigation.navigate("Filter") }
                },
                {
                    title: "Profile",
                    onPress: () => { this.props.navigation.navigate("Profile") }
                },
                {
                    title: "Settings",
                    onPress: () => { this.props.navigation.navigate("Settings") }
                }
            ],
            total_cart_items: 0,
            is_ws_not: 0
        };
    }

    static getDerivedStateFromProps(props, state) {        
        return {
            total_cart_items: (props.total_cart_items) ? props.total_cart_items : 0,
            is_ws_not: props.hasOwnProperty("is_ws_not") ? props.is_ws_not : 0
        }
    }

    componentDidMount(){
        // if(this.state.is_ws_not == 0){
        //     const menu = this.state.menu
        //     menu.splice(1,1)
        //     this.setState({
        //         menu
        //     })
        // }
    }

    //this.props.focused ? colors.activeTabGradient :
    render() {
        const current_route_name = this.props.route_name
        return (
            <View style={styles.container}>

                {
                    this.state.menu.map((item, index) =>
                    
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={(current_route_name === item.title) ? colors.activeTabGradient : colors.inactiveTabGradient} style={[styles.menuView, (current_route_name == item.title) && { borderWidth: 0, }]} key={index}>
                            <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={item.onPress}>
                                {
                                    (item.title === 'Cart' && this.state.total_cart_items > 0) &&
                                    <View style={{ position: 'absolute', top: 0, right: 10, backgroundColor: colors.red, borderRadius: setWidth(6), zIndex: 99, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10 }}>
                                        <Text style={{ color: colors.white, textAlign: 'center' }} adjustsFontSizeToFit numberOfLines={1}>{this.state.total_cart_items}</Text>
                                    </View>
                                }
                                {
                                    (item.title !== "Notification" && item.title !== "Menu") ?
                                        <>
                                            <Feather name={BottomTabHelper.setTabIcon(item.title)} style={styles.icon} size={setWidth(6)} color={(current_route_name === item.title) ?  colors.white : colors.dark_charcoal} />
                                            <Text style={[styles.title,(current_route_name === item.title) && commonStyle.textWhite ]} adjustsFontSizeToFit numberOfLines={1}>{item.title}</Text>
                                        </>
                                        :
                                        item.title == "Menu" ?
                                            <>
                                                <Ionicons name='ios-menu-outline' size={setWidth(8)} color={(current_route_name === item.title) ? commonStyle.textWhite : colors.dark_charcoal} />
                                                <Text style={[styles.title,(current_route_name === item.title) && commonStyle.textWhite ]} adjustsFontSizeToFit numberOfLines={1}>{item.title}</Text>
                                            </>
                                            :
                                            <>
                                                <Image source={icons.bell} style={[{ width: setWidth(6.5), height: setWidth(6.5) }, (current_route_name === item.title) && {tintColor: colors.white} ]} />
                                                <Text style={[styles.title,(current_route_name === item.title) && commonStyle.textWhite ]} adjustsFontSizeToFit numberOfLines={1}>{item.title}</Text>
                                            </>
                                }

                            </TouchableOpacity>
                        </LinearGradient>
                    )
                }
            </View >
        );
    }
}
const mapStateToProps = state => {
    return {
        total_cart_items: state.cartReducer.total_cart_items,
        is_ws_not: state.loginReducer.data.is_ws_not
    }
}

const mapDispatchToProps = dispatch => ({

})

const connectComponent = connect(mapStateToProps, mapDispatchToProps)
export default connectComponent(FooterTabMenu)
