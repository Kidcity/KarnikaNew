import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, BackHandler } from 'react-native';
import AppHeader from '../../component/AppHeader';
import { styles } from './style';
import { setWidth } from '../../utils/variable';
import colors from '../../utils/colors';
import CartView from '../../component/CartView';
import { errorAlert, retryAlert, successToast } from '../../helper/ToastHelper';
import FullScreenLoader from '../../component/FullScreenLoader'
import { connect } from 'react-redux';
import { clearCartAction, setCartCountDataAction, setCartItemsAction, settotalPriceDetailsAction } from '../../redux/actions/cartAction';
import ThankYouModal from '../../component/ThankYouModal';
import EmptyCartModal from '../../component/EmptyCartModal';
import CartServices from '../../services/CartServices';
import PriceBreakUpModal from '../../component/PriceBreakUpModal';
import RazorPayServices from '../../services/RazorPayServices';
import RupifiServices from '../../services/RupifiServices';
import WebViewModal from '../../component/WebViewModal';
import CityWalletServices from '../../services/CityWalletServices';
import { Strings } from '../../utils/strings';
import CartPageDynamicPaymentModal from '../../component/CartPageDynamicPaymentModal';
import { setScreenActivity } from '../../helper/AppActivityTrackingHelper';
import { clearProductFilterAction, setProductFilterAction } from '../../redux/actions/commonAction';
import { clearProductListData } from '../../redux/actions/productListAction';

class CartScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_email: '',
            page_heading: 'CART',
            default_shipping_address: null,
            currentMapIndex: 1,
            cart_items: [],
            total_price_details: [],
            total_cart_items: 0,
            oda_charges: 0,
            total_order_value: 0,
            total_price_to_pay: 0,
            city_wallet_amount: 0,
            rupifi_credit_balance: 0,
            cod_percentage: 0,
            cod_amount_to_pay: 0,
            amount_to_pay_city_wallet: 0,

            showLoader: false,
            noCartData: true,
            notDeliverable: false,
            showEmptyCartModal: false,
            openWebViewModal: false,
            showSuccessPaymentModal: false,
            showPaymentBreakUpModal: false,
            showPaymentProcessModal: false,

            emptyCartModalTitle: "",
            payment_mode: 'online',


            rupifi_merchant_id: '',
            rupifi_payment_url: '',
            rupifi_payment_response: null,

            payment_details_obj: null,
            payment_order_id: '',

            platform_fees: '',
            gst: '',
            credit_amount: '',

            selected_city_id: '',
            selected_city_name: '',

            selected_brand_id: "",
            selected_brand_name: "",
            shop_in_shop: "0",
            brand_mov: 0,
            gst_5: 0,
            gst_12: 0,
            gst_total: 0,
            final_order_no: '',
            is_ws_not: 0
        };

    }

    static getDerivedStateFromProps(props, state) {
        return {
            default_shipping_address: props.hasOwnProperty("default_shipping_address") ? props.default_shipping_address : null,
            city_wallet_amount: props.hasOwnProperty("loginReducer") ? props.loginReducer.city_wallet_amt : 0,
            rupifi_credit_balance: props.hasOwnProperty("rupifi_credit_balance") ? props.rupifi_credit_balance : 0,
            user_email: props.hasOwnProperty("loginReducer") ? props.loginReducer.data.email : '',
            rupifi_merchant_id: props.hasOwnProperty("rupifi_merchant_id") ? props.rupifi_merchant_id : '',
            cart_items: props.hasOwnProperty("cart_items") ? props.cart_items : [],
            total_price_details: props.hasOwnProperty("cart_total_price_details") ? props.cart_total_price_details : [],
            total_cart_items: props.hasOwnProperty("total_cart_items") ? props.total_cart_items : 0,
            is_ws_not: props.hasOwnProperty("is_ws_not") ? props.is_ws_not : 0
        }
    }

    onpressFooterButton() {
        this.setState({
            showPaymentProcessModal: true
        })
    }

    async onCityWiseBuy(item_data) {
        // console.log(JSON.stringify(item_data))
        const total_order_price = item_data.gross_total_price
        const cod_percentage = item_data.cod_percentage
        const cod_amount_to_pay = item_data.cod_amount_to_pay
        const oda_charges = item_data.shipping_details.oda_charges

        this.setState({
            cod_percentage: cod_percentage,
            cod_amount_to_pay: cod_amount_to_pay,
            total_order_value: total_order_price,
            total_price_to_pay: total_order_price,
            oda_charges: oda_charges,
            selected_city_id: item_data?.city_id ?? "",
            selected_city_name: item_data?.city_name ?? "",
            selected_brand_id: item_data?.brand_id ?? "",
            selected_brand_name: item_data?.selected_brand_name ?? "",
            shop_in_shop: (item_data?.shop_in_shop) ? "1" : "0",
            brand_mov: item_data?.brand_mov ?? 0,
            gst_5: item_data.shipping_details.gst_cal_5 ?? 0,
            gst_12: item_data.shipping_details.gst_cal_12 ?? 0,
            gst_total: item_data.shipping_details.total_gst_amount ?? 0,
        })

    }

    onPressPromocode() {
        errorAlert("", "Coming soon for you.")
        //  this.props.navigation.navigate("PromoCode")
    }

    _showPaymentBreakUpModal = (selected_order) => {
        if (this.state.is_ws_not == 0) {
            this._visitorOrder(selected_order)
        } else {
            this._customerOrder(selected_order)
        }
        return
        this.setState({
            showSuccessPaymentModal: true
        })

        return
        if (this.state.payment_details_obj) {
            this.setState({
                showPaymentBreakUpModal: true
            })
        }
        else {
            this._breakUpPaymentJson()
        }
    }

    _visitorOrder = async (selected_order) => {
        //https://thekarnika.co/karnika/api/retailer/visitorOrder

        const default_shipping_address = this.state.default_shipping_address
        const param = {
            retailer_id: this.props.loginReducer.data.cust_manu_id,
            product_size_group_id: selected_order.map((item => item.items.map(e => e.product_size_group_id))).join(","),
            address_book_id: default_shipping_address.address_book_id,
            wholsaler_id: ""
        }
        console.log(param);
        this.setState({ showLoader: true })
        CartServices._visitorOrderService(param).then(res => {
            if (res.status === "true") {
                this.setState({
                    showPaymentProcessModal: false,
                    showSuccessPaymentModal: true,
                    showLoader: false,
                    final_order_no: res.order_id
                }, async () => {
                    this.resetStockState()
                })
            }
        }, error => {
            this.setState({ showLoader: false })
        })

    }

    async _customerOrder(selected_order) {

        console.log(selected_order);
        let oda_charge = 0, gst_5 = 0, gst_12 = 0, total_gst = 0
        selected_order.map(item => {
            oda_charge += +item.shipping_details.oda_charges
            gst_5 += +item.shipping_details.gst_cal_5
            gst_12 += +item.shipping_details.gst_cal_12
            total_gst += +item.shipping_details.total_gst_amount
        })

        const default_shipping_address = this.state.default_shipping_address

        const param = {
            retailer_id: this.props.loginReducer.data.cust_manu_id,
            product_size_group_id: selected_order.map((item => item.items.map(e => e.product_size_group_id))).join(","),
            address_book_id: default_shipping_address.address_book_id,
            oda_charges: oda_charge,
            city_id: '1', // selected_order.map((item => item.city_id)).join(","),
            gst_5: parseFloat(gst_5).toFixed(2),
            gst_12: parseFloat(gst_12).toFixed(2),
            totalGst: parseFloat(total_gst).toFixed(2),
        }
        console.log(param);
        this.setState({ showLoader: true })
        CartServices._customerOrderService(param).then(res => {
            if (res.status === "true") {
                this.setState({
                    showPaymentProcessModal: false,
                    showSuccessPaymentModal: true,
                    showLoader: false,
                    final_order_no: res.order_id
                }, async () => {
                    this.resetStockState()
                })
            }
        }, error => {
            this.setState({ showLoader: false })
        })
    }

    /*
        async _breakUpPaymentJson() {
            this.setState({
                showPaymentProcessModal: false
            })
            this.props.loginReducer.data.cust_manu_id
            const payment_details_obj = this.state.payment_details_obj
    
            // console.log('payment_details_obj', payment_details_obj);
    
            if (payment_details_obj) {
    
                // console.log('payment_details_obj', payment_details_obj);
    
                if (payment_details_obj.mode === 'rupifi') {
                    const check_stock_status = await this._checkStockStatus()
                    if (check_stock_status) {
                        const platform_fees = payment_details_obj.payment_model[0].processing_fee
                        const gst = payment_details_obj.payment_model[0].gst
                        const credit_amount = payment_details_obj.payment_model[0].credit_amount
                        //console.log(platform_fees, gst);
                        //return
                        this.setState({
                            payment_mode: payment_details_obj.mode,
                            platform_fees: platform_fees,
                            gst: gst,
                            credit_amount: credit_amount
                        }, async () => {
                            await this._rupifiCreateOrder(payment_details_obj.amount)
                        })
                    }
                }
                else if (payment_details_obj.mode === 'city_wallet,rupifi') {
                    const check_stock_status = await this._checkStockStatus()
                    if (check_stock_status) {
                        const city_wallet_amount_to_pay = payment_details_obj.payment_model[0].amount
                        const rupifi_amount_to_pay = payment_details_obj.payment_model[1].amount
                        const platform_fees = payment_details_obj.payment_model[1].processing_fee
                        const gst = payment_details_obj.payment_model[1].gst
                        const credit_amount = payment_details_obj.payment_model[1].credit_amount
    
                        this.setState({
                            payment_mode: payment_details_obj.mode,
                            amount_to_pay_city_wallet: city_wallet_amount_to_pay,
                            platform_fees: platform_fees,
                            gst: gst,
                            credit_amount: credit_amount
                        }, async () => {
                            await this._rupifiCreateOrder(rupifi_amount_to_pay)
                        })
    
                    }
                }
                else if (payment_details_obj.mode === 'city_wallet') {
                    const check_stock_status = await this._checkStockStatus()
                    if (check_stock_status) {
                        this.setState({
                            payment_mode: payment_details_obj.mode,
                            platform_fees: '',
                            gst: ''
                        }, () => {
                            this._updatePaymentStatus({ payment_status: 'success', mode: payment_details_obj.mode, amount: payment_details_obj.amount })
                        })
                    }
                }
                else if (payment_details_obj.mode === 'cod') {
                    this.setState({
                        platform_fees: '',
                        gst: '',
                        payment_mode: payment_details_obj.mode
                    }, async () => await this._makeOnlinePayment())
                }
                else if (payment_details_obj.mode === 'city_wallet,online') {
    
                    const city_wallet_amount_to_pay = payment_details_obj.payment_model[0].amount
                    const online_amount_to_pay = payment_details_obj.payment_model[1].amount
    
                    const check_stock_status = await this._checkStockStatus()
                    if (check_stock_status) {
                        this.setState({
                            payment_mode: payment_details_obj.mode,
                            amount_to_pay_city_wallet: city_wallet_amount_to_pay,
                            platform_fees: '',
                            gst: ''
                        }, () => {
                            this._makeOnlinePayment(online_amount_to_pay)
                        })
                    }
                }
                else if (payment_details_obj.mode === 'online') {
    
                    this.setState({
                        platform_fees: '',
                        gst: '',
                        payment_mode: payment_details_obj.mode
                    }, async () => await this._makeOnlinePayment())
                }
    
            } else {
                // puro amount online a payment      
    
                // alert(1)
                this.setState({
                    platform_fees: '',
                    gst: '',
                    payment_mode: 'online'
                }, async () => await this._makeOnlinePayment())
            }
        }
    
        async _rupifiCreateOrder(amount) {
            const param = {
                amount: Math.round(amount * 100),
                merchant_customer_id: this.state.rupifi_merchant_id,
                phone: this.props.loginReducer.data.phone
            }
    
            let status = false
            await RupifiServices._createRupifiOrderService(param).then(response => {
                this.setState({
                    payment_order_id: response.order_id,
                    rupifi_payment_url: response.payment_url,
                    openWebViewModal: true
                })
                status = true
            }, error => {
                status = false
                if (error.message == "server_error") {
                    retryAlert(() => this._rupifiCreateOrder(amount))
                } else {
                    errorAlert("Error", error.message)
                }
            })
            return status
        }
    
        async _makeOnlinePayment(price = null) {
    
            this.setState({ showLoader: true })
            const check_stock_status = await this._checkStockStatus()
    
            if (check_stock_status) {
                const status = await this._getRazorPayOrderID(price)
                if (status) {
                    const payment_resp = await this._payViaRazorPay(price)
    
                    await this._updatePaymentStatus(payment_resp)
                    this.setState({ showLoader: false })
                } else {
                    this.setState({ showLoader: false })
                }
            } else {
                this.setState({ showLoader: false })
            }
    
        }
    */

    async _updatePaymentStatus(payment_response = false) {

        const default_shipping_address = this.state.default_shipping_address

        if (payment_response) {

            this.setState({ showLoader: true })
            const param = {
                order_id: this.state.payment_order_id,
                retailer_id: this.props.loginReducer.data.cust_manu_id,
                address_book_id: default_shipping_address.address_book_id,
                method: this.state.payment_mode,
                response: JSON.stringify(payment_response),
                transaction_id: (payment_response.razorpay_payment_id) ? payment_response.razorpay_payment_id : "",
                oda_charges: this.state.oda_charges,
                city_wallet: this.state.amount_to_pay_city_wallet,
                platform_fees: this.state.platform_fees,
                gst: this.state.gst,
                credit_amount: this.state.credit_amount,
                city_id: this.state.selected_city_id,
                shop_in_shop: this.state.shop_in_shop,
                brand_mov: this.state.brand_mov,
                brand_id: this.state.selected_brand_id,
                totalGst: this.state.gst_total,
                gst_5: this.state.gst_5,
                gst_12: this.state.gst_12
            }

            console.log("_updatePaymentStatus  ==> ", param);

            await CartServices._updatePaymentStatusService(param).then(async response => {

                if (response.status) {

                    await this._getCutomerCreditAccountDetails()
                    await this._getCutomerCityWalletAmount()
                    this.setState({
                        showSuccessPaymentModal: true,
                        showLoader: false,
                        final_order_no: response.order_no
                    }, async () => {
                        this.resetStockState()
                    })
                }

            }, error => {
                this.setState({ showLoader: false })
                if (error.message == "server_error") {
                    retryAlert(() => this._updatePaymentStatus(payment_response))
                } else {
                    errorAlert("Error", error.message)
                }
            })
        } else {
            // errorAlert("Oops!", "You Cancelled Payment.")
        }
    }

    /*
    async _payViaRazorPay(price = null) {

        price = (price) ? price : this.state.total_price_to_pay
        const default_shipping_address = this.state.default_shipping_address
        const cod_amount_to_pay = this.state.cod_amount_to_pay

        if (this.state.payment_mode == 'cod' && price == null) {
            price = cod_amount_to_pay
        }

        let response_data = false

        await RazorPayServices._razorPayPaymentService(price, this.state.payment_order_id, default_shipping_address, this.state.user_email).then(response => {
            response_data = response
        }, error => {
            if (error.message == "server_error") {
                retryAlert(() => this._payViaRazorPay())
            } else {
                errorAlert("Error", error.message)
            }
            response_data = false
        })

        return response_data
    }
    */

    /*
    async _getRazorPayOrderID(price = null) {
        price = (price) ? price : this.state.total_price_to_pay
        const user_id = this.props.loginReducer.data.cust_manu_id
        const mode = this.state.payment_mode

        let status = false
        await RazorPayServices._getOrderIDService(mode, price, user_id).then(response => {
            console.log('_getRazorPayOrderID  ===> ', response.data.data);
            if (response.data.data) {
                if (response.data.data?.success) {
                    this.setState({
                        payment_order_id: response.data.data.order_id
                    })
                }
            }
            status = true
        }, error => {
            if (error.message == "server_error") {
                retryAlert(() => this._getRazorPayOrderID())
            } else {
                errorAlert("razor pay order id Error", error.message)
            }
            status = false
        })
        return status
    }
    */

    resetStockState() {
        const cart_items = this.state.cart_items
        let total_price_details = this.state.total_price_details

        if (cart_items.length == 0) {
            this.props.clearCartAction()
        } else {

            let cityIDfindIndex = cart_items.findIndex(element => (element?.city_id && element?.city_id == this.state.selected_city_id))
            let brandIDfindIndex = cart_items.findIndex(element => (element?.brand_id && element?.brand_id == this.state.selected_brand_id))

            let findIndex = (cityIDfindIndex != -1) ? cityIDfindIndex : brandIDfindIndex

            if (findIndex != -1) {
                const items_in_the_city_object = cart_items[findIndex].items.length
                cart_items.splice(findIndex, 1)
                let temp_array = []
                total_price_details.map((item, index) => {
                    if (!item?.shop_in_shop && item?.city_id && item.city_id != this.state.selected_city_id) {
                        temp_array.push(item)
                    }
                    if (item?.brand_id && item.brand_id != this.state.selected_brand_id) {
                        temp_array.push(item)
                    }
                })
                total_price_details = temp_array

                const total_cart_items = this.state.total_cart_items
                this.props.setCartCountDataAction(+total_cart_items - +items_in_the_city_object)
                this.props.settotalPriceDetailsAction(total_price_details)
                this.props.setCartItemsAction(cart_items)
            }
        }
    }

    async _checkStockStatus() {

        const default_shipping_address = this.state.default_shipping_address

        if (!default_shipping_address) {
            errorAlert("Error", "Please select delivery address.")
            return
        }

        if (this.state.total_order_value == 0) {
            errorAlert("Error", "Amount cant be zero.\nPlease add product to the cart.")
            return
        }

        const cart_items = this.state.cart_items

        let cityIDfindIndex = cart_items.findIndex(element => (element?.city_id && element?.city_id == this.state.selected_city_id))
        let brandIDfindIndex = cart_items.findIndex(element => (element?.brand_id && element?.brand_id == this.state.selected_brand_id))

        if (cityIDfindIndex == -1 && brandIDfindIndex == -1) {
            alert("id not matched")
            return false
        }

        let findIndex = (cityIDfindIndex != -1) ? cityIDfindIndex : brandIDfindIndex

        let order_products_list = []
        for (let index = 0; index < cart_items[findIndex].items.length; index++) {
            const element = cart_items[findIndex].items[index];
            order_products_list.push({
                product_sizegroup_id: element.product_size_group_id,
                order_quantity: element.qty_ordered
            })
        }

        const param = {
            order_products: order_products_list,
            retailer_id: this.props.loginReducer.data.cust_manu_id,
            shop_in_shop: this.state.shop_in_shop,
            brand_mov: this.state.brand_mov
        }

        // console.log('_checkStockStatus ===> ', param);

        let status = false

        await CartServices._checkStockStatus(param).then(async response => {
            status = true
        }, error => {
            if (error.message == "server_error") {
                retryAlert(() => this._checkStockStatus())
            } else {
                errorAlert("Stock check Error", error.message)
            }
            status = false
        })

        return status

    }

    /*
    async _getCutomerCreditAccountDetails() {
        const param = {
            merchant_customer_id: this.props.loginReducer.data.phone
        }
        await RupifiServices._getCustomerAccountInfo(param).then(response => {

        }, error => {
            if (error.message == "server_error") {
                retryAlert(() => this._getCutomerCreditAccountDetails())
            } else {
                // errorAlert("Error in getting credit details", error.message)
            }
        })
    }

    async _getCutomerCityWalletAmount() {
        const param = {
            retailer_id: this.props.loginReducer.data.cust_manu_id
        }
        await CityWalletServices._getCityWalletAmountService(param).then(response => {

        }, error => {
            if (error.message == "server_error") {
                retryAlert(() => this._getCutomerCityWalletAmount())
            } else {
                // errorAlert("Error in getting wallet balance", error.message)
            }
        })
    }
    */

    async _getShippingDetails(total, gst_5_total, gst_12_total) {

        const default_shipping_address = this.state.default_shipping_address
        let shipping_details = {
            shipping_charge: 0,
            platform_fees: 0,
            total_gst_amount: 0,
            oda_charges: 0,
            special_discount: 0,
            gst_cal_12: 0,
            gst_cal_5: 0,
        }

        await CartServices._getShippingCharges({ item_value: total, pincode: default_shipping_address.pin, gst_5: gst_5_total, gst_12: gst_12_total }).then(response => {

            const shipping_charge = (response && response.shipping_charge) ? response.shipping_charge : 0
            const platform_fees = (response && response.platform_fees) ? response.platform_fees : 0
            const gst_cal_12 = (response && response.gst_cal_12) ? response.gst_cal_12 : 0
            const gst_cal_5 = (response && response.gst_cal_5) ? response.gst_cal_5 : 0
            const total_gst_amount = (response && response.total_gst_amount) ? response.total_gst_amount : 0
            const oda_charges = (response && response.oda_charges) ? response.oda_charges : 0
            const special_discount = (response && response.special_discount) ? response.special_discount : 0

            shipping_details = {
                shipping_charge: shipping_charge,
                platform_fees: platform_fees,
                gst_cal_12: gst_cal_12,
                gst_cal_5: gst_cal_5,
                total_gst_amount: total_gst_amount,
                oda_charges: oda_charges,
                special_discount: special_discount
            }
        }, error => {
            // errorAlert("Error", error.message)
        })

        return shipping_details
    }

    async _updateCartItemsInLocalState(qty_ordered, parentIndex, childIndex) {


        let cart_items = this.state.cart_items
        let total_price_details = this.state.total_price_details
        let id = cart_items[parentIndex]?.shop_in_shop ? cart_items[parentIndex]?.brand_id : cart_items[parentIndex]?.city_id

        if (qty_ordered == 0) {

            cart_items[parentIndex].items.splice(childIndex, 1)

            if (cart_items[parentIndex].items.length == 0) {  // if no items in a city delete the object

                cart_items.splice(parentIndex, 1)

                if (cart_items.length == 0) {  // no item in the cart reset the state
                    this.setState({
                        noCartData: true,
                        showEmptyCartModal: true,
                        emptyCartModalTitle: Strings.cartScreenStrings.noItemsInCartText
                    })
                    this.props.clearCartAction()
                    return
                }

                let temp_array = []
                total_price_details.map((item, index) => {
                    if (!item?.shop_in_shop && item?.city_id && item.city_id != id) {
                        temp_array.push(item)
                    }
                    if (item?.brand_id && item.brand_id != id) {
                        temp_array.push(item)
                    }
                })
                total_price_details = temp_array

                const total_cart_items = this.state.total_cart_items
                this.props.setCartCountDataAction(+total_cart_items - 1)
                this.props.settotalPriceDetailsAction(total_price_details)
                this.props.setCartItemsAction(cart_items)
                return
            }

            let total_order_price = 0
            let total_gross_price = 0

            let gst_5_total = 0
            let gst_12_total = 0

            for (let index = 0; index < cart_items[parentIndex].items.length; index++) {
                const element = cart_items[parentIndex].items[index];
                total_order_price += +element.order_price

                if (element.per_piece_price < 1000) {
                    gst_5_total += element.order_price
                } else {
                    gst_12_total += element.order_price
                }
            }

            let shipping_details = await this._getShippingDetails(total_order_price, gst_5_total, gst_12_total)

            total_gross_price = (+total_order_price + +shipping_details.shipping_charge + +shipping_details.platform_fees + +shipping_details.total_gst_amount + +shipping_details.oda_charges) - (+shipping_details.special_discount)

            shipping_details = {
                ...shipping_details,
                total_order_price: total_order_price,
                gross_total_price: total_gross_price
            }

            cart_items[parentIndex].gross_total_price = total_gross_price
            cart_items[parentIndex].shipping_details = shipping_details
            cart_items[parentIndex].cod_amount_to_pay = (+total_gross_price * +cart_items[parentIndex].cod_percentage) / 100
            cart_items[parentIndex].is_minimum_order_amount_met = (+total_gross_price < +cart_items[parentIndex].minimum_order_amount) ? false : true

            total_price_details.map((item, index) => {
                if (!item?.shop_in_shop && item?.city_id && item?.city_id == id) {
                    item.value = total_gross_price
                }
                if (item?.brand_id && item?.brand_id == id) {
                    item.value = total_gross_price
                }
            })

            const total_cart_items = this.state.total_cart_items

            this.props.setCartCountDataAction(+total_cart_items - 1)
            this.props.settotalPriceDetailsAction(total_price_details)
            this.props.setCartItemsAction(cart_items)
            return
        }


        cart_items[parentIndex].items[childIndex].qty_ordered = qty_ordered
        cart_items[parentIndex].items[childIndex].order_price = (+cart_items[parentIndex].items[childIndex].per_piece_price * +cart_items[parentIndex].items[childIndex].set_qty * +qty_ordered)


        let total_order_price = 0
        let gst_5_total = 0
        let gst_12_total = 0

        for (let index = 0; index < cart_items[parentIndex].items.length; index++) {
            const element = cart_items[parentIndex].items[index];
            total_order_price += (+element.order_price)

            if (element.per_piece_price < 1000) {
                gst_5_total += element.order_price
            } else {
                gst_12_total += element.order_price
            }
        }

        let shipping_details = await this._getShippingDetails(total_order_price, gst_5_total, gst_12_total)

        let gross_total = (+total_order_price + +shipping_details.shipping_charge + +shipping_details.platform_fees + +shipping_details.total_gst_amount + +shipping_details.oda_charges) - (+shipping_details.special_discount)

        shipping_details = {
            ...shipping_details,
            total_order_price: total_order_price,
            gross_total_price: gross_total
        }


        cart_items[parentIndex].shipping_details = shipping_details
        cart_items[parentIndex].gross_total_price = gross_total
        cart_items[parentIndex].cod_amount_to_pay = (+gross_total * +cart_items[parentIndex].cod_percentage) / 100
        cart_items[parentIndex].is_minimum_order_amount_met = (+gross_total < +cart_items[parentIndex].minimum_order_amount) ? false : true


        total_price_details.map((item, index) => {
            if (!item?.shop_in_shop && item?.city_id && item.city_id == id) {
                item.value = gross_total
            }
            if (item?.brand_id && item.brand_id == id) {
                item.value = gross_total
            }
        })

        this.props.settotalPriceDetailsAction(total_price_details)
        this.props.setCartItemsAction(cart_items)
    }

    async _updateCart(value, parentIndex, childIndex) {

        let cart_items = this.state.cart_items

        const retailer_cart_id = cart_items[parentIndex].items[childIndex].retailer_cart_id

        const param = {
            cart_id: retailer_cart_id,
            qty_ordered: value
        }

        await CartServices._updateCartService(param).then(async response => {

            successToast("Success", "Cart updated")
            this._updateCartItemsInLocalState(value, parentIndex, childIndex)

        }, error => {

            if (error.message == "server_error") {
                retryAlert(() => this._updateCart(value, index))
            } else {
                errorAlert("Error", error.message)
            }
        })

    }

    async _getCartProducts() {

        const param = {
            retailer_id: this.props.loginReducer.data.cust_manu_id
        }
        const default_address = this.props.addressReducer.default_address
        if(!default_address){
            console.log(this.state.noCartData, this.state.total_cart_items);
            errorAlert("Error", "Please add your shipping address.")
        }
        
        this.setState({ showLoader: true })
        CartServices._getCartProductService(param).then(response => {
            
            this.setState({
                showLoader: false,
                total_cart_items: response?.total_cart_items,
                noCartData: (response?.total_cart_items == 0) ? true : false,
                notDeliverable: (response?.shipping_charge_error !== false) ? response.shipping_charge_error : false,
                showEmptyCartModal: (response?.total_cart_items == 0) ? true : false,
                emptyCartModalTitle: (response?.total_cart_items == 0) ? Strings.cartScreenStrings.noItemsInCartText : ''
            })

        }, error => {
            this.setState({ showLoader: false })
            if (error.message == "server_error") {
                retryAlert(() => this._getCartProducts())
            } else {
                errorAlert("Error", error.message)
            }
        })
    }

    componentDidMount() {
        this._getCartProducts()
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );
    }

    componentWillUnmount() {
        this.backHandler.remove()
    }

    async _brandWistList() {

        await this.props.clearProductListData()
        await this.props.clearProductFilterAction()
        let param = this.props.filter
        param = {
            ...param,
            brand: this.state.selected_brand_id.toString()
        }

        setScreenActivity({ action_type: "brandwise_list", action_id: this.state.selected_brand_id })
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
                    heading={this.state.page_heading}
                    headingStyle={{
                        textAlign: "center"
                    }}
                    showBackButton={true}
                    onPressBack={() => {
                        this.backAction()
                    }}
                /> */}
                <AppHeader
                    showBackBtn
                    showSearch
                    showWishList
                    showLogo
                    navigation={this.props.navigation}
                />
                <ScrollView contentContainerStyle={styles.content}>
                    {
                        this.state.noCartData ?
                            <Text style={[styles.text, { marginTop: setWidth(10), textAlign: 'center', fontSize: setWidth(4), color: colors.dark_charcoal }]}>{Strings.cartScreenStrings.noItemsInCartText}</Text>
                            :
                            <CartView
                                is_ws_not={this.state.is_ws_not}
                                cart_items={this.state.cart_items}
                                // total_price_to_pay={this.state.total_order_value}
                                total_price_details={this.state.total_price_details}
                                onPressPromocode={() => this.onPressPromocode()}
                                onDecrease={(value, parentIndex, childIndex) => this._updateCart(value, parentIndex, childIndex)}
                                onIncrease={(value, parentIndex, childIndex) => this._updateCart(value, parentIndex, childIndex)}
                                onPressItem={(id) => {
                                    this.props.navigation.navigate("ProductDetails", { product_id: id })
                                }}
                                onPressBuyButton={(item_data) => this.onCityWiseBuy(item_data)}
                                not_deliverable={this.state.notDeliverable}
                            />
                    }

                </ScrollView>
                {
                    this.state.showPaymentProcessModal &&
                    <CartPageDynamicPaymentModal
                        is_ws_not={this.state.is_ws_not}
                        cart_items={this.state.cart_items}
                        onCityWiseBuy={(item) => this.onCityWiseBuy(item)}
                        onPressChangeAddress={() => { this.props.navigation.navigate("ChangeAddress") }}
                        onPressAddNewAddress={() => { this.props.navigation.navigate("AddNewAddress") }}
                        total_price_details={this.state.total_price_details}
                        default_shipping_address={this.state.default_shipping_address}
                        notDeliverable={this.state.notDeliverable}
                        cod_percentage={this.state.cod_percentage}
                        cod_amount_to_pay={this.state.cod_amount_to_pay}
                        total_order_value={this.state.total_order_value}
                        city_wallet_amount={this.state.city_wallet_amount}
                        // city_wallet_amount={1000}
                        credit_balance={this.state.rupifi_credit_balance}
                        // credit_balance={10000}
                        onPressContinueShopping={() => {
                            if (this.state.shop_in_shop == "1") {
                                this._brandWistList()
                            } else {
                                this.props.navigation.navigate('Home',{scroll_to_top: true})
                            }
                        }}
                        onChoosePaymentMode={(obj) => {
                            this.setState({
                                payment_details_obj: obj,
                                total_price_to_pay: obj.amount
                            })
                        }}
                        showPaymentBreakUpModal={(selected_order) => this._showPaymentBreakUpModal(selected_order)}
                        onClosePaymentProcessModal={() => this.setState({
                            showPaymentProcessModal: false
                        })}
                    />
                }


                {
                    !this.state.noCartData &&
                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.footerBtn} onPress={() => this.onpressFooterButton()}>
                            <Text style={styles.footerBtnText}>
                                PROCEED TO {this.state.is_ws_not === 0 ? "REQUEST" : "ORDER"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                }

                {
                    this.state.showLoader &&
                    <FullScreenLoader
                        isOpen={this.state.showLoader}
                    />
                }
                {
                    this.state.showSuccessPaymentModal &&
                    <ThankYouModal
                        is_ws_not={this.state.is_ws_not}
                        order_no={this.state.final_order_no}
                        city_name={this.state.selected_city_name}
                        onPressForOther={() => { this.setState({ showSuccessPaymentModal: false, total_order_value: 0 }); this._getCartProducts() }}
                        onBackToHome={() => {
                            this.setState({ showSuccessPaymentModal: false });
                            this.props.navigation.navigate('Home')
                        }}
                        onGoToOrders={() => {
                            this.setState({ showSuccessPaymentModal: false }); this.props.navigation.navigate("MyOrders")
                        }}
                    />
                }
                {
                    this.state.showEmptyCartModal &&
                    <EmptyCartModal
                        title={this.state.emptyCartModalTitle}
                        onPressContinueShopping={() => {
                            this.setState({ showEmptyCartModal: false })
                            this.props.navigation.navigate('Home', { scroll_to_top: true })
                        }}
                        onPressClose={() => this.setState({ showEmptyCartModal: false })}
                    />
                }
                {
                    this.state.showPaymentBreakUpModal &&
                    <PriceBreakUpModal
                        data={this.state.payment_details_obj}
                        total_order_value={this.state.total_order_value}
                        onPressCancel={(status) => {
                            this.setState({
                                showPaymentBreakUpModal: false
                            })
                        }}
                        onPressProceed={() => {
                            this.setState({
                                showPaymentBreakUpModal: false,
                                showPaymentProcessModal: false,
                            }, () => this._breakUpPaymentJson())
                        }}
                    />
                }
                {
                    this.state.openWebViewModal &&
                    <WebViewModal
                        url={this.state.rupifi_payment_url}
                        onClose={(status) => {
                            //console.log(status);
                            if (status) {
                                this.setState({
                                    openWebViewModal: false,
                                }, () => {
                                    this._updatePaymentStatus({ payment_status: 'success', url: this.state.rupifi_payment_url })
                                })
                            }
                            this.setState({
                                openWebViewModal: false
                            })
                        }}
                    />
                }


            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        loginReducer: state.loginReducer,
        addressReducer: state.addressReducer,
        cartReducer: state.cartReducer,
        total_cart_items: state.cartReducer.total_cart_items,
        cart_items: state.cartReducer.cart_items,
        cart_total_price_details: state.cartReducer.total_price_details,
        default_shipping_address: state.addressReducer.default_address,
        rupifi_credit_balance: state.applyForCreditReducer.rupifi_credit_balance,
        rupifi_merchant_id: state.applyForCreditReducer.rupifi_merchant_id,
        is_ws_not: state.loginReducer.data.is_ws_not,
    }
}

const mapDispatchToProps = dispatch => ({
    clearCartAction: () => dispatch(clearCartAction()),
    setCartCountDataAction: (data) => dispatch(setCartCountDataAction(data)),
    setCartItemsAction: (data) => dispatch(setCartItemsAction(data)),
    settotalPriceDetailsAction: (data) => dispatch(settotalPriceDetailsAction(data)),

    clearProductFilterAction: () => dispatch(clearProductFilterAction()),
    clearProductListData: () => dispatch(clearProductListData()),
    setProductFilterAction: (param) => dispatch(setProductFilterAction(param)),
})
const connectComponent = connect(mapStateToProps, mapDispatchToProps)
export default connectComponent(CartScreen)
