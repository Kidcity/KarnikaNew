import Base from '../Base.service'
import { RUPIFI_CREATE_ORDER, RUPIFI_CUSTOMER_ELIGIBILITY, RUPIFI_CUTOMER_ACCOUNT_INFO, RUPIFI_GMV_SHARE, RUPIFI_REDIRECT_URL } from '../Slug'
import { store } from '../../redux/store'
import { setRupifiAccountStatusAction, setRupifiCreditBalanceAction, setRupifiCreditLimitAction, setRupifiMarchantIDAction, setRupifiRepaymentURLAction, setRupifiSOAURLAction } from '../../redux/actions/applyForCreditAction'
import { rupifi_status } from '../../utils/variable'
const config = require("../../../config/karnika.config")

class RupifiServices extends Base {


    //check customer eligibility
    _checkCustomerEligibility(param) {
       // console.log(param);
        return new Promise((resolve, reject) => {
            this.post(RUPIFI_CUSTOMER_ELIGIBILITY, param).then(async response => {
                //console.log(" RUPIFI_CUSTOMER_ELIGIBILITY success ========> ", JSON.stringify(response));
                if (response.data.data) {
                    const data = response.data.data

                    if (data.application_status === rupifi_status.PRE_APPROVED) {

                        const redirect_url = config.serviceUrl + RUPIFI_REDIRECT_URL
                        
                        const activation_url = data.activation_url + "?merchantRedirectUrl=" + redirect_url

                        await store.dispatch(setRupifiAccountStatusAction(data.application_status))

                        resolve({
                            application_status: data.application_status,
                            activation_url: activation_url,
                            message: "You are few steps away from availing credit amount of Rs 10,000 to Rs 2 Lacs. \n\nKindly submit the details and enjoy the facility.\n\nClick on" + ' "Go to Link"'
                        })
                    }else if(data.application_status == rupifi_status.INCOMPLETE){

                        const redirect_url = config.serviceUrl + RUPIFI_REDIRECT_URL
                        
                        const activation_url = data.activation_url + "?merchantRedirectUrl=" + redirect_url

                        await store.dispatch(setRupifiAccountStatusAction(data.application_status))

                        resolve({
                            application_status: data.application_status,
                            activation_url: activation_url,
                            message: "You are few steps away from availing credit amount of Rs 10,000 to Rs 2 Lacs. \n\nKindly submit the details and enjoy the facility.\n\nClick on" + ' "Go to Link"'
                        })
                    }
                    else if (data.application_status == rupifi_status.PRE_APPROVAL_PENDING) {
                        await store.dispatch(setRupifiAccountStatusAction(data.application_status))
                        resolve({
                            message: "Pre approval is pending."
                        })
                    }
                    else {
                        await store.dispatch(setRupifiAccountStatusAction(data.application_status))
                        resolve({
                            message: (data.status_remark) ? data.status_remark : " " + data.application_status
                        })
                    }
                }
            }, error => {
                // console.log("error ========> ", JSON.stringify(error));
                reject(error)
            })

        })
    }

    // get customer application status
    _getCustomerApplicationStatus(param){
        return new Promise((resolve, reject) => {
            this.post(RUPIFI_CUSTOMER_ELIGIBILITY, param).then(async response => {                 
                if (response.data.data) {
                    const data = response.data.data
                    //console.log(" RUPIFI_CUSTOMER_ELIGIBILITY success ========> ", data.application_status);
                    await store.dispatch(setRupifiAccountStatusAction(data.application_status))   
                    resolve(data.application_status)                
                }else{
                    reject({
                        message: "Something went wrong."
                    })
                }
            }, error => {
                // console.log("error ========> ", JSON.stringify(error));
                reject(error)
            })

        })
    }

    // get customer account details
    _getCustomerAccountInfo(param) {
       
        return new Promise((resolve, reject) => {
            this.post(RUPIFI_CUTOMER_ACCOUNT_INFO, param).then(async response => {

                // console.log(JSON.stringify(response));

                if (response.data) {
                    if (response.data.data) {
                        const data = response.data.data
                        
                        if (data.status == rupifi_status.ACTIVE) {
                            await store.dispatch(setRupifiSOAURLAction(data.soa_url))
                            await store.dispatch(setRupifiRepaymentURLAction(data.repayment_url))
                            await store.dispatch(setRupifiMarchantIDAction(data.merchant_customer_id))
                            await store.dispatch(setRupifiAccountStatusAction(data.status))
                            await store.dispatch(setRupifiCreditBalanceAction(data.balance.value))
                            await store.dispatch(setRupifiCreditLimitAction(data.limit.value))
                        } else {
                            await store.dispatch(setRupifiAccountStatusAction(data.status))
                        }
                        resolve(data.status)
                    } else {
                        reject({ message: "Something went wrong." })
                    }
                } else {
                    reject({ message: "Something went wrong." })
                }
            }, error => {
                // console.log("error ========> ", JSON.stringify(error));
                reject(error)
            })

        })
    }

    // create order 
    _createRupifiOrderService(param) {
        // console.log(param);
        return new Promise((resolve, reject) => {
            this.post(RUPIFI_CREATE_ORDER, param).then(response => {
                //  console.log("_createRupifiOrderService success ========> ", JSON.stringify(response.data.data));
                if (response.data) {
                    if (response.data.data) {
                        const data = response.data.data
                        resolve({
                            status: true,
                            message: "Order ID created, Go for payment.",
                            payment_url: data.payment_url,
                            unpaid_amount: data.unpaid_amount,
                            order_id: data.id
                        })
                    }
                }
            }, error => {
                // console.log("error ========> ", JSON.stringify(error));
                reject(error)
            })

        })
    }

    _gmvService(param) {
        // console.log(RUPIFI_GMV_SHARE, param);
        return new Promise((resolve, reject) => {
            this.post(RUPIFI_GMV_SHARE, param).then(response => {
                // console.log("_gmvService success ========> ", JSON.stringify(response));
                resolve(response)
            }, error => {
                // console.log("error ========> ", JSON.stringify(error));
                reject(error)
            })

        })
    }
}

export default new RupifiServices