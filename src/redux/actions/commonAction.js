import { SET_PRODUCT_FILTER,CLEAR_PRODUCT_FILTER, SET_PROPS, SET_AVAILCREDIT_MODAL, SET_WELCOME_MODAL, SET_APP_LOGO, SET_MYFEED_FILTER } from "../types";


export const setProductFilterAction = data => {    
    return {
        type: SET_PRODUCT_FILTER,
        payload: data
    }
}

export const setMyFeedAction = data => {    
    return {
        type: SET_MYFEED_FILTER,
        payload: data
    }
}

export const setAppLogo = data => {    
    return {
        type: SET_APP_LOGO,
        payload: data
    }
}

export const setOpenAvailCreditModalAction = data => { 
    return {
        type: SET_AVAILCREDIT_MODAL,
        payload: data
    }
}

export const clearProductFilterAction = data => {
    return {
        type: CLEAR_PRODUCT_FILTER,
    }
}
