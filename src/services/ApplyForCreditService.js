const config = require("../../config/karnika.config")
import Base from './Base.service'
import { GET_CREDIT_AGENCIES } from './Slug'
import {store} from '../redux/store'
import { setCreditAgenciesAction } from '../redux/actions/applyForCreditAction'


class ApplyForCreditService extends Base {

    _getCreditAgenciesService() {
        return new Promise((resolve, reject) => {
            this.get(config.serviceUrl + GET_CREDIT_AGENCIES).then(response => {
                if (response.data && response.data.data.length > 0) {
                    let list = []
                    const data = response.data.data
                    // console.log(data);
                    for (let index = 0; index < data.length; index++) {
                        const element = data[index];
                        list.push({
                            id: element.id,
                            credit_partner: element.name,
                            credit_period: element.period,
                            image: element.image,
                            commission: element.commission,
                            term_conditions: element.term_conditions,
                            isChecked: false
                        })
                    }
                    // list.push({
                    //     id: 2,
                    //     credit_partner: 'abc',
                    //     credit_period: '20 Days',
                    //     image: "",
                    //     isChecked: false
                    // })
                    store.dispatch(setCreditAgenciesAction(list))
                    resolve(true)
                } else {
                    reject({
                        message: 'No Data Found.'
                    })
                }
            }, error => {
                //console.log(error);
                reject(error)
            })

        })
    }
}

export default new ApplyForCreditService