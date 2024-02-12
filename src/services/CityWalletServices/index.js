import { setCityWalletAction } from '../../redux/actions/loginAction';
import Base from '../Base.service'
import { GET_CITY_WALLET_AMOUNT } from '../Slug'
import {store} from '../../redux/store'

class CityWalletServices extends Base {

    _getCityWalletAmountService(param) {
        return new Promise((resolve, reject) => {
            this.post(GET_CITY_WALLET_AMOUNT, param).then(async response => {
                
                if (response.data) {
                    if (response.data.data) {
                        const data = response.data.data
                        await store.dispatch(setCityWalletAction(data.city_wallet ? data.city_wallet : 0))
                        resolve(true)
                    }
                    reject({message: "Something went wrong."})
                }else{
                    reject({message: "Something went wrong."})
                }
            }, error => {
                reject(error)
            })

        })
    }
}
export default new CityWalletServices()