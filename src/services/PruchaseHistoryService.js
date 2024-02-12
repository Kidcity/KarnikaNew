import Base from './Base.service'
import { PURCHASE_HISTORY_SLUG } from './Slug'
import {store} from '../redux/store'
import { setPurchaseHistoryDataAction } from '../redux/actions/purchaseHistoryAction'

class PruchaseHistoryService extends Base{

    _getPurchaseDataService(param){
        return new Promise((resolve, reject) => {
            this.post(PURCHASE_HISTORY_SLUG, param).then(response => {                             
               
                const data = response.data.data.data
                const initialdata = {
                    no_of_details: data.orders_count,
                    quantity_set: data.qty_ordered,
                    quantity_piece: data.total_pcs,
                    total_amount: data.total_payment
                }
                 store.dispatch(setPurchaseHistoryDataAction(initialdata))
                 resolve(true)
            }, error => {
                reject(error)
            })
        })
    }
}

export default new PruchaseHistoryService()