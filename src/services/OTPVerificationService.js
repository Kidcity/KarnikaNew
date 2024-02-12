import { setLoginFlagAction } from '../redux/actions/loginAction'
import Base from './Base.service'
import { OTP_VALIDATE_SLUG } from './Slug'
import { store } from '../redux/store'


class OTPVerificationService extends Base {

    _OTPvalidate(param, purpose) {
        return new Promise((resolve, reject) => {
            this.post(OTP_VALIDATE_SLUG, param).then(async response => {

                await store.dispatch(setLoginFlagAction(true))

                resolve(response)
            }, error => {
                reject(error)
            })
        })
    }
}

export default new OTPVerificationService()