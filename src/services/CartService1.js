import Base from './Base.service'
import { CART_DETAILS_SLUG, CHECK_STOCK_STATUS, GET_SHIPPING_CHARGE, ORDER_ID_SLUG, UPDATE_CART_SLUG, UPDATE_PAYMENT_STATUS_SLUG } from './Slug'
import { store } from '../redux/store'
import { setCartCountDataAction, setCartItemsAction } from '../redux/actions/cartAction'
const config = require("../../config/karnika.config")

class CartService extends Base {

    async _getTotalValue(data) {
        return new Promise((resolve, reject) => {
            let total_order_value = 0
            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                total_order_value += parseInt(element.qty_ordered) * parseInt(element.main_price)
            }
            resolve(total_order_value)
        })
    }

    async _populateCartProduct(data, shipping_charge_details) {
        
        const shipping_charge = ( shipping_charge_details && shipping_charge_details.shipping_charge)? shipping_charge_details.shipping_charge : 0
        const platform_fees = ( shipping_charge_details && shipping_charge_details.platform_fees)? shipping_charge_details.platform_fees : 0
        const total_gst_amount = ( shipping_charge_details && shipping_charge_details.total_gst_amount)? shipping_charge_details.total_gst_amount : 0
        const oda_charges = ( shipping_charge_details && shipping_charge_details.oda_charges)? shipping_charge_details.oda_charges : 0

        return new Promise((resolve, reject) => {
            let total_order_value = 0
            let items = []
            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                items.push({
                    product_size_group_id: element.product_size_group_id,
                    product_id: element.products_id,
                    image: element.image,
                    brand_name: element.brand_name,
                    set_qty: element.set_qty,
                    size: element.size_group_name,
                    color: element.no_of_color,
                    price: element.sale_price,
                    total_set: element.qty_ordered,
                    retailer_cart_id: element.retailer_cart_id,
                })
                total_order_value += parseInt(element.qty_ordered) * parseInt(element.sale_price) * parseInt(element.set_qty)       
            }
            store.dispatch(setCartCountDataAction(items.length))
            const gross_total = parseFloat(total_order_value) + parseFloat(shipping_charge) + parseFloat(platform_fees) + parseFloat(total_gst_amount) + parseFloat(oda_charges)
            const response = {
                cart: [{
                    location: "Kolkata",
                    total_value: total_order_value,
                    gross_total: Math.round(gross_total),
                    // special_discount: "0",
                    oda_charges: (oda_charges) ? oda_charges : 0,
                    shipping_charge: (shipping_charge) ? shipping_charge : 0,
                    platform_fee: (platform_fees) ? platform_fees : 0,
                    gst: (total_gst_amount) ? total_gst_amount : 0,
                    total_item: data.length,
                    items: items
                }],
                total_price_details: [
                    {
                        title: "Kolkata Order Value",
                        value: Math.round(gross_total)
                    }
                ],
                oda_charges: parseFloat(oda_charges),
                gross_total: gross_total
            }

            resolve(response)
        })
    }

    async _getShippingCharges(param) {

        return new Promise((resolve, reject) => {
            this.post(GET_SHIPPING_CHARGE, param).then(async response => {
                //console.log('ship chag', response);
                if (response.data.data.success === false) {
                    reject({ success: false, message: response.data.data.message })
                    
                } else {
                    //console.log(response.data.data.data);
                    resolve({ success: true, ...response.data.data.data })
                }
            }, error => {
                reject(error)
            })
        })
    }

    _getCartProductService(param) {

        const default_address = store.getState().addressReducer.default_address


        return new Promise((resolve, reject) => {
            this.post(CART_DETAILS_SLUG, param).then(async response => {

                const data = response.data.data.data
                const total_order_value = await this._getTotalValue(data)
                let shippingchargeError = null

                let shipping_charge_details = null
                await this._getShippingCharges({ item_value: total_order_value, pincode: default_address.pin }).then( async response => {
                    
                    shipping_charge_details = response
                }, async error => {  
                    shippingchargeError = error
                })
                
                if(shipping_charge_details !== null){
                    const finalresponse = await this._populateCartProduct(data, shipping_charge_details)                           
                    resolve(finalresponse)
                }else{
                    const finalresponse = await this._populateCartProduct(data, shipping_charge_details)
                    resolve({...finalresponse, shipping_charge_error : shippingchargeError })
                }
                           

            }, error => {
                //console.log('error', error);
                reject(error)
            })
        })
    }

    _updateCartService(param) {
        //console.log(param);
        return new Promise((resolve, reject) => {
            this.post(UPDATE_CART_SLUG, param).then(async response => {

                if (response.data.data.data == 0) {
                    reject(response.data.data)
                } else {
                    resolve(true)
                }
            }, error => {

                reject(error)
            })
        })
    }

    _getOrderIDService(mode, price, userid) {
        const url = config.serviceUrl + ORDER_ID_SLUG + '/' + parseInt(price) + '/' + userid + '/' + mode

        return new Promise((resolve, reject) => {
            this.get(url).then(response => {

                resolve(response)
            }, error => {
                //console.log(error);
                reject(error)
            })
        })
    }

    _checkStockStatus(param) {
        return new Promise((resolve, reject) => {
            this.post(CHECK_STOCK_STATUS, param).then(async response => {
                //console.log('status', response);
                resolve(true)
            }, error => {
                //console.log(error);
                reject(error)
            })
        })
    }

    _updatePaymentStatusService(param) {
        //console.log(param);
        return new Promise((resolve, reject) => {
            this.post(UPDATE_PAYMENT_STATUS_SLUG, param).then(async response => {
                // console.log('UPDATE_PAYMENT_STATUS_SLUG', response);
                resolve(true)
            }, error => {
                reject(error)
            })
        })
    }
}
export default new CartService()