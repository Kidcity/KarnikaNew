import Base from './Base.service'
import { ADD_NEW_ADDRESS_SLUG, DELETE_ADDRESS_SLUG, GET_ADDRESS_LIST_SLUG, GET_CITY_NAME_SLUG, REGISTER_FORM_BASIC_DATA_SLUG } from './Slug'
import { store } from '../redux/store'
import { setAddressAction, setDefaultAddressAction } from '../redux/actions/addressAction'
const config = require("../../config/karnika.config")

class AddressService extends Base {

    _getAddressService(param) {
        return new Promise((resolve, reject) => {
            this.post(GET_ADDRESS_LIST_SLUG, param).then(response => {

                const data = response.data.data.getAddress
                const user_email = store.getState().loginReducer.data.email
                const phone = store.getState().loginReducer.data.phone
                
                const saved_default_address = store.getState().addressReducer.default_address
                //console.log(data);
                let list = []
                for (let index = 0; index < data.length; index++) {
                    const element = data[index];
                    list.push({
                        address_book_id: element.address_book_id,
                        name: (element.shop_name)?element.shop_name: saved_default_address.name,
                        address: element.entry_address1,
                        state: element.zone_name,
                        state_id: element.entry_state,
                        district_id: element.entry_zone_id,
                        pin: element.entry_postcode,
                        country: element.countries_name,
                        mobile: (element.mobile_no)?element.mobile_no : phone,
                        email: user_email,
                        city: element.city_name,
                        street_address: element.entry_street_address,
                        isChecked: (saved_default_address && saved_default_address.address_book_id == element.address_book_id) ? true : false
                    })
                }
                
                store.dispatch(setAddressAction(list))
                resolve(list)
            }, error => {
                reject(error)
            })
        })
    }

    _deleteAddressService(param){
        return new Promise((resolve, reject) => {
            this.get( config.serviceUrl + DELETE_ADDRESS_SLUG+"/"+param).then(response => {
                //console.log(response);
                resolve(true)
            }, error => {                
                reject(error)
            })
        })
    }

    _setDefaultAddress(list) {
        return new Promise((resolve, reject) => {
            store.dispatch(setDefaultAddressAction(list))
            resolve(true)
        })

    }

    _fetchBasicInfoService() {
        return new Promise((resolve, reject) => {
            this.post(REGISTER_FORM_BASIC_DATA_SLUG).then(response => {
                resolve(response)
            }, error => {
                reject(error)
            })
        })
    }

    _fetchCitiesService(param) {
        return new Promise((resolve, reject) => {
            this.post(GET_CITY_NAME_SLUG, param).then(response => {
                resolve(response)
            }, error => {
                reject(error)
            })
        })
    }

    _saveNewAddressService(param) {
        //console.log(param);
        return new Promise((resolve, reject) => {
            this.post(ADD_NEW_ADDRESS_SLUG, param).then(response => {
                resolve(response)
            }, error => {
                reject(error)
            })
        })

    }

}

export default new AddressService()