import Base from './Base.service'
import { ORDER_DETAILS_SLUG, REQUEST_DETAILS_SLUG } from './Slug'
import { store } from '../redux/store'
import { order_status } from '../utils/variable'

class OrderDetailsService extends Base {

    _getDetailsService(param) {
        //console.log(param);
        return new Promise((resolve, reject) => {
            this.post(ORDER_DETAILS_SLUG, param).then(response => {

                const state = store.getState().loginReducer
                const data = response.data.data.data
                console.log(JSON.stringify(data));
                //return
                let shipping_address = {
                    name: (data.delivery_address.company) ? data.delivery_address.company : data.delivery_address.firstname,
                    address: data.delivery_address.address + ',' + data.delivery_address.city,
                    state: data.delivery_address.zone_name,
                    pin: data.delivery_address.postcode,
                    country: "India",
                    mobile: (data.delivery_address.poc_mob != null) ? data.delivery_address.poc_mob : state.data.phone,
                    email: state.data.email
                }

                let orderstatusarry = []
                let lastorderstatus = ''

                for (let index = 0; index < data.order_status.length; index++) {
                    const element = data.order_status[index];
                    // if(index == 0){
                    //     lastorderstatus = element.orders_status_name
                    // }
                    orderstatusarry.push(
                        {
                            id: element.status,
                            title: element.orders_status_name,
                            time: element.date_added,
                            isActive: true,
                        },
                    )
                }

                let products = []
                for (let index = 0; index < data.products.length; index++) {
                    const element = data.products[index];

                    for (let idx = 0; idx < element.size_group.length; idx++) {
                        const item = element.size_group[idx];
                        if (idx == 0) {
                            lastorderstatus = item.orders_status_name
                        }
                        products.push({
                            id: element.products_id,
                            brand_name: element.brand_name,
                            image: element.image,
                            set_qty_pcs: item.order_quantity + ' ( ' + parseInt(item.order_quantity) * parseInt(item.set_qty) + 'Pcs )', // parseInt(item.order_quantity) * parseInt(item.set_qty),
                            size: item.size_name,
                            set_qty: item.set_qty,
                            color: item.color_names.length,
                            price: item.per_piece_price,
                            orders_status_name: item.orders_status_name,
                            return_order_details: item.return_order_details,
                            credit_note_link: (item.credit_note) ? item.credit_note.credit_upload : null,
                        })
                    }
                }

                const payment_breakup = data.payment_breakup
               // console.log('payment_breakup',payment_breakup);
                resolve({
                    shipping_address,
                    payment_breakup,
                    // totalAmount: data.order_value_inc_tax,
                    products,
                    orderstatusarry,
                    lastorderstatus,
                    // cod_amount: data.cod_amount,
                    // payment_method: data.payment_method,
                    // prepaid_amount: data.prepaid_amount,
                    invoice_link: data.invoice_link,
                    salesorder_link: data.salesOrder_link,
                    delivery_partner: data.shippingProvider,
                    delivery_tracking_no: data.delivery_tracking_no
                })

            }, error => {
                reject(error)
            })
        })
    }

    _getReqDetailsService(param) {
        console.log("_getReqDetailsService ----------- ",param);
        return new Promise((resolve, reject) => {
            this.post(REQUEST_DETAILS_SLUG, param).then(response => {

                const state = store.getState().loginReducer
                const data = response?.data?.data?.data
                console.log(JSON.stringify(data));
                
                if(!data){
                    reject({
                        messege: "Something went wrong."
                    })
                }

                let shipping_address = {
                    name: (data.delivery_address.company) ? data.delivery_address.company : data.delivery_address.firstname,
                    address: data.delivery_address.address + ',' + data.delivery_address.city,
                    state: data.delivery_address.zone_name,
                    pin: data.delivery_address.postcode,
                    country: "India",
                    mobile: (data.delivery_address.poc_mob != null) ? data.delivery_address.poc_mob : state.data.phone,
                    email: state.data.email
                }

                let orderstatusarry = []
                let lastorderstatus = ''

                for (let index = 0; index < data.order_status.length; index++) {
                    const element = data.order_status[index];                   
                    orderstatusarry.push(
                        {
                            id: element.orders_status_id,
                            title: element.orders_status_name,
                            time: element.date_added,
                            isActive: true,
                        },
                    )
                }

                let products = []
                for (let index = 0; index < data.products.length; index++) {
                    const element = data.products[index];

                    for (let idx = 0; idx < element.size_group.length; idx++) {
                        const item = element.size_group[idx];
                        if (idx == 0) {
                            lastorderstatus = item.orders_status_name
                        }
                        products.push({
                            id: element.products_id,
                            brand_name: element.brand_name,
                            image: element.image,
                            set_qty_pcs: item.order_quantity + ' ( ' + parseInt(item.order_quantity) * parseInt(item.set_qty) + 'Pcs )', // parseInt(item.order_quantity) * parseInt(item.set_qty),
                            size: item.size_name,
                            set_qty: item.set_qty,
                            color: item.color_names.length,
                            price: item.per_piece_price,
                            orders_status_name: item.orders_status_name,
                            return_order_details: item.return_order_details,
                            credit_note_link: (item.credit_note) ? item.credit_note.credit_upload : null,
                        })
                    }
                }

                const payment_breakup = data.payment_breakup
               // console.log('payment_breakup',payment_breakup);
                resolve({
                    shipping_address,
                    payment_breakup,
                    // totalAmount: data.order_value_inc_tax,
                    products,
                    orderstatusarry,
                    lastorderstatus,
                    // cod_amount: data.cod_amount,
                    // payment_method: data.payment_method,
                    // prepaid_amount: data.prepaid_amount,
                    // invoice_link: data.invoice_link,
                    // salesorder_link: data.salesOrder_link,
                    // delivery_partner: data.shippingProvider,
                    // delivery_tracking_no: data.delivery_tracking_no
                })


            }, error => {
                reject(error)
            })
        })
    }

}
export default new OrderDetailsService()