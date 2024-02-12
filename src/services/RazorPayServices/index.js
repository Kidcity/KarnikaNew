// import RazorpayCheckout from 'react-native-razorpay';
import colors from '../../utils/colors';
import Base from '../Base.service'
import { ORDER_ID_SLUG } from '../Slug'
import { images } from '../../utils/variable';
const config = require("../../../config/karnika.config")

class RazorPayServices extends Base {

    _getOrderIDService(mode, price, userid) {
        const url = config.paymentURL + ORDER_ID_SLUG + '/' + parseFloat(price) + '/' + userid + '/' + mode
       console.log('url ====> ', url);
        return new Promise(async (resolve, reject) => {
            await this.get(url).then(response => {
                resolve(response)
            }, error => {
               console.log(error);
                reject(error)
            })
        })
    }

    _razorPayPaymentService(price, order_id, default_shipping_address, email) {
        
        var options = {
            description: 'Credits towards karnika Pvt Ltd.',
            image:  images.header_logo2, // images.logo,
            currency: 'INR',
            key: config.stripeKey, // Your api key
            amount: price * 100,
            name: default_shipping_address.name,
            order_id: order_id,
            prefill: {
                email: email,
                contact: default_shipping_address.mobile,
                name: default_shipping_address.name,
            },
            theme: { color: colors.yellow }
        }
        console.log('_razorPayPaymentService   => ', options  );
        // return
        return new Promise(async (resolve, reject) => {
            await RazorpayCheckout.open(options).then((data) => {                                
                resolve(data)                
            }).catch((error) => {
                console.log(error);
                reject({message: 'You Cancelled Payment.'})
            });
        })
    }
}
export default new RazorPayServices()