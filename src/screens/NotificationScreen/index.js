import React, { Component } from 'react';
import { View, Text, FlatList, Platform, Linking, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import CustomHeader from '../../component/CustomHeader';
import NotificationServices from '../../services/NotificationServices';
import FastImageComponent from '../../component/FastImageComponent'
import { styles } from './style';
import FastImage from 'react-native-fast-image';
import moment from 'moment'
import { setHeight, setWidth } from '../../utils/variable';
import { clearProductListData } from '../../redux/actions/productListAction';
import { clearProductFilterAction, setProductFilterAction } from '../../redux/actions/commonAction';
import { setScreenActivity } from '../../helper/AppActivityTrackingHelper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { errorAlert, retryAlert } from '../../helper/ToastHelper';
import FooterTabMenu from '../../component/FooterTabMenu';
import AppHeader from '../../component/AppHeader';


class NotificationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications: [],
            total_page: 0,
            user_id: '',
            page: 1,
            refreshing: false,
            onScrollLoading: false
        };
        this.onEndReachedCalledDuringMomentum = true;
    }

    static getDerivedStateFromProps(props, state) {
        return {
            user_id: props.user_id ?? "",
            notifications: (props.notifications && props.notifications.length > 0) ? props.notifications : [],
            total_page: props.total_page ?? 0
        }
    }

    onPressNotification = (data) => {

        const param = {
            retailer_id: this.state.user_id,
            notification_id: data.id
        }

        NotificationServices._changeStatusNotificationService(param).then(response => {
            if (data.link) {
                Linking.openURL(data.link)
            }
        }, error => {
            if (error.message == "server_error") {
                retryAlert(() => this.onPressNotification())
            } else {
                errorAlert("Error", error.message)
            }
        })
    }

    renderItem = ({ item, index }) => {

        const time = moment(item.time).format("h:mm a")
        const date = moment(item.time).format("DD-MM-YY")
        const isRead = item.is_read

        return (
            <TouchableOpacity style={[styles.card]} onPress={() => this.onPressNotification(item)}>
                <FastImageComponent
                    source={{ uri: item.image }}
                    style={styles.cardImage}
                    resizeMode={FastImage.resizeMode.contain}
                />
                <View style={styles.cardContent}>
                    <Text style={styles.cardtitle}>{item.title}</Text>
                    <Text style={[styles.cardbody, !isRead && styles.textBold]}>{item.body}</Text>
                </View>
                <View style={styles.timeView}>
                    <View>
                        <Text style={styles.time}>{time}</Text>
                        <Text style={styles.time}>{date}</Text>
                    </View>
                    {
                        !isRead &&
                        <View style={styles.dotView} />
                    }
                </View>
            </TouchableOpacity>
        )
    }

    fetchNotifications = () => {

        const param = {
            retailer_id: this.state.user_id,
            page: this.state.page
        }

        if (this.state.page === 1) {
            this.setState({
                refreshing: true
            })
        }

        NotificationServices._getNotificationService(param).then(response => {
            this.setState({
                onScrollLoading: false,
                refreshing: false
            })
        }, error => {
            this.setState({
                onScrollLoading: false,
                refreshing: false
            })
        })
    }

    onEndReached = ({ distanceFromEnd }) => {

        if (this.state.page === this.state.total_page) {
            return
        }

        this.setState({
            page: this.state.page + 1,
            onScrollLoading: true
        }, () => {

            this.fetchNotifications()
        })

    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );
        this.willFocusSubscription = this.props.navigation.addListener(
            'focus',
            (e) => {
                this.fetchNotifications()
            }
        );
    }

    componentWillUnmount() {
        this.willFocusSubscription()
        this.backHandler.remove()
    }

    async _navigateToProductList(searchText = '') {

        await this.props.clearProductListData()
        await this.props.clearProductFilterAction()

        let param = this.props.filter
        param = {
            ...param,
            searchValue: searchText
        }
        await this.props.setProductFilterAction(param)
        this.props.navigation.navigate("ProductListing")
    }

    backAction = () => {
        setScreenActivity({ action_type: "going_back", action_id: '' })
        if (!this.props.navigation.canGoBack()) {
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            })
        } else {
            this.props.navigation.goBack();
        }
        return true
    };

    render() {
        return (
            <View style={styles.container}>
                {/* <CustomHeader
                    heading="NOTIFICATIONS"
                    headingStyle={{
                        textAlign: 'center'
                    }}
                    navigation={this.props.navigation}
                    showMenu={false}
                    showingOneIcon={true}
                    showSearchIcon={true}
                    onPressBack={() => {
                        this.backAction()
                    }}
                    onSearch={(searchText) => {
                        this._navigateToProductList(searchText)
                    }}
                /> */}
                <AppHeader
                    showMenu
                    showSearch
                    showWishList
                    showLogo
                    navigation={this.props.navigation}
                />

                <View style={styles.content}>
                    <FlatList
                        data={this.state.notifications}
                        renderItem={this.renderItem}
                        contentContainerStyle={{
                            flexGrow: 1,
                            paddingBottom: Platform.OS === 'ios' ? setWidth(7) : setWidth(5)
                        }}
                        keyExtractor={(item, index) => index}
                        refreshing={this.state.refreshing}
                        onRefresh={() => {
                            this.setState({
                                page: 1,
                                refreshing: true
                            }, () => this.fetchNotifications())
                        }}
                        onEndReachedThreshold={0.1}
                        onEndReached={this.onEndReached}
                        ListEmptyComponent={() => <View>
                            <Text style={styles.listEmptyComponentText}>No Data Found</Text>
                        </View>}
                        ListFooterComponent={() => <View style={{ paddingVertical: setHeight(2) }}>
                            {
                                this.state.notifications.length != 0 &&

                                <Text style={styles.listFooterComponentText}>
                                    {
                                        this.state.onScrollLoading ? "Loading..." : "No More Data"
                                    }
                                </Text>
                            }
                        </View>}
                    />
                </View>
                <FooterTabMenu
                    focused={true}
                    route_name="Notification"
                    navigation={this.props.navigation}
                />
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        user_id: state.loginReducer.data.cust_manu_id,
        notifications: state.notificationReducer.notifications,
        total_page: state.notificationReducer.total_page,
    }
}

const mapDispatchToProps = dispatch => ({
    clearProductListData: () => dispatch(clearProductListData()),
    clearProductFilterAction: () => dispatch(clearProductFilterAction()),
    setProductFilterAction: (data) => dispatch(setProductFilterAction(data))

})

const connectComponent = connect(mapStateToProps, mapDispatchToProps)
export default connectComponent(NotificationScreen)