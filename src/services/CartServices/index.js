import Base from '../Base.service'
import { CART_DETAILS_SLUG, CHECK_STOCK_STATUS, CUSTOMER_ORDER_SLUG, GET_SHIPPING_CHARGE, ORDER_ID_SLUG, UPDATE_CART_SLUG, UPDATE_PAYMENT_STATUS_SLUG, VISITOR_ORDER_SLUG } from '../Slug'
import { store } from '../../redux/store'
import { setCartCountDataAction, setCartItemsAction, settotalPriceDetailsAction } from '../../redux/actions/cartAction'
// import { _setCrashAttributes, _setCrashLog } from '../../helper/CrashlyticsHelper'


class CartServices extends Base {

    async _getShippingCharges(param) {
        // console.log("_getShippingCharges ==> ", param);
        return new Promise((resolve, reject) => {
            this.post(GET_SHIPPING_CHARGE, param).then(async response => {
                // console.log('_getShippingCharges response', response.data.data);
                if (response.data.data.success === false) {
                    reject({ success: false, message: response.data.data.message })
                } else {
                    resolve({ success: true, ...response.data.data.data })
                }
            }, error => {
                reject(error)
            })
        })
    }


    _getCartProductService(param, mov_brand_id = null) {
        // console.log(param);
        const default_address = store.getState().addressReducer.default_address

        return new Promise((resolve, reject) => {
            this.post(CART_DETAILS_SLUG, param).then(async response => {

                let total_cart_items = 0
                let shippingchargeDetails = null
                let shippingchargeError = null
                let total_price_details = []

                const cart_item = response.data?.data?.cart_item ?? []
                const mov_item = response.data?.data?.mov_item ?? []

                let cart_items_final_response = []
                let mov_items_final_response = []

                // console.log(JSON.stringify(mov_item));

                // for normal cart items
                if (cart_item && cart_item.length > 0) {
                    for (let index = 0; index < cart_item.length; index++) {
                        const parentelement = cart_item[index];

                        let citywise_total_order_price = 0
                        let city_id = parentelement.city_id
                        let city_name = parentelement.city_name
                        let facility_name = parentelement.facility_name
                        let minimum_order_amount = parentelement.minimum_amount
                        let products = []

                        let gst_5_total = 0
                        let gst_12_total = 0

                        for (let idx = 0; idx < parentelement.products.length; idx++) { // city wise product loop
                            const childElement = parentelement.products[idx];

                            citywise_total_order_price += +childElement.qty_ordered * +childElement.main_price

                            total_cart_items += 1
                            const order_price = +childElement.sale_price * +childElement.qty_ordered * +childElement.set_qty
                            products.push({
                                product_id: childElement.products_id,
                                retailer_cart_id: childElement.retailer_cart_id,
                                product_size_group_id: childElement.product_size_group_id,
                                size: childElement.size_group_name,
                                set_qty: childElement.set_qty,
                                image: childElement.image,
                                brand_name: childElement.brand_name,
                                brand_id: childElement.brand_id,
                                qty_ordered: childElement.qty_ordered,
                                no_of_color: childElement.no_of_color,
                                per_piece_price: childElement.sale_price,
                                order_price: order_price
                            })

                            if (childElement.sale_price < 1000) {
                                gst_5_total += order_price
                            } else {
                                gst_12_total += order_price
                            }
                        }


                        // getting city wise shipping details
                        await this._getShippingCharges({ item_value: citywise_total_order_price, pincode: default_address.pin, gst_5: gst_5_total, gst_12: gst_12_total }).then(async response => {
                            shippingchargeDetails = response
                        }, error => {
                            shippingchargeError = error
                        })
                        const shipping_charge = (shippingchargeDetails && shippingchargeDetails.shipping_charge) ? shippingchargeDetails.shipping_charge : 0
                        const platform_fees = (shippingchargeDetails && shippingchargeDetails.platform_fees) ? shippingchargeDetails.platform_fees : 0
                        const gst_cal_12 = (shippingchargeDetails && shippingchargeDetails.gst_cal_12) ? shippingchargeDetails.gst_cal_12 : 0
                        const gst_cal_5 = (shippingchargeDetails && shippingchargeDetails.gst_cal_5) ? shippingchargeDetails.gst_cal_5 : 0
                        const total_gst_amount = (shippingchargeDetails && shippingchargeDetails.total_gst_amount) ? shippingchargeDetails.total_gst_amount : 0
                        const oda_charges = (shippingchargeDetails && shippingchargeDetails.oda_charges) ? shippingchargeDetails.oda_charges : 0
                        const special_discount = (shippingchargeDetails && shippingchargeDetails.special_discount) ? shippingchargeDetails.special_discount : 0
                        

                        const city_wise_gross_total = (+citywise_total_order_price + +shipping_charge + +platform_fees + +total_gst_amount + +oda_charges) - (+special_discount)

                        // pushing to main array
                        cart_items_final_response.push({
                            city_id: city_id,
                            city_name: city_name,
                            facility_name: facility_name,
                            minimum_order_amount: minimum_order_amount,
                            is_minimum_order_amount_met: (+minimum_order_amount > +city_wise_gross_total) ? false : true,
                            total_items: parentelement.products.length,
                            gross_total_price: city_wise_gross_total,
                            items: products,

                            cod_percentage: 15,
                            cod_amount_to_pay: parseFloat((+city_wise_gross_total) * 15 / 100).toFixed(2),

                            shipping_details: {
                                shipping_charge: shipping_charge,
                                platform_fees: platform_fees,
                                gst_cal_12: gst_cal_12,
                                gst_cal_5: gst_cal_5,
                                total_gst_amount: total_gst_amount,
                                oda_charges: oda_charges,
                                special_discount: special_discount,
                                gross_total_price: city_wise_gross_total,
                                total_order_price: citywise_total_order_price
                            }
                        })


                        total_price_details.push({
                            city_id: city_id,
                            title: facility_name + " Order Value",
                            value: (city_wise_gross_total)
                        })
                    }
                }
                // end of normal cart item calc


                let remaining_mov_value = 0
                // for mov cart items
                if (mov_item && mov_item.length > 0) {
                    for (let index = 0; index < mov_item.length; index++) {
                        const parentelement = mov_item[index];

                        let brandwise_total_order_price = 0
                        let city_id = parentelement.city_id
                        let city_name = parentelement.city_name
                        let facility_name = parentelement.facility_name
                        let brand_id = parentelement.brand_id
                        let brand_name = parentelement.brand_name
                        let minimum_order_amount = parentelement.brand_mov
                        let products = []

                        // console.log('minimum_order_amount ', minimum_order_amount, brand_name);

                        let gst_5_total = 0
                        let gst_12_total = 0

                        for (let idx = 0; idx < parentelement.products.length; idx++) {

                            const childElement = parentelement.products[idx];
                            brandwise_total_order_price += +childElement.qty_ordered * +childElement.main_price
                            total_cart_items += 1
                            const order_price = +childElement.sale_price * +childElement.qty_ordered * +childElement.set_qty

                            products.push({
                                product_id: childElement.products_id,
                                retailer_cart_id: childElement.retailer_cart_id,
                                product_size_group_id: childElement.product_size_group_id,
                                size: childElement.size_group_name,
                                set_qty: childElement.set_qty,
                                image: childElement.image,
                                brand_name: childElement.brand_name,
                                brand_id: childElement.brand_id,
                                qty_ordered: childElement.qty_ordered,
                                no_of_color: childElement.no_of_color,
                                per_piece_price: childElement.sale_price,
                                order_price: order_price
                            })

                            if (childElement.sale_price < 1000) {
                                gst_5_total += order_price
                            } else {
                                gst_12_total += order_price
                            }

                        }

                        await this._getShippingCharges({ item_value: brandwise_total_order_price, pincode: default_address.pin, gst_5: gst_5_total, gst_12: gst_12_total }).then(async response => {
                            shippingchargeDetails = response
                        }, error => {
                            shippingchargeError = error
                        })

                        const shipping_charge = (shippingchargeDetails && shippingchargeDetails.shipping_charge) ? shippingchargeDetails.shipping_charge : 0
                        const platform_fees = (shippingchargeDetails && shippingchargeDetails.platform_fees) ? shippingchargeDetails.platform_fees : 0
                        const gst_cal_12 = (shippingchargeDetails && shippingchargeDetails.gst_cal_12) ? shippingchargeDetails.gst_cal_12 : 0
                        const gst_cal_5 = (shippingchargeDetails && shippingchargeDetails.gst_cal_5) ? shippingchargeDetails.gst_cal_5 : 0
                        const total_gst_amount = (shippingchargeDetails && shippingchargeDetails.total_gst_amount) ? shippingchargeDetails.total_gst_amount : 0
                        const oda_charges = (shippingchargeDetails && shippingchargeDetails.oda_charges) ? shippingchargeDetails.oda_charges : 0
                        const special_discount = (shippingchargeDetails && shippingchargeDetails.special_discount) ? shippingchargeDetails.special_discount : 0

                        const brand_wise_gross_total = (+brandwise_total_order_price + +shipping_charge + +platform_fees + +total_gst_amount + +oda_charges) - (+special_discount)

                        mov_items_final_response.push({
                            city_id: city_id,
                            city_name: city_name,
                            facility_name: facility_name,
                            brand_id: brand_id,
                            brand_name: brand_name,
                            shop_in_shop: "1",
                            brand_mov: minimum_order_amount,
                            minimum_order_amount: minimum_order_amount,
                            is_minimum_order_amount_met: (+minimum_order_amount > +brand_wise_gross_total) ? false : true,
                            total_items: parentelement.products.length,
                            gross_total_price: brand_wise_gross_total,
                            items: products,

                            cod_percentage: 15,
                            cod_amount_to_pay: parseFloat((+brand_wise_gross_total) * 15 / 100).toFixed(2),

                            shipping_details: {
                                shipping_charge: shipping_charge,
                                platform_fees: platform_fees,
                                gst_cal_12: gst_cal_12,
                                gst_cal_5: gst_cal_5,
                                total_gst_amount: total_gst_amount,
                                oda_charges: oda_charges,
                                special_discount: special_discount,
                                gross_total_price: brand_wise_gross_total,
                                total_order_price: brandwise_total_order_price
                            }
                        })


                        if (mov_brand_id) {
                            if (+brand_id == +mov_brand_id) {
                                if (+brand_wise_gross_total < +minimum_order_amount) {
                                    remaining_mov_value = (+minimum_order_amount) - (+brand_wise_gross_total)
                                }
                            }
                        }

                        total_price_details.push({
                            brand_id: brand_id,
                            title: brand_name + " Order Value",
                            value: (brand_wise_gross_total)
                        })
                    }
                }
                // end of mov item calc

                if (response.data?.data?.length === 0) {
                    resolve({
                        total_cart_items: total_cart_items
                    })
                }

                const merge_array = cart_items_final_response.concat(mov_items_final_response)
                // console.log("mov_items_final_response => ", JSON.stringify(mov_items_final_response));
                // console.log("cart_items_final_response => ", (cart_items_final_response.length));
                store.dispatch(setCartCountDataAction(total_cart_items))
                store.dispatch(setCartItemsAction(merge_array))
                store.dispatch(settotalPriceDetailsAction(total_price_details))

                if (shippingchargeError) {
                    resolve({
                        shipping_charge_error: shippingchargeError,
                        total_cart_items: total_cart_items,
                        remaining_mov_value: remaining_mov_value
                    })
                } else {
                    resolve({
                        shipping_charge_error: false,
                        total_cart_items: total_cart_items,
                        remaining_mov_value: remaining_mov_value
                    })
                }

            }, error => {
                // console.log('error', error);
                reject(error)
            })
        })
    }

