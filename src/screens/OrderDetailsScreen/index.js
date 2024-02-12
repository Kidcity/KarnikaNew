import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, FlatList, Linking, PermissionsAndroid, Alert, Platform, Animated, BackHandler, NativeModules } from 'react-native';
import CustomHeader from '../../component/CustomHeader';
import colors from '../../utils/colors';
import { fonts, images, normalize, setWidth } from '../../utils/variable';
import { styles } from './style';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Feather from 'react-native-vector-icons/Feather'
import CustomButton from '../../component/CustomButton';
import AddressCard from '../../component/AddressCard'
import OrderDetailsService from '../../services/OrderDetailsService';
import { errorAlert, retryAlert } from '../../helper/ToastHelper';
import FullScreenLoader from '../../component/FullScreenLoader';
import moment from 'moment'
import Share from 'react-native-share';
import RNFetchBlob from 'react-native-blob-util'
import LoadingModal from '../../component/LoadingModal';
import { Easing } from 'react-native-reanimated';
import PDFViewerModal from '../../component/PDFViewerModal';
import OrderDetailsPriceBreakUp from '../../component/OrderDetailsPriceBreakUp';
import { setScreenActivity } from '../../helper/AppActivityTrackingHelper';
import AppHeader from '../../component/AppHeader';
import { connect } from 'react-redux';
import { commonStyle } from '../../helper/commonStyle';

const { DeviceInfoModule } = NativeModules

class OrderDetailsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderstatusArray: [],
            lastorderstatus: '',
            products: [],
            payment_breakup: null,
            shipping_address: {},
            showLoader: false,
            pdf_view_modal_heading: '',
            invoice_link: '',
            salesorder_link: '',
            pdf_link_to_view: '',
            pdf_title_for_share: '',
            delivery_tracking_no: '',
            openPdf: false,
            downloadModal: false,
            containerOpacity: new Animated.Value(0),
            is_ws_not: 0,
            user_id: ''
        };
    }

    static getDerivedStateFromProps(props, state) {
        return {
            is_ws_not: props.hasOwnProperty("is_ws_not") ? props.is_ws_not : 0,
            user_id: props.hasOwnProperty("user_id") ? props.user_id : ""
        }
    }

    renderOrderStatusBlock(item, index) {
        return (
            <View style={[styles.orderStatusblock, ((this.state.orderstatusArray.length - 1) == index) && { borderLeftWidth: setWidth(0) }]} key={index}>
                {
                    item.isActive ?
                        <Feather name='check-circle' size={setWidth(4.5)} color={colors.yellow2} style={styles.circleIconOutline} />
                        :
                        <View style={styles.circleOutline} />
                }
                <Text style={styles.orderStatusBlockHeading}>{item.title}</Text>
                <View style={styles.orderStatusBlockSubTextView}>
                    <EvilIcons name='clock' size={setWidth(4.5)} color={colors.grey1} />
                    <Text style={styles.orderStatusBlockText}> {moment(item.time).format('h:mm a, MMMM Do YYYY , dddd')}  </Text>
                </View>
                {/* <View style={{ paddingLeft: setWidth(10), marginTop: setWidth(1) }}>
                    <Text style={styles.orderStatusBlockText}>Tracking id - {item.tracking_id}  </Text>
                </View> */}
            </View>
        )
    }
    //8 : 30 Pm , 16 Aug 2021 , Saturday

    renderProductItems = ({ item, index }) => {

        const bgcolor = (item.orders_status_name == "Pending") ? styles.status_blue :
            (item.orders_status_name == "Return Rejected" || item.orders_status_name == "Return Requested") ? styles.status_red :
                styles.status_green

        return (
            <View style={styles.productCardView}>
                <View style={styles.row}>
                    <View style={styles.leftBlock}>
                        <Image source={{ uri: item.image }} resizeMode="cover" style={styles.productimage} />
                        <View style={[styles.orderstatusView, bgcolor]}>
                            <Text style={styles.orderstatusText}>{item.orders_status_name}</Text>
                        </View>
                    </View>
                    <View style={styles.rightBlock}>
                        <View style={[styles.row, { alignItems: 'center', justifyContent: 'space-between' }]}>
                            <Text style={[styles.subHeading, styles.textBold]}>{item.brand_name}</Text>
                            <TouchableOpacity onPress={() => {
                                this.props.navigation.navigate("ProductDetails", { product_id: item.id })
                            }}>
                                <Text style={styles.textBtnText}>View Product</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.row,]}>
                            <Text style={styles.subHeading}>Set Qty :</Text>
                            <Text style={[styles.text, styles.textBold, styles.darkText]}> {item.set_qty_pcs}</Text>
                        </View>
                        <View style={[styles.row, { alignItems: 'center' }]}>
                            <Text style={styles.subHeading}>Size : </Text>
                            <Text style={[styles.text, styles.textBold, styles.darkText]}>{item.size}</Text>
                        </View>
                        <View style={[styles.row, { alignItems: 'center' }]}>
                            <Text style={styles.subHeading}>Color : </Text>
                            <Text style={[styles.text, styles.textBold, styles.darkText]}>{item.color}</Text>
                        </View>
                        <View style={[styles.row, { alignItems: 'center', justifyContent: 'space-between' }]}>
                            <View style={styles.row}>
                                <Text style={styles.subHeading}>Price :</Text>
                                <Text style={[styles.text, styles.textBold, styles.darkText, commonStyle.bluredText]}> ₹ {item.price} / Piece</Text>
                            </View>
                            {
                                item.credit_note_link &&
                                <TouchableOpacity style={styles.creditNoteBtn} onPress={() => {
                                    this.setState({
                                        pdf_view_modal_heading: 'Credit Note'
                                    })
                                    this.getDownloadPermissionAndDownload("karnika_Credit_note.pdf", item.credit_note_link)
                                }} >
                                    <Text style={styles.creditNoteBtnText}>Credit Note</Text>
                                </TouchableOpacity>
                            }
                        </View>
                    </View>

                </View>
                {
                    (item.return_order_details) &&
                    <>
                        <View style={[styles.row, { alignItems: 'center', marginTop: setWidth(4) }]}>
                            <Text style={styles.subHeading}>Return Initiated On :</Text>
                            <Text style={[styles.text, styles.textBold, styles.redText]}> {moment(item.return_order_details.return_date).format("DD MMM YYYY")}</Text>
                        </View>
                        <View style={[styles.row, { alignItems: 'center', marginTop: setWidth(4) }]}>
                            <Text style={styles.subHeading}>Return Set Qty :</Text>
                            <Text style={[styles.text, styles.textBold, styles.redText]}> {item.return_order_details.return_order_qty} ( {parseInt(item.return_order_details.qty) * parseInt(item.return_order_details.return_order_qty)} Pcs ) </Text>
                        </View>
                        <View style={[styles.row, { alignItems: 'center', marginTop: setWidth(4) }]}>
                            <Text style={styles.subHeading}>Return Reference Id :</Text>
                            <Text style={[styles.text, styles.textBold, styles.redText]}> {item.return_order_details.return_reference_id}</Text>
                        </View>
                        <View style={[styles.row, { alignItems: 'center', marginTop: setWidth(4) }]}>
                            <Text style={styles.subHeading}>Return Reason :</Text>
                            <Text style={[styles.text, styles.textBold, styles.redText]}> {item.return_order_details.reason}</Text>
                        </View>
                    </>
                }
            </View>
        )
    }

    _shareDoc() {
        const options = {
            message: this.state.pdf_title_for_share,
            url: this.state.pdf_link_to_view
        }
        Share.open(options)
            .then((res) => {
                //console.log(res);
            })
            .catch((err) => {
                err && console.log(err);
            });
    }

    async _getOrderDetails() {
        const param = {
            order_id: this.props.route.params.order_id
        }
        this.setState({
            showLoader: true
        })
        await OrderDetailsService._getDetailsService(param).then(response => {


            this.setState({
                payment_breakup: response.payment_breakup,
                shipping_address: response.shipping_address,
                products: response.products,
                orderstatusArray: response.orderstatusarry,
                lastorderstatus: response.lastorderstatus,
                invoice_link: response.invoice_link,
                salesorder_link: response.salesorder_link,
                delivery_partner: response.delivery_partner,
                delivery_tracking_no: response.delivery_tracking_no,
                showLoader: false
            }, () => {
                this.visibleContent()
            })
        }, error => {
            this.setState({
                showLoader: false
            })
            if (error.message == "server_error") {
                retryAlert(() => this._getOrderDetails())
            } else {
                errorAlert("Error", error.message)
            }
        })
    }

    async _geReqDetails() {
        const param = {
            request_id: this.props.route.params.order_id
        }

        this.setState({
            showLoader: true
        })
        await OrderDetailsService._getReqDetailsService(param).then(response => {


            this.setState({
                payment_breakup: response.payment_breakup,
                shipping_address: response.shipping_address,
                products: response.products,
                orderstatusArray: response.orderstatusarry,
                lastorderstatus: response.lastorderstatus,
                invoice_link: response.invoice_link,
                salesorder_link: response.salesorder_link,
                delivery_partner: response.delivery_partner,
                delivery_tracking_no: response.delivery_tracking_no,
                showLoader: false
            }, () => {
                this.visibleContent()
            })
        }, error => {
            this.setState({
                showLoader: false
            })
            if (error.message == "server_error") {
                retryAlert(() => this._geReqDetails())
            } else {
                errorAlert("Error", error.message)
            }
        })
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
        return true;
    };

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );
        if (this.state.is_ws_not === 0) {
            this._geReqDetails()
        } else {
            this._getOrderDetails()
        }
    }

    componentWillUnmount() {
        this.backHandler.remove()
    }

    actualDownload = async (filename, link) => {
        this.setState({ downloadModal: true })
        const { dirs } = RNFetchBlob.fs;
        await RNFetchBlob.config({
            fileCache: true,
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                mediaScannable: true,
                title: `${filename}`,
                path: `${dirs.DownloadDir}/${filename}`,
            },
        }).fetch('GET', link, {})
            .then((res) => {
                this.setState({ pdf_link_to_view: link, downloadModal: false, openPdf: true, pdf_title_for_share: filename })
            })
            .catch((e) => {
                //console.log(e)
            });
    }

    getDownloadPermission = async () => {


        if (Platform.OS === 'android') {

            try {

                const isOS13 = await DeviceInfoModule.isAndroid13OrUp()

                if (isOS13) {
                    return true
                }

                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    return true
                } else {
                    Alert.alert('Permission Denied!', 'You need to give storage permission to download the file', [{ text: "Ok", onPress: () => Linking.openSettings() }]);
                    return false
                }
            } catch (err) {
                return false
            }
        } else {
            return true
        }
    }

    getDownloadPermissionAndDownload = async (filename, link) => {

        const permission = await this.getDownloadPermission()
        if (permission) {
            this.actualDownload(filename, link);
        }
    }

    visibleContent() {
        Animated.timing(
            this.state.containerOpacity,
            {
                toValue: 1,
                duration: 500,
                easing: Easing.linear(),
                useNativeDriver: false
            }
        ).start()
    }

    render() {
        return (
            <View style={[styles.container,]}>
                {/* <CustomHeader
                    heading="ORDER DETAILS"
                    headingStyle={{
                        textAlign: "center"
                    }}
                    showBackButton={true}
                    onPressBack={this.backAction}
                    containerStyle={{
                        borderBottomColor: colors.grey1,
                        borderBottomWidth: setWidth(0.3),
                    }}
                /> */}
                <AppHeader
                    showBackBtn
                    showSearch
                    showWishList
                    showLogo
                    navigation={this.props.navigation}
                />
                <Animated.View style={[{ flex: 1, opacity: this.state.containerOpacity }]}>
                    <ScrollView contentContainerStyle={styles.content}>
                        <View style={styles.headingView}>
                            <Text style={[styles.heading, { fontFamily: fonts.fontRegular }]}>Order Items</Text>
                            <View style={styles.bottomBorderView} />
                        </View>
                        <View>
                            <FlatList
                                data={this.state.products}
                                renderItem={this.renderProductItems}
                                keyExtractor={(item, index) => index}
                                style={{
                                    marginTop: setWidth(1.6),
                                }}
                                ItemSeparatorComponent={() => <View style={{ marginTop: normalize(15) }} />}
                            />
                        </View>

                        <View style={[styles.headingView, { marginTop: setWidth(8), marginBottom: setWidth(9) }]}>
                            <Text style={styles.heading}>Order Status</Text>
                            <View style={[styles.bottomBorderView, { borderBottomColor: colors.yellow2 }]} />
                        </View>
                        {
                            this.state.orderstatusArray.map((item, index) => {
                                return this.renderOrderStatusBlock(item, index)
                            })
                        }

                        {
                            (this.state.is_ws_not === 1 && this.state.delivery_partner != '') &&
                            <>
                                <View style={[styles.headingView, { marginTop: setWidth(-1) }]}>
                                    <Text style={styles.heading}>Delivery Partner Details</Text>
                                </View>
                                <View style={[styles.delivery_partner_view]}>
                                    <View style={[styles.row, { marginTop: setWidth(6), justifyContent: 'space-between' }]}>
                                        <Text style={[styles.orderStatusBlockText, { marginLeft: 0 }]}>Delivery Partner</Text>
                                        <Text style={styles.orderStatusBlockText}> {this.state.delivery_partner}</Text>
                                    </View>
                                    <View style={[styles.row, { marginTop: setWidth(3), justifyContent: 'space-between' }]}>
                                        <Text style={[styles.orderStatusBlockText, { marginLeft: 0 }]}>Delivery Tracking Number </Text>
                                        <Text style={styles.orderStatusBlockText}> {this.state.delivery_tracking_no}</Text>
                                    </View>
                                </View>
                            </>
                        }
                        {/*
                            <>

                                <View style={[styles.headingView,]}>
                                    <Text style={styles.heading}>Total Price Details</Text>
                                </View>
                                <OrderDetailsPriceBreakUp
                                    payment_breakup={this.state.payment_breakup}
                                />

                                {
                                    this.state.invoice_link !== '' &&
                                    <CustomButton
                                        container={styles.buttonContainer}
                                        label="INVOICE"
                                        labelStyle={{ color: colors.lightRed, marginLeft: setWidth(2) }}
                                        rightIcon={<Feather name='download' size={setWidth(4)} color={colors.lightRed} />}
                                        onPress={() => {
                                            this.setState({
                                                pdf_view_modal_heading: 'Invoice'
                                            })
                                            this.getDownloadPermissionAndDownload("karnika_Invoice.pdf", this.state.invoice_link)
                                        }}
                                    />
                                }
                                {
                                    this.state.salesorder_link !== '' &&
                                    <CustomButton
                                        container={styles.buttonContainer}
                                        label="SALES ORDER"
                                        labelStyle={{ color: colors.lightRed, marginLeft: setWidth(2) }}
                                        rightIcon={<Feather name='download' size={setWidth(4)} color={colors.lightRed} />}
                                        onPress={() => {
                                            this.setState({
                                                pdf_view_modal_heading: 'Sales Order'
                                            })
                                            this.getDownloadPermissionAndDownload("karnika_SalesOrder.pdf", this.state.salesorder_link)
                                        }}
                                    />
                                }

                                <CustomButton
                                    container={[styles.buttonContainer, { borderColor: colors.primaryyellow }]}
                                    label="CONTACT KID CITY"
                                    labelStyle={{ color: colors.primaryyellow, marginLeft: setWidth(2) }}
                                    rightIcon={<Feather name='phone-call' size={setWidth(4.5)} color={colors.primaryyellow} />}
                                    onPress={() => Linking.openURL(`tel:+91 8240773294`)}
                                />

                            </>
                            */ }
                        <View style={styles.shippingAddressView}>
                            <View style={[styles.row, { alignItems: 'center' }]}>
                                <EvilIcons name='location' size={setWidth(6)} color={colors.dark_charcoal} />
                                <Text style={styles.shippingAddressHeading}>Shipping Address</Text>
                            </View>

                            <AddressCard
                                item={this.state.shipping_address}
                                containerStyle={{
                                    marginTop: setWidth(2)
                                }}
                            />

                        </View>
                    </ScrollView>
                </Animated.View>
                {
                    this.state.showLoader &&
                    <FullScreenLoader />
                }
                {
                    this.state.openPdf &&
                    <PDFViewerModal
                        heading={this.state.pdf_view_modal_heading}
                        url={this.state.pdf_link_to_view}
                        onPressBack={() => this.setState({ openPdf: false })}
                        onShare={() => this._shareDoc()}
                    />
                }
                {
                    this.state.downloadModal &&
                    <LoadingModal
                        title="Downloading..."
                        title2="Please Wait"
                    />
                }
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        is_ws_not: state.loginReducer.data.is_ws_not,
        user_id: state.loginReducer.data.cust_manu_id,
    }
}

const mapDispatchToProps = dispatch => ({
})

const connectComponent = connect(mapStateToProps, mapDispatchToProps)
export default connectComponent(OrderDetailsScreen)