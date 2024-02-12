import {CHANGE_PASSWORD_SLUG} from './Slug'
import Base from './Base.service'

class ChangePasswordService extends Base{

    _changepasswordService(param){       
        return new Promise((resolve, reject) => {
            this.post(CHANGE_PASSWORD_SLUG, param).then(response => {
                resolve(response)            
            }, error => {                               
                reject(error)
            })
        })
    }
}

export default new ChangePasswordService()