    _updateCartService(param) {
        // console.log(param);
        return new Promise((resolve, reject) => {
            this.post(UPDATE_CART_SLUG, param).then(async response => {

                if (response.data && response.data.data) {
                    if (response.data.data.data == 0) {
                        reject(response.data.data)
                    } else {
                        resolve(true)
                    }
                } else {
                    // _setCrashAttributes({
                    //     api: UPDATE_CART_SLUG,
                    //     method: "POST",
                    //     param: JSON.stringify(param),
                    //     error: "error in _updateCartService func. data key is missing."
                    // })
                    reject({
                        message: "Something went wrong."
                    })
                }

            }, error => {

                reject(error)
            })
        })
    }

    async _checkStockStatus(param) {
        return new Promise(async (resolve, reject) => {
            await this.post(CHECK_STOCK_STATUS, param).then(async response => {

                if (response.data && response.data.data) {
                    if (response.data.data.success == 1) {
                        resolve(true)
                    }
                    else {

                        reject({ message: response?.data?.data?.message })
                    }
                } else {
                    // _setCrashAttributes({
                    //     api: CHECK_STOCK_STATUS,
                    //     method: "POST",
                    //     param: JSON.stringify(param),
                    //     error: "error in _checkStockStatus func. data key is missing."
                    // })
                    reject({ message: "Something went wrong." })
                }
            }, error => {

                reject(error)
            })
        })
    }

    async _updatePaymentStatusService(param) {
        return new Promise((resolve, reject) => {
            this.post(UPDATE_PAYMENT_STATUS_SLUG, param).then(async response => {
                console.log('_updatePaymentStatusService  ', response.data.data, response.data.data?.orderno);
                if (response.data && response.data?.data?.status) {
                    resolve({
                        status: true,
                        order_no: response.data.data?.orderno
                    })
                } else {
                    // _setCrashAttributes({
                    //     api: UPDATE_PAYMENT_STATUS_SLUG,
                    //     method: "POST",
                    //     param: JSON.stringify(param),
                    //     error: "error in _updatePaymentStatusService func. data key is missing."
                    // })
                    reject({
                        status: false,
                        message: 'Cannot Place Order.\nSomething went wrong.'
                    })
                }

            }, error => {
                reject(error)
            })
        })
    }

    async _visitorOrderService(param) {
        return new Promise((resolve, reject) => {
            this.post(VISITOR_ORDER_SLUG, param).then(async response => {
                console.log('_visitorOrderService  ', response.data.data );
                resolve(response?.data?.data)
            }, error => {
                reject(error)
            })
        })
    }

    async _customerOrderService(param) {
        return new Promise((resolve, reject) => {
            this.post(CUSTOMER_ORDER_SLUG, param).then(async response => {
                console.log('_customerOrderService  ', response.data.data );
                resolve(response?.data?.data)
            }, error => {
                reject(error)
            })
        })
    }


}

export default new CartServices()