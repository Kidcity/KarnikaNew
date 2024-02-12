import { STORE_LOGIN_DATA, CLEAR_LOGIN_DATA, CITY_WALLET_AMOUNT, SETAPP_VERSION, DEMO_LOGIN, SET_LOGIN_FLAG } from "../types"

export const setAppVersionAction = data => dispatch => {
    dispatch({
        type: SETAPP_VERSION,
        payload: data
    })
}

export const demoLoginAction = data => dispatch => {
    dispatch({
        type: DEMO_LOGIN,
        payload: data
    })
}

export const loginAction = data => dispatch => {
    dispatch({
        type: STORE_LOGIN_DATA,
        payload: data
    })
}

export const setLoginFlagAction = data => dispatch => {
    dispatch({
        type: SET_LOGIN_FLAG,
        payload: data
    })
}

export const setCityWalletAction = data => dispatch => {
    dispatch({
        type: CITY_WALLET_AMOUNT,
        payload: data
    })
}

export const clearLoginData = () => {   
    return { type: CLEAR_LOGIN_DATA }
}