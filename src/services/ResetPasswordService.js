import Base from './Base.service'
import { RESET_PASSWORD_SLUG } from './Slug'

class ResetPasswordService extends Base {

    _resetpasswordService(param) {
        //console.log(param);
        return new Promise((resolve, reject) => {
            this.post(RESET_PASSWORD_SLUG, param).then(response => {
                if (response.data.data.success == false) {
                    reject(response.data.data)
                } else {
                    resolve(response)
                }
            }, error => {
                reject(error)
            })
        })
    }
}

export default new ResetPasswordService()