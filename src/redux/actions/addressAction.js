import {  SET_DEFAULT_ADDRESS, SET_SHIPPING_ADDRESS } from "../types"

export const setAddressAction = data => {
    return {
        type: SET_SHIPPING_ADDRESS,
        payload: data
    }
}

export const setDefaultAddressAction = data => {
    return{
        type: SET_DEFAULT_ADDRESS,
        payload: data
    }
}
