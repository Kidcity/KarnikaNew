import { clearCreditAgenciesAction } from '../redux/actions/applyForCreditAction'
import { clearCartAction } from '../redux/actions/cartAction'
import { clearProductFilterAction } from '../redux/actions/commonAction'
import { clearHomeData } from '../redux/actions/homeAction'
import { clearLoginData } from '../redux/actions/loginAction'
import { clearNotifications } from '../redux/actions/notificationAction'
import { clearOrderListData } from '../redux/actions/orderListAction'
import { clearProductListData } from '../redux/actions/productListAction'
import { clearWishListCount } from '../redux/actions/wishListAction'
import { store } from '../redux/store'
import { setScreenActivity } from './AppActivityTrackingHelper'
import { clearStoreDataAction } from '../redux/actions/storeByCityAction'

import LoginService from '../services/LoginService'
import { errorAlert, successToast } from './ToastHelper'

export const logout = () => {

    const retailer_id = store.getState().loginReducer.data?.cust_manu_id

    const param = {
        retailer_id: retailer_id
    }
    console.log(param);
    LoginService.logoutService(param).then((response) => {
        console.log(response);
        if (response?.success === true) {
            store.dispatch(clearLoginData())
            store.dispatch(clearHomeData())
            store.dispatch(clearCartAction())
            store.dispatch(clearProductListData())
            store.dispatch(clearProductFilterAction())
            store.dispatch(clearWishListCount())
            store.dispatch(clearCreditAgenciesAction())
            store.dispatch(clearOrderListData())
            store.dispatch(clearNotifications())
            store.dispatch(clearStoreDataAction())
            successToast("Logged Out!", "You have logged out successfully.")
        }
    }, err => {
        errorAlert("Error", err?.message)
    })

}