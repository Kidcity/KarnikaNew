import { setDefaultAddressAction } from '../redux/actions/addressAction'
import { loginAction } from '../redux/actions/loginAction'
import Base from './Base.service'
import { GET_PROFILE_INFO_SLUG, UPDATE_PROFILE_INFO_SLUG } from './Slug'
import {store} from '../redux/store'

class EditProfileService extends Base {

    _getProfileInfoService(param) {
        return new Promise((resolve, reject) => {
            this.post(GET_PROFILE_INFO_SLUG, param).then(response => {
                resolve(response)
            }, error => {
                reject(error)
            })
        })
    }

    _updateProfileInfo(param) {
        return new Promise((resolve, reject) => {
            this.post(UPDATE_PROFILE_INFO_SLUG, param).then(response => {
                //console.log('response', response.data.data.data);
                if (response.data.data.data) {

                    const data = {
                        android_version: response.data.data.data.android_version,
                        ios_version: response.data.data.data.ios_version,
                        cust_manu_id: response.data.data.data.cust_manu_id,
                        default_address: response.data.data.data.default_address,
                        email: response.data.data.data.email,
                        first_name: response.data.data.data.first_name,
                        last_name: response.data.data.data.last_name,
                        image: response.data.data.data.image,
                        phone: response.data.data.data.phone,
                        shop_name: response.data.data.data.shop_name,
                        user_name: response.data.data.data.user_name,
                        user_type_id: response.data.data.data.user_type_id,
                    }   

                    if(!response.data.data.data.default_address){
                        reject({message: "API error: Proper data is not coming"})
                        return
                    }
                    const add = response.data.data.data.default_address
                    const address = {
                        address_book_id: add.address_book_id,
                        name: response.data.data.data.shop_name,
                        address: add.entry_address1,
                        state: add.zone_name,
                        pin: add.entry_postcode,
                        country: add.countries_name,
                        mobile: response.data.data.data.phone,
                        email: response.data.data.data.email,
                        isChecked: true
                    }
                    store.dispatch(setDefaultAddressAction(address))
                    store.dispatch(loginAction(data))
                    resolve(response)
                } else {
                    reject({ message: "error getting update reponse" })
                }

            }, error => {
                reject(error)
            })
        })
    }
}

export default new EditProfileService()