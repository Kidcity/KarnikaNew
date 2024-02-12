import React, { Component } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, FlatList, Platform, BackHandler } from 'react-native';
import CustomHeader from '../../component/CustomHeader';
import colors from '../../utils/colors';
import { images, setHeight, setWidth } from '../../utils/variable';
import { styles } from './style';
import Feather from 'react-native-vector-icons/Feather'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FullScreenLoader from '../../component/FullScreenLoader';
import ReturnOrderService from '../../services/ReturnOrderService';
import { errorAlert, retryAlert, successToast } from '../../helper/ToastHelper';
import moment from 'moment';
import CollapsableSKUButton from '../../component/CollapsableSKUButton';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { connect } from 'react-redux';
import { setScreenActivity } from '../../helper/AppActivityTrackingHelper';

class ReturnOrderScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderstatusArray: [],
            lastorderstatus: '',
            products: [],
        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
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
            </View>
        )
    }

    renderProductItems = ({ item, index }) => {
        //console.log(item);

        const bgcolor = (item.orders_status_name == "Pending") ? styles.status_blue :
            (item.orders_status_name == "Return Rejected" || item.orders_status_name == "Return Requested") ? styles.status_red :
                styles.status_green

        return (
            <View style={styles.productCardView}>
                <View style={styles.leftBlock}>
                    <Image source={{ uri: item.image }} resizeMode="cover" style={styles.productimage} />
                    <View style={[styles.orderstatusView, bgcolor]}>
                        <Text style={styles.orderstatusText}>{item.orders_status_name}</Text>
                    </View>
                </View>
                <View style={styles.rightBlock}>
                    <View style={[styles.row, { alignItems: 'center', justifyContent: 'space-between' }]}>
                        <Text style={[styles.subHeading, styles.textBold]}>{item.brand_name}</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("ProductDetails", { product_id: item.id })}>
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
                            <Text style={[styles.text, styles.textBold, styles.darkText]}> ₹ {item.price} / Piece</Text>
                        </View>
                        {/* <TouchableOpacity>
                            <Text style={styles.textBtnText}>Share This Product</Text>
                        </TouchableOpacity> */}
                    </View>
                </View>
            </View>
        )
    }

    renderSKUItem = ({ item, index }) => {
        return (
            <CollapsableSKUButton
                item={item}
                index={index}
                onChooseReason={(reason) => this._onPressReason(reason, index)}
                onPressCamera={() => this._openCamera(index)}
                onPressGallery={() => this._openImageLibrary(index)}
                onPressIncrease={() => this.onPressIncrease(index)}
                onPressDecrease={() => this.onPressDecrease(index)}
            />
        )
    }

    onPressIncrease(index) {
        const products = this.state.products
        products[index].return_set_qty = parseInt(products[index].return_set_qty) + 1
        if (products[index].return_set_qty > products[index].ordered_qty) {
            errorAlert("Sorry", "Your ordered set quantity is " + products[index].ordered_qty + ".\nYou cannot return more than your ordered set quantity.")
            products[index].return_set_qty = parseInt(products[index].return_set_qty) - 1
            return
        }
        this.setState({
            products
        })
    }

    onPressDecrease(index) {
        const products = this.state.products
        products[index].return_set_qty = parseInt(products[index].return_set_qty) - 1
        if (products[index].return_set_qty < 0) {
            products[index].return_set_qty = parseInt(products[index].return_set_qty) + 1
            return
        }
        this.setState({
            products
        })
    }

    _openImageLibrary(index) {
        const options = {
            mediaType: 'photo',
            includeBase64: true,
            selectionLimit: 0
        }

        setTimeout(() => {
            launchImageLibrary(options, (response) => {

                if (!response.didCancel) {
                    let images = []
                    response.assets.map((item, idx) => {
                        images.push({
                            uri: item.uri,
                            // type: "image/jpg",
                            type: item.type,
                            name: item.fileName
                        })
                    })
                    const products = this.state.products
                    products[index].return_images = images
                    this.setState({
                        products
                    })
                }
            })
        }, 200);

    }

    _openCamera(index) {
        const options = {
            mediaType: 'photo',
            includeBase64: true,
            selectionLimit: 0
        }
        setTimeout(() => {
            launchCamera(options, (response) => {

                if (!response.didCancel && !response.errorCode) {
                    let images = []
                    response.assets.map((item, idx) => {
                        images.push({
                            uri: item.uri,
                            type: item.type,
                            name: item.fileName
                        })
                    })
                    const products = this.state.products
                    products[index].return_images = images
                    this.setState({
                        products
                    })
                }
            })
        }, 200);

    }

    _onPressReason(reason, index) {
        const products = this.state.products

        products[index].return_reason.map((item, idx) => {
            item.isChecked = false
            if (item.title == reason) {
                item.isChecked = true
            }
        })
        this.setState({
            products
        })
    }

    async initiateReturn() {

        const products = this.state.products

        let return_data = []
        products.map((item, index) => {

            if (item.return_set_qty > 0) {

                item.return_images.map((x, d) => {
                    // console.log(x);
                })

                let reason = ''
                item.return_reason.filter((item, index) => {
                    if (item.isChecked === true) {
                        reason = item.title
                    }
                })

                if (reason == '') {
                    errorAlert("Sorry", "Please select a reason to return.")
                    return
                }

                if (item.return_images.length == 0) {
                    errorAlert("Sorry", "Please choose images for verification.")
                    return
                }

                const image_arry = []
                item.return_images.map((itm, idx) => {
                    image_arry.push({
                        name: itm.name
                    })
                })

                return_data.push({
                    psg_id: item.product_sizgroup_id,
                    reason: reason,
                    qty: item.set_qty,
                    return_order_qty: item.return_set_qty,
                    image: image_arry
                })
            }
        })

        if (return_data.length > 0) {

            let formdata = new FormData()
            let images = []
            formdata.append('retailer_id', this.props.loginReducer.data.cust_manu_id);
            formdata.append('order_id', this.props.route.params.order_id);
            formdata.append('return_data', JSON.stringify(return_data));
            products.map(async (item, index) => {
                if (item.return_set_qty > 0) {
                    item.return_images.map(async (itm, idx) => {
                        formdata.append("image[]", itm)
                    })
                }
            })

            this.setState({
                showLoader: true
            })

            await ReturnOrderService._initiateReturnService(formdata).then(response => {
                // console.log(response);
                if (response.success === 200) {
                    successToast("Success", "Return requested.")
                    setScreenActivity({ action_type: "going_back", action_id: '' })
                    this.props.navigation.goBack();
                }
                this.setState({
                    showLoader: false
                })
            }, error => {
                this.setState({
                    showLoader: false
                })
                if (error.message == "server_error") {
                    retryAlert(() => this.initiateReturn())
                } else {
                    errorAlert("Error", error.message)
                }
            })
        }
        // formdata.append('retailer_id', this.props.loginReducer.data.cust_manu_id);
        // formdata.append('retailer_id', this.props.loginReducer.data.cust_manu_id);
    }

    async _getOrderDetails() {
        const param = {
            order_id: this.props.route.params.order_id
        }
        this.setState({
            showLoader: true
        })
        await ReturnOrderService._getDetailsService(param).then(response => {

            this.setState({
                products: response.products,
                orderstatusArray: response.orderstatus,
                lastorderstatus: response.lastorderstatus,
                showLoader: false
            }, () => {
                //this.visibleContent()
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

    componentDidMount() {
        this._getOrderDetails()
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        setScreenActivity({ action_type: "going_back", action_id: '', city_id: "" })
        this.props.navigation.goBack();
        return true;
    }

    render() {
        return (
            <View style={styles.container}>
                <CustomHeader
                    heading="RETURN ORDER DETAILS"
                    headingStyle={{
                        textAlign: "center"
                    }}
                    onPressBack={() => this.handleBackButtonClick()}
                />
                <ScrollView contentContainerStyle={styles.content}>
                    <View style={{ backgroundColor: colors.grey6 }}>
                        <View style={[styles.headingView, { marginTop: setWidth(4) }]}>
                            <Text style={styles.heading}>Order Items</Text>
                            <View style={styles.bottomBorderView} />
                        </View>
                    </View>

                    <View>
                        <FlatList
                            data={this.state.products}
                            renderItem={this.renderProductItems}
                            keyExtractor={(item, index) => index}
                            style={{
                                paddingTop: setWidth(4),
                                backgroundColor: colors.grey6
                            }}
                        />
                    </View>


                    <View style={{ backgroundColor: colors.grey6, paddingBottom: setWidth(4), paddingHorizontal: setWidth(2) }}>
                        <View style={[styles.headingView, { marginVertical: setWidth(7), }]}>
                            <Text style={styles.heading}>Order Status</Text>
                            <View style={[styles.bottomBorderView, { borderBottomColor: colors.yellow2 }]} />
                        </View>
                        {
                            this.state.orderstatusArray.map((item, index) => {
                                return this.renderOrderStatusBlock(item, index)
                            })
                        }
                    </View>

                    <View style={{ paddingHorizontal: setWidth(2) }}>
                        <View style={[styles.headingView, { marginTop: setWidth(6), }]}>
                            <Text style={[styles.heading, styles.textBold, { color: colors.grey2 }]}>Select SKU Quantity Below To Request Return</Text>
                        </View>
                        <View style={{ marginTop: setWidth(2), marginHorizontal: setWidth(2) }}>
                            <FlatList
                                data={this.state.products}
                                renderItem={this.renderSKUItem}
                                keyExtractor={(item, index) => index}
                            />
                        </View>

                    </View>
                </ScrollView>

                <View style={styles.footerView}>
                    <TouchableOpacity style={[styles.footerBtn]} onPress={() => this.initiateReturn()}>
                        <AntDesign name="reload1" size={setWidth(6)} color={colors.white} style={{
                            transform: [
                                { scaleX: -1 }
                            ]
                        }} />
                        <Text style={[styles.footerBtnText]}>REQUEST RETURN</Text>
                    </TouchableOpacity>
                </View>
                {
                    this.state.showLoader &&
                    <FullScreenLoader

                    />
                }

            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        loginReducer: state.loginReducer,
    }
}

const mapDispatchToProps = dispatch => ({
})

const connectComponent = connect(mapStateToProps, mapDispatchToProps)
export default connectComponent(ReturnOrderScreen)

