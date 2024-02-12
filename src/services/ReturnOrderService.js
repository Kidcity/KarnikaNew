import Base from './Base.service'
import { ORDER_DETAILS_SLUG, RETURN_ORDER_SLUG } from './Slug'
import { store } from '../redux/store'

class ReturnOrderService extends Base {

    _getDetailsService(param) {
       // console.log(param);
        return new Promise((resolve, reject) => {
            this.post(ORDER_DETAILS_SLUG, param).then(response => {

                const state = store.getState().loginReducer
                const data = response.data.data.data
               // console.log('details ', JSON.stringify(data));
                let shipping_address = {
                    name: (data.delivery_address.company) ? data.delivery_address.company : data.delivery_address.firstname,
                    address: data.delivery_address.address + ',' + data.delivery_address.city,
                    state: data.delivery_address.zone_name,
                    pin: data.delivery_address.postcode,
                    country: "India",
                    mobile: (data.delivery_address.poc_mob != null) ? data.delivery_address.poc_mob : state.data.phone,
                    email: state.data.email
                }

                let orderstatus = []
                let lastorderstatus = ''
                if (data.order_status) {
                    for (let index = 0; index < data.order_status.length; index++) {
                        const element = data.order_status[index];
                        // const status = order_status.filter(item => item.id == element.status)
                        if (index == 0) {
                            // lastorderstatus = status[0].status
                            // lastorderstatus = element.orders_status_name
                        }
                        orderstatus.push(
                            {
                                id: element.status,
                                title: element.orders_status_name,
                                time: element.date_added,
                                isActive: true
                            },
                        )
                    }
                }

                let products = []
                for (let index = 0; index < data.products.length; index++) {
                    const element = data.products[index];
                    for (let idx = 0; idx < element.size_group.length; idx++) {
                        const item = element.size_group[idx];
                        if (idx == 0)
                            lastorderstatus = item.orders_status_name

                        products.push({
                            id: element.products_id,
                            brand_name: element.brand_name,
                            image: element.image,
                            product_sizgroup_id: item.product_sizgroup_id,
                            set_qty_pcs: item.order_quantity + ' (' + parseInt(item.order_quantity) * parseInt(item.set_qty) + 'Pcs )',
                            set_qty: item.set_qty,
                            size: item.size_name,
                            color: item.color_names.length,
                            price: item.per_piece_price,
                            ordered_qty: item.order_quantity,
                            return_set_qty: 0,
                            vendor_style_no: element.vendor_style_no,
                            orders_status_name: item.orders_status_name,
                            return_reason: [
                                {
                                    title: "Item Not As Per Order",
                                    isChecked: false
                                },
                                {
                                    title: 'Quality Issue',
                                    isChecked: false
                                }
                            ],
                            return_images: []
                        })
                    }
                }

                let priceDetails = [
                    {
                        title: "Order Value",
                        value: '₹' + (data.total_order_value) ? data.total_order_value : 0,
                    },
                    {
                        title: "Platform Fees",
                        value: '₹' + (data.platform_fees) ? data.platform_fees : 0,
                    },
                    {
                        title: "Shipping Charge",
                        value: '₹' + (data.shipping_conv) ? data.shipping_conv : 0,
                    },
                    {
                        title: "GST",
                        value: '₹' + (data.total_gst_applied) ? data.total_gst_applied : 0
                    }
                ]

                if (data.oda_charges && data.oda_charges != 0) {
                    priceDetails.push({
                        title: "ODA Charges",
                        value: '₹' + (data.oda_charges) ? data.oda_charges : 0
                    })
                }



                resolve({
                    // shipping_address,
                    priceDetails,
                    // totalAmount: data.order_value_inc_tax,
                    products,
                    orderstatus,
                    lastorderstatus,
                    // cod_amount: data.cod_amount,
                    // payment_method: data.payment_method,
                    // prepaid_amount: data.prepaid_amount,
                    // invoice_link: data.invoice_link
                })

            }, error => {
                reject(error)
            })
        })
    }

    _initiateReturnService(param) {

        return new Promise((resolve, reject) => {
            this.uploadImage(RETURN_ORDER_SLUG, param).then(response => {
                resolve(response.data.data)
            }, error => {
                reject(error)
            })
        })
    }
}
export default new ReturnOrderService()