import { loginAction, setCityWalletAction } from '../redux/actions/loginAction';
import Base from './Base.service'
import { LOGIN_SLUG, LOGOUT_SLUG } from './Slug'
import { store } from '../redux/store'
import { setCartCountDataAction } from '../redux/actions/cartAction';
import { setDefaultAddressAction } from '../redux/actions/addressAction'
import { setWishListCount } from '../redux/actions/wishListAction';


class LoginService extends Base {

    _loginService(param) {
        //console.log(param);
        return new Promise((resolve, reject) => {
            this.post(LOGIN_SLUG, param).then(async response => {
                console.log(JSON.stringify(response.data.data));
               
                if (response?.data?.data?.success == "0") {

                    reject({
                        message: response?.data?.data?.message
                    })
                }

                if (response?.data?.data) {

                    // if (response.data.data.otp_verified) {

                        const resp_data = response?.data?.data?.data

                        const data = {
                            android_version: resp_data?.android_version,
                            ios_version: resp_data?.ios_version,
                            cust_manu_id: resp_data?.cust_manu_id,
                            default_address: resp_data?.default_address,
                            email: resp_data?.email,
                            first_name: resp_data?.first_name,
                            last_name: resp_data?.last_name,
                            image: resp_data?.image,
                            phone: resp_data?.phone,
                            shop_name: resp_data?.shop_name,
                            user_name: resp_data?.user_name,
                            user_type_id: resp_data?.user_type_id,
                            is_applied_for_credit: 0,
                            is_ws_not: +resp_data?.is_ws_not
                        }

                        // if (!resp_data?.default_address) {
                        //     reject({ message: "API error: Proper data is not coming" })
                        //     return
                        // }

                        // const add = resp_data.default_address
                        const address = null
                        // const address = {
                        //     address_book_id: add.address_book_id,
                        //     name: resp_data.shop_name,
                        //     address: add.entry_address1,
                        //     state: add.zone_name,
                        //     pin: add.entry_postcode,
                        //     country: add.countries_name,
                        //     mobile: resp_data.phone,
                        //     email: resp_data.email,
                        //     isChecked: true
                        // }

                        // console.log(data);
                       
                        await store.dispatch(setCityWalletAction(resp_data?.City_Wallet))
                        await store.dispatch(setDefaultAddressAction(address))
                        await store.dispatch(loginAction(data))
                        await store.dispatch(setCartCountDataAction(resp_data?.AddTheCart))
                        await store.dispatch(setWishListCount(resp_data?.GetWishList))

                        resolve(true)

                    // } else if (response?.data?.data?.otp_verified === false) {
                    //     reject({
                    //         message: "Please verify your OTP.",
                    //         otp_verification: false
                    //     })
                    // }
                }
                return

            }, error => {

                reject(error)
            })
        })
    }

    async logoutService(param) {

        return new Promise((resolve, reject) => {
            this.post(LOGOUT_SLUG, param).then(async response => {
                resolve(response?.data?.data)
            }, error => {
                console.log(error);
                reject({
                    message: "Something went wrong",
                })
            })
        })
    }

}

export default new LoginService()