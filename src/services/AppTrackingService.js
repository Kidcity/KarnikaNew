
import Base from './Base.service'
import { TRACK_APP } from './Slug'
import {store} from '../redux/store'

class AppTrackingService extends Base{

  async _saveTrackingDataService(duration = 0, currentRouteName = '') {

    const retailer_data = store.getState().loginReducer.data
    let activity_obj = store.getState().appTrackingReducer
    const retailer_id = retailer_data.cust_manu_id ?? ""
    
    // console.log("store.getState().appTrackingReducer ==> ",JSON.stringify(store.getState().appTrackingReducer));

    const param = {
      retailer_id: retailer_id,
      page: currentRouteName,
      duration: duration,
      action_type: activity_obj?.action_type ?? "",
      action_id: activity_obj?.action_id ?? "",
      city_id: activity_obj?.city_id ?? "",
    }
    console.log("_saveTrackingDataService  ==> ", param);
    // return
    if(retailer_id == '' || duration == 0){
      return
    }
    
    return new Promise((resolve, reject) => {
        this.post(TRACK_APP, param).then(response => {
            resolve(response)
        }, error => {
            reject(error)
        }).catch(err => reject(err))
    })
}
}

export default new AppTrackingService()