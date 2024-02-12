import { CLEAR_CART_DATA, SET_CART_COUNT_DATA, SET_CART_ITEMS, SET_CART_TOTAL_PRICE_DETAILS } from "../types";

export const setCartItemsAction = data => {
    return{
        type: SET_CART_ITEMS,
        payload: data
    }
}

export const settotalPriceDetailsAction = data => {
    return{
        type: SET_CART_TOTAL_PRICE_DETAILS,
        payload: data
    }
}

export const setCartCountDataAction = data => {    
    return{
        type: SET_CART_COUNT_DATA,
        payload: data
    }
}

export const clearCartAction = data => {
    return{
        type: CLEAR_CART_DATA,
    }
}