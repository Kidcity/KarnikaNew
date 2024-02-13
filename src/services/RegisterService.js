import Base from './Base.service'
import { CHECK_VALID_GST_SLUG, REGISTER_FORM_BASIC_DATA_SLUG, GET_CITY_NAME_SLUG, REGISTER_SLUG, CHECK_VALID_PAN_SLUG, UPDATE_PROFILE_SLUG } from './Slug'

import {store} from '../redux/store' 
import { setDefaultAddressAction } from '../redux/actions/addressAction'

class RegisterService extends Base{

    _checkValidGSTService(param){
      
        return new Promise((resolve, reject) => {
            this.post(CHECK_VALID_GST_SLUG,param).then(response => {                            
                resolve(response)            
            }, error => {
                console.log(error);                           
                reject(error)
            })
        })
    }

    _checkValidPANService(param){
        return new Promise((resolve, reject) => {
            this.post(CHECK_VALID_PAN_SLUG,param).then(response => {                            
                resolve(response)            
            }, error => {                                                                            
                reject(error)
            })
        })
    }

    _fetchBasicInfoService(){
        return new Promise((resolve, reject) => {
            this.post(REGISTER_FORM_BASIC_DATA_SLUG).then(response => {                            
                resolve(response)            
            }, error => {                               
                reject(error)
            })
        })
    }

    _fetchCitiesService(param){
        return new Promise((resolve, reject) => {
            this.post(GET_CITY_NAME_SLUG, param).then(response => {                            
                resolve(response)            
            }, error => {                               
                reject(error)
            })
        })
    }

    _registerService(param){
        //console.log(param);
        return new Promise((resolve, reject) => {
            this.post(REGISTER_SLUG, param).then(response => {                            
                resolve(response)            
            }, error => { 
                //console.log(error);                              
                reject(error)
            })
        })
    }

    _updateProfileService(param){
        //console.log(param);
        return new Promise((resolve, reject) => {
            this.post(UPDATE_PROFILE_SLUG, param).then(async response => {
                const add = response?.data?.data?.data
                const address = {
                    address_book_id: add?.address_book_id,
                    name: add?.shop_name,
                    address: add?.entry_address1,
                    state: add?.zone_name,
                    pin: add?.entry_postcode,
                    country: add?.countries_name,
                    mobile: add?.phone,
                    email: add?.email,
                    isChecked: true
                }      
                await store.dispatch(setDefaultAddressAction(address))                      
                resolve({
                    status: true
                })            
            }, error => { 
                //console.log(error);                              
                reject(error)
            })
        })
    }
}

export default new RegisterService